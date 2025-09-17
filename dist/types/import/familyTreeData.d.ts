import type { FamilyTreeData } from '../familyTreeData';
import { type Importer } from './types';
import { type ClickableNode } from '../clickableNode';
export declare class FamilyTreeDataV1Importer implements Importer {
    import(data: FamilyTreeData): ClickableNode[];
    private buildGraphFromLinks;
    private buildGraphFromParentIds;
}
