export type NodeID = string;
export type Link = [NodeID, NodeID]; // A link is a tuple of two NodeIDs, where one is a person and the other is a union
export interface Person {
  id?: NodeID;
  name: string;
  birthyear?: number;
  deathyear?: number;
  birthplace?: string;
  deathplace?: string;
}
export interface Union {
  id?: NodeID;
}
export interface FamilyTreeData {
  start: NodeID;
  persons: { [key: NodeID]: Person }; // Map of person IDs to Person objects
  unions: { [key: NodeID]: Union }; // Map of union IDs to Union objects
  links: Link[]; // Array of links between persons and unions
}
