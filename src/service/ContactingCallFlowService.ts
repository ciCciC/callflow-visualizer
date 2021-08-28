import axios from 'axios';
import { Observable, ReplaySubject } from 'rxjs';
import {CallFlowConfig} from "../model/CallFlowConfig";
import {Revision} from "../model/Revision";
import {DummyCallFlowConfig} from "../model/DummyCallFlowConfig";
import {CallFlow} from "../model/CallFlow";
import {CallFlowBuilder} from "../model/CallFlowBuilder";

export class ContactingCallFlowService {

  private static readonly chosenCallFlowConfig = new ReplaySubject<DummyCallFlowConfig>(1);

  static setChosenCallFlowVersion(callFlowVersion: DummyCallFlowConfig) {
    this.chosenCallFlowConfig.next(callFlowVersion);
  }

  static getChosenCallFlowVersion(): Observable<DummyCallFlowConfig | undefined> {
    return this.chosenCallFlowConfig;
  }

  static resetCallFlowVersionSelection() {
    this.chosenCallFlowConfig.next(undefined);
  }

  static async getCallFlowConfigs(): Promise<CallFlowConfig[]> {
    const resourceUrl = '/api/contacting-callflows/callflow-config';
    const result = await axios.get(resourceUrl, {transformResponse: [this.transformCallFlowConfig]});
    return result.data;
  }

  static async getCallFlow(callFlowName: string, version: string): Promise<CallFlow> {
    // test case: small callFlow
    callFlowName = 'AssistedChannelsHighSpeedLine';
    version = '1.0.7-Mahesh';

    // test case: big callFlow
    // callFlowName = 'DBPGeneral';
    // version = '1.6.19-intents';

    const resourceUrl = `/api/contacting-callflows/callflow-config/${callFlowName}/${version}`;
    const result = await axios.get(resourceUrl, {transformResponse: [this.transformCallFlow]});
    return result.data;
  }

  private static transformCallFlow(data: any): Promise<CallFlow> {
    const resp = JSON.parse(ContactingCallFlowService.clean(data))
    return new CallFlowBuilder().createCallFlow(resp)
  }

  private static transformCallFlowConfig(data: any): Promise<CallFlowConfig[]> {
    const resp = JSON.parse(ContactingCallFlowService.clean(data))
    return resp.map((el: any) => (<CallFlowConfig>{
      name: el.name,
      activeVersion: el.version,
      revisions: el.revisions.map((rev: any) => (<Revision>{
        version: rev.version,
        revType: rev.rev_type
      }))
    }
    )
    )
  }

  private static clean(data: any): any {
    return data.replace(")]}',", "")
  }

}
