import {css, customElement, html, LitElement, TemplateResult, state} from "lit-element";
import {CSSResult} from "lit-element/lib/css-tag";
import * as _ from "lodash";
import {CallFlowConfigList} from '../callflow-config-list/CallFlowConfigList'
import {getAllDroppable, getNodeTypeTemplate} from "../../model/NodeEnum";
import {FONT_12} from "../../presets/stylepresets";
import {DummyCallFlowConfig} from "../../model/DummyCallFlowConfig";
import {ContactingCallFlowService} from "../../service/ContactingCallFlowService";
import {CallFlowService} from "../../service/CallFlowService";
import {LoadingService} from "../../service/LoadingService";
import {ViewModeEnum} from "../../model/ViewModeEnum";


type ScopedElements = Record<string, unknown>;

@customElement('top-bar')
export class TopBar extends LitElement {

  @state()
  chosenCallFlowConfig?: DummyCallFlowConfig;

  @state()
  chosenViewType?: ViewModeEnum;

  static get scopedElements(): ScopedElements {
    return {
      'callflow-config-list': CallFlowConfigList
    };
  }

  static get styles(): CSSResult {
    // language=CSS
    return css`
      .navbar {
        background-color: white;
        padding-top: 10px;
        padding-left: 100px;
      }

      callflow-config-list{
        z-index: 2;
      }

      .play-btn {
        border: none;
        outline: none;
        padding: 5px;
        font-family: inherit;
        margin: 0;
      }

      .inline-flex {
        display: inline-flex;
      }

      .view-container {
        display: block;
        padding: 14px 16px;
        font-family: inherit;
        margin: 0;
      }

      .view-container label {
        font-size: ${FONT_12};
      }
    `
  }

  async connectedCallback(): Promise<void> {
    super.connectedCallback();
    this.subscribeChosenCallFlowConfig();
  }

  render(): TemplateResult {
    const disable = this.chosenCallFlowConfig === undefined ? 'none' : 'unset';
    const opacity = this.chosenCallFlowConfig === undefined ? .4 : 1;
    return html`
      <div class="navbar">
        <div>
          <div class="inline-flex">
            <callflow-config-list></callflow-config-list>
          </div>
          <div class="inline-flex">
            <div class="view-container">
              <div>
                <input type="radio" id="DEV" name="viewType" value="${ViewModeEnum.DEV}" @click="${(e:any) => this.viewTypeListener(e)}" checked>
                <label for="DEV">${ViewModeEnum.DEV}</label>
              </div>
              <div>
                <input type="radio" id="CJE" name="viewType" value="${ViewModeEnum.CJE}" @click="${(e:any) => this.viewTypeListener(e)}">
                <label for="CJE">${ViewModeEnum.CJE}</label>
              </div>
            </div>
          </div>
          <div class="inline-flex" style="pointer-events:${disable}; opacity: ${opacity};">
            <button class="play-btn" font14 @click="${() => this.runButtonListener()}">RUN</button>
          </div>
          <div class="inline-flex" style="pointer-events:${disable}; opacity: ${opacity};">
            <button class="play-btn" font14 @click="${() => this.clearButtonListener()}">CLEAR</button>
          </div>
        </div>
      </div>
    `;
  }

  subscribeChosenCallFlowConfig() {
    ContactingCallFlowService.getChosenCallFlowVersion().subscribe(
      callFlowConfig => this.chosenCallFlowConfig = callFlowConfig);
  }

  private viewTypeListener(e: any) {
    this.chosenViewType = (e.target as HTMLInputElement).value as ViewModeEnum;
  }

  private async runButtonListener() {

    if (!this.chosenViewType) {
      // View Type is DEV on default
      this.chosenViewType = ViewModeEnum.DEV;
    }

    /***
     * Here we are saving the chosen template and also give the power to the user to be able to choose a node type
     which is not in the template. E.G. a CJE chooses data node type
     */
    const template = getNodeTypeTemplate(this.chosenViewType);
    const dropOutList = _.difference(getAllDroppable(), template);

    // When the callFlow is already chosen then skip doing request
    LoadingService.toggleLoading();
    LoadingService.startClearNetworkGraph();

    /***
     * Here we fetch the selected CallFlow and pass it to the CallFlowService so it can be subscribed
     * by all subscribers
     */
    const callFlow = await ContactingCallFlowService.getCallFlow(this.chosenCallFlowConfig?.name!, this.chosenCallFlowConfig?.version!);

    callFlow.viewMode = this.chosenViewType == ViewModeEnum.CJE ? ViewModeEnum.DEACTIVATE : this.chosenViewType;
    callFlow.dropOutList = dropOutList;
    await CallFlowService.setCallFlow(callFlow);
  }

  private clearButtonListener() {
    LoadingService.startClearNetworkGraph();
    this.chosenCallFlowConfig = undefined;
  }

}
