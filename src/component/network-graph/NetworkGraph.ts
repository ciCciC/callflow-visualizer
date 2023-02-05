import {css, CSSResult, customElement, html, LitElement, TemplateResult} from "lit-element";
import {DataSetEdges, DataSetNodes, Edge, Node} from 'vis-network';
import {state, query, queryAll} from 'lit-element/lib/decorators.js';
import {DataSet} from 'vis-data/peer/esm/vis-data';
import {Network} from 'vis-network/peer/esm/vis-network';
import * as _ from "lodash";
import {NodeHolderService} from "../../service/NodeHolderService";
import {SideBarService} from "../../service/SideBarService";
import {
  BORDER_RADIUS,
  BOX_LIGHT_SHADOW,
  BOX_SHADOW,
  FONT_12,
  FONT_14,
  LIGHT_GRAY,
  PURPLE,
  WHITE
} from "../../presets/stylepresets";
import {CallFlowService} from "../../service/CallFlowService";
import {NodeColorMap} from "../../model/NodeColorMap";
import {NodeHolder} from "../../model/NodeHolder";
import {IconMap} from "../../icon/IconMap";
import {LoadingService} from "../../service/LoadingService";
import {CallFlow} from "../../model/CallFlow";
import {NetworkGraphOption} from "../../model/NetworkGraphOption";
import {ViewModeEnum} from "../../model/ViewModeEnum";
import {ContactingCallFlowService} from "../../service/ContactingCallFlowService";
import {Metrics} from "../../model/Metrics";

// import {std} from 'mathjs';


@customElement('network-graph')
export class NetworkGraph extends LitElement {

  @state()
  loading: boolean;

  @state()
  nodeMap?: Map<string, NodeHolder>;

  @state()
  callFlow?: CallFlow;

  @state()
  groupedNodeTypes?: any;

  @state()
  active?: any;

  @queryAll(".tabcontent")
  tabContents: HTMLDivElement[];

  @queryAll(".tablinks")
  tablinks: HTMLDivElement[];

  @queryAll('.collapsible')
  _collapsesList!: NodeListOf<Element>;

  @query(".edge-container")
  edgeInfoEl: HTMLDivElement;

  @query("#edgeInfo")
  edgeInfo: HTMLDivElement;

  networkGraph?: Network;
  customerJourneyGraph?: Network;
  networkGraphData?: {};
  customerJourneyGraphData?: {};

  nodeList?: DataSetNodes;
  edgeList?: DataSetEdges;

  kibanaNodeHolders?: NodeHolder [];

  tab = 0;

  mouseX = 0;
  mouseY = 0;

  readonly shadowRoot!: ShadowRoot;

  static get styles(): CSSResult {
    // language=CSS
    return css`

      .network-graph {
        background-color: white;
        display: block;
        height: 70vh;
        margin: auto;
        border-radius: ${BORDER_RADIUS};
        box-shadow: ${BOX_LIGHT_SHADOW};
      }

      /* The Modal (background) */
      .modal {
        display: none; /* Hidden by default */
        position: fixed; /* Stay in place */
        z-index: 1; /* Sit on top */
        padding-top: 100px; /* Location of the box */
        left: 0;
        top: 0;
        width: 100%; /* Full width */
        height: 100%; /* Full height */
        overflow: auto; /* Enable scroll if needed */
        background-color: rgb(0, 0, 0); /* Fallback color */
        background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
      }

      /* Modal Content */
      .modal-content {
        background-color: #fefefe;
        margin: auto;
        padding: 20px;
        border: 1px solid #888;
        width: 80%;
        height: 400px;
      }

      .modal-content textarea {
        width: 100%;
        height: 300px;
        resize: none;
      }

      .modal-content button {
        float: right
      }

      /* The Close Button */
      .close {
        color: #aaaaaa;
        float: right;
        font-size: 28px;
        font-weight: bold;
      }

      .close:hover,
      .close:focus {
        color: #000;
        text-decoration: none;
        cursor: pointer;
      }

      .tab {
        padding-right: 20px;
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;
        background-color: ${WHITE};
      }

      .tablinks, #openModalKibanaButton {
        background-color: ${WHITE};
        color: ${PURPLE};
        float: left;
        border: none;
        outline: none;
        cursor: pointer;
        padding: 14px 16px;
        transition: 0.3s;
        font-size: ${FONT_12};
      }

      #openModalKibanaButton {
        position: absolute;
        z-index: 1;
        left: 48px;
        top: 40px;
        box-shadow: ${BOX_LIGHT_SHADOW};
        border-radius: ${BORDER_RADIUS};
      }

      #openModalKibanaButton:hover {
        background-color: ${LIGHT_GRAY};
      }

      /* Change background color of buttons on hover */
      .tab button:hover {
        background-color: #ececec;
      }

      /* Create an active/current tablink class */
      .tab button.active {
        background-color: ${PURPLE};
        color: ${WHITE};
      }

      /* Style the tab content */
      .tabcontent {
        display: none;
        padding: 6px 12px;
        border-top: none;
      }

      #groupedNodeTableButtons {
        width: 60%;
        margin: 20px auto auto auto;
        overflow-y: overlay;
        box-shadow: ${BOX_SHADOW};
      }

      #groupedNodeTableButtons::-webkit-scrollbar {
        width: 10px;
      }

      #groupedNodeTableButtons::-webkit-scrollbar-thumb {
        background: ${LIGHT_GRAY};
        border-radius: 10px;
      }

      #groupedNodeTableButtons::-webkit-scrollbar-track-piece:start {
        background: transparent;
      }

      #groupedNodeTableButtons::-webkit-scrollbar-track-piece:end {
        background: transparent;
      }

      .edge-container {
        max-width: 300px;
        display: none;
        position: absolute;
        z-index: 1;
        box-shadow: ${BOX_SHADOW};
        border-radius: ${BORDER_RADIUS};
        background-color: rgba(255, 255, 255, 0.70);
        backdrop-filter: blur(5px);
      }

      #edgeInfo {
        display: none;
        color: black;
        padding: 10px;
      }

      .collapsible {
        background-color: ${WHITE};
        color: black;
        cursor: pointer;
        padding: 18px;
        width: 100%;
        border-color: transparent;
        border-style: solid;
        text-align: left;
        outline: none;
        font-size: ${FONT_14};
      }

      .active, .collapsible:hover {
        background-color: ${PURPLE};
        color: ${WHITE};
      }

      .active, .collapsible:hover:after {
        color: ${WHITE};
      }

      .collapsible:after {
        content: '+';
        font-weight: bold;
        float: right;
        margin-left: 5px;
      }

      .collapsible-content {
        font-size: ${FONT_14};
        width: 100%;
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.2s ease-out;
        background-color: ${WHITE};
      }

      table {
        border-collapse: collapse;
        width: 100%;
      }

      td, th {
        border: 1px solid #eaeaea;
        text-align: left;
        padding: 4px 18px;
      }

      tr:nth-child(even) {
        background-color: ${WHITE};
      }

      .collapsible-content td:nth-child(2) {
        width: 10%;
        text-align: center;
      }

      .callFlowName {
        position: absolute;
        font-size: ${FONT_14};
        z-index: 1;
        left: 48px;
        top: 40px;
        background-color: ${WHITE};
        color: ${PURPLE};
      }

      .algorithmViewMode {
        position: absolute;
        font-size: ${FONT_12};
        z-index: 1;
        right: 48px;
        top: 40px;
        display: block;
        padding: 14px 16px;
        margin: 0;
        box-shadow: ${BOX_SHADOW};
        border-radius: ${BORDER_RADIUS};
      }

      .float-right {
        float: right;
      }

      .infoButton{
        background-color: ${LIGHT_GRAY};
        border-radius: 4px;
        border-style: hidden;
        outline: none;
        box-shadow: 0px;
        padding: 8px;
      }

      .infoButton:hover {
        background-color: ${LIGHT_GRAY};
        opacity: 0.8;
      }

      .modalShowButton{
        background-color: ${PURPLE};
        color: ${WHITE};
        border-radius: 4px;
        border-style: hidden;
        outline: none;
        box-shadow: 0px;
        padding: 8px;
      }

    `;
  }

  async connectedCallback(): Promise<void> {
    super.connectedCallback();

    this.subscribeClearNetworkGraph();
    this.subscribeCallFlow();
  }

  render(): TemplateResult {
    return html`
      <div class="tab">
        <button class="tablinks" @click="${(e: any) => this.openSubView(e, 0)}">Call flow</button>
        <button class="tablinks" @click="${(e: any) => this.openSubView(e, 1)}">Node table</button>
        <button class="tablinks" @click="${(e: any) => this.openSubView(e, 2)}">Customer journey</button>
      </div>
      <div id="0" class="tabcontent" style="position: relative">
        <div class="callFlowName">
          ${this.edgeList != undefined && this.callFlow != undefined ? this.compute_graph_metrics() : ''}
        </div>
        ${this.callFlow?.viewMode! == ViewModeEnum.DEACTIVATE || this.callFlow?.viewMode == ViewModeEnum.DROPOUT ? html`<div class="algorithmViewMode">
          <div>
            <input type="radio" id="DEACTIVATE" name="viewType" value="${ViewModeEnum.DEACTIVATE}" @click="${(e:any) => this.computeAlgorithmListener(e)}" checked>
            <label for="DEACTIVATE">${ViewModeEnum.DEACTIVATE}</label>
          </div>
          <div>
            <input type="radio" id="DROPOUT" name="viewType" value="${ViewModeEnum.DROPOUT}" @click="${(e:any) => this.computeAlgorithmListener(e)}">
            <label for="DROPOUT">${ViewModeEnum.DROPOUT}</label>
          </div>
          <div>
            <button @click="${(_: any) => this.networkGraph!.stopSimulation()}">Stop simulation</button>
          </div>
        </div>` : ''}
        <div class="network-graph" id="callFlow-network"></div>
      </div>
      <div id="1" class="tabcontent">
        <div id="groupedNodeTableButtons">
          ${this.groupedNodeTypes ? Object.keys(this.groupedNodeTypes).map(key => html`
            <button class="collapsible" @click="${(e:any) => this.collapseListener(e, key)}">${this.groupedNodeTypes[key].length} : ${key}</button>
            <div class="collapsible-content ${key}">
              <table>
                <tr>
                  <th>Name</th>
                  <th></th>
                </tr>
                ${this.groupedNodeTypes[key].map((nodeHolder: NodeHolder) => html`
                <tr>
                  <td>${nodeHolder.name}</td>
                  <td>
                    <button class="infoButton" font14 @click="${() => this.openLeftSideBar(nodeHolder)}">?</button>
                  </td>
                </tr>
              `)}
              </table>
            </div>
          `) : ''}
        </div>
      </div>
      <div id="2" class="tabcontent" style="position: relative">
        <button id="openModalKibanaButton" font14 @click="${() => this.openModalListener()}">Add Kibana log</button>
        <div class="network-graph" id="customer-journey-network"></div>
      </div>
      <div id="kibanaModal" class="modal">
        <div class="modal-content">
          <span class="close" @click="${() => this.closeModalListener()}">&times;</span>
          <div>
            <textarea id="kibanaLogs">
              ${this.exampleKibanaSteps(this.callFlow?.name!)}
            </textarea>
            <button class="modalShowButton" class="float-right" font14 @click="${() => this.showCustomerJourneyListener()}">Show</button>
          </div>
        </div>
      </div>
      <div class="edge-container">
        <div id="edgeInfo"></div>
      </div>
    `;
  }

  firstUpdated() {
    window.addEventListener('mousemove', (e) => {
      this.mouseX = e.x;
      this.mouseY = e.y;

      if(this.active) {
        this.onEdgeHover(this.active);
      }
    })
    this.defaultOpenSubView();
    this.mouseOnLeaveListener();
  }

  clearGraph() {
    this.nodeList?.clear();
    this.edgeList?.clear();
  }

  private compute_graph_metrics(): TemplateResult{
    const metrics = Metrics.graph(this.networkGraph!, this.nodeList!, this.edgeList!);
    const metrics_elements = Object.entries(metrics).map((k) =>
      html`
        <tr>
          <th>${k[0]}</th>
          <td>${k[1]}</td>
        </tr>
    `)

    return html`
      <table>
        <tr>
          <th>Name</th>
          <td>${this.callFlow?.name}</td>
        </tr>
        <tr>
          <th>Vertex</th>
          <td>${this.callFlow?.nodeMap.size}</td>
        </tr>
        <tr>
          <th>Edge</th>
          <td>${this.edgeList?.length}</td>
        </tr>
        ${metrics_elements}
      </table>
    `;
  }

  private isDropOutRadioActive(): boolean {
    const dropOutEl = this.shadowRoot.getElementById("DROPOUT") as HTMLInputElement
    return dropOutEl != null && dropOutEl?.checked
  }

  private async computeAlgorithmListener(e: any) {
    const chosenAlgorithmViewMode = (e.target as HTMLInputElement).value as ViewModeEnum;

    // Here we choose which algorithm to apply. If we go from deactivate to drop out then no api request is applied
    // and the other way around it is applied.
    let callFlow = this.callFlow!;
    if(chosenAlgorithmViewMode == ViewModeEnum.DEACTIVATE){
      callFlow = await ContactingCallFlowService.getCallFlow(this.callFlow?.name!, this.callFlow?.version!);
    }

    callFlow.viewMode = chosenAlgorithmViewMode;
    callFlow.dropOutList = this.callFlow!.dropOutList;
    await CallFlowService.setCallFlow(callFlow);
  }

  /***
   * Computes a grouped by structure on node types for the node table
   * @private
   */
  private nodeStats() {
    this.groupedNodeTypes = _.chain(Array.from(this.nodeMap?.values()!))
      .groupBy((nodeHolder) => nodeHolder.nodeType)
      .value()
  }

  private subscribeCallFlow() {
    CallFlowService.getCallFlow().subscribe(async retrievedCallFlow => {

      // If the drop out radio is already active and we press on run then we still want to keep the view mode drop out
      if(this.isDropOutRadioActive() && retrievedCallFlow.viewMode != ViewModeEnum.DEV){
        retrievedCallFlow.viewMode = ViewModeEnum.DROPOUT;
      }

      await CallFlowService.computeReorderingCallFlow(retrievedCallFlow);

      this.callFlow = retrievedCallFlow;

      this.nodeList = new DataSet<Node, 'id'>();
      this.edgeList = new DataSet<Edge, 'id'>();

      NodeHolderService.setNodeHolderMap(retrievedCallFlow.nodeMap);

      this.nodeMap = retrievedCallFlow.nodeMap;

      retrievedCallFlow.nodeMap.forEach(nodeHolderValue => {

        nodeHolderValue.color = retrievedCallFlow.viewMode == ViewModeEnum.DEACTIVATE && retrievedCallFlow.dropOutList.includes(nodeHolderValue.nodeType) ? '#80808063' : NodeColorMap.getColor(nodeHolderValue.nodeType);

        const svg = IconMap.getIconAsString(nodeHolderValue.nodeType, nodeHolderValue.color);
        const url = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);

        this.nodeList?.add({
          id: nodeHolderValue.id,
          label: nodeHolderValue.name,
          color: nodeHolderValue.color,
          image: url,
          shape: "image",
          font: {background: 'white', color: 'black'}
        });
        nodeHolderValue.edges.forEach((edge, index) => {
          edge.id = `${nodeHolderValue.id}-${index}`
          edge.color = {color: nodeHolderValue.color, hover: 'red'};
          edge.width = 3;
          edge.shadow = true;
          edge.arrows = {
            to: true,
          };
          this.edgeList?.add(edge);
        });
      });

      this.nodeStats();
      if (this.tab == 1) {
        this.calcGroupedButtonHeight();
      }
      this.initNetworkGraph();
    });
  }

  private initNetworkGraph() {
    const container = this.shadowRoot.getElementById("callFlow-network")!;

    this.networkGraphData = {
      nodes: this.nodeList,
      edges: this.edgeList
    };

    this.networkGraph = new Network(container, this.networkGraphData, NetworkGraphOption.getDefaultOptions());
    this.networkGraph.on('stabilizationIterationsDone', () => this.stopLoading());

    this.initInteraction(this.networkGraph);
    this.windowOnResize(this.networkGraph);
  }

  private subscribeClearNetworkGraph() {
    LoadingService.getClearStatus().subscribe(status => {
      if(status){
        this.clearGraph();
        LoadingService.stopClearNetworkGraph();
      }
    });
  }

  private initInteraction(network: Network){
    network.on('click', params => this.openLeftSideBarListener(params));
    network.on("hoverEdge", (e:any) => this.onEdgeHover(e));
    network.on("blurEdge", () => this.onEdgeNoneFocus());
    network.once('afterDrawing', () => this.networkGraph!.fit());
  }

  private windowOnResize(network: Network) {
    window.onresize = () => {
      this.calcGroupedButtonHeight();
      network.fit();
    }
  }

  private openLeftSideBarListener(event: any) {
    if(event.nodes.length !== 1) {return;}
    const nodeHolder = NodeHolderService.getNodeHolderMap().get(event.nodes[0])!;
    this.openLeftSideBar(nodeHolder);
  }

  private openLeftSideBar(nodeHolder: NodeHolder) {
    nodeHolder.metrics = Metrics.vertex(this.networkGraph!, nodeHolder);
    NodeHolderService.setNodeHolderSelection(nodeHolder);
    SideBarService.toggleLeftBar();
  }

  private mouseOnLeaveListener() {
    const callFlowGraphDiv = this.shadowRoot.getElementById("callFlow-network")!;
    const customerJourneyGraphDiv = this.shadowRoot.getElementById("customer-journey-network")!;

    callFlowGraphDiv.addEventListener('mouseleave', (_) => {
      this.onEdgeNoneFocus();
    });

    customerJourneyGraphDiv.addEventListener('mouseleave', (_) => {
      this.onEdgeNoneFocus();
    });
  }

  private onEdgeHover(e:any) {
    const hoveredEdge = this.edgeList?.get(e.edge) as Edge
    this.active = e
    const split = hoveredEdge?.id?.toString().split('-')!

    /**
     * Here we get the correct index from the sequential order of conditional flows
     * Why? because the flows can be duplicate BUT the conditional expression not! Otherwise we
     * would always see the same conditional expression of flows which occur multiple times.
     */
    const edgeConditionalExpression = NodeHolderService.getNodeHolderById(hoveredEdge.from!.toString())!.flowsList[+split[split.length-1]]

    // With this we show if a edge is normal, timeout, fallback or maxretries
    const prefix = edgeConditionalExpression.label.length > 0 ? `${edgeConditionalExpression.label}: ` : '';

    this.edgeInfoEl.style.display = 'table';
    this.edgeInfo.style.display = 'table-cell'
    this.edgeInfo.innerText = prefix + edgeConditionalExpression.value

    // Render above the mouse point
    this.edgeInfoEl.style.top = `${this.mouseY-(this.edgeInfoEl.getBoundingClientRect().height+10)}px`;
    this.edgeInfoEl.style.left = `${this.mouseX}px`;
  }

  private onEdgeNoneFocus(){
    this.edgeInfoEl.style.display = 'none';
    this.active = undefined;
  }

  private stopLoading() {
    LoadingService.stopLoading();
  }

  private openModalListener(){
    const modal = this.shadowRoot.getElementById('kibanaModal') as HTMLDivElement;
    modal.style.display = 'block';
  }

  private closeModalListener(){
    const modal = this.shadowRoot.getElementById('kibanaModal') as HTMLDivElement;
    modal.style.display = 'none';
  }

  /***
   * Here we calculate the path of the customer journey
   * by using the CallFlow as the true graph, node ids in a
   * clustered fashion and kibana nodes step as mem stack.
   *
   * Why? because the unique id of each node is not visible in Kibana and
   * the sequential order of the nodes is not correct which makes our live
   * not easy.
   * @private
   */
  private showCustomerJourneyListener(){
    const textarea = this.shadowRoot.getElementById('kibanaLogs') as HTMLTextAreaElement;
    this.closeModalListener();

    if(textarea.value.toLowerCase().search('[<>]') > -1){
      return;
    }

    const kibanaSteps = textarea.value.split("\n").map(value => value.trimStart()).filter(value => value.length > 0);

    const clusteredNodes = NodeHolderService.getGroupedIdsByName(kibanaSteps);
    const rootNode = this.callFlow?.nodeMap.get(this.callFlow?.topNodeId)!
    const kibanaRootIndex = kibanaSteps.indexOf(rootNode.name, 0)

    if(kibanaRootIndex < 0){
      return;
    }

    kibanaSteps.splice(kibanaRootIndex, 1);

    const newPath = [{id: rootNode.id, name: rootNode.name}]
    let pointer = rootNode
    let index = 0;

    while(kibanaSteps.length-1 >= index && kibanaSteps.length > 0){
      const step = kibanaSteps[index]
      const pNodeIds = clusteredNodes.get(step)!

      const isNodeFound = pointer.flows.filter(flow => pNodeIds.includes(flow))

      if(isNodeFound.length > 0){
        newPath.push({id: isNodeFound[0], name: step})
        pointer = this.callFlow?.nodeMap.get(isNodeFound[0])!
        const newDepth = clusteredNodes.get(step)!.filter(id => id != isNodeFound[0])
        clusteredNodes.set(step, newDepth)
        kibanaSteps.splice(index, 1);
        index = 0;
      }else{
        index++;
      }
    }

    this.kibanaNodeHolders = NodeHolderService.getNodeHolderByIds(newPath.map(path => path.id))

    // Updates the correct edge in the graph
    for (let i = 1; i < this.kibanaNodeHolders.length; i++) {
      const nodeHolderLeft = this.kibanaNodeHolders[i-1]
      const nodeHolderRight = this.kibanaNodeHolders[i]
      const index = nodeHolderLeft.edges.findIndex(edge => edge.to === nodeHolderRight.id)
      if(index > -1){
        this.networkGraph?.updateEdge(nodeHolderLeft.edges[index].id!, {color: 'red', width:10})
      }
    }

    this.createCustomerJourneyGraph();
  }

  private createCustomerJourneyGraph(){
    const cjElement = this.shadowRoot.getElementById('customer-journey-network') as HTMLDivElement;

    const dumNodeList = new DataSet<Node, 'id'>();
    const dumEdgeList = new DataSet<Edge, 'id'>();

    this.kibanaNodeHolders?.forEach(nodeHolderValue => {
      nodeHolderValue.color = NodeColorMap.getColor(nodeHolderValue.nodeType);

      const svg = IconMap.getIconAsString(nodeHolderValue.nodeType, nodeHolderValue.color);
      const url = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);

      dumNodeList.add({
        id: nodeHolderValue.id,
        label: nodeHolderValue.name,
        color: nodeHolderValue.color,
        image: url,
        shape: "image",
        font: {background: 'white', color: 'black'}
      });
    })

    const definedKibanaNodeHolders = this.kibanaNodeHolders!

    // Creates the correct edge in the graph
    for (let i = 1; i < definedKibanaNodeHolders.length; i++) {
      const nodeHolderLeft = definedKibanaNodeHolders[i-1]
      const nodeHolderRight = definedKibanaNodeHolders[i]
      const index = nodeHolderLeft.edges.findIndex(edge => edge.to === nodeHolderRight.id)
      if(index > -1){
        const edge = nodeHolderLeft.edges[index]
        edge.color = nodeHolderLeft.color
        edge.width = 3;
        edge.shadow = true;
        edge.arrows = {to: true};
        dumEdgeList.add(edge);
      }
    }

    this.customerJourneyGraphData = {
      nodes: dumNodeList,
      edges: dumEdgeList
    };

    this.customerJourneyGraph = new Network(cjElement, this.customerJourneyGraphData, NetworkGraphOption.getDefaultOptions());

    this.initInteraction(this.customerJourneyGraph);
    this.windowOnResize(this.customerJourneyGraph);
  }

  private defaultOpenSubView() {
    const el = this.shadowRoot?.getElementById("0")!;
    el.style.display = "block";
    this.tablinks[0].classList.add("active");
  }

  private openSubView(event:any, tabType: number){
    this.tabContents.forEach(tabContent => tabContent.style.display = "none");
    this.tablinks.forEach(tabLink => tabLink.classList.remove("active"));
    const el = this.shadowRoot?.getElementById(tabType.toString())!;
    el.style.display = "block";
    event.currentTarget.classList.add("active");
    this.tab = tabType;

    if(tabType == 1) {
      this.calcGroupedButtonHeight();
    }
  }

  private collapseListener(event:any, key: string) {
    const buttonEl = event.currentTarget as HTMLButtonElement
    const tableEl = this.shadowRoot.querySelector(`.${key}`) as HTMLDivElement
    const notActive = !buttonEl.classList.contains("active")

    if(notActive){
      buttonEl.classList.add("active");
      tableEl.style.maxHeight = tableEl.style.maxHeight ? '' : `${tableEl.scrollHeight}px`;
    }else{
      buttonEl.classList.remove("active")
      tableEl.style.maxHeight = '';
    }
  }

  private calcGroupedButtonHeight() {
    if(this.groupedNodeTypes){
      const groupRect = this._collapsesList.item(0).getBoundingClientRect()
      const groupHeight = Object.keys(this.groupedNodeTypes).length * groupRect.height
      const groupedDiv = this.shadowRoot.getElementById("groupedNodeTableButtons")!
      const windowHeight = window.innerHeight
      const windowThreshold = 800

      if(windowHeight > windowThreshold){
        groupedDiv.style.height = groupHeight > 590 ? `${590}px` : `${groupHeight}px`
      }else{
        groupedDiv.style.height = groupHeight > 400 ? `${400}px` : `${groupHeight}px`
      }
    }
  }

  private exampleKibanaSteps(callFlowName: string): string {
    switch(callFlowName){
      case 'AssistedLine': return this.kibanaAssisted();
      case 'DailyLine': return this.kibanaDaily();
      default : return '';
    }
  }

  private kibanaAssisted(): string {
    return `
    static_statistics_writer_210
    session_statistics_writer_210
    welcomeSubflow_867_Begin
    welcomeNode_866_nl-NL_fr-FR_en-GB
    chooseLanguage_863_nl-NL_fr-FR_en-GB
    ipaSearch
    formatPhone
    storeUUID
    welcomeSubflow868_End
    ipaLookUp
    writeIPAStatistics
    saveRoutingVals_869
    storeIPAValues
    storeIPATaskAttrs
    ipaManagingEntitiesCall
    ipaGroupsCall
    kboMenu_870
    create task
    create task
    lineNameMapper
    lineNameMapper
    crdRequest
    debugMsg
    pdlCodeMapperNode`;
  }

  private kibanaDaily(): string {
    return `
    dtmfID
    checkESS
    announcementGlobalCLT
    addTaskAttrDTMFID
    announcementGlobalDBP
    session_statistics_writer_161
    session_statistics_writer_161
    environmentMapper635
    addTaskAttrGeneral
    init
    Welcome_636_
    announce1
    mapTwilioLanguages
    mainMenu
    announce2
    OH_DBP_General
    menu1Announcement
    menu1NonDigitalAnnouncement
    formatPhone
    ipaSearch
    ingIdMenu
    gatherSpeechPrequelNode
    ingIdMenuFailureAnnouncement
    gatherSpeechFR
    verifySpeechText
    saveSpeechText
    handleVaApiResponseNode
    TPA_Call
    sendIntentToDatalake
    playMsg
    OH_skillMapping
    endSTT
    legalRecording622
    isEssPriorityZone12
    announce3
    isProfessional
    isEss
    analyseRouting
    AssistedCallCallingNumber
    defaultTaskAttr
    germanCheckExit637
    germanCheckEntry637
    createTask
    germanCheckKeepLanguage637
    createTask
    parameterResolver
    languageProvider414
    lapMarker
    productAnnouncement_resolvedProduct
    superCircleAnnouncement_resolvedProduct
    waitingMusicFrom30Seconds416
    productAnnouncement_resolvedProduct
    lapMarker
    waitingMusicFrom30Seconds416
    superCircleAnnouncement_resolvedProduct
    productAnnouncement_resolvedProduct
    lapMarker
    waitingMusicFrom30Seconds416
    superCircleAnnouncement_resolvedProduct
    waitingMusicFrom30Seconds416
    productAnnouncement_resolvedProduct
    superCircleAnnouncement_resolvedProduct
    lapMarker
    lapMarker
    productAnnouncement_resolvedProduct
    waitingMusicFrom30Seconds416
    superCircleAnnouncement_resolvedProduct
    productAnnouncement_resolvedProduct
    superCircleAnnouncement_resolvedProduct
    waitingMusicFrom30Seconds416
    lapMarker
    c8f1c525-0735-46d3-887e-5768030d6f7b`;
  }
}
