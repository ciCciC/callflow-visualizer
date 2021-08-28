import {NodeEnum} from './NodeEnum';

/***
 * Here we keep the color mapping for each node including his edges.
 * If a new node type is been added please give it a new color or use a existing color. Eg task nodes are mostly the
 * same so all task node types get the color green.
 */
export class NodeColorMap {

  static getColor(nodeType: NodeEnum | string): any {
    switch (nodeType) {
      case NodeEnum.DATA: return '#bd5308';  // brown
      case NodeEnum.HANGUP: return '#ff0505';  // red
      case NodeEnum.MESSAGE: return '#05e6ff';  // light blue
      case NodeEnum.API: return '#035afc';  // blue
      case NodeEnum.TASK_ATTRS_STORE: return '#b503fc';  // purple
      case NodeEnum.CREATE_TASK: return '#00b600';  // green
      case NodeEnum.CREATE_CONTACTING_TASK: return '#00b600';  // green
      case NodeEnum.UPDATE_CONTACTING_TASK: return '#00b600';  // green
      case NodeEnum.GATHER: return '#fc9d03'; // orange
      case NodeEnum.SECURE_COLLECT: return '#fc9d03'; // orange
      case NodeEnum.ROOT: return '#000000';  // black
      case NodeEnum.CONTACTING_API: return '#035afc';  // blue
      case NodeEnum.GATHER_SPEECH: return '#ff14fb';  // pink
      case NodeEnum.GATHER_ALL: return '#ff14fb';  // pink
      case NodeEnum.REDIRECT: return '#00b600';  // green
      case NodeEnum.WAIT_REDIRECT: return '#00b600';  // green
      case NodeEnum.OUTBOUND_CALL: return '#00b600';  // green
      case NodeEnum.ANNOUNCEMENT: return '#07a6b8';  // light blue
      case NodeEnum.FORWARD: return '#00b600';  // green
      case NodeEnum.TATA_RAT: return '#fc038c';  // dark pink
      case NodeEnum.TATA_CTO: return '#fc038c';  // dark pink
      default: return '#808080'; // default color eg when node is unknown
    }
  }

}
