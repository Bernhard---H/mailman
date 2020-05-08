import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class DomainsDomainController extends Controller {

  @action
  backToIndex(){
    this.transitionToRoute("domains.domain");
  }
}
