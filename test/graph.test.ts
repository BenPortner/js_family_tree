import { ClickableNode } from '../src/graph/clickableNode';
import { D3DAGGraphBuilder } from '../src/graph/d3-dag';
import type { GraphNode } from '../src/graph/types';
import { FamilyTreeDataImporter } from '../src/import/familyTreeData';
import { PersonType, UnionType } from '../src/import/types';
import { SimpleFamilyTree } from './fixtures';
import { expect, assert } from 'chai';

let builder: D3DAGGraphBuilder;
let clickableNodes: ClickableNode[];
let root: ClickableNode;
let neighbors: GraphNode[];
let neighborsNeighbors: GraphNode[];
const numberPersons = Object.keys(SimpleFamilyTree.persons).length;
const numberUnions = Object.keys(SimpleFamilyTree.unions).length;

describe('D3DAGGraphBuilder', () => {
  it('creates a D3DAGGraphBuilder instance', () => {
    builder = new D3DAGGraphBuilder();
    expect(builder).to.be.instanceOf(D3DAGGraphBuilder);
  });
  it('builds a simple family tree', () => {
    expect(builder).to.have.property('buildGraph');
    const importer = new FamilyTreeDataImporter();
    const nodeData = importer.import(SimpleFamilyTree);
    clickableNodes = builder.buildGraph(nodeData);
    expect(clickableNodes).to.have.length(numberPersons + numberUnions);
  });
  it('created a root node', () => {
    root = clickableNodes.find((node) => node.node.data.visible)!;
    expect(root).not.undefined;
    expect(root.node.data.type).to.equal(PersonType);
  });
});

describe('ClickableNode', () => {
  it('has invisible neighbors', () => {
    neighbors = root.invisibleNeighbors;
    expect(neighbors).not.empty;
    neighbors.forEach((n) => assert(!n.data.visible, `${n} is not invisible`));
  });
  it("has invisible neighbors' neighbors", () => {
    neighborsNeighbors = neighbors.flatMap(
      (n) => new ClickableNode(n).invisibleNeighbors
    );
    neighborsNeighbors = [...new Set(neighborsNeighbors)];
    expect(neighbors).not.empty;
    neighborsNeighbors.forEach((n) =>
      assert(!n.data.visible, `${n} is not invisible`)
    );
  });
  it('all neighbors are unions', () => {
    neighbors.forEach((n) =>
      assert(n.data.type == UnionType, `${n} is not a union`)
    );
  });
  it('throws an error when clicking a union', () => {
    const node = new ClickableNode(neighbors[0]);
    expect(node.click.bind(node)).to.throw();
  });
  it("all neighbors' neighbors are persons", () => {
    neighborsNeighbors.forEach((n) =>
      assert(n.data.type == PersonType, `${n} is not a person`)
    );
  });
  it("makes neighbors and neighbors' neighbors visible when clicked", () => {
    root.click();
    neighbors.forEach((n) => {
      assert(n.data.visible, `${n} is not visible`);
    });
    neighborsNeighbors.forEach((n) => {
      assert(n.data.visible, `${n} is not visible`);
    });
  });
});
