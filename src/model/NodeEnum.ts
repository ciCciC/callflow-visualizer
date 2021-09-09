/***
 * Here we keep the different node types. When there is a new node type then please update the enum
 */
export enum NodeEnum {
  ROOT = 'ROOT',
  DATA = 'DATA',
  HANGUP = 'HANGUP',
  MESSAGE = 'MESSAGE', // MSG_PLAY
  API = 'API',
  TASK_ATTRS_STORE = 'TASK_ATTRS_STORE', // STORE
  CREATE_TASK = 'CREATE_TASK', // TASK
  CREATE_CONTACTING_TASK = 'CREATE_CONTACTING_TASK', // TASK_LOWER
  UPDATE_CONTACTING_TASK = 'UPDATE_CONTACTING_TASK', // TASK_UPDATE
  GATHER = 'GATHER',
  SECURE_COLLECT = 'SECURE_COLLECT', // GATHER_SECURE //
  CONTACTING_API = 'CONTACTING_API', // API_CALL //
  GATHER_SPEECH = 'GATHER_SPEECH', // SPEECH_MODEL
  REDIRECT = 'REDIRECT', // REDIRECT_FLOW
  ANNOUNCEMENT = 'ANNOUNCEMENT', // PROCLAMATION
  FORWARD = 'FORWARD', // REDIRECT_CALL
  TATA_RAT = 'TATA_RAT', // ACCESS_T
  TATA_CTO = 'TATA_CTO', // OTP
  CJE = 'CJE', // <- a view type
  DEV = 'DEV' // <- a view type
}

/***
 * Here we define, when using dropout function, the view types. So, which node types are visible for which discipline.
 * @param template set of node types
 */
export function getNodeTypeTemplate(template: string | undefined): any {
  switch (template) {
    case NodeEnum.CJE: return [NodeEnum.ROOT, NodeEnum.CREATE_TASK, NodeEnum.CREATE_CONTACTING_TASK, NodeEnum.UPDATE_CONTACTING_TASK,
      NodeEnum.OUTBOUND_CALL, NodeEnum.HANGUP, NodeEnum.GATHER, NodeEnum.SECURE_COLLECT, NodeEnum.MESSAGE, NodeEnum.GATHER_SPEECH,
      NodeEnum.GATHER_ALL, NodeEnum.REDIRECT, NodeEnum.WAIT_REDIRECT, NodeEnum.ANNOUNCEMENT, NodeEnum.FORWARD];
    case NodeEnum.DEV: return Object.keys(NodeEnum).filter(nodeType => nodeType !== NodeEnum.DEV && nodeType !== NodeEnum.CJE);
  }
}

export function notDroppableNodeTypeList(): string [] {
  return [NodeEnum.ROOT, NodeEnum.CREATE_TASK, NodeEnum.HANGUP, NodeEnum.REDIRECT, NodeEnum.FORWARD, NodeEnum.OUTBOUND_CALL, NodeEnum.WAIT_REDIRECT]
}

export function getAllDroppable(): string [] {
  // @ts-ignore
  return Object.keys(NodeEnum).filter(nodeType => nodeType !== NodeEnum.CJE && nodeType !== NodeEnum.DEV && !notDroppableNodeTypeList().includes(nodeType));
}
