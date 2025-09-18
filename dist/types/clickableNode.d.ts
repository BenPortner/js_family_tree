import type { NodeID } from './familyTreeData';
import { type GraphNode } from './import/types';
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
 * Augments the prototype of a d3-dag GraphNode to add ClickableNode properties and methods.
 * This enables interactive features such as expanding/collapsing nodes and partner/neighbor queries.
 * @param node - A GraphNode instance (any instance will do)
 */
export declare function augmentD3DAGNodeClass(node: GraphNode): void;
