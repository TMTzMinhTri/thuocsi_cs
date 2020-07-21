import { Observable, Subject } from 'rxjs';
import { getListAddress } from 'Api/TaskManager';
import { get_current_user } from 'Api/Auth';

export class AppService {
  $ListAddress = new Observable<any>();
  $CurrentUser = new Observable<any>();
  OpenPopup = new Subject();

  getListAddress(): Observable<any> {
    this.$ListAddress = getListAddress();
    return this.$ListAddress;
  }

  getCurrentUser(): Observable<any> {
    this.$CurrentUser = get_current_user();
    return this.$CurrentUser;
  }

  sendControlTogglePopup(data: any) {
    return this.OpenPopup.next(data);
  }
}
