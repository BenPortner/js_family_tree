import type { Layering, Decross, Coord, NodeSize } from 'd3-dag';
import type { ClickableNode } from '../clickableNode';
import type { LayoutResult, LayoutCalculator, Orientation, LayoutCalculatorOpts } from './types';
import type { LinkData } from '../import/types';
/**
 * Options for configuring the D3DAGLayoutCalculator.
 * Extends the base LayoutCalculatorOpts and adds D3-DAG specific options.
 */
export interface D3DAGLayoutCalculatorOptions extends LayoutCalculatorOpts {
    /** Function to determine the size of each node. */
    nodeSize: NodeSize<ClickableNode, LinkData>;
    /** Layering algorithm for the layout. */
    layering: Layering<ClickableNode, LinkData>;
    /** Decrossing algorithm to reduce edge crossings. */
    decross: Decross<ClickableNode, LinkData>;
    /** Coordinate assignment algorithm for node placement. */
    coord: Coord<ClickableNode, LinkData>;
    /** Orientation of the layout (horizontal or vertical). */
    orientation: Orientation;
}
/**
 * Layout calculator using d3-dag's Sugiyama algorithm.
 * Responsible for computing node and link positions for the
 * family tree visualization.
 */
export declare class D3DAGLayoutCalculator implements LayoutCalculator {
    /**
     * Default options for configuring the layout algorithm.
     * Can be overwritten by passing `opts` argument to the
     * `D3DAGLayoutCalculator` constructor.
     */
    opts: D3DAGLayoutCalculatorOptions;
    constructor(opts?: Partial<D3DAGLayoutCalculatorOptions>);
    /**
     * Calculates the layout for the given nodes.
     * Builds a temporary graph from the visible nodes, applies the Sugiyama layout,
     * and writes the computed x/y coordinates back to the nodes.
     */
    calculateLayout(nodes: ClickableNode[]): LayoutResult;
}
