import {BaseTask} from './BaseTask';
import {NodeEnum} from "./NodeEnum";
import {TaskAttrsStoreTask} from "./TaskAttrsStoreTask";
import {CreateTaskTask} from "./CreateTaskTask";
import {DefaultTask} from "./DefaultTask";

/***
 * Determines which task to provide to the node,,,, eg to render info of a node in the left side bar.
 * If you think that a new node type should have his own task then create a sub task and add it here.
 */
export class TaskFactory {

  static getTask(taskType: string): BaseTask {
    switch (taskType) {
      case NodeEnum.TASK_ATTRS_STORE: return new TaskAttrsStoreTask();
      case NodeEnum.CREATE_TASK: return new CreateTaskTask();
      case NodeEnum.CREATE_CONTACTING_TASK: return new CreateTaskTask();
      default: return new DefaultTask();
    }
  }
}
