import {Edge} from 'vis-network';
import {CallFlow} from "./CallFlow";
import {NodeHolder} from "./NodeHolder";
import {NodeEnum} from "./NodeEnum";
import {Flow} from "./Flow";
import {BaseTask} from "./BaseTask";
import {TaskFactory} from "./TaskFactory";
import {ViewModeEnum} from "./ViewModeEnum";

/**
 * CallFlow parser.
 * Parses the CallFlow in the desired structure
 */
export class CallFlowBuilder {

  async createCallFlow(parsedJson: any): Promise<CallFlow> {
    return {
      topNodeId: parsedJson['top_node_id'],
      name: parsedJson['name'],
      version: parsedJson['version'],
      nodeMap: this.createMap(parsedJson['nodes'], parsedJson['top_node_id'], parsedJson['fallback_node'], parsedJson['timeout_node']),
      viewMode: ViewModeEnum.DEV,
      dropOutList: []
    };
  }

  private createMap(parsedNodes: any, rootId: any, callFlowFallback: string | undefined, callFlowTimeout: string | undefined): Map<string, NodeHolder> {
    const nodeMap = new Map<string, NodeHolder>();
    parsedNodes.forEach((node:any, indexNum:any) => {
      const nodeId = node['id'];
      return nodeMap.set(nodeId, {
        color: '',
        position: 0,
        index: indexNum,
        name: node['name'],
        nodeType: node['id'] === rootId ? NodeEnum.ROOT : node['node_type'],
        id: nodeId,
        maxRetries: node['max_retries'] === undefined ? 0 : node['max_retries'],
        fallbackNodeId: this.setupHighLowNodeId(node['id'], rootId, callFlowFallback, node['fallback_node']),
        timeoutNodeId: this.setupHighLowNodeId(node['id'], rootId, callFlowTimeout, node['timeout_node']),
        maxRetryNodeId: this.setupHighLowNodeId(node['id'], rootId, '', node['max_retries_node']),
        flows: this.createFlows(node['id'], rootId, node['flows'], callFlowFallback, node['fallback_node'], callFlowTimeout, node['timeout_node'], node['max_retries_node']),
        flowsList: this.createFlowsWithDetails(node['id'], rootId, node['flows'], callFlowFallback, node['fallback_node'], callFlowTimeout, node['timeout_node'], node['max_retries_node']),
        node: {id: nodeId, label: node['name']},
        edges: this.createEdges(nodeId, rootId, node['flows'], callFlowFallback, node['fallback_node'], callFlowTimeout, node['timeout_node'], node['max_retries_node']),
        task: this.createTask(node['task'], node['node_type']),
        metrics: undefined
      });
    }
    );
    return nodeMap;
  }

  private setupHighLowNodeId(nodeId: string, rootId: string, callFlowHighNodeId: string | undefined, nodeLowId: string | undefined): string {
    return (nodeId === rootId ? callFlowHighNodeId : nodeLowId === undefined ? '' : nodeLowId) as string;
  }

  private createFlows(nodeId: string, rootId: string, parsedFlows: any,
    callFlowFallback: string | undefined, fallBackNode: string | undefined,
    callFlowTimeout: string | undefined, timeOutNode: string | undefined, maxRetriesNode: string | undefined): string [] {
    const newFlows = parsedFlows.map((flow:any) => flow['to']);
    if (fallBackNode || callFlowFallback) {
      const fallbackNodeId = this.setupHighLowNodeId(nodeId, rootId, callFlowFallback, fallBackNode);
      if(fallbackNodeId !== ''){
        newFlows.push(fallbackNodeId);
      }
    }
    if (timeOutNode || callFlowTimeout) {
      const timeoutNodeId = this.setupHighLowNodeId(nodeId, rootId, callFlowTimeout, timeOutNode);
      if(timeoutNodeId !== ''){
        newFlows.push(timeoutNodeId);
      }
    }
    if(maxRetriesNode){
      const maxRetryNodeId = this.setupHighLowNodeId(nodeId, rootId, '', maxRetriesNode);
      if(maxRetryNodeId !== ''){
        newFlows.push(maxRetryNodeId);
      }
    }
    return newFlows;
  }

  private createFlowsWithDetails(nodeId: string, rootId: string, parsedFlows: any,
    callFlowFallback: string | undefined, fallBackNode: string | undefined,
    callFlowTimeout: string | undefined, timeOutNode: string | undefined, maxRetriesNode: string | undefined): Flow [] {

    const newFlows = parsedFlows.map((flow:any) => ({to: flow['to'], label: '', value: flow['value']} as Flow));
    if (fallBackNode || callFlowFallback) {
      const fallbackNodeId = this.setupHighLowNodeId(nodeId, rootId, callFlowFallback, fallBackNode);
      if(fallbackNodeId !== ''){
        newFlows.push({to: fallbackNodeId, label: 'fallback', value: 'true'} as Flow);
      }
    }
    if (timeOutNode || callFlowTimeout) {
      const timeoutNodeId = this.setupHighLowNodeId(nodeId, rootId, callFlowTimeout, timeOutNode);
      if(timeoutNodeId !== '') {
        newFlows.push({to: timeoutNodeId, label: 'timeout', value: 'true'} as Flow);
      }
    }
    if (maxRetriesNode) {
      const maxRetryNodeId = this.setupHighLowNodeId(nodeId, rootId, '', maxRetriesNode);
      if(maxRetryNodeId !== '') {
        newFlows.push({to: maxRetryNodeId, label: 'maxretry', value: 'true'} as Flow);
      }
    }

    return newFlows;
  }

  private createEdges(nodeId: string, rootId: string, parsedFlows: any,
    callFlowFallback: string | undefined, fallBackNode: string | undefined,
    callFlowTimeout: string | undefined, timeOutNode: string | undefined, maxRetriesNode: string | undefined): Edge [] {

    const newEdges = parsedFlows.map((flow:any) => {
      return {from: nodeId, to: flow['to'], arrows: 'to', color: 'grey', physics: true};
    });

    if (fallBackNode || callFlowFallback) {
      const fallbackNodeId = this.setupHighLowNodeId(nodeId, rootId, callFlowFallback, fallBackNode);
      newEdges.push({from: nodeId, to: fallbackNodeId, arrows: 'to', color: 'grey', physics: true});
    }
    if (timeOutNode || callFlowTimeout) {
      const timeoutNodeId = this.setupHighLowNodeId(nodeId, rootId, callFlowTimeout, timeOutNode);
      newEdges.push({from: nodeId, to: timeoutNodeId, arrows: 'to', color: 'grey', physics: true});
    }
    if (maxRetriesNode) {
      const maxRetryNodeId = this.setupHighLowNodeId(nodeId, rootId, '', maxRetriesNode);
      newEdges.push({from: nodeId, to: maxRetryNodeId, arrows: 'to', color: 'grey', physics: true});
    }

    return newEdges;
  }

  /**
   * Creates the related Task for the node type
   * @param taskBody json task
   * @param nodeType node type
   * @private
   *
   * return a task
   */
  private createTask(taskBody: any, nodeType: string): BaseTask {
    return TaskFactory
      .getTask(nodeType)
      .build(taskBody);
  }
}
