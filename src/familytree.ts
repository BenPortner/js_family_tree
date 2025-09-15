import {
  D3DAGLayoutCalculator,
  type D3DAGLayoutCalculatorOptions,
} from './layout/d3-dag';
import { FamilyTreeDataV1Importer } from './import/familyTreeData';
import type { FamilyTreeData, Person, Union } from './familyTreeData';
import { D3Renderer, type D3RendererOptions } from './render/d3';
import type { ClickableNode } from './clickableNode';
import type { LayoutCalculator, LayoutedNode } from './layout/types';
import type { Renderer } from './render/types';
import type { Importer, PersonData, UnionData } from './import/types';

export interface FamilyTreeOptions
  extends D3DAGLayoutCalculatorOptions,
    D3RendererOptions {
  showAll: boolean;
}

export class FamilyTree {
  public data: FamilyTreeData;
  private _nodes: ClickableNode[];
  private _root: ClickableNode;

  public importer: Importer;
  public layouter: LayoutCalculator;
  public renderer: Renderer;

  constructor(
    data: FamilyTreeData,
    container: HTMLElement,
    opts?: Partial<FamilyTreeOptions>
  ) {
    this.data = data;
    this.importer = new FamilyTreeDataV1Importer();
    this.layouter = new D3DAGLayoutCalculator(opts);
    this.renderer = new D3Renderer(container, this, opts);

    // import data
    this._nodes = this.importer.import(data);
    this._root =
      this.nodes.find((n) => n.data.id == data.start) ?? this.nodes[0];

    // set all nodes visible if specified
    if (opts?.showAll) {
      for (let n of this.nodes) {
        n.data.visible = true;
      }
    }

    this.render(undefined);
  }

  get nodes() {
    return this._nodes;
  }

  private set nodes(nodes: ClickableNode[]) {
    this._nodes = nodes;
  }

  get root() {
    return this._root;
  }

  private set root(node: ClickableNode) {
    this._root = node;
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

  public render(clickedNode?: LayoutedNode) {
    const visibleNodes = this.getVisibleSubgraph();
    // get the old position of the clicked node for transitions
    const previousPosition = clickedNode
      ? { x: clickedNode.x, y: clickedNode.y }
      : undefined;
    // calculate new positions for all nodes
    const layoutResult = this.layouter.calculateLayout(visibleNodes);
    // get the new position of the clicked node for transitions
    const newPosition = clickedNode
      ? { x: clickedNode.x, y: clickedNode.y }
      : undefined;
    // render graph
    this.renderer.render(layoutResult, previousPosition, newPosition);
  }

  public nodeClickHandler(node: LayoutedNode) {
    node.click();
    this.render(node);
  }

  public reimportData() {
    this.nodes = this.importer.import(this.data);
    this.root =
      this.nodes.find((n) => n.data.id == this.data.start) ?? this.nodes[0];
    this.render(undefined);
  }

  private getRandomId() {
    return `${Math.random().toString(36).substring(2, 9)}`;
  }

  public addPerson(data: Person, render: boolean = true) {
    const id = data.id ?? `p${this.getRandomId()}`;
    this.data.persons[id] = data;
    (data as PersonData).visible = true;
    if (render) this.reimportData();
  }
  public deletePerson(id: string, render: boolean = true) {
    delete this.data.persons[id];
    this.data.links = this.data.links.filter(
      (l) => l[0] != id && l[1] != id // remove all links to/from this person
    );
    if (render) this.reimportData();
  }
  public addUnion(data: Union, render: boolean = true) {
    const id = data.id ?? `u${this.getRandomId()}`;
    this.data.unions[id] = data;
    (data as UnionData).visible = true;
    if (render) this.reimportData();
  }
  public deleteUnion(id: string, render: boolean = true) {
    delete this.data.unions[id];
    this.data.links = this.data.links.filter(
      (l) => l[0] != id && l[1] != id // remove all links to/from this union
    );
    if (render) this.reimportData();
  }
  public addLink(sourceId: string, targetId: string, render: boolean = true) {
    this.data.links.push([sourceId, targetId]);
    if (render) this.reimportData();
  }
  public deleteLink(
    sourceId: string,
    targetId: string,
    render: boolean = true
  ) {
    this.data.links = this.data.links.filter(
      (l) => !(l[0] == sourceId && l[1] == targetId)
    );
    if (render) this.reimportData();
  }
}
