import { graphConnect } from 'd3-dag';
import type { FamilyTreeData } from '../familyTreeData';
import {
  CPerson,
  CUnion,
  type Importer,
  type Graph,
  type UnionData,
  type PersonData,
} from './types';
import { augmentD3DAGNodeClass, type ClickableNode } from '../clickableNode';

export class FamilyTreeDataV1Importer implements Importer {
  import(data: FamilyTreeData) {
    const builder = graphConnect().nodeDatum((id) => {
      if (id in data.persons) {
        return {
          ...data.persons[id],
          type: CPerson,
          visible: id == data.start,
          insertedBy: null,
        } as PersonData;
      } else if (id in data.unions) {
        return {
          ...data.unions[id],
          type: CUnion,
          visible: false,
          insertedBy: null,
        } as UnionData;
      } else {
        throw Error(`ID '${id}' not found in data.persons or data.unions.`);
      }
    });
    const graph = builder(data.links) as Graph;
    const nodes = [...graph.nodes()];
    // add custom methods (augment)
    augmentD3DAGNodeClass(nodes[0]);
    return nodes as ClickableNode[];
  }
}
