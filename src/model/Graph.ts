import {Edge} from 'vis-network';
import {NodeHolder} from "./NodeHolder";
import {CallFlow} from "./CallFlow";

export class Graph {

  /**
   * Reorders the graph in a dynamic fashion
   * @param callFlow True Graph
   * @param declinedNodeTypes node types to remove from the Graph
   *
   * return new map of k=id,v=nodeHolder
   */
  reOrderNetwork(callFlow: CallFlow, declinedNodeTypes: string []): Map<string, NodeHolder> {
    this.dropout(callFlow, declinedNodeTypes);
    this.removeDuplicateNeighbors(callFlow);
    return callFlow.nodeMap;
  }

  private removeDuplicateNeighbors(callFlow: CallFlow) {
    for (const value of callFlow.nodeMap.values()) {
      if (value.edges.length > 1) {
        value.edges = value.flows.map(flowTo => ({from: value.id, to: flowTo} as Edge));
      }
    }
  }

  /***
   * Computes the dropout algorithm
   *
   * @param callFlow True Graph
   * @param declinedNodes node types to remove from the Graph
   * @private
   */
  private dropout(callFlow: CallFlow, declinedNodes: string[]) {

    /**
     * Get all nodes
     */
    const nodes = Array.from(callFlow.nodeMap.values());

    /**
     * Get all nodes which will be removed
     */
    const nodesToRemove = this.getDeclinedNodes(callFlow, declinedNodes);

    /**
     * Loop until no nodes are left to remove
     */
    while (nodesToRemove.length > 0) {
      /**
       * Remove node from the Stack
       */
      const declinedNode = nodesToRemove.pop()!;

      nodes
        /**
         * Filter all nodes who is a left neighbor (also know as the input of the current node) of the declined node
         */
        .filter(node => node.flows.includes(declinedNode.id))
        .map(leftNode => {
          /**
           * remove the connection with the declined node
           * glue all connection of the right neighbors (also know as the exits of the current node)
           * of the declined node to the left neighbor
           */
          this.glueFlowNeighbors(leftNode, declinedNode);

          /**
           * removing duplicate edges
           */
          leftNode.flows = Array.from(new Set<string>(leftNode.flows).values());

          leftNode.flowsList = leftNode.flowsList.filter(flow => leftNode.flows.includes(flow.to));

          /**
           * remove the edges with the declined node
           * glue all edges of the right neighbors (also know as the exits of the current node)
           * of the declined node to the left neighbor
           */
          this.glueEdgeNeighbors(leftNode, declinedNode);

          /**
           * return new state of the left neighbor
           */
          return leftNode;
        })
        /**
         * Update the left neighbor with his new state of connections
         */
        .forEach(newLeftNeighbor =>
          callFlow.nodeMap
            .set(newLeftNeighbor.id, newLeftNeighbor)
        );

      /**
       * remove the declined node
       */
      callFlow.nodeMap.delete(declinedNode.id);
    }

    /**
     * A deeper check, needs to be execute 1 or 0 time
     */
    const deeperCheck = this.getDeclinedNodes(callFlow, declinedNodes);

    if (deeperCheck.length > 0) {
      this.dropout(callFlow, declinedNodes);
    }
  }

  /**
   * Computes the flow neighbors
   * @param leftNode left node
   * @param declinedNode declined node
   * @private
   */
  private glueFlowNeighbors(leftNode: NodeHolder, declinedNode: NodeHolder) {
    // remove the connection with the declined node
    leftNode.flows = leftNode.flows.filter(rightNodeId => rightNodeId !== declinedNode.id);
    // glue all connection of the right neighbors of the declined node to the left neighbor
    declinedNode.flows = declinedNode.flows.filter(unary => unary !== declinedNode.id);
    // adding connections from right to left
    declinedNode.flows.forEach(deeperRight => {
      // dont push if connection already exist
      if(!leftNode.flows.includes(deeperRight)){
        leftNode.flows.push(deeperRight);
      }
    });

    // doing stuff for flows list, can be removed without any further effect
    leftNode.flowsList = leftNode.flowsList.filter(rightNodeId => rightNodeId.to !== declinedNode.id);
    declinedNode.flowsList = declinedNode.flowsList.filter(unary => unary.to !== declinedNode.id);
    // adding connections from right to left
    declinedNode.flowsList.forEach(deeperRight => {
      // dont push if connection already exist
      if(!leftNode.flowsList.includes(deeperRight)){
        leftNode.flowsList.push(deeperRight);
      }
    });
  }

  /**
   * Computes the edge neighbors
   * @param leftNode left node
   * @param declinedNode declined node
   * @private
   */
  private glueEdgeNeighbors(leftNode: NodeHolder, declinedNode: NodeHolder){
    // remove the edges with the declined node
    leftNode.edges = leftNode.edges.filter(rightNodeId => rightNodeId.to !== declinedNode.id);
    // glue all edges of the right neighbors of the declined node to the left neighbor
    declinedNode.edges = declinedNode.edges.filter(unary => unary.to !== declinedNode.id);
    // adding connections from right to left
    declinedNode.edges.forEach(deeperRight => {
      const index = leftNode.edges.findIndex((edge) => edge.to === deeperRight.to);
      // dont push if connection already exist
      if(index < 0){
        leftNode.edges.push({from: leftNode.id, to: deeperRight.to});
      }
    });
  }

  /**
   * Get all declined node
   * @param callFlow True Graph
   * @param declinedNodes a set of declined node type
   * @private
   *
   * return a set of Nodes to decline
   */
  private getDeclinedNodes(callFlow: CallFlow, declinedNodes: string[]): NodeHolder[] {
    return Array.from(callFlow.nodeMap.values())
      .filter(node => declinedNodes.includes(node.nodeType));
  }
}
