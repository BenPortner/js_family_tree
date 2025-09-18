import type { FamilyTreeData } from '../familyTreeData';
import { type Importer } from './types';
import { type ClickableNode } from '../clickableNode';
/**
 * Imports family tree data (declarations see [familyTreeData](src/familyTreeData.ts))
 * and converts it into a graph of `ClickableNodes`.
 */
export declare class FamilyTreeDataV1Importer implements Importer {
    /**
     * Imports the provided family tree data and returns an array of ClickableNodes.
     * The graph is constructed from the
     * `links` array of the `data` object by default. If no links are found, the `parentIds`
     * fields of each `person` and `union` are used as a fallback. Uses JavaScript's
     * prototype augmentation feature to add methods to `d3-dag`'s native node class.
     */
    import(data: FamilyTreeData): ClickableNode[];
    /**
     * Builds a graph from the provided data using the links array.
     * Each node is assigned its type, id, visibility, and insertedBy fields.
     */
    private buildGraphFromLinks;
    /**
     * Builds a graph from the provided data using parentId relationships.
     * Each node is assigned its type, id, visibility, and insertedBy fields.
     */
    private buildGraphFromParentIds;
}
