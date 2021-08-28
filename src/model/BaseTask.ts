import {TemplateResult, html} from "lit-element";
import {JsonUtil} from "../util/JsonUtil";
import {BaseRender} from "./BaseRender";
import {Message} from "./Message";

export class BaseTask implements BaseRender{
  protected inputParams: Map<string, any>;
  protected result: Map<string, any>;
  protected messages: Message[];
  protected statistics: Map<string, any>;
  protected preActions: [];
  protected postActions: [];

  render(): TemplateResult {
    return html`
        ${this.messages.length > 0 ? html`${this.msgUi()}` : ''}
        ${this.result.size > 0 ? html`${this.resultUi()}` : ''}
        ${this.statistics.size > 0 ? html`${this.statisticsUi()}` : ''}
        ${this.preActions.length > 0 ? html`${this.preActionsUi()}` : ''}
        ${this.postActions.length > 0 ? html`${this.postActionsUi()}` : ''}
    `
  }

  build(taskBody: any): BaseTask {
    this.inputParams = JsonUtil.jsonToMap(taskBody['input_params']);
    this.statistics = JsonUtil.jsonToMap(taskBody['statistics']);
    this.messages = this.inputParams.has('messages') ? this.inputParams.get('messages').map((msg: any) => ({msgKey: msg['msg_key'], language: msg['language'], msgText: msg['msg_text']} as Message)) : [];
    if(this.inputParams.has('messages')){
      this.inputParams.delete('messages')
    }
    this.result = JsonUtil.jsonToMap(taskBody['result']);
    this.preActions = JsonUtil.initArrayWhenUndefined(taskBody['pre_actions']);
    this.postActions = JsonUtil.initArrayWhenUndefined(taskBody['post_actions']);
    return this;
  }

  protected msgUi(): TemplateResult {
    return html`
      <button class="collapsible">Messages</button>
      <div class="content">
        <table>
          <tr>
            <th>Audio key</th>
            <th>Text</th>
          </tr>
          ${this.messages.map(msg => html`
            <tr>
              <td>${msg.msgKey}</td>
              <td>${msg.msgText}</td>
            </tr>
          `)}
        </table>
      </div>
    `
  }

  protected resultUi(): TemplateResult {
    return html`
      <button class="collapsible">Session variables</button>
      <div class="content">
      <table>
        <tr>
          <th>Variable</th>
          <th>Value</th>
        </tr>
        ${Array.from(this.result.keys()).map(key => html`
            ${this.result.get(key).map((value:any) =>
    html`<tr>
      <td>${key}</td>
      <td>${value}</td>
    </tr>
              `)}
        `)}
      </table>
      </div>
    `
  }

  protected statisticsUi(): TemplateResult {
    return html`
      <button class="collapsible">Data lake</button>
      <div class="content">
      <table>
        <tr>
          <th>Variable</th>
          <th>Value</th>
        </tr>
        ${Array.from(this.statistics.keys()).map(key => html`
          <tr>
            <td>${key}</td>
            <td>${this.statistics.get(key)}</td>
          </tr>
        `)}
      </table>
      </div>
    `
  }

  protected postActionsUi(): TemplateResult {
    return html`
      <button class="collapsible">Post actions</button>
      <div class="content">
        ${this.postActions.map(postAction => html`<p>${postAction}</p>`)}
      </div>
    `
  }

  protected preActionsUi(): TemplateResult {
    return html`
      <button class="collapsible">Pre actions</button>
      <div class="content">
        ${this.preActions.map(preAction => html`<p>${preAction}</p>`)}
      </div>
    `
  }
}
