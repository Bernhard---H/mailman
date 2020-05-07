import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | domains/domain', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:domains/domain');
    assert.ok(route);
  });
});
