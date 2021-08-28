import {TemplateResult, html} from "lit-element";
import {BaseTask} from "./BaseTask";

export class DefaultTask extends BaseTask {

  public build(taskBody: any): DefaultTask {
    super.build(taskBody);
    return this;
  }

  render(extraInfo?: Map<string, string>): TemplateResult {
    if(extraInfo){
      extraInfo.forEach((k, v, ) => this.inputParams.set(v, k));
    }
    return html`
      <div>
        ${this.inputParams.size > 0 ? html`${this.inputParamsUi()}`:''}
        ${super.render()}
      </div>
    `
  }

  private inputParamsUi(): TemplateResult {
    return html`
      <button class="collapsible">Configuration</button>
      <div class="content">
      <table>
        <tr>
          <th>Variable</th>
          <th>Value</th>
        </tr>
        ${Array.from(this.inputParams.keys()).map(key => html`
          <tr>
            <td>${key}</td>
            <td>${JSON.stringify(this.inputParams.get(key))}</td>
          </tr>
        `)}
      </table>
      </div>
    `
  }

}
