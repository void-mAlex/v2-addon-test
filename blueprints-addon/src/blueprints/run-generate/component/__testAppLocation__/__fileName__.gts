import { <%= options.entity.classifiedName %> } from '<%= options.addon.name %>';
import { render } from '@ember/test-helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import { module, test } from 'qunit';
import { setupRenderingTest } from '<%= options.testApp.name %>/tests/helpers';

module('Integration | Component | <%= options.entity.name %>', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(<template>
      <<%= options.entity.classifiedName %> />
    </template>);

    assert.dom().hasText('');

    await a11yAudit();
  });
});
