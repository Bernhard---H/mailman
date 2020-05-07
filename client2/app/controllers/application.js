import Controller from '@ember/controller';
import {inject} from '@ember/service';
import {tracked}from '@glimmer/tracking';

export default class ApplicationController extends Controller {
    @tracked collapsed = false;

    @inject session;

}
