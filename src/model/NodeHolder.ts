import {Edge, Node} from 'vis-network';
import {BaseTask} from "./BaseTask";
import {Flow} from "./Flow";

/***
 * A wrapper for a node
 */
export interface NodeHolder {
  position: number;
  index: number;
  color: string;
  name: string;
  nodeType: string;
  id: string;
  maxRetries: number;
  fallbackNodeId?: string;
  timeoutNodeId?: string;
  maxRetryNodeId?: string;
  flows: string [];
  flowsList: Flow [];
  node: Node;
  edges: Edge [];
  task: BaseTask;
}
