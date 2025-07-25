import { UnionType } from '../import/types';
import type { GraphNode } from './types';

export class ClickableNode {
  node: GraphNode;

  constructor(node: GraphNode) {
    this.node = node;
  }

  get id() {
    return this.node.data.id;
  }

  get children() {
    return [...this.node.children()];
  }

  get parents() {
    return [...this.node.parents()];
  }

  get neighbors() {
    return this.children.concat(this.parents);
  }

  get visibleNeighbors() {
    return this.neighbors.filter((n) => n.data.visible);
  }

  get invisibleNeighbors() {
    return this.neighbors.filter((n) => !n.data.visible);
  }

  get extendable() {
    return this.invisibleNeighbors.length > 0;
  }

  private showNeighbors() {
    const insertedNodes = this.node.data.insertedNodes;
    const invisibleNeighbors = this.invisibleNeighbors;
    this.node.data.insertedNodes = insertedNodes.concat(invisibleNeighbors);
    invisibleNeighbors.forEach((n) => {
      n.data.visible = true;
      if (n.data.type == UnionType) {
        const cn = new ClickableNode(n);
        cn.showNeighbors();
      }
    });
  }

  private hideNeighbors() {
    const insertedNodes = this.node.data.insertedNodes;
    this.node.data.insertedNodes = [];
    insertedNodes.forEach((n) => {
      n.data.visible = false;
      if (n.data.type == UnionType) {
        const cn = new ClickableNode(n);
        cn.hideNeighbors();
      }
    });
  }

  public click() {
    if (this.node.data.type == UnionType) {
      throw Error('Only person nodes can be clicked.');
    }
    if (this.extendable) {
      this.showNeighbors();
    } else {
      this.hideNeighbors();
    }
  }
}
