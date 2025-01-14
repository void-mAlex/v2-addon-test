import { join } from 'node:path';

import { findFiles, removeFiles } from '@codemod-utils/files';

import type { Options } from '../../../types/run-destroy.js';

function getPattern(options: Options): string {
  const { entity } = options;

  switch (entity.type) {
    case 'component':
    case 'helper':
    case 'modifier': {
      return join(
        'tests/integration',
        `${entity.type}s`,
        `${entity.name}-test.*`,
      );
    }

    case 'service':
    case 'util': {
      return join('tests/unit', `${entity.type}s`, `${entity.name}-test.*`);
    }
  }
}

export function removeTestFile(options: Options): void {
  const { projectRoot, testApp } = options;

  const testAppRoot = join(projectRoot, testApp.location);

  const filePaths = findFiles(getPattern(options), {
    projectRoot: testAppRoot,
  });

  removeFiles(filePaths, {
    projectRoot: testAppRoot,
  });
}
