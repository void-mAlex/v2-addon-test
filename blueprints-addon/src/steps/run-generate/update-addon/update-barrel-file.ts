import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import type { Options } from '../../../types/run-generate.js';

function addExportStatement(file: string, options: Options): string {
  const { entity } = options;
  let line = '';

  switch (entity.type) {
    case 'component': {
      if (
        entity.blueprint === 'glimmer-strict' ||
        entity.blueprint === 'template-only-strict'
      ) {
        line = `export { default as ${entity.classifiedName} } from './${entity.type}s/${entity.name}.gts';\n`;
      } else {
        line = `export { default as ${entity.classifiedName} } from './${entity.type}s/${entity.name}.ts';\n`;
      }

      break;
    }

    case 'helper':
    case 'modifier': {
      line = `export { default as ${entity.camelizedName} } from './${entity.type}s/${entity.name}.ts';\n`;

      break;
    }
  }

  return [line, file].join('');
}

export function updateBarrelFile(options: Options): void {
  const { entity, projectRoot } = options;

  if (entity.type === 'service' || entity.type === 'util') {
    return;
  }

  const oldPath = join(projectRoot, 'src/index.ts');
  const oldFile = readFileSync(oldPath, 'utf8');

  const newFile = addExportStatement(oldFile, options);

  writeFileSync(oldPath, newFile, 'utf8');
}
