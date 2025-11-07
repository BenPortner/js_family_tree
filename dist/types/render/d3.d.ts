import { type Coordinates, type LayoutResult, type LayoutedLink, type LayoutedNode, type Orientation } from '../layout/types';
import type { Renderer } from './types';
import type { FamilyTree } from '../familyTree';
/**
 * Options for configuring the D3Renderer.
 * Allows customization of transitions, link and node rendering, labeling,
 * and tooltips.
 */
export interface D3RendererOptions {
    /** Duration of transitions in milliseconds. */
    transitionDuration: number;
    /** Function to generate the SVG path for a link. */
    linkPathFunction(link: CoordLink, orientation: Orientation): string;
    /** Function to determine the CSS class for a link. */
    linkCSSClassFunction(link: LayoutedLink): string;
    /** Function to handle node click events. */
    nodeClickFunction(node: LayoutedNode, ft: FamilyTree): void;
    /** Function to handle node right-click events. */
    nodeRightClickFunction(node: LayoutedNode, ft: FamilyTree): void;
    /** Function to determine the CSS class for a node. */
    nodeCSSClassFunction(node: LayoutedNode): string;
    /** Function to generate the label (text displayed next to the node). */
    nodeLabelFunction(node: LayoutedNode, missingData?: string): string[];
    /** Function to determine the size of a node. */
    nodeSizeFunction(node: LayoutedNode): number;
    /** Function to generate the tooltip content for a node. */
    nodeTooltipFunction(node: LayoutedNode, missingData?: string): string | undefined;
}
/**
 * Represents a link between two nodes in the layout.
 */
export interface CoordLink {
    source: Coordinates;
    target: Coordinates;
}
/**
 * D3Renderer is responsible for rendering the family tree using D3.
 * It handles SVG creation, zoom/pan, node and link rendering, tooltips, and labels.
 */
export declare class D3Renderer implements Renderer {
    /** The HTML container element for the SVG. */
    private _container;
    /** The main SVG selection. */
    private svg;
    /** The group element within the SVG for all rendered elements. */
    private g;
    /** The div holding the tooltip. */
    private tooltipDiv;
    /** The D3 zoom behavior instance. */
    private zoom;
    /** Reference to the FamilyTree instance. */
    private ft;
    /** Default renderer options, can be overwritten via the constructor. */
    opts: D3RendererOptions;
    /**
     * Constructs a new D3Renderer.
     * @param container - The HTML element to render into.
     * @param ft - The FamilyTree instance to visualize.
     * @param opts - Optional renderer options to override defaults.
     */
    constructor(container: HTMLElement, ft: FamilyTree, opts?: Partial<D3RendererOptions>);
    /** Gets the current container element. */
    get container(): HTMLElement;
    /** Sets the container element and initializes the SVG and tooltip. */
    set container(c: HTMLElement);
    /** Returns true if running in a JSDOM environment (used for testing). */
    private get isJSDOM();
    /**
     * Initializes the SVG, group, zoom behavior, and tooltip div in the container.
     */
    private initializeContainer;
    /**
     * Default function to generate the SVG path for a link, using S-bends
     * for vertical or horizontal orientation.
     */
    private static defaultLinkPathFunction;
    /**
     * Default node click handler: delegates to the FamilyTree's nodeClickHandler.
     */
    private static defaultNodeClickFunction;
    /**
     * Default node right-click handler: doesn't do anything.
     */
    private static defaultNodeRightClickFunction;
    /**
     * Default function to generate labels for a node.
     * Returns an array of strings containing name, birthyear and deathyear.
     * Each array entry representing a line of the label.
     */
    private static defaultNodeLabelFunction;
    /**
     * Default function to generate the tooltip for a node.
     * Returns a formatted HTML string with name, birth, and death info.
     */
    private static defaultNodeTooltipFunction;
    /**
     * Default function to determine the size of a node.
     * Returns 10 for persons, 0 for unions.
     */
    private static defaultNodeSizeFunction;
    /**
     * Default function to determine the CSS class for a node.
     * Combines extendability (can be extended/collapsed) and type (person/union).
     */
    private static defaultNodeCSSClassFunction;
    /**
     * Default function to determine the CSS class for a link.
     * Returns 'link' for all links.
     */
    private static defaultLinkCSSClassFunction;
    /**
     * Renders the nodes (persons and unions), handling enter, update, and exit transitions.
     * @param nodes - The nodes to render.
     * @param previousPosition - Optional previous position for transitions.
     * @param newPosition - Optional new position for transitions.
     * @returns The selection of entering node groups.
     */
    private renderNodes;
    /**
     * Renders the links as SVG paths, handling enter, update, and exit transitions.
     * @param layoutResult - The layout result containing links.
     * @param previousPosition - Optional previous position for transitions.
     * @param newPosition - Optional new position for transitions.
     */
    private renderLinks;
    /**
     * Sets up tooltips for the given node selection.
     * Shows and hides the tooltip div on mouseover/mouseout.
     * @param nodeSelect - The d3 selection containing all nodes.
     */
    private setupTooltips;
    /**
     * Renders multi-line labels for entering nodes.
     * Each line is rendered as a separate <tspan> element.
     * @param enteringNodes - The selection of entering nodes.
     * @param cssClass - CSS class for the text element.
     * @param lineSep - Vertical separation between lines.
     * @param xOffset - Horizontal offset for the text.
     * @param dominantBaseline - SVG dominant-baseline attribute value.
     */
    private renderLabels;
    /**
     * Sorts the DOM elements in the main group so that nodes are drawn on top of links.
     * Ensures correct visual stacking order.
     */
    private sortDomElements;
    /**
     * Main render function. Draws the current layout, updates nodes and links, tooltips, and labels.
     * Also centers the view on the clicked node unless running in JSDOM.
     * @param layoutResult - The layout result to render.
     * @param previousPosition - Optional previous position for transitions.
     * @param newPosition - Optional new position for transitions.
     */
    render(layoutResult: LayoutResult, previousPosition?: Coordinates, newPosition?: Coordinates): void;
    /**
     * Deletes all rendered elements from the SVG.
     */
    clear(): void;
}
