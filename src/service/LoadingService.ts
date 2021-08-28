import { Observable, ReplaySubject, BehaviorSubject } from 'rxjs';

export class LoadingService {

  private static readonly clear = new ReplaySubject<boolean>(1);
  private static readonly loading = new BehaviorSubject(false);

  static toggleLoading() {
    this.loading.next(!this.loading.value);
  }

  static stopLoading() {
    this.loading.next(false);
  }

  static getLoadingStatus(): Observable<boolean> {
    return this.loading
  }

  static startClearNetworkGraph() {
    this.clear.next(true);
  }

  static stopClearNetworkGraph() {
    this.clear.next(false);
  }

  static getClearStatus(): Observable<boolean> {
    return this.clear;
  }

}
