import type { NodeID } from './familyTreeData';
import { CPerson, CUnion, type GraphNode } from './import/types';

export interface ClickableNode extends GraphNode {
  // a ClickableNode is a GraphNode with additional methods
  neighbors: ClickableNode[];
  visibleNeighbors: ClickableNode[];
  invisibleNeighbors: ClickableNode[];
  extendable: boolean;
  isUnion: boolean;
  isPerson: boolean;
  showNeighbors(): void;
  hideNeighbors(): void;
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
function extendable(this: ClickableNode) {
  return this.invisibleNeighbors.length > 0;
}
function isUnion(this: ClickableNode) {
  return this.data.type == CUnion;
}
function isPerson(this: ClickableNode) {
  return this.data.type == CPerson;
}
function showNeighbors(this: ClickableNode) {
  const insertedNodes = this.data.insertedNodes;
  const invisibleNeighbors = this.invisibleNeighbors;
  this.data.insertedNodes = insertedNodes.concat(invisibleNeighbors);
  invisibleNeighbors.forEach((n) => {
    n.data.visible = true;
    if (n.isUnion) {
      n.showNeighbors();
    }
  });
}

function hideNeighbors(this: ClickableNode) {
  const insertedNodes = this.data.insertedNodes as ClickableNode[];
  this.data.insertedNodes = [];
  insertedNodes.forEach((n) => {
    n.data.visible = false;
    if (n.isUnion) {
      n.hideNeighbors();
    }
  });
}

function click(this: ClickableNode) {
  if (this.isUnion) {
    throw Error('Only person nodes can be clicked.');
  }
  if (this.extendable) {
    this.showNeighbors();
  } else {
    this.hideNeighbors();
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
