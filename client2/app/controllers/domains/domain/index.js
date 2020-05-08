import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class DomainsDomainIndexController extends Controller {

  @action
  selectAccount(account) {
    this.transitionToRoute("domains.domain.account", account.username);
  }
}
