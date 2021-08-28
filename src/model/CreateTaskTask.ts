import {TemplateResult, html} from "lit-element";
import {JsonUtil} from "../util/JsonUtil";
import {BaseTask} from "./BaseTask";

export class CreateTaskTask extends BaseTask {

  private priority?: any;
  private routingAttr: Map<string, any>;
  private taskAttr: Map<string, any>;
  private waitUrlKeys?: [];
  private timeOut?: any;

  public build(taskBody: any): CreateTaskTask {
    super.build(taskBody);
    this.priority = this.inputParams.get('priority');
    this.routingAttr = JsonUtil.jsonToMap(this.inputParams.get('routing_attrs'));
    this.taskAttr = JsonUtil.jsonToMap(this.inputParams.get('task_attrs'));
    this.waitUrlKeys = this.inputParams.get('wait_url_keys');
    this.timeOut = this.inputParams.has('timeout') ? this.inputParams.get('timeout') : this.inputParams.get('task_ttl_seconds');
    return this;
  }

  render(): TemplateResult {
    return html`
      <div>
        ${this.routingUi()}
        ${this.taskUi()}
        ${this.standardUi()}
        ${super.render()}
      </div>
    `
  }

  private standardUi(): TemplateResult {
    return html`
      <button class="collapsible">Standard attributes</button>
      <div class="content">
      <table>
        <tr>
          <th>Attribute</th>
          <th>Value</th>
        </tr>
        ${this.priority ? html`<tr>
          <td>priority</td>
          <td>${this.priority}</td>
        </tr>`:''}
        ${this.waitUrlKeys ? html`<tr>
          <td>wait url keys</td>
          <td>${JSON.stringify(this.waitUrlKeys)}</td>
        </tr>` : ''}
        ${this.timeOut ? html`<tr>
          <td>timeout</td>
          <td>${this.timeOut}</td>
        </tr>`:''}
      </table>
      </div>
    `
  }

  private routingUi(): TemplateResult {
    return html`
      <button class="collapsible">Routing attributes</button>
      <div class="content">
      <table>
        <tr>
          <th>Attribute</th>
          <th>Value</th>
        </tr>
        ${Array.from(this.routingAttr.keys()).map(key => html`
          <tr>
            <td>${key}</td>
            <td>${this.routingAttr.get(key)}</td>
          </tr>
        `)}
      </table>
      </div>
    `
  }

  private taskUi(): TemplateResult {
    return html`
      <button class="collapsible">Task attributes</button>
      <div class="content">
      <table>
        <tr>
          <th>Attribute</th>
          <th>Value</th>
        </tr>
        ${Array.from(this.taskAttr.keys()).map(key => html`
          <tr>
            <td>${key}</td>
            <td>${this.taskAttr.get(key)}</td>
          </tr>
        `)}
      </table>
      </div>
    `
  }

}
