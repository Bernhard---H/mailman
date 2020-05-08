import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | domains/domain/alias', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:domains/domain/alias');
    assert.ok(route);
  });
});