import {css, CSSResult, customElement, html, LitElement, TemplateResult, query, state} from "lit-element";
import {CallFlowConfig} from "../../model/CallFlowConfig";
import {ContactingCallFlowService} from "../../service/ContactingCallFlowService";
import {BORDER_RADIUS, FONT_12, LIGHT_GRAY, LIGHT_GREEN} from "../../presets/stylepresets";

@customElement('callflow-config-list')
export class CallFlowConfigList extends LitElement {

  @state()
  callFlowConfigs?: CallFlowConfig[];

  @state()
  callFlowConfig?: CallFlowConfig;

  @query('.dropdown-content')
  dropdownContentElement?: HTMLDivElement

  @query('.sub-dropdown-content')
  subDropdownContentElement?: HTMLDivElement

  @state()
  isSubDropdownOpen: boolean = false;

  @state()
  visitedSubDropdown: boolean = false;

  readonly shadowRoot!: ShadowRoot;

  async connectedCallback(): Promise<void> {
    super.connectedCallback();
    // fetches all callFlow configs
    this.callFlowConfigs = await this.fetchCallFlowConfigs();
    // sorts selectable callFlows from a-z
    this.callFlowConfigs?.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1);
  }

  static get styles(): CSSResult {
    // language=CSS
    return css`
      .dropdown {
        overflow: hidden;
        border-radius: ${BORDER_RADIUS};
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
      }

      .dropdown .dropbtn {
        font-size: ${FONT_12};
        border: none;
        outline: none;
        color: black;
        padding: 14px 16px;
        background-color: inherit;
        font-family: inherit;
        margin: 0;
      }

      .dropdown-content {
        display: none;
        position: absolute;
        background-color: white;
        min-width: 160px;
        max-height: 400px;
        overflow-y: overlay;
        direction: rtl;
        border-radius: ${BORDER_RADIUS};
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
        z-index: 1;
      }

      .dropdown-content li {
        float: none;
        color: black;
        padding: 12px 16px 12px 5px;
        text-decoration: none;
        display: block;
        text-align: left;
      }

      .dropdown-content li:hover {
        background-color: #ddd;
      }

      .dropdown:hover .dropdown-content {
        display: block;
      }

      .dropdown-content::-webkit-scrollbar {
        width: 10px;
      }

      .dropdown-content::-webkit-scrollbar-thumb {
        background: ${LIGHT_GRAY};
        border-radius: 10px;
      }

      .dropdown-content::-webkit-scrollbar-track-piece:start {
        background: transparent;
      }

      .dropdown-content::-webkit-scrollbar-track-piece:end {
        background: transparent;
      }

      /* Remove margins and padding from the list */
      ul {
        margin: 0;
        padding: 0;
        border-radius: ${BORDER_RADIUS};
        background: white;
      }

      /* Style the list items */
      ul li {
        cursor: pointer;
        position: relative;
        padding: 12px 8px 12px 40px;
        list-style-type: none;
        background: white;
        font-size: ${FONT_12};
        transition: 0.2s;

        /* make the list items unselectable */
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }

      ul li:first-child {
        border-radius: 0 ${BORDER_RADIUS} 0 0;
      }

      ul li:last-child {
        border-radius: 0 0 ${BORDER_RADIUS} ${BORDER_RADIUS}
      }

      /* Darker background-color on hover */
      ul li:hover {
        background: #ddd;
      }

      /* When clicked on, add a background color and strike out text */
      ul li.checked {
        background: #c7c7c7;
        color: #fff;
      }

      /* Arrow icon */
      .arrow {
        border: solid black;
        border-width: 0 3px 3px 0;
        display: inline-block;
        padding: 3px;
        pointer-events: none;
      }

      .down {
        transform: rotate(45deg);
        -webkit-transform: rotate(45deg);
      }

      .right {
        transform: rotate(-45deg);
        -webkit-transform: rotate(-45deg);
      }

      .float-right {
        float: right;
      }

      .sub-dropdown-content {
        display: none;
        position: absolute;
        background-color: white;
        min-width: 160px;
        border-radius: ${BORDER_RADIUS};
        z-index: 1;
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
      }

      .sub-dropdown-content li {
        float: none;
        padding: 12px 16px;
        color: black;
        text-decoration: none;
        display: block;
        text-align: left;
      }

      .sub-dropdown-content li:hover {
        background-color: #ddd;
      }

      .active-version {
        background-color: ${LIGHT_GREEN};
      }
    `;
  }

  render(): TemplateResult {
    return html`
        <div class="dropdown">
          <input class="dropbtn" @keyup="${(e: any) => this.searchListener(e)}" type="text" placeholder="Enter a call flow name">
          <div id="dropOut" class="dropdown-content" @mouseleave="${() => this.displayNone()}">
            <ul>
              ${this.callFlowConfigs?.map(callFlowConfig => html`
                <li class="sub-dropbtn" @mouseover="${(e: MouseEvent) => this.revisionListener(e, callFlowConfig)}">
                  ${callFlowConfig.name}  &nbsp;
                  <i class="arrow right float-right">
                  </i>
                </li>`)}
            </ul>
          </div>
        </div>
        <div class="sub-dropdown-content" @mouseover="${() => this.bindElementListener()}" @mouseleave="${() => this.subDisplayNone()}">
          <ul>
            ${this.callFlowConfig?.revisions?.filter(revision => revision.revType === 'CREATED').map(revision => this.callFlowConfig?.activeVersion === revision.version ?
    html`<li class="active-version" @click="${() => this.chosenVersionListener(revision.version)}">${revision.version}</li>` : html`<li @click="${() => this.chosenVersionListener(revision.version)}">${revision.version}</li>`
  )}
          </ul>
        </div>
    `
  }

  async fetchCallFlowConfigs() {
    return ContactingCallFlowService.getCallFlowConfigs();
  }

  private searchListener(e: any) {
    const filter = e.target.value.toLowerCase();
    if(filter.search('[<>]') > -1){
      return;
    }
    const liElements = this.shadowRoot.querySelectorAll("#dropOut ul li");

    this.subDropdownContentElement!.style.display = 'none';

    liElements.forEach(liEl => {
      const element = liEl as HTMLLIElement
      element.style.display = element.innerHTML.toLowerCase().includes(filter) ? "" : "none";
    })
  }

  private async chosenVersionListener(version: string){
    // When version is defined then we save the selection
    if(version){
      ContactingCallFlowService.setChosenCallFlowVersion({name: this.callFlowConfig!.name, version: version});
      this.subDropdownContentElement!.style.display = 'none';
      this.dropdownContentElement!.style.display = '';
      this.visitedSubDropdown = false;
      this.isSubDropdownOpen = false;
    }
  }

  private revisionListener(e: MouseEvent, callFlowConfig: CallFlowConfig) {
    const element = e.target as HTMLLIElement;
    const rightRectBorder = element.getClientRects().item(0)?.right!;
    const topRectBorder = element.getClientRects().item(0)?.top!;

    this.subDropdownContentElement!.style.display = 'inline-block';
    this.subDropdownContentElement!.style.position = 'absolute';
    this.subDropdownContentElement!.style.left = rightRectBorder.toString() + 'px';
    this.subDropdownContentElement!.style.top = topRectBorder.toString() + 'px';

    this.callFlowConfig = callFlowConfig;

    this.isSubDropdownOpen = true;
  }

  private bindElementListener() {
    this.dropdownContentElement!.style.display = 'block';
    this.visitedSubDropdown = true;
  }

  private async displayNone() {
    await new Promise(resolve => setTimeout(resolve, 50)).then(r => r);
    if (this.isSubDropdownOpen && !this.visitedSubDropdown) {
      this.subDropdownContentElement!.style.display = 'none';
      this.dropdownContentElement!.style.display = '';
      this.visitedSubDropdown = false;
      this.isSubDropdownOpen = false;
    }
  }

  private subDisplayNone(){
    this.subDropdownContentElement!.style.display = 'none';
    this.dropdownContentElement!.style.display = '';
    this.visitedSubDropdown = false;
    this.isSubDropdownOpen = false;
  }
}
