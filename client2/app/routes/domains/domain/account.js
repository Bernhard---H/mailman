import Route from '@ember/routing/route';
import { devAccounts } from './index';

export default class DomainsDomainAccountRoute extends Route {

  model(params) {
    let domainModel = this.modelFor("domains.domain");
    return {
      domain: domainModel.domain,
      account: devAccounts.find(account => {
        return account.username == params.account_name;
      })
    };
  }
}
