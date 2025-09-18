export type NodeID = string;
export type Link = [NodeID, NodeID];
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
    persons: {
        [key: NodeID]: Person;
    };
    unions: {
        [key: NodeID]: Union;
    };
    links: Link[];
}
