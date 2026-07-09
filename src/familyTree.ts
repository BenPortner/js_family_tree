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
import { warn } from 'console';

/**
 * Options for configuring the FamilyTree.
 * Combines layout and rendering options, plus additional controls.
 */
export interface FamilyTreeOptions
  extends D3DAGLayoutCalculatorOptions,
  D3RendererOptions {
  /** If true, all nodes are set to visible on initialization. */
  showAll: boolean;
}

/**
 * Main class for managing, rendering, and interacting with a family tree.
 * Handles data import, layout calculation, rendering, and runtime modifications.
 */
export class FamilyTree {
  /** The raw family tree data object. */
  public data: FamilyTreeData;
  /** The current array of nodes in the graph. */
  private _nodes: ClickableNode[];
  /** The current root node (starting point for rendering). */
  private _root: ClickableNode | undefined;

  /** The importer instance used to convert raw data into nodes. */
  public importer: Importer;
  /** The layout calculator instance used to assign coordinates to the nodes. */
  public layouter: LayoutCalculator;
  /** The renderer instance used to draw the tree. */
  public renderer: Renderer;

  /**
   * Constructs a new FamilyTree instance.
   * @param data - The family tree data object.
   * @param container - The HTML element to render the tree into.
   * @param opts - Optional configuration for layout, rendering, and styling.
   */
  constructor(
    data: FamilyTreeData,
    container: HTMLElement,
    opts?: Partial<FamilyTreeOptions>
  ) {
    this.data = this.fixData(data);
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

  /** Returns the current array of nodes. */
  get nodes() {
    return this._nodes;
  }

  /** Sets the array of nodes. (private) */
  private set nodes(nodes: ClickableNode[]) {
    this._nodes = nodes;
  }

  /** Returns the current root node. */
  get root() {
    return this._root;
  }

  /** Sets the root node. (private) */
  private set root(node: ClickableNode | undefined) {
    this._root = node;
  }

  /**
   * Ensures that the data object has all required fields initialized.
   * @param data - The input family tree data.
   * @returns The fixed family tree data with all necessary fields.
   */
  private fixData(data: any) {
    if (!data) {
      data = { start: '', persons: {}, unions: {}, links: [] };
    }
    if (!data.persons) {
      data.persons = {};
    }
    if (!data.unions) {
      data.unions = {};
    }
    if (!data.links) {
      data.links = [];
    }
    return data;
  }

  /**
   * Collects all nodes in the currently visible subgraph, starting from the root.
   * Uses a recursive depth-first search to gather all visible neighbors.
   * @returns An array of visible ClickableNodes.
   */
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
    if (!this.root) {
      return [];
    }
    return recursiveVisibleNeighborCollector(this.root);
  }

  /**
   * Renders the visible parts of the graph.
   * @param clickedNode - The node that was clicked, if any (used for transitions).
   */
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

  /**
   * Handles a click event on a node.
   * Expands or collapses the node and re-renders the tree.
   * @param node - The node that was clicked.
   */
  public nodeClickHandler(node: LayoutedNode) {
    node.click();
    this.render(node);
  }

  /**
   * Re-imports the data and re-renders the tree.
   * Useful after modifying the underlying data (e.g. adding or removing nodes and links).
   */
  public reimportData() {
    this.nodes = this.importer.import(this.data);
    this.root =
      this.nodes.find((n) => n.data.id == this.data.start) ?? this.nodes[0];
    this.render(undefined);
  }

  /**
   * Generates a random string ID.
   * @returns A random string suitable for use as a person or union ID.
   */
  private getRandomId() {
    return `${Math.random().toString(36).substring(2, 9)}`;
  }

  /**
   * Adds a new person to the family tree data and optionally re-renders. Assigns a
   * random ID if `data` doesn't contain one.
   * @param data - The person data to add.
   * @param render - If true, re-imports and re-renders the tree (default: true).
   */
  public addPerson(data: Person, render: boolean = true) {
    const id = data.id ?? `p${this.getRandomId()}`;
    (data as PersonData).visible = true;
    this.data.persons[id] = data;
    if (render) this.reimportData();
  }

  /**
   * Removes a person and all associated links from the family tree data.
   * Optionally re-renders.
   * @param id - The ID of the person to remove.
   * @param render - If true, re-imports and re-renders the tree (default: true).
   */
  public deletePerson(id: string, render: boolean = true) {
    delete this.data.persons[id];
    this.data.links = this.data.links.filter(
      (l) => l[0] != id && l[1] != id // remove all links to/from this person
    );
    if (render) this.reimportData();
  }

  /**
   * Adds a new union (family) to the family tree data and optionally re-renders. Assigns a
   * random ID if `data` doesn't contain one.
   * @param data - The union data to add.
   * @param render - If true, re-imports and re-renders the tree (default: true).
   */
  public addUnion(data: Union, render: boolean = true) {
    const id = data.id ?? `u${this.getRandomId()}`;
    (data as UnionData).visible = true;
    this.data.unions[id] = data;
    if (render) this.reimportData();
  }

  /**
   * Removes a union and all associated links from the family tree data.
   * Optionally re-renders.
   * @param id - The ID of the union to remove.
   * @param render - If true, re-imports and re-renders the tree (default: true).
   */
  public deleteUnion(id: string, render: boolean = true) {
    delete this.data.unions[id];
    this.data.links = this.data.links.filter(
      (l) => l[0] != id && l[1] != id // remove all links to/from this union
    );
    if (render) this.reimportData();
  }

  /**
   * Adds a new link (edge) between two nodes in the family tree data.
   * Optionally re-renders.
   * @param sourceId - The source node ID.
   * @param targetId - The target node ID.
   * @param render - If true, re-imports and re-renders the tree (default: true).
   */
  public addLink(sourceId: string, targetId: string, render: boolean = true) {
    const link = [sourceId, targetId] as [string, string];
    // prevent duplicates
    if (this.data.links.some(([s, t]) => s === sourceId && t === targetId)) {
      warn(`Link from ${sourceId} to ${targetId} already exists. Skipping add.`);
      return;
    }
    this.data.links.push(link);
    if (render) this.reimportData();
  }

  /**
   * Removes a link (edge) between two nodes in the family tree data.
   * Optionally re-renders.
   * @param sourceId - The source node ID.
   * @param targetId - The target node ID.
   * @param render - If true, re-imports and re-renders the tree (default: true).
   */
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


  /**
 * Deletes a person and all of their descendants (unions + persons) from the tree.
 *
 * Expected link semantics (as used by this library examples):
 * - [personId, unionId]  => person is a partner in that union (an "own union")
 * - [unionId, personId]  => person is a child of that union (a "parent union")
 *
 * Start handling:
 * - If the deleted person is `data.start`, try to promote a parent (a partner of one of the person's parent unions).
 * - If no parent can be found, fall back to any remaining person (or '' if none remain).
 *
 * @param id - The person ID to delete (together with their descendant tree).
 * @param render - If true, re-import and re-render the tree (default: true).
 */
  public deletePersonWithTree(id: string, render: boolean = true) {
    // 0) Guard: if the person doesn't exist, do nothing.
    if (!(id in this.data.persons)) return;

    // 1) Build fast directed adjacency maps from the `links` array.
    //
    // We want to quickly answer:
    // - outgoing neighbors of a node: out.get(a) => all b such that [a, b] exists
    // - incoming neighbors of a node: inn.get(b) => all a such that [a, b] exists
    //
    // Using Maps+Sets makes traversal O(E) instead of repeatedly scanning links (O(E) each time).
    const out = new Map<string, Set<string>>();
    const inn = new Map<string, Set<string>>();

    const add = (m: Map<string, Set<string>>, a: string, b: string) => {
      if (!m.has(a)) m.set(a, new Set());
      m.get(a)!.add(b);
    };

    for (const [a, b] of this.data.links) {
      add(out, a, b); // a -> b
      add(inn, b, a); // b <- a
    }

    // 2) Helpers to recognize node IDs (persons vs unions).
    // This avoids accidentally following edges to missing/invalid nodes.
    const isPerson = (x: string) => x in this.data.persons;
    const isUnion = (x: string) => x in this.data.unions;

    // 3) We'll collect everything to delete in two sets:
    // - personsToDelete: the person + all descendants (children, grandchildren, ...)
    // - unionsToDelete: unions belonging to the deleted line (their "own unions")
    const personsToDelete = new Set<string>();
    const unionsToDelete = new Set<string>();

    // 4) Traverse ONLY the descendant direction:
    //
    // person -> (outgoing unions where they're a partner) -> (children of those unions) -> (their unions) -> ...
    //
    // This avoids deleting ancestors/spouses not in the descendant branch.
    const personQueue: string[] = [id];

    while (personQueue.length) {
      // Take one person to process.
      const pid = personQueue.pop()!;

      // Skip if already handled.
      if (personsToDelete.has(pid)) continue;

      // Mark this person to be deleted.
      personsToDelete.add(pid);

      // 4a) Find this person's "own unions":
      // partner edge is [person, union] so we look at outgoing edges from the person.
      for (const uid of out.get(pid) ?? []) {
        // Only follow if it’s truly a union ID.
        if (!isUnion(uid)) continue;

        // Mark the union for deletion (it belongs to the removed subtree).
        unionsToDelete.add(uid);

        // 4b) For that union, find its children:
        // child edge is [union, childPerson], so we look at outgoing edges from the union.
        for (const childId of out.get(uid) ?? []) {
          if (!isPerson(childId)) continue;

          // Queue the child person for processing (descend recursively).
          if (!personsToDelete.has(childId)) personQueue.push(childId);
        }
      }
    }

    // 5) If the deleted person was the start of the tree, we must choose a new start,
    // otherwise the rendering/import will break or show an unexpected root.
    if (this.data.start === id) {
      let newStart: string | undefined;

      // 5a) Identify the person's "parent unions" (the union(s) where this person is a child).
      //
      // child edge is [union, person], so these are *incoming* neighbors of `id` that are unions.
      const parentUnions = Array.from(inn.get(id) ?? []).filter(isUnion);

      // 5b) For each parent union, try to pick one partner as the new start.
      //
      // partner edge is [partnerPerson, union], so partners are *incoming* neighbors of the union that are persons.
      // We also ensure we do NOT pick someone who is being deleted (rare but possible with malformed data).
      for (const pu of parentUnions) {
        const partners = Array.from(inn.get(pu) ?? []).filter(
          (p) => isPerson(p) && !personsToDelete.has(p)
        );
        if (partners.length) {
          newStart = partners[0];
          break;
        }
      }

      // 5c) If we couldn't promote a parent, fall back to any remaining person in the dataset.
      if (!newStart) {
        newStart = Object.keys(this.data.persons).find(
          (p) => !personsToDelete.has(p)
        );
      }

      // 5d) If the tree becomes empty, start becomes '' (or you could set it to undefined if your type allows it).
      this.data.start = newStart ?? '';
    }

    // 6) Remove all links that touch anything we are deleting.
    //
    // This prevents dangling edges that point to missing nodes.
    this.data.links = this.data.links.filter(([a, b]) => {
      return (
        !personsToDelete.has(a) &&
        !personsToDelete.has(b) &&
        !unionsToDelete.has(a) &&
        !unionsToDelete.has(b)
      );
    });

    // 7) Delete unions and persons from their dictionaries.
    //
    // We delete unions first just for neatness (either order is fine after links are filtered).
    for (const uid of unionsToDelete) delete this.data.unions[uid];
    for (const pid of personsToDelete) delete this.data.persons[pid];

    // 8) Re-import/re-render if requested (this matches the behavior of your other mutation methods).
    if (render) this.reimportData();
  }

}
