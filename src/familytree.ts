import { D3DAGLayoutCalculator } from './layout/d3-dag';
import { FamilyTreeDataV1Importer } from './import/familyTreeData';
import type { FamilyTreeData } from './familyTreeData';
import { D3Renderer } from './render/d3';
import type { ClickableNode } from './clickableNode';
import type {
  LayoutCalculator,
  LayoutCalculatorOpts,
  LayoutedNode,
} from './layout/types';
import type { Renderer } from './render/types';
import type { Importer } from './import/types';

export class FamilyTree {
  private nodes: ClickableNode[];
  private root: ClickableNode;

  public importer: Importer;
  public layouter: LayoutCalculator;
  public renderer: Renderer;

  constructor(
    data: FamilyTreeData,
    container: HTMLElement,
    importer?: Importer,
    layouter?: LayoutCalculator,
    layoutOptions?: LayoutCalculatorOpts,
    renderer?: Renderer
  ) {
    this.importer = importer ?? new FamilyTreeDataV1Importer();
    this.layouter = layouter ?? new D3DAGLayoutCalculator(layoutOptions);
    this.renderer = renderer ?? new D3Renderer(container, this);

    // import data
    this.nodes = this.importer.import(data);
    this.root =
      this.nodes.find((n) => n.data.id == data.start) ?? this.nodes[0];

    // render
    this.renderVisibleSubgraph(undefined);
  }

  private getVisibleSubgraph() {
    function recursiveVisibleNeighborCollector(
      node: ClickableNode,
      result: ClickableNode[] = []
    ) {
      result = result.concat([node]);
      const foundIDs = result.map((n) => n.data.id);
      const newVisibleNeighbors = node.visibleNeighbors.filter(
        (n) => !foundIDs.includes(n.data.id)
      );
      for (let n of newVisibleNeighbors) {
        result = recursiveVisibleNeighborCollector(n, result);
      }
      return result;
    }
    return recursiveVisibleNeighborCollector(this.root);
  }

  public renderVisibleSubgraph(nodeOld?: LayoutedNode) {
    const visibleNodes = this.getVisibleSubgraph();
    const layoutResult = this.layouter.calculateLayout(visibleNodes);
    // get the new position of the clicked node for transitions
    const nodeNew = [...layoutResult.graph.nodes()].find(
      (n) => n.data === nodeOld?.data
    );
    this.renderer.render(layoutResult, nodeOld, nodeNew);
  }

  public nodeClickHandler(node: LayoutedNode) {
    node.data.click();
    this.renderVisibleSubgraph(node);
  }
}
