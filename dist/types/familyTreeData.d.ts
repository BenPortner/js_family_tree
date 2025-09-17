export type NodeID = string;
export type Link = [NodeID, NodeID];
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
    partner?: NodeID[];
    children?: NodeID[];
}
export interface FamilyTreeData {
    start: NodeID;
    persons: {
        [key: NodeID]: Person;
    };
    unions: {
        [key: NodeID]: Union;
    };
    links: Link[];
}
