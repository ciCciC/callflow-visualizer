import axios from 'axios';
import { Observable, ReplaySubject } from 'rxjs';
import {CallFlowConfig} from "../model/CallFlowConfig";
import {Revision} from "../model/Revision";
import {DummyCallFlowConfig} from "../model/DummyCallFlowConfig";
import {CallFlow} from "../model/CallFlow";
import {CallFlowBuilder} from "../model/CallFlowBuilder";

export class ContactingCallFlowService {

  private static readonly chosenCallFlowConfig = new ReplaySubject<DummyCallFlowConfig>(1);
  private static resourceUrl = '/api/flows';

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
    const result = await axios.get(this.resourceUrl, {transformResponse: [this.transformCallFlowConfig]});
    return result.data;
  }

  static async getCallFlow(callFlowName: string, version: string): Promise<CallFlow> {
    const url = `${this.resourceUrl}/${callFlowName}/${version}`;
    const result = await axios.get(url, {transformResponse: [this.transformCallFlow]});
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
        revType: rev.revType
      }))
    }
    )
    )
  }

  private static clean(data: any): any {
    return data.replace(")]}',", "")
  }

}
