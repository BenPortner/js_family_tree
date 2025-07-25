import type { NodeID, Person, Union } from '../familyTreeData';

export const PersonType = 'person' as const;
export const UnionType = 'union' as const;

export interface PersonData extends Person {
  type: typeof PersonType;
  parentIds: NodeID[];
  visible: boolean;
}
export interface UnionData extends Union {
  type: typeof UnionType;
  parentIds: NodeID[];
  visible: boolean;
}
export type NodeData = PersonData | UnionData;
export type LinkData = undefined;

export interface Importer {
  import(data: any): NodeData[];
}
