import {Revision} from "./Revision";

export interface CallFlowConfig {
  name: string
  activeVersion: string
  revisions: Revision []
}
