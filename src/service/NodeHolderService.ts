import { Observable, ReplaySubject } from 'rxjs';
import {NodeHolder} from "../model/NodeHolder";
// import {NodeStats} from "../model/NodeStats";

export class NodeHolderService {

  private static readonly selectedNodeHolder = new ReplaySubject<NodeHolder | undefined>(1);
  // private static readonly nodeStats = new ReplaySubject<NodeStats | undefined>(1);
  private static nodeHolderMap = new Map<string, NodeHolder>();

  static resetNodeHolderSelection() {
    this.selectedNodeHolder.next(undefined);
  }

  static setNodeHolderSelection(nodeHolder: NodeHolder) {
    this.selectedNodeHolder.next(nodeHolder);
  }

  static getSelectedNodeHolder(): Observable<NodeHolder | undefined> {
    return this.selectedNodeHolder;
  }

  static setNodeHolderMap(nodeHolderMap: Map<string, NodeHolder>){
    this.nodeHolderMap = nodeHolderMap;
  }

  static addNodeHolderToMap(nodeHolder: NodeHolder) {
    this.nodeHolderMap.set(nodeHolder.id, nodeHolder);
  }

  static getNodeHolderById(nodeHolderId: string): NodeHolder | undefined {
    return this.nodeHolderMap.get(nodeHolderId);
  }

  static getNodeHolderByIds(nodeHolderIds: string[]): NodeHolder[] {
    return nodeHolderIds.map(id => this.nodeHolderMap.get(id)!);
  }

  static getNodeHolderMap(): Map<string, NodeHolder> {
    return this.nodeHolderMap;
  }

  static getNeighbors(flows: string[] | undefined): NodeHolder[] | undefined {
    return flows?.filter(flow => this.nodeHolderMap.has(flow)).map(flow => this.nodeHolderMap.get(flow)!)
  }

  static getNodeHolderIdsByName(nodeName: string): NodeHolder [] {
    return Array.from(this.nodeHolderMap.values()).filter(nodeHolder => nodeName === nodeHolder.name);
  }

  static getNodeHolderIdsByNames(nodeName: string[]): NodeHolder [] {
    return Array.from(this.nodeHolderMap.values()).filter(nodeHolder => nodeName.some(name => nodeHolder.name === name));
  }

  static validateNodeNames(nodeNames: string[]): string[]{
    const toValidateWith = Array.from(this.nodeHolderMap.values()).map(nodeHolder => nodeHolder.name);
    return nodeNames.filter(nodeName => toValidateWith.includes(nodeName));
  }

  /***
   * Groups the ids by name
   * @param nodeNames a map where key as node name and value as depth of ids
   */
  static getGroupedIdsByName(nodeNames: string[]): Map<string, string[]> {
    return new Map(nodeNames
      .map(nodeName => [nodeName, this.getNodeHolderIdsByName(nodeName)
        .map(nodeHolder => nodeHolder.id)]));
  }
}
