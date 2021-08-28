import {css, customElement, html, LitElement, TemplateResult, property} from "lit-element";
import {DataSetEdges, DataSetNodes, Edge, Node} from 'vis-network';
import {query, state} from 'lit-element/lib/decorators.js';
import {CSSResult} from "lit-element/lib/css-tag";
import {DataSet} from 'vis-data/peer/esm/vis-data';
import {Network} from 'vis-network/peer/esm/vis-network';
import {NodeHolder} from "../../model/NodeHolder";
import {BORDER_RADIUS, BOX_SHADOW} from "../../presets/stylepresets";
import {NetworkGraphOption} from "../../model/NetworkGraphOption";

@customElement('subtree-graph')
export class SubTreeGraph extends LitElement {

  @property({type: Object})
  nodeHolder: NodeHolder;

  @property({type: Object})
  neighbors?: NodeHolder[];

  @state()
  active?: any;

  @query("#treeGraph")
  subTreeGraphEl: HTMLDivElement;

  @query(".edge-container")
  edgeInfoEl: HTMLDivElement;

  @query("#edgeInfo")
  edgeInfo: HTMLDivElement;

  mouseX = 0;
  mouseY = 0;

  private nodeList?: DataSetNodes = new DataSet<Node, 'id'>();
  private edgeList?: DataSetEdges = new DataSet<Edge, 'id'>();
  private networkGraph?: Network;

  static get styles(): CSSResult {
    // language=CSS
    return css`
      #treeGraph {
        width: 100%;
        height: 300px;
        border-radius: ${BORDER_RADIUS};
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
      }

      .edge-container{
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

      @media only screen and (max-width: 990px) {
        #treeGraph {
          max-width: 392px;
        }
      }

      @media only screen and (min-width: 990px) {
        #treeGraph {
          width: 450px;
        }
      }

      @media only screen and (min-width: 1400px) {
        #treeGraph {
          width: 550px;
        }
      }

      @media only screen and (max-height: 655px) {
        #treeGraph {
          height: 250px;
        }
      }
    `;
  }

  async connectedCallback(): Promise<void> {
    super.connectedCallback();
  }

  render(): TemplateResult {
    return html`
      <div id="treeGraph"></div>
      <div class="edge-container">
        <div id="edgeInfo"></div>
      </div>
    `;
  }

  async firstUpdated() {
    window.addEventListener('mousemove', (e) => {
      this.mouseX = e.x;
      this.mouseY = e.y;
      if(this.active) {
        this.onEdgeHover(this.active);
      }
    })
    this.initNetworkGraph();
    this.mouseOnLeaveListener();
  }

  initNetworkGraph() {
    // First clear the graph
    this.clearGraph();

    // Adds the root node
    this.nodeList?.add({
      id: this.nodeHolder.id,
      label: this.nodeHolder.name,
      font: {background: 'white', color: 'black'},
      color: this.nodeHolder.color
    })

    // Then adds the neighbor nodes including the connections
    this.neighbors?.forEach((flow, index) => {
      const neighborId = `${flow.id}-${index}`;
      if (flow.id !== this.nodeHolder.id) {
        this.nodeList?.add({
          id: neighborId,
          label: flow.name,
          font: {background: 'white', color: 'black'},
          color: flow.color
        }
        )
      }

      // Adds the connections
      this.edgeList?.add({
        id: index,
        from: this.nodeHolder.id,
        to: neighborId,
        width: 3,
        shadow: true,
        arrows: {to: true},
        color: this.nodeHolder.color
      })
    });

    // Here we populate the sub graph
    this.networkGraph = new Network(
      this.subTreeGraphEl,
      {
        nodes: this.nodeList,
        edges: this.edgeList
      },
      NetworkGraphOption.getSubGraphOptions());

    // Here we define some behaviors for the network
    this.networkGraph.on("hoverEdge", (e: any) => this.onEdgeHover(e));
    this.networkGraph.on("blurEdge", () => this.onEdgeNoneFocus());
    this.networkGraph.once('afterDrawing', () => this.networkGraph!.fit());

    this.windowOnResize();
  }

  private clearGraph() {
    this.nodeList?.clear();
    this.edgeList?.clear();
  }

  private mouseOnLeaveListener() {
    this.subTreeGraphEl.addEventListener('mouseleave', (_) => {
      this.onEdgeNoneFocus();
    });

    this.subTreeGraphEl.addEventListener('mouseleave', (_) => {
      this.onEdgeNoneFocus();
    });
  }

  private onEdgeHover(e: any) {
    const edgeConditionalExpression = this.nodeHolder.flowsList[e.edge]
    this.active = e

    // With this we show if a edge is normal, timeout, fallback or maxretries
    const prefix = edgeConditionalExpression.label.length > 0 ? `${edgeConditionalExpression.label}: ` : '';

    this.edgeInfoEl.style.display = 'table';
    this.edgeInfo.style.display = 'table-cell';
    this.edgeInfo.innerText = prefix + edgeConditionalExpression.value;

    // Render above the mouse point
    this.edgeInfoEl.style.top = `${this.mouseY-(this.edgeInfoEl.getBoundingClientRect().height+10)}px`;
    this.edgeInfoEl.style.left = `${this.mouseX}px`;
  }

  private onEdgeNoneFocus(){
    this.edgeInfoEl.style.display = 'none';
    this.active = undefined;
  }

  private windowOnResize() {
    window.onresize = () => {
      this.networkGraph!.fit();
    }
  }

}
