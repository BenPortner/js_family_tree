import type { NodeID } from './familyTreeData';
import { CPerson, CUnion, type GraphNode } from './import/types';

export interface ClickableNode extends GraphNode {
  // a ClickableNode is a GraphNode with additional methods
  neighbors: ClickableNode[];
  visibleNeighbors: ClickableNode[];
  invisibleNeighbors: ClickableNode[];
  insertedNodes: ClickableNode[];
  extendable: boolean;
  isUnion: boolean;
  isPerson: boolean;
  showNeighbors(addInsertedNodes: boolean): void;
  hideNeighbors(resetInsertedNodes: boolean): void;
  click(): void;
  visibleParentIDs(): NodeID[];
}

function neighbors(this: ClickableNode) {
  return [...this.children(), ...this.parents()];
}
function visibleNeighbors(this: ClickableNode) {
  return this.neighbors.filter((n: ClickableNode) => n.data.visible);
}
function invisibleNeighbors(this: ClickableNode) {
  return this.neighbors.filter((n) => !n.data.visible);
}
function insertedNodes(this: ClickableNode) {
  return this.neighbors.filter((n) => n.data.insertedBy === this);
}
function extendable(this: ClickableNode) {
  return this.invisibleNeighbors.length > 0;
}
function isUnion(this: ClickableNode) {
  return this.data.type == CUnion;
}
function isPerson(this: ClickableNode) {
  return this.data.type == CPerson;
}
function showNeighbors(this: ClickableNode, addInsertedNodes: boolean = false) {
  if (addInsertedNodes) {
    for (let n of this.invisibleNeighbors) {
      n.data.insertedBy = this;
    }
  }
  for (let n of this.insertedNodes) {
    n.data.visible = true;
    // addInsertedNodes only for the clicked person and it's neighbor unions
    n.showNeighbors(addInsertedNodes && n.isUnion);
  }
}

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

function visibleParentIDs(this: ClickableNode) {
  return [...this.parents()]
    .filter((p) => p.data.visible)
    .map((p) => p.data.id);
}

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
