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
      case NodeEnum.MSG_PLAY: return '#05e6ff';  // light blue
      case NodeEnum.API_CALL: return '#035afc';  // blue
      case NodeEnum.STORE: return '#b503fc';  // purple
      case NodeEnum.TASK: return '#00b600';  // green
      case NodeEnum.TASK_ADV: return '#00b600';  // green
      case NodeEnum.TASK_UPDATE: return '#00b600';  // green
      case NodeEnum.GATHER: return '#fc9d03'; // orange
      case NodeEnum.ROOT: return '#000000';  // black
      case NodeEnum.API_FLOW_CALL: return '#035afc';  // blue
      case NodeEnum.SPEECH_MODEL: return '#ff14fb';  // pink
      case NodeEnum.REDIRECT_FLOW: return '#00b600';  // green
      case NodeEnum.PROCLAMATION: return '#07a6b8';  // light blue
      case NodeEnum.REDIRECT_CALL: return '#00b600';  // green
      case NodeEnum.ACCESS_T: return '#fc038c';  // dark pink
      case NodeEnum.OTP: return '#fc038c';  // dark pink
      default: return '#808080'; // default color eg when node is unknown
    }
  }

}
