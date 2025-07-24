import {
  D3DAGLayoutCalculator,
  D3DAGLayoutCalculatorOptions,
  Graph,
  Node,
} from './layout/d3-dag';
import { FamilyTreeDataImporter } from './import/familyTreeData';
import * as d3dag from 'd3-dag';
import { FamilyTreeData } from './familyTreeData';
import { D3Renderer } from './render/d3';

export class FamilyTree {
  completeGraph: Graph;

  constructor(
    data: FamilyTreeData,
    container: HTMLElement,
    layoutOptions?: D3DAGLayoutCalculatorOptions
  ) {
    const importer = new FamilyTreeDataImporter();
    const nodeData = importer.import(data);
    const builder = d3dag.graphStratify();
    this.completeGraph = builder(nodeData);

    // calculate layout
    const nodes = [...this.completeGraph.nodes()].map((n) => n.data);
    const layouter = new D3DAGLayoutCalculator();
    const layoutResult = layouter.calculateLayout(nodes, layoutOptions);

    // render
    const renderer = new D3Renderer(container);
    renderer.render(layoutResult);
  }

  getNodeById(id: string): Node {
    const result = [...this.completeGraph.nodes()].filter(
      (n) => n.data.id === id
    );
    if (result.length > 1) {
      throw Error('More than one node found with with id ' + id);
    } else if (result.length == 0) {
      throw Error('No node found with id ' + id);
    }
    return result[0];
  }
}
