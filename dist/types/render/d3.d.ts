import { type Coordinates, type LayoutResult, type LayoutedLink, type LayoutedNode, type Orientation } from '../layout/types';
import type { Renderer } from './types';
import type { FamilyTree } from '../familyTree';
export interface D3RendererOptions {
    transitionDuration: number;
    linkPathFunction(link: CoordLink, orientation: Orientation): string;
    linkCSSClassFunction(link: LayoutedLink): string;
    nodeClickFunction(node: LayoutedNode, ft: FamilyTree): void;
    nodeCSSClassFunction(node: LayoutedNode): string;
    nodeLabelFunction(node: LayoutedNode, missingData?: string): string[];
    nodeSizeFunction(node: LayoutedNode): number;
    nodeTooltipFunction(node: LayoutedNode, missingData?: string): string | undefined;
}
export interface CoordLink {
    source: Coordinates;
    target: Coordinates;
}
export declare class D3Renderer implements Renderer {
    private _container;
    private svg;
    private g;
    private tooltipDiv;
    private zoom;
    private ft;
    opts: D3RendererOptions;
    constructor(container: HTMLElement, ft: FamilyTree, opts?: Partial<D3RendererOptions>);
    get container(): HTMLElement;
    set container(c: HTMLElement);
    private get isJSDOM();
    private initializeContainer;
    private static defaultLinkPathFunction;
    private static defaultNodeClickFunction;
    private static defaultNodeLabelFunction;
    private static defaultNodeTooltipFunction;
    private static defaultNodeSizeFunction;
    private static defaultNodeCSSClassFunction;
    private static defaultLinkCSSClassFunction;
    private renderNodes;
    private renderLinks;
    private setupTooltips;
    private renderLabels;
    private sortDomElements;
    render(layoutResult: LayoutResult, previousPosition?: Coordinates, newPosition?: Coordinates): void;
    clear(): void;
}
