import type { NodeID } from './familyTreeData';
import { CPerson, CUnion, type GraphNode } from './import/types';

/**
 * Extends GraphNode with additional properties and methods for interactive family tree visualization.
 * ClickableNode instances represent nodes in the graph that can be expanded, collapsed, and interacted with.
 * In an ideal world, this would be a class definition. Unfortunately, d3-dag doesn't
 * do classes, so we're stuck with this ugly hack. We extend d3-dag's node definition
 * with custom methods and properties by using JavaScript's prototype augmentation feature
 * (see {@link augmentD3DAGNodeClass}).
 */
export interface ClickableNode extends GraphNode {
  /** All neighboring nodes (upstream and downstream). */
  neighbors: ClickableNode[];
  /** All visible neighboring nodes (upstream and downstream). Will be unions if called on a person. Will be persons if called on a union. */
  visibleNeighbors: ClickableNode[];
  /** All invisible neighboring nodes (upstream and downstream). Will be unions if called on a person. Will be persons if called on a union. */
  invisibleNeighbors: ClickableNode[];
  /** All visible downstream nodes. Will be unions if called on a person. Will be persons if called on a union. */
  visibleChildren: ClickableNode[];
  /** All visible upstream nodes. Will be unions if called on a person. Will be persons if called on a union.*/
  visibleParents: ClickableNode[];
  /** All visible partner nodes (other parents of shared children). Will always be persons. */
  visiblePartners: ClickableNode[];
  /** Nodes that were inserted by expanding this node. */
  insertedNodes: ClickableNode[];
  /** True if this node can be expanded to show more neighbors. */
  extendable: boolean;
  /** True if this node represents a union (family). */
  isUnion: boolean;
  /** True if this node represents a person. */
  isPerson: boolean;
  /**
   * Expands this node to show its neighbors and previously inserted nodes.
   * @param addInsertedNodes - If true, marks newly visible neighbors as inserted by this node.
   */
  showNeighbors(addInsertedNodes: boolean): void;
  /**
   * Collapses this node, hiding its neighbors and previously inserted nodes.
   * @param resetInsertedNodes - If true, resets the insertedBy property of hidden neighbors.
   */
  hideNeighbors(resetInsertedNodes: boolean): void;
  /**
   * Handles a click event on this node, toggling expansion/collapse.
   */
  click(): void;
  /**
   * Returns the IDs of all visible parent nodes.
   */
  visibleParentIDs(): NodeID[];
}

/**
 * Returns all neighboring nodes (upstream and downstream) of this node.
 */
function neighbors(this: ClickableNode) {
  return [...this.children(), ...this.parents()];
}

/**
 * Returns all visible neighboring nodes.
 * Will be unions if this is a person. Will be persons if this is a union.
 */
function visibleNeighbors(this: ClickableNode) {
  return this.neighbors.filter((n: ClickableNode) => n.data.visible);
}

/**
 * Returns all invisible neighboring nodes.
 * Will be unions if this is a person. Will be persons if this is a union.
 */
function invisibleNeighbors(this: ClickableNode) {
  return this.neighbors.filter((n) => !n.data.visible);
}

/**
 * Returns all visible downstream nodes.
 * Will be unions if this is a person. Will be persons if this is a union.
 */
function visibleChildren(this: ClickableNode) {
  return [...this.children()].filter((n) => n.data.visible);
}

/**
 * Returns all visible upstream nodes.
 * Will be unions if this is a person. Will be persons if this is a union.
 */
function visibleParents(this: ClickableNode) {
  return [...this.parents()].filter((n) => n.data.visible);
}

/**
 * Returns all visible partner nodes (other parents of shared children).
 * Will always be persons.
 */
function visiblePartners(this: ClickableNode) {
  return this.visibleChildren
    .map((c) => c.visibleParents)
    .flat()
    .filter((p) => p != this);
}

/**
 * Returns all neighboring nodes that were inserted by expanding this node.
 */
function insertedNodes(this: ClickableNode) {
  return this.neighbors.filter((n) => n.data.insertedBy === this);
}

/**
 * Returns true if this node can be expanded to show more neighbors.
 */
function extendable(this: ClickableNode) {
  return this.invisibleNeighbors.length > 0;
}

/**
 * Returns true if this node represents a union (family).
 */
function isUnion(this: ClickableNode) {
  return this.data.type == CUnion;
}

/**
 * Returns true if this node represents a person.
 */
function isPerson(this: ClickableNode) {
  return this.data.type == CPerson;
}

/**
 * Expands this node to show its neighbors. Recursively expands inserted nodes if applicable.
 * If `addInsertedNodes` is true, marks newly visible neighbors as inserted by this node.
 */
function showNeighbors(this: ClickableNode, addInsertedNodes: boolean = false) {
  if (addInsertedNodes) {
    for (let n of this.invisibleNeighbors) {
      n.data.insertedBy = this;
    }
  }
  for (let n of this.insertedNodes) {
    n.data.visible = true;
    // `addInsertedNodes` only for the clicked person and it's neighbor unions
    n.showNeighbors(addInsertedNodes && n.isUnion);
  }
}

/**
 * Recursively collapses this node and all inserted nodes.
 * If `resetInsertedNodes` is true, resets the `insertedBy` property of the hidden nodes.
 */
function hideNeighbors(
  this: ClickableNode,
  resetInsertedNodes: boolean = false
) {
  for (let n of this.insertedNodes) {
    if (resetInsertedNodes) {
      n.data.insertedBy = null;
    }
    n.data.visible = false;
    n.hideNeighbors(false);
  }
}

/**
 * Handles a click event on this node.
 * Expands the node if it is extendable, otherwise collapses it.
 * Throws an error if called on a union node.
 */
function click(this: ClickableNode) {
  if (this.isUnion) {
    throw Error('Only person nodes can be clicked.');
  }
  if (this.extendable) {
    this.showNeighbors(true);
  } else {
    this.hideNeighbors(true);
  }
}

/**
 * Returns the IDs of all visible parent nodes.
 */
function visibleParentIDs(this: ClickableNode) {
  return this.visibleParents.map((p) => p.data.id);
}

/**
 * Augments the prototype of a d3-dag GraphNode to add ClickableNode properties and methods.
 * This enables interactive features such as expanding/collapsing nodes and partner/neighbor queries.
 * @param node - A GraphNode instance (any instance will do)
 */
export function augmentD3DAGNodeClass(node: GraphNode) {
  const prototype = (node.constructor as any).prototype;
  Object.defineProperty(prototype, 'neighbors', {
    get: neighbors,
    configurable: true,
    enumerable: false,
  });
  Object.defineProperty(prototype, 'visibleNeighbors', {
    get: visibleNeighbors,
    configurable: true,
    enumerable: false,
  });
  Object.defineProperty(prototype, 'invisibleNeighbors', {
    get: invisibleNeighbors,
    configurable: true,
    enumerable: false,
  });
  Object.defineProperty(prototype, 'visibleChildren', {
    get: visibleChildren,
    configurable: true,
    enumerable: false,
  });
  Object.defineProperty(prototype, 'visibleParents', {
    get: visibleParents,
    configurable: true,
    enumerable: false,
  });
  Object.defineProperty(prototype, 'visiblePartners', {
    get: visiblePartners,
    configurable: true,
    enumerable: false,
  });
  Object.defineProperty(prototype, 'insertedNodes', {
    get: insertedNodes,
    configurable: true,
    enumerable: false,
  });
  Object.defineProperty(prototype, 'extendable', {
    get: extendable,
    configurable: true,
    enumerable: false,
  });
  Object.defineProperty(prototype, 'isUnion', {
    get: isUnion,
    configurable: true,
    enumerable: false,
  });
  Object.defineProperty(prototype, 'isPerson', {
    get: isPerson,
    configurable: true,
    enumerable: false,
  });
  prototype.showNeighbors = showNeighbors;
  prototype.hideNeighbors = hideNeighbors;
  prototype.click = click;
  prototype.visibleParentIDs = visibleParentIDs;
}
