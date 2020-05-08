import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class DomainsController extends Controller {

  @tracked
  selected = null;

  @action
  onSelectionChange(params) {
    this.selected = params
    this.transitionToRoute("domains.domain", params.domain);
  }
}
