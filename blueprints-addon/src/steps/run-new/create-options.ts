import { join, relative } from 'node:path';

import type { CodemodOptions, Options } from '../../types/run-new.js';

function dasherize(packageName: string): string {
  return packageName.replace('@', '').replace(/\W|_/g, '-');
}

function pascalCase(packageName: string): string {
  const dasherizedName = dasherize(packageName);

  return dasherizedName
    .split('-')
    .map((token) => `${token.charAt(0).toUpperCase()}${token.substring(1)}`)
    .join('');
}

export function createOptions(codemodOptions: CodemodOptions): Options {
  const { location, name, projectRoot } = codemodOptions;

  const dasherizedName = dasherize(name);
  const pascalCaseName = pascalCase(name);

  const addonLocation = join('packages', location ?? dasherize(name));
  const addonLocationInverse = relative(addonLocation, '.');

  return {
    addon: {
      dasherizedName,
      location: addonLocation,
      locationInverse: addonLocationInverse,
      name,
      pascalCaseName,
    },
    docsApp: {
      location: 'docs-app',
      name: 'docs-app',
    },
    projectRoot,
    testApp: {
      location: 'test-app',
      name: 'test-app',
    },
  };
}
