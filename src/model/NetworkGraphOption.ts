/***
 * Here we config some props for a network graph
 */
export class NetworkGraphOption {

  /***
   * Options for the CallFlow graph and Customer Journey graph
   */
  static getDefaultOptions(): any {
    // import {Options} from 'vis-network/declarations/network/Network';
    return {
      autoResize: true,
      interaction: {
        hover: true,
      },
      nodes: {
        font: {
          strokeWidth: 0
        },
        shape: 'box',
        scaling: {
          min: 10,
          max: 30,
        },
      },
      edges: {
        font: {
          strokeWidth: 0
        },
        smooth: true,
      },
      layout: {
        improvedLayout: true
      },
      physics: {
        enabled: true,
        stabilization: {
          enabled: true,
          iterations: 5000
        },
        solver: 'forceAtlas2Based'
      }
    };
  }

  /***
   * Options for the sub graph show in the left side bar
   */
  static getSubGraphOptions(): any {
    // import {Options} from 'vis-network/declarations/network/Network';
    return {
      autoResize: true,
      interaction: {
        hover: true,
      },
      nodes: {
        font: {
          strokeWidth: 0
        },
        shape: 'box',
        scaling: {
          min: 10,
          max: 30,
        },
      },
      layout: {
        hierarchical: {
          direction: 'LR',
          sortMethod: 'directed',
          shakeTowards: 'roots',
        },
      },
      edges: {
        smooth: true
      },
    };
  }
}
