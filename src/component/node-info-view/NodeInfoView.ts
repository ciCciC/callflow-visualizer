import {css, customElement, html, LitElement, TemplateResult, property} from "lit-element";
import {queryAll, state} from 'lit-element/lib/decorators.js';
import {CSSResult} from "lit-element/lib/css-tag";
import {NodeHolder} from "../../model/NodeHolder";
import {NodeEnum} from "../../model/NodeEnum";
import {BaseRender} from "../../model/BaseRender";
import {TaskAttrsStoreTask} from "../../model/TaskAttrsStoreTask";
import {CreateTaskTask} from "../../model/CreateTaskTask";
import {DefaultTask} from "../../model/DefaultTask";
import {FONT_14, PURPLE, WHITE} from "../../presets/stylepresets";

@customElement('node-info-view')
export class NodeInfoView extends LitElement {

  @queryAll('.collapsible')
  _collapsesList!: NodeListOf<Element>;

  @state()
  nodeRenderer!: BaseRender;

  @property({type: Object})
  neighbors: NodeHolder [];

  @property({type: Object})
  nodeHolder: NodeHolder;

  static get styles(): CSSResult {
    // language=CSS
    return css`
      .collapsible {
        background-color: ${WHITE};
        color: ${PURPLE};
        cursor: pointer;
        padding: 10px;
        width: 100%;
        border-color: transparent;
        border-style: solid;
        text-align: left;
        outline: none;
        font-size: 15px;
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
      }

      .active, .collapsible:hover {
        background-color: ${PURPLE};
        color: ${WHITE};
      }

      .active, .collapsible:hover:after {
        color: ${WHITE};
      }

      .collapsible:after {
        content: '\\002B';
        color: ${PURPLE};
        font-weight: bold;
        float: right;
        margin-left: 5px;
      }

      .active:after {
        content: "\\2212";
      }

      .content {
        font-size: ${FONT_14};
        width: 100%;
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.2s ease-out;
        background-color: ${WHITE};
      }

      table {
        font-family: arial, sans-serif;
        border-collapse: collapse;
        width: 100%;
      }

      td, th {
        border: 1px solid #eaeaea;
        text-align: left;
        padding: 8px;
      }

      tr:nth-child(even) {
        background-color: ${WHITE};
      }

      .content td:nth-child(2){
        word-break: break-word;
      }
    `
  }

  async connectedCallback(): Promise<void> {
    super.connectedCallback();
  }

  render(): TemplateResult {
    this.initTask();
    return html`
    ${this.compute_metrics()}
    ${this.nodeRenderer.render(this.checkForExtraInfo())}
    ${this.nodeHolder.flowsList.length > 0 ? html`${this.flowToWhenUi()}` : ''}
    `;
  }

  firstUpdated() {
    this.initListener();
  }

  /***
   * Decides which Task to render, most Tasks are equal therefore we have DefaultTask
   * @private
   */
  private initTask() {
    switch (this.nodeHolder.nodeType) {
      case NodeEnum.TASK_STORE: this.nodeRenderer = this.nodeHolder.task as TaskAttrsStoreTask; break;
      case NodeEnum.TASK: this.nodeRenderer = this.nodeHolder.task as CreateTaskTask; break;
      case NodeEnum.TASK_ADV: this.nodeRenderer = this.nodeHolder.task as CreateTaskTask; break;
      default: this.nodeRenderer = this.nodeHolder.task as DefaultTask; break;
    }
  }

  private compute_metrics(): TemplateResult {
    const k_elements = Object.entries(this.nodeHolder.metrics!).map((k) =>
      html`
          <th>${k[0]}</th>
    `);

    const v_elements = Object.entries(this.nodeHolder.metrics!).map((k) =>
      html`
          <td>${k[1]}</td>
    `);

    return html`
      <table>
        <tr>
          ${k_elements}
        </tr>
        <tr>
          ${v_elements}
        </tr>
      </table>
    `;
  }

  /***
   * This renders the all When -> To node relations in a table
   * @private
   */
  private flowToWhenUi(): TemplateResult {
    return html`
      <button class="collapsible">Flows</button>
      <div class="content">
        <table>
          <tr>
            <th>When</th>
            <th>To node</th>
          </tr>
          ${this.nodeHolder.flowsList.map(flow => html`
          <tr>
            <td>${flow.label.length > 0 ? `${flow.label}: ${flow.value}` : `${flow.value}`}</td>
            <td>${this.neighbors.find((neighbor: NodeHolder) => neighbor.id === flow.to)?.name}</td>
          </tr>
        `)}
        </table>
      </div>
    `
  }

  /***
   * This gives the possibility to show also the max retries, timeout and fallback in the configuration collapse
   * @private
   */
  private checkForExtraInfo(): Map<string, string> | undefined {
    const extraInfo = new Map<string, string>();
    if(this.nodeHolder.maxRetries != 0){
      extraInfo.set('max retries', `${this.nodeHolder.maxRetries}`);
    }

    if(this.nodeHolder.maxRetryNodeId){
      extraInfo.set('max retries node', this.neighbors.find(node => node.id == this.nodeHolder.maxRetryNodeId)!.name);
    }

    if(this.nodeHolder.timeoutNodeId){
      extraInfo.set('timeout node', this.neighbors.find(node => node.id == this.nodeHolder.timeoutNodeId)!.name);
    }

    if(this.nodeHolder.fallbackNodeId){
      extraInfo.set('fallback node', this.neighbors.find(node => node.id == this.nodeHolder.fallbackNodeId)!.name);
    }

    return extraInfo.size > 0 ? extraInfo : undefined
  }

  private initListener() {
    this._collapsesList.forEach(element => {
      element.addEventListener("click", function (this: NodeInfoView) {
        this.classList.toggle("active");
        const content = (this.nextElementSibling as HTMLElement)!;
        content.style.maxHeight = content.style.maxHeight ? '' : content.scrollHeight.toString() + "px";
      });
    });
  }

}
