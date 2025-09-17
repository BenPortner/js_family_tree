import type { Layering, Decross, Coord, NodeSize } from 'd3-dag';
import type { ClickableNode } from '../clickableNode';
import type { LayoutResult, LayoutCalculator, Orientation, LayoutCalculatorOpts } from './types';
import type { LinkData } from '../import/types';
export interface D3DAGLayoutCalculatorOptions extends LayoutCalculatorOpts {
    nodeSize: NodeSize<ClickableNode, LinkData>;
    layering: Layering<ClickableNode, LinkData>;
    decross: Decross<ClickableNode, LinkData>;
    coord: Coord<ClickableNode, LinkData>;
    orientation: Orientation;
}
export declare class D3DAGLayoutCalculator implements LayoutCalculator {
    opts: D3DAGLayoutCalculatorOptions;
    constructor(opts?: Partial<D3DAGLayoutCalculatorOptions>);
    calculateLayout(nodes: ClickableNode[]): LayoutResult;
}
