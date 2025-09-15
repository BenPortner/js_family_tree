export type NodeID = string;
export type Link = [NodeID, NodeID]; // A link is a tuple of two NodeIDs, where one is a person and the other is a union
export interface Person extends Object {
  id: NodeID;
  name: string;
  birthyear?: number;
  deathyear?: number;
  own_unions?: NodeID[];
  birthplace?: string;
  deathplace?: string;
}
export interface Union {
  id: NodeID;
  partner?: NodeID[]; // IDs of the persons involved in the union
  children?: NodeID[]; // IDs of the children of the union
}
export interface FamilyTreeData {
  start: NodeID;
  persons: { [key: NodeID]: Person }; // Map of person IDs to Person objects
  unions: { [key: NodeID]: Union }; // Map of union IDs to Union objects
  links: Link[]; // Array of links between persons and unions
}
