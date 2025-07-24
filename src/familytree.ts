import {
  D3DAGLayoutCalculator,
  D3DAGLayoutCalculatorOptions,
  NodeDatum,
} from './dag';
import { FamilyTreeDataImporter } from './importer';
import * as d3dag from 'd3-dag';
import { FamilyTreeData } from './types/types';
import { D3Renderer } from './d3';

export class FamilyTree {
  completeGraph: d3dag.MutGraph<NodeDatum, undefined>;

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
}
