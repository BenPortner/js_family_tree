import {
  D3DAGLayoutCalculator,
  D3DAGLayoutCalculatorOptions,
} from './layout/d3-dag';
import { FamilyTreeDataV1Importer } from './import/familyTreeData';
import type { FamilyTreeData } from './familyTreeData';
import { D3Renderer, D3RendererOptions } from './render/d3';
import type { ClickableNode } from './clickableNode';
import type { LayoutCalculator, LayoutedNode } from './layout/types';
import type { Renderer } from './render/types';
import type { Importer } from './import/types';

export interface FamilyTreeOptions
  extends D3DAGLayoutCalculatorOptions,
    D3RendererOptions {
  showAll: boolean;
}

export class FamilyTree {
  public readonly nodes: ClickableNode[];
  public readonly root: ClickableNode;

  public importer: Importer;
  public layouter: LayoutCalculator;
  public renderer: Renderer;

  constructor(
    data: FamilyTreeData,
    container: HTMLElement,
    opts?: Partial<FamilyTreeOptions>
  ) {
    this.importer = new FamilyTreeDataV1Importer();
    this.layouter = new D3DAGLayoutCalculator(opts);
    this.renderer = new D3Renderer(container, this, opts);

    // import data
    this.nodes = this.importer.import(data);
    this.root =
      this.nodes.find((n) => n.data.id == data.start) ?? this.nodes[0];

    // set all nodes visible if specified
    if (opts?.showAll) {
      for (let n of this.nodes) {
        n.data.visible = true;
      }
    }

    this.render(undefined);
  }

  private getVisibleSubgraph() {
    function recursiveVisibleNeighborCollector(
      node: ClickableNode,
      result: ClickableNode[] = []
    ) {
      if (!result.includes(node)) {
        result = result.concat([node]);
      }
      const newVisibleNeighbors = node.visibleNeighbors.filter(
        (n) => !result.includes(n)
      );
      for (let n of newVisibleNeighbors) {
        result = recursiveVisibleNeighborCollector(n, result);
      }
      return result;
    }
    return recursiveVisibleNeighborCollector(this.root);
  }

  public render(nodeOld?: LayoutedNode) {
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
    this.render(node);
  }
}
