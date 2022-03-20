/***
 * Here we keep the different node types. When there is a new node type then please update the enum
 */
export enum NodeEnum {
  ROOT = 'ROOT',
  DATA = 'DATA',
  HANGUP = 'HANGUP',
  MSG_PLAY = 'MSG_PLAY',
  API_CALL = 'API_CALL',
  TASK_STORE = 'TASK_STORE',
  TASK = 'TASK',
  TASK_ADV = 'TASK_ADV',
  TASK_UPDATE = 'TASK_UPDATE',
  GATHER = 'GATHER',
  API_FLOW_CALL = 'API_FLOW_CALL',
  SPEECH_MODEL = 'SPEECH_MODEL',
  REDIRECT_FLOW = 'REDIRECT_FLOW',
  PROCLAMATION = 'PROCLAMATION',
  REDIRECT_CALL = 'REDIRECT_CALL',
  ACCESS_T = 'ACCESS_T',
  OTP = 'OTP',
  CJE = 'CJE',
  DEV = 'DEV'
}

/***
 * Here we define, when using dropout function, the view types. So, which node types are visible for which discipline.
 * @param template set of node types
 */
export function getNodeTypeTemplate(template: string | undefined): any {
  switch (template) {
    case NodeEnum.CJE: return [NodeEnum.ROOT, NodeEnum.TASK, NodeEnum.TASK_ADV, NodeEnum.TASK_UPDATE,
      NodeEnum.HANGUP, NodeEnum.GATHER, NodeEnum.MSG_PLAY, NodeEnum.SPEECH_MODEL,
      NodeEnum.REDIRECT_FLOW, NodeEnum.PROCLAMATION, NodeEnum.REDIRECT_CALL];
    case NodeEnum.DEV: return Object.keys(NodeEnum).filter(nodeType => nodeType !== NodeEnum.DEV && nodeType !== NodeEnum.CJE);
  }
}

export function notDroppableNodeTypeList(): string [] {
  return [NodeEnum.ROOT, NodeEnum.TASK, NodeEnum.HANGUP, NodeEnum.REDIRECT_FLOW, NodeEnum.REDIRECT_CALL]
}

export function getAllDroppable(): string [] {
  // @ts-ignore
  return Object.keys(NodeEnum).filter(nodeType => nodeType !== NodeEnum.CJE && nodeType !== NodeEnum.DEV && !notDroppableNodeTypeList().includes(nodeType));
}
