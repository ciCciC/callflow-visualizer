import { Observable } from 'rxjs';
import {LitElement, customElement, CSSResult, css, html, TemplateResult, state} from "lit-element";
import {LeftSideBar} from '../left-side-bar/LeftSideBar';
import {TopBar} from '../top-bar/TopBar';
import {SideBarService} from "../../service/SideBarService";
import {NetworkGraph} from "../network-graph/NetworkGraph";
import {PURPLE} from "../../presets/stylepresets";
import {LoadingService} from "../../service/LoadingService";

type ScopedElements = Record<string, unknown>;

@customElement('ing-orange-twilio-callflow-visualizer')
export class IngOrangeTwilioCallFlowVisualizer extends LitElement {

  @state()
  loading: boolean;

  static get scopedElements(): ScopedElements {
    return {
      'left-side-bar': LeftSideBar,
      'top-bar': TopBar,
      'network-graph': NetworkGraph
    };
  }

  static get styles(): CSSResult {
    // language=CSS
    return css`
      body {
        display: flex;
        height: 100vh;
      }

      .loader {
        position: absolute;
        z-index: 10;
        top: calc(50% - 120px);
        left: 50%;
        border: 16px solid #f3f3f3;
        border-radius: 50%;
        border-top: 16px solid ${PURPLE};
        width: 120px;
        height: 120px;
        -webkit-animation: spin 2s linear infinite; /* Safari */
        animation: spin 2s linear infinite;
      }

      /* Safari */
      @-webkit-keyframes spin {
        0% { -webkit-transform: rotate(0deg); }
        100% { -webkit-transform: rotate(360deg); }
      }

      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
  }

  async connectedCallback(): Promise<void> {
    super.connectedCallback();

    this.subscribeLoading();
    this.subscribeLeftBarStatus();
  }

  render(): TemplateResult {
    return html`
      <left-side-bar></left-side-bar>
      <top-bar></top-bar>
      <div>
        ${this.loading ? html`<div class="loader"></div>` : ''}
        <network-graph></network-graph>
      </div>
    `;
  }

  subscribeLeftBarStatus() {
    this.getLeftBarStatus().subscribe(() => {
      this.requestUpdate();
    })
  }

  getLeftBarStatus(): Observable<boolean> {
    return SideBarService.getLeftBarStatus();
  }

  private subscribeLoading(){
    LoadingService.getLoadingStatus().subscribe(status => this.loading = status);
  }

}
