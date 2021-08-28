import {NodeHolder} from "./NodeHolder";
import {ViewModeEnum} from "./ViewModeEnum";

export class CallFlow {
  topNodeId: string;
  name: string;
  version: string;
  nodeMap: Map<string, NodeHolder>;
  viewMode: ViewModeEnum;
  dropOutList: string[];
}
