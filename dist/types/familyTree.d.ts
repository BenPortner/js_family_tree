import { type D3DAGLayoutCalculatorOptions } from './layout/d3-dag';
import type { FamilyTreeData, Person, Union } from './familyTreeData';
import { type D3RendererOptions } from './render/d3';
import type { ClickableNode } from './clickableNode';
import type { LayoutCalculator, LayoutedNode } from './layout/types';
import type { Renderer } from './render/types';
import type { Importer } from './import/types';
export interface FamilyTreeOptions extends D3DAGLayoutCalculatorOptions, D3RendererOptions {
    showAll: boolean;
}
export declare class FamilyTree {
    data: FamilyTreeData;
    private _nodes;
    private _root;
    importer: Importer;
    layouter: LayoutCalculator;
    renderer: Renderer;
    constructor(data: FamilyTreeData, container: HTMLElement, opts?: Partial<FamilyTreeOptions>);
    get nodes(): ClickableNode[];
    private set nodes(value);
    get root(): ClickableNode;
    private set root(value);
    private getVisibleSubgraph;
    render(clickedNode?: LayoutedNode): void;
    nodeClickHandler(node: LayoutedNode): void;
    reimportData(): void;
    private getRandomId;
    addPerson(data: Person, render?: boolean): void;
    deletePerson(id: string, render?: boolean): void;
    addUnion(data: Union, render?: boolean): void;
    deleteUnion(id: string, render?: boolean): void;
    addLink(sourceId: string, targetId: string, render?: boolean): void;
    deleteLink(sourceId: string, targetId: string, render?: boolean): void;
}
