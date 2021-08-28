import {TemplateResult, html} from "lit-element";
import {JsonUtil} from "../util/JsonUtil";
import {BaseTask} from "./BaseTask";

export class TaskAttrsStoreTask extends BaseTask {

  private taskAttributes: Map<string, any>;

  build(taskBody: any): BaseTask {
    super.build(taskBody);
    this.taskAttributes = JsonUtil.jsonToMap(this.inputParams.get('task_attrs'));
    return this;
  }

  render(): TemplateResult {
    return html`
      <div>
        ${this.taskAttributes.size > 0 ? html`${this.taskAttrsUi()}` : ''}
        ${super.render()}
      </div>
    `
  }

  private taskAttrsUi(): TemplateResult {
    return html`
      <button class="collapsible">Task attributes</button>
      <div class="content">
      <table>
        <tr>
          <th>Variable</th>
          <th>Value</th>
        </tr>
        ${Array.from(this.taskAttributes.keys()).map(key => html`
          <tr>
            <td>${key}</td>
            <td>${this.taskAttributes.get(key)}</td>
          </tr>
        `)}
      </table>
      </div>
    `
  }

}
