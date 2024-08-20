import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { AST } from '@codemod-utils/ast-javascript';

import type { Options } from '../../../types/run-generate.js';

function addImportStatement(file: string, options: Options): string {
  const { entity } = options;
  const localName = getLocalName(options);

  let line = '';

  switch (entity.type) {
    case 'component': {
      if (
        entity.blueprint === 'glimmer-strict' ||
        entity.blueprint === 'template-only-strict'
      ) {
        line = `import type ${localName} from './${entity.type}s/${entity.name}.gts';\n`;
      } else {
        line = `import type ${localName} from './${entity.type}s/${entity.name}.ts';\n`;
      }

      break;
    }

    case 'helper':
    case 'modifier': {
      line = `import type ${localName} from './${entity.type}s/${entity.name}.ts';\n`;

      break;
    }
  }

  return [line, file].join('');
}

function getLocalName(options: Options): string {
  const { entity } = options;

  switch (entity.type) {
    case 'component': {
      return `${entity.classifiedName}Component`;
    }

    case 'helper': {
      return `${entity.classifiedName}Helper`;
    }

    case 'modifier': {
      return `${entity.classifiedName}Modifier`;
    }

    default: {
      return entity.classifiedName;
    }
  }
}

function updateRegistry(file: string, options: Options): string {
  const { entity } = options;
  const localName = getLocalName(options);

  const traverse = AST.traverse(true);

  const ast = traverse(file, {
    visitExportDefaultDeclaration(path) {
      const registry = path.value.declaration;
      const registryEntries = registry.body.body;

      registryEntries.splice(
        0,
        0,
        AST.builders.tsPropertySignature(
          AST.builders.stringLiteral(entity.name),
          AST.builders.tsTypeAnnotation(
            AST.builders.tsTypeQuery(AST.builders.identifier(localName)),
          ),
        ),
      );

      if (entity.type === 'component') {
        registryEntries.splice(
          0,
          0,
          AST.builders.tsPropertySignature(
            AST.builders.stringLiteral(entity.doubleColonizedName),
            AST.builders.tsTypeAnnotation(
              AST.builders.tsTypeQuery(AST.builders.identifier(localName)),
            ),
          ),
        );
      }

      return false;
    },
  });

  return AST.print(ast);
}

export function updateTemplateRegistry(options: Options): void {
  const { entity, projectRoot } = options;

  if (entity.type === 'service' || entity.type === 'util') {
    return;
  }

  const oldPath = join(projectRoot, 'src/template-registry.ts');
  const oldFile = readFileSync(oldPath, 'utf8');

  let newFile = addImportStatement(oldFile, options);
  newFile = updateRegistry(newFile, options);

  writeFileSync(oldPath, newFile, 'utf8');
}
