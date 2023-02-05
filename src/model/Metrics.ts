import {Network} from 'vis-network/peer/esm/vis-network';
import {DataSetEdges, DataSetNodes} from 'vis-network';
import {round} from "lodash";
import {max, std, sum} from "mathjs";
import {NodeHolder} from "./NodeHolder";

export class Metrics {

  static graph(G: Network, N: DataSetNodes, L: DataSetEdges): any {
    // Mu_degree == k
    const k = round(L.length / N.length, 4)
    // max links a G can have... measurement of complete G
    const L_max = round(N.length * (N.length-1) / 2, 4)
    // d = density
    const density = round(L.length/(N.length*(N.length-1)), 4)
    // SD centralization
    const degrees = N.map((x) => G.getConnectedEdges(x.id!).length)
    const sd_degree = round(std(degrees, 'unbiased'), 4)
    // degree centrality
    const v_ = max(degrees)
    // const H = N.length**2-3*N.length+2;
    const H = (N.length - 1)*(N.length - 2)
    const c = sum(degrees.map((v) => v_-v)) / H
    const d_centrality = round(c, 4)

    return {
      'Mu_degree': k,
      'L_max': L_max,
      'Density': density,
      'Degree_centrality': d_centrality,
      'SD_degree': sd_degree
    };
  }

  static vertex(G: Network, n: NodeHolder): any {
    const k_out = n.flows.length
    const k = G.getConnectedEdges(n.id).length
    const k_in = k - k_out

    return {
      'Out_degree': k_out,
      'In_degree': k_in,
      'Degree_centrality': k
    }
  }
}
