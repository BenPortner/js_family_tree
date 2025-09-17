import type { NodeID } from './familyTreeData';
import { type GraphNode } from './import/types';
export interface ClickableNode extends GraphNode {
    neighbors: ClickableNode[];
    visibleNeighbors: ClickableNode[];
    visibleChildren: ClickableNode[];
    visibleParents: ClickableNode[];
    visiblePartners: ClickableNode[];
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
export declare function augmentD3DAGNodeClass(node: GraphNode): void;
