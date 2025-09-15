import { graphConnect, graphStratify } from 'd3-dag';
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
  import(data: FamilyTreeData): ClickableNode[] {
    let graph: Graph;
    if (data.links && data.links.length > 0) {
      graph = this.buildGraphFromLinks(data);
    } else {
      graph = this.buildGraphFromParentIds(data);
    }
    const nodes = [...graph.nodes()];
    // add custom methods (augment)
    augmentD3DAGNodeClass(nodes[0]);
    return nodes as ClickableNode[];
  }

  private buildGraphFromLinks(data: FamilyTreeData) {
    const builder = graphConnect().nodeDatum((id) => {
      if (id in data.persons) {
        const person = data.persons[id];
        Object.assign(person, {
          id: id,
          type: CPerson,
          visible: (person as PersonData).visible ?? id == data.start,
          insertedBy: (person as PersonData).insertedBy ?? null,
        });
        return person as PersonData;
      } else if (id in data.unions) {
        const union = data.unions[id];
        Object.assign(union, {
          ...data.unions[id],
          id: id,
          type: CUnion,
          visible: (union as UnionData).visible ?? false,
          insertedBy: (union as UnionData).insertedBy ?? null,
        });
        return union as UnionData;
      } else {
        throw Error(`ID '${id}' not found in data.persons or data.unions.`);
      }
    });
    return builder(data.links) as Graph;
  }

  private buildGraphFromParentIds(data: FamilyTreeData) {
    const builder = graphStratify();
    const personArr = Object.entries(data.persons).map(([id, person]) => {
      Object.assign(person, {
        id: id,
        type: CPerson,
        visible: (person as PersonData).visible ?? id == data.start,
        insertedBy: (person as PersonData).insertedBy ?? null,
      });
      return person as PersonData;
    });
    const unionArr = Object.entries(data.unions).map(([id, union]) => {
      Object.assign(union, {
        id: id,
        type: CUnion,
        visible: (union as UnionData).visible ?? false,
        insertedBy: (union as UnionData).insertedBy ?? null,
      });
      return union as UnionData;
    });
    const allNodes = [...personArr, ...unionArr];
    return builder(allNodes) as Graph;
  }
}
