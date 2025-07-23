import type { FamilyTreeData, Person, Union } from './types/types';
import * as d3dag from 'd3-dag';

export interface PersonData extends Person {
  type: 'person';
  parentIds: string[];
}
export interface PersonNode extends d3dag.MutGraphNode<PersonData, undefined> {}
export interface UnionData extends Union {
  type: 'union';
  parentIds: string[];
}
export interface UnionNode extends d3dag.MutGraphNode<UnionData, undefined> {}
export type NodeDatum = PersonData | UnionData;
export type LinkDatum = undefined;
export interface Node extends d3dag.MutGraphNode<NodeDatum, LinkDatum> {}
export interface Link extends d3dag.MutGraphLink<NodeDatum, LinkDatum> {}

export interface D3DAGAdapterOptions {
  nodeSize: [number, number];
  layering: d3dag.Layering<NodeDatum, LinkDatum>;
  decross: d3dag.Decross<NodeDatum, LinkDatum>;
  coord: d3dag.Coord<NodeDatum, LinkDatum>;
}

function customSugiyamaDecross(
  layers: d3dag.SugiNode<NodeDatum>[][]
): void {
  // apply optimal decrossing algorithm
  d3dag.decrossOpt()(layers);
  // then re-arrange to make sure that union partners are next to each other
  for (let layer of layers) {
    layer.sort((a, b) => {
      if (a.data.role === 'link') return 0;
      if (b.data.role === 'link') return 0;
      if (a.data.node.data.type === 'union') return 0;
      if (b.data.node.data.type === 'union') return 0;
      const aPerson = a.data.node.data as PersonData;
      const bPerson = b.data.node.data as PersonData;
      if (aPerson.own_unions?.length === 0) return 1;
      if (bPerson.own_unions?.length === 0) return -1;
      return 0;
    });
  }
}

const D3DAGAdapterDefaultOptions: D3DAGAdapterOptions = {
  nodeSize: [120, 120],
  layering: d3dag.layeringSimplex(),
  decross: customSugiyamaDecross,
  coord: d3dag.coordQuad(),
};

export class D3DAGAdapter {
  public graph;
  private _width: number = 0;
  private _height: number = 0;

  constructor(data: FamilyTreeData, userOpts?: D3DAGAdapterOptions) {
    const opts = {
      ...D3DAGAdapterDefaultOptions,
      ...userOpts,
    };
    const persons = [...Object.values(data.persons)];
    const mappedPersons = persons.map((person: Person) => {
      return {
        ...person,
        type: 'person',
        parentIds: data.links
          .filter((link) => link[1] === person.id)
          .map((link) => link[0]),
      } as PersonData;
    });
    const unions = [...Object.values(data.unions)];
    const mappedUnions = unions.map((union) => {
      return {
        ...union,
        type: 'union',
        parentIds: union.partner,
      } as UnionData;
    });
    const nodes = [...mappedPersons, ...mappedUnions];
    // const builder = d3dag.graphConnect();
    // this.graph = builder(data.links);
    const builder = d3dag.graphStratify();
    this.graph = builder(nodes);
    // calculate the layout
    const layout = d3dag
      .sugiyama()
      .nodeSize(opts.nodeSize)
      .layering(opts.layering)
      .decross(opts.decross)
      .coord(opts.coord)
    const layoutResult = layout(this.graph);
    this._width = layoutResult.width;
    this._height = layoutResult.height;
  }

  get width() {
    return this._width;
  }
  get height() {
    return this._height;
  }
}
