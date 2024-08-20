import { assertFixture, loadFixture, test } from '@codemod-utils/tests';

import { runGenerate } from '../../../src/index.js';
import {
  inputProject,
  outputProject,
} from '../../fixtures/run-generate/index.js';

const fixtureRoot = 'tmp/run-generate';

function runCommands() {
  runGenerate({
    entity: {
      blueprint: 'glimmer-loose',
      name: 'my-component/glimmer-loose',
      type: 'component',
    },
    projectRoot: `${fixtureRoot}/packages/ui/form`,
    testAppLocation: '../../../test-app',
  });

  runGenerate({
    entity: {
      blueprint: 'glimmer-strict',
      name: 'my-component/glimmer-strict',
      type: 'component',
    },
    projectRoot: `${fixtureRoot}/packages/ui/form`,
    testAppLocation: '../../../test-app',
  });

  runGenerate({
    entity: {
      blueprint: 'template-only-loose',
      name: 'my-component/template-only-loose',
      type: 'component',
    },
    projectRoot: `${fixtureRoot}/packages/ui/form`,
    testAppLocation: '../../../test-app',
  });

  runGenerate({
    entity: {
      blueprint: 'template-only-strict',
      name: 'my-component/template-only-strict',
      type: 'component',
    },
    projectRoot: `${fixtureRoot}/packages/ui/form`,
    testAppLocation: '../../../test-app',
  });

  runGenerate({
    entity: {
      blueprint: 'class',
      name: 'my-helper/class',
      type: 'helper',
    },
    projectRoot: `${fixtureRoot}/packages/ui/form`,
    testAppLocation: '../../../test-app',
  });

  runGenerate({
    entity: {
      blueprint: 'function',
      name: 'my-helper/function',
      type: 'helper',
    },
    projectRoot: `${fixtureRoot}/packages/ui/form`,
    testAppLocation: '../../../test-app',
  });

  runGenerate({
    entity: {
      blueprint: 'class',
      name: 'my-modifier/class',
      type: 'modifier',
    },
    projectRoot: `${fixtureRoot}/packages/ui/form`,
    testAppLocation: '../../../test-app',
  });

  runGenerate({
    entity: {
      blueprint: 'function',
      name: 'my-modifier/function',
      type: 'modifier',
    },
    projectRoot: `${fixtureRoot}/packages/ui/form`,
    testAppLocation: '../../../test-app',
  });

  runGenerate({
    entity: {
      blueprint: 'class',
      name: 'my-service/class',
      type: 'service',
    },
    projectRoot: `${fixtureRoot}/packages/ui/form`,
    testAppLocation: '../../../test-app',
  });

  runGenerate({
    entity: {
      blueprint: 'function',
      name: 'my-util/function',
      type: 'util',
    },
    projectRoot: `${fixtureRoot}/packages/ui/form`,
    testAppLocation: '../../../test-app',
  });
}

test('index | run-generate > typescript', function () {
  loadFixture(inputProject, { projectRoot: fixtureRoot });

  runCommands();

  assertFixture(outputProject, { projectRoot: fixtureRoot });

  // Check idempotence
  runCommands();

  assertFixture(outputProject, { projectRoot: fixtureRoot });
});
