import { UnionType } from '../import/types';
import type { GraphNode } from './types';

export interface ClickableNode extends GraphNode {
  neighbors: ClickableNode[];
  visibleNeighbors: ClickableNode[];
  invisibleNeighbors: ClickableNode[];
  extendable: boolean;
  showNeighbors(): void;
  hideNeighbors(): void;
  click(): void;
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
function showNeighbors(this: ClickableNode) {
  const insertedNodes = this.data.insertedNodes;
  const invisibleNeighbors = this.invisibleNeighbors;
  this.data.insertedNodes = insertedNodes.concat(invisibleNeighbors);
  invisibleNeighbors.forEach((n) => {
    n.data.visible = true;
    if (n.data.type == UnionType) {
      n.showNeighbors();
    }
  });
}

function hideNeighbors(this: ClickableNode) {
  const insertedNodes = this.data.insertedNodes as ClickableNode[];
  this.data.insertedNodes = [];
  insertedNodes.forEach((n) => {
    n.data.visible = false;
    if (n.data.type == UnionType) {
      n.hideNeighbors();
    }
  });
}

function click(this: ClickableNode) {
  if (this.data.type == UnionType) {
    throw Error('Only person nodes can be clicked.');
  }
  if (this.extendable) {
    this.showNeighbors();
  } else {
    this.hideNeighbors();
  }
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
  prototype.showNeighbors = showNeighbors;
  prototype.hideNeighbors = hideNeighbors;
  prototype.click = click;
}
