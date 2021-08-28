import { Observable, BehaviorSubject } from 'rxjs';

export class SideBarService {

  private static readonly leftBarToggle = new BehaviorSubject(false);

  static toggleLeftBar() {
    this.leftBarToggle.next(!this.leftBarToggle.value);
  }

  static getLeftBarStatus(): Observable<boolean> {
    return this.leftBarToggle
  }
}
