import { type D3DAGLayoutCalculatorOptions } from './layout/d3-dag';
import type { FamilyTreeData, Person, Union } from './familyTreeData';
import { type D3RendererOptions } from './render/d3';
import type { ClickableNode } from './clickableNode';
import type { LayoutCalculator, LayoutedNode } from './layout/types';
import type { Renderer } from './render/types';
import type { Importer } from './import/types';
/**
 * Options for configuring the FamilyTree.
 * Combines layout and rendering options, plus additional controls.
 */
export interface FamilyTreeOptions extends D3DAGLayoutCalculatorOptions, D3RendererOptions {
    /** If true, all nodes are set to visible on initialization. */
    showAll: boolean;
}
/**
 * Main class for managing, rendering, and interacting with a family tree.
 * Handles data import, layout calculation, rendering, and runtime modifications.
 */
export declare class FamilyTree {
    /** The raw family tree data object. */
    data: FamilyTreeData;
    /** The current array of nodes in the graph. */
    private _nodes;
    /** The current root node (starting point for rendering). */
    private _root;
    /** The importer instance used to convert raw data into nodes. */
    importer: Importer;
    /** The layout calculator instance used to assign coordinates to the nodes. */
    layouter: LayoutCalculator;
    /** The renderer instance used to draw the tree. */
    renderer: Renderer;
    /**
     * Constructs a new FamilyTree instance.
     * @param data - The family tree data object.
     * @param container - The HTML element to render the tree into.
     * @param opts - Optional configuration for layout, rendering, and styling.
     */
    constructor(data: FamilyTreeData, container: HTMLElement, opts?: Partial<FamilyTreeOptions>);
    /** Returns the current array of nodes. */
    get nodes(): ClickableNode[];
    /** Sets the array of nodes. (private) */
    private set nodes(value);
    /** Returns the current root node. */
    get root(): ClickableNode | undefined;
    /** Sets the root node. (private) */
    private set root(value);
    /**
     * Ensures that the data object has all required fields initialized.
     * @param data - The input family tree data.
     * @returns The fixed family tree data with all necessary fields.
     */
    private fixData;
    /**
     * Collects all nodes in the currently visible subgraph, starting from the root.
     * Uses a recursive depth-first search to gather all visible neighbors.
     * @returns An array of visible ClickableNodes.
     */
    private getVisibleSubgraph;
    /**
     * Renders the visible parts of the graph.
     * @param clickedNode - The node that was clicked, if any (used for transitions).
     */
    render(clickedNode?: LayoutedNode): void;
    /**
     * Handles a click event on a node.
     * Expands or collapses the node and re-renders the tree.
     * @param node - The node that was clicked.
     */
    nodeClickHandler(node: LayoutedNode): void;
    /**
     * Re-imports the data and re-renders the tree.
     * Useful after modifying the underlying data (e.g. adding or removing nodes and links).
     */
    reimportData(): void;
    /**
     * Generates a random string ID.
     * @returns A random string suitable for use as a person or union ID.
     */
    private getRandomId;
    /**
     * Adds a new person to the family tree data and optionally re-renders. Assigns a
     * random ID if `data` doesn't contain one.
     * @param data - The person data to add.
     * @param render - If true, re-imports and re-renders the tree (default: true).
     */
    addPerson(data: Person, render?: boolean): void;
    /**
     * Removes a person and all associated links from the family tree data.
     * Optionally re-renders.
     * @param id - The ID of the person to remove.
     * @param render - If true, re-imports and re-renders the tree (default: true).
     */
    deletePerson(id: string, render?: boolean): void;
    /**
     * Adds a new union (family) to the family tree data and optionally re-renders. Assigns a
     * random ID if `data` doesn't contain one.
     * @param data - The union data to add.
     * @param render - If true, re-imports and re-renders the tree (default: true).
     */
    addUnion(data: Union, render?: boolean): void;
    /**
     * Removes a union and all associated links from the family tree data.
     * Optionally re-renders.
     * @param id - The ID of the union to remove.
     * @param render - If true, re-imports and re-renders the tree (default: true).
     */
    deleteUnion(id: string, render?: boolean): void;
    /**
     * Adds a new link (edge) between two nodes in the family tree data.
     * Optionally re-renders.
     * @param sourceId - The source node ID.
     * @param targetId - The target node ID.
     * @param render - If true, re-imports and re-renders the tree (default: true).
     */
    addLink(sourceId: string, targetId: string, render?: boolean): void;
    /**
     * Removes a link (edge) between two nodes in the family tree data.
     * Optionally re-renders.
     * @param sourceId - The source node ID.
     * @param targetId - The target node ID.
     * @param render - If true, re-imports and re-renders the tree (default: true).
     */
    deleteLink(sourceId: string, targetId: string, render?: boolean): void;
}
