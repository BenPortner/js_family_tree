import type { ClickableNode } from '../src/clickableNode';
import { FamilyTreeDataV1Importer } from '../src/import/familyTreeData';
import { CPerson, CUnion } from '../src/import/types';
import { SimpleFamilyTree } from './fixtures';
import { expect, assert } from 'chai';

let importer: FamilyTreeDataV1Importer;
let nodes: ClickableNode[];
let root: ClickableNode;
let neighbors: ClickableNode[];
let neighborsNeighbors: ClickableNode[];
const numberPersons = Object.keys(SimpleFamilyTree.persons).length;
const numberUnions = Object.keys(SimpleFamilyTree.unions).length;

describe('FamilyTreeDataV1Importer', () => {
  it('creates a FamilyTreeDataV1Importer instance', () => {
    importer = new FamilyTreeDataV1Importer();
    expect(importer).to.be.instanceOf(FamilyTreeDataV1Importer);
  });
  it('imports a simple family tree', () => {
    expect(importer).to.have.property('import');
    nodes = importer.import(SimpleFamilyTree);
  });
  it('imported all nodes', () => {
    expect(nodes).to.have.length(numberPersons + numberUnions);
  });
  it('added valid field: type', () => {
    nodes.forEach((node) => {
      expect(node.data).to.have.property('type');
      expect(node.data.type).to.be.oneOf([CPerson, CUnion]);
    });
  });
  it('added valid field: visible', () => {
    nodes.forEach((node) => {
      expect(node.data).to.have.property('visible');
      expect(node.data.visible).to.be.a('boolean');
    });
  });
  it('added valid field: insertedNodes', () => {
    nodes.forEach((node) => {
      expect(node.data).to.have.property('insertedNodes');
      expect(node.data.insertedNodes).to.be.an('array');
    });
  });
  it('preserved node metadata: id', () => {
    expect(nodes.every((node) => node.data.hasOwnProperty('id'))).to.be.true;
  });
  it('preserved node metadata: name', () => {
    expect(nodes.some((node) => node.data.hasOwnProperty('name'))).to.be.true;
  });
  it('preserved node metadata: birth year', () => {
    expect(nodes.some((node) => node.data.hasOwnProperty('birthyear'))).to.be
      .true;
  });
  it('created a root node', () => {
    root = nodes.find((node) => node.data.visible)!;
    expect(root).not.undefined;
    expect(root.data.type).to.equal(CPerson);
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
      (n) => n.invisibleNeighbors
    );
    neighborsNeighbors = [...new Set(neighborsNeighbors)];
    expect(neighbors).not.empty;
    neighborsNeighbors.forEach((n) =>
      assert(!n.data.visible, `${n} is not invisible`)
    );
  });
  it('all neighbors are unions', () => {
    neighbors.forEach((n) =>
      assert(n.data.type == CUnion, `${n} is not a union`)
    );
  });
  it('throws an error when clicking a union', () => {
    const node = neighbors[0];
    expect(node.click.bind(node)).to.throw();
  });
  it("all neighbors' neighbors are persons", () => {
    neighborsNeighbors.forEach((n) =>
      assert(n.data.type == CPerson, `${n} is not a person`)
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
