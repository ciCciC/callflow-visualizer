import {css, customElement, html, LitElement, TemplateResult, state} from "lit-element";
import {CSSResult} from "lit-element/lib/css-tag";
import {SideBarService} from "../../service/SideBarService";
import {NodeInfoView} from "../node-info-view/NodeInfoView";
import {NodeHolderService} from "../../service/NodeHolderService";
import {NodeHolder} from "../../model/NodeHolder";
import {IconMap} from "../../icon/IconMap";
import {SubTreeGraph} from "../subtree-graph/SubTreeGraph";
import {BORDER_RADIUS, FONT_14, LIGHT_GRAY, WHITE} from "../../presets/stylepresets";

type ScopedElements = Record<string, unknown>;

@customElement('left-side-bar')
export class LeftSideBar extends LitElement {

  @state()
  toggle?: boolean;

  @state()
  nodeHolder?: NodeHolder;

  @state()
  neighbors?: NodeHolder [];

  static get scopedElements(): ScopedElements {
    return {
      'node-info-view': NodeInfoView,
      'subtree-graph': SubTreeGraph
    };
  }

  static get styles(): CSSResult {
    // language=CSS
    return css`
      .sidenav {
        border-radius: 0 ${BORDER_RADIUS} ${BORDER_RADIUS} 0;
        position: fixed;
        overflow-y: overlay;
        height: 100%;
        width: 0;
        z-index: 10;
        top: 0;
        left: 0;
        background-color: ${WHITE};
        transition: width 0.1s;
        padding-top: 60px;
        box-shadow: -8px 7px 20px 0;
      }

      .sidenav .close-btn {
        position: absolute;
        top: 10px;
        right: 25px;
        margin-left: 50px;
        font-size:30px;
        cursor:pointer;
      }

      .sidenav .close-btn:hover {
        color: #585858;
        text-shadow: 0 0 1px;
      }

      .sidenav::-webkit-scrollbar {
        width: 10px;
      }

      .sidenav::-webkit-scrollbar-thumb {
        background: ${LIGHT_GRAY};
        border-radius: 10px;
      }

      .sidenav::-webkit-scrollbar-track-piece:start {
        background: transparent;
      }

      .sidenav::-webkit-scrollbar-track-piece:end {
        background: transparent;
      }

      .nodeIcon {
        width: 48px;
        height: 48px;
      }

      .display-flex {
        display: flex;
      }

      .title {
        padding-right: 10px;
      }

      .subtitle {
        display: grid;
        font-size: ${FONT_14};
        padding-top: 5px;
      }

      .direction-right{
        direction: rtl;
      }

      @media screen and (max-height: 450px) {
        .sidenav {
          padding-top: 15px;
        }

        .sidenav a {
          font-size: ${FONT_14};
        }
      }

    `;
  }

  async connectedCallback(): Promise<void> {
    super.connectedCallback();

    this.subscribeLeftBarStatus();
    this.subscribeNodeHolder();
  }

  render(): TemplateResult {
    const width = this.toggle ? "40%" : "0px";
    const padding = this.toggle ? "25px" : "0px";
    return html`
      <div class="sidenav" id="leftBar" style="width: ${width}; padding-left: ${padding}; padding-right: ${padding}">
        <span class="close-btn" @click="${() => this.closeSideBarListener()}">&times;</span>
        <div class="display-flex direction-right">
          <ing-icon class="nodeIcon" style="fill: ${this.nodeHolder?.color}" .svg="${IconMap.getIcon(this.nodeHolder?.nodeType)}"></ing-icon>
          <div class="title">
            ${this.nodeHolder?.nodeType}
            <div class="subtitle">
              <label>${this.nodeHolder?.name}</label>
              <label>${this.nodeHolder?.id}</label>
            </div>
          </div>
        </div>
        <hr>
        <br>
        ${this.nodeHolder ? html`<node-info-view .nodeHolder="${this.nodeHolder}" .neighbors="${this.neighbors}"></node-info-view>` : ''}
        <br>
        ${this.nodeHolder ? html`<subtree-graph .nodeHolder="${this.nodeHolder}" .neighbors="${this.neighbors}"></subtree-graph>` : ''}
      </div>
    `;
  }

  subscribeLeftBarStatus() {
    SideBarService.getLeftBarStatus().subscribe(state => {
      this.toggle = state;
      this.requestUpdate();
    })
  }

  subscribeNodeHolder() {
    NodeHolderService.getSelectedNodeHolder().subscribe((node: NodeHolder | undefined) =>
    {
      this.nodeHolder = node;
      this.neighbors = NodeHolderService.getNeighbors(node?.flows);
      this.requestUpdate();
    });
  }

  private closeSideBarListener() {
    SideBarService.toggleLeftBar();
    NodeHolderService.resetNodeHolderSelection();
  }

}
