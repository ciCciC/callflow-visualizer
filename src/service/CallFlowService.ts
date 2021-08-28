import {Observable, ReplaySubject} from 'rxjs';
import {CallFlow} from "../model/CallFlow";
import {Graph} from "../model/Graph";
import {ViewModeEnum} from "../model/ViewModeEnum";

export class CallFlowService {

  private static readonly callFlow = new ReplaySubject<CallFlow>(1);
  private static readonly graph = new Graph();

  static async setCallFlow(rawCallFlowData: CallFlow) {
    this.callFlow.next(rawCallFlowData);
  }

  static getCallFlow(): Observable<CallFlow> {
    return this.callFlow;
  }

  static async computeReorderingCallFlow(createdCallFlow: CallFlow) {
    if (createdCallFlow.dropOutList.length > 0 && createdCallFlow.viewMode == ViewModeEnum.DROPOUT) {
      //Here we compute dropout
      createdCallFlow.nodeMap = this.graph.reOrderNetwork(createdCallFlow, createdCallFlow.dropOutList);
    }
  }

}
