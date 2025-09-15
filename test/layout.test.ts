import { FamilyTreeDataV1Importer } from '../src/import/familyTreeData';
import { D3DAGLayoutCalculator } from '../src/layout/d3-dag';
import { Horizontal, LayoutResult, Vertical } from '../src/layout/types';
import { SimpleFamilyTree } from './fixtures';
import { expect } from 'chai';

let calculator: D3DAGLayoutCalculator;
let layoutResult: LayoutResult;
const numberPersons = Object.keys(SimpleFamilyTree.persons).length;
const numberUnions = Object.keys(SimpleFamilyTree.unions).length;
const numberLinks = Object.keys(SimpleFamilyTree.links).length;

describe('D3DAGLayoutCalculator', () => {
  it('creates a D3DAGLayoutCalculator instance', () => {
    calculator = new D3DAGLayoutCalculator();
    expect(calculator).to.be.instanceOf(D3DAGLayoutCalculator);
  });
  it('layouts a simple family tree', () => {
    const importer = new FamilyTreeDataV1Importer();
    const clickableNodes = importer.import(SimpleFamilyTree);
    for (let n of clickableNodes) n.data.visible = true;
    layoutResult = calculator.calculateLayout(clickableNodes);
    expect(layoutResult).not.undefined;
  });
  it('result has a valid orientation', () => {
    // orientation
    expect(layoutResult).to.haveOwnProperty('orientation');
    expect(layoutResult.orientation).to.be.oneOf([Horizontal, Vertical]);
  });
  it('result contains the graph', () => {
    // graph
    expect(layoutResult.nodes).to.have.length(
      numberPersons + numberUnions
    );
    expect(layoutResult.links).to.have.length(numberLinks);
  });
  it('assigned x and y coordinates to all nodes', () => {
    layoutResult.nodes.forEach((n) => {
      expect(n.x).greaterThan(0);
      expect(n.y).greaterThan(0);
    });
  });
  it('assigned source and target to all links', () => {
    layoutResult.links.forEach((l) => {
      expect(layoutResult.nodes).to.include(l.source);
      expect(layoutResult.nodes).to.include(l.target);
    });
  });
  it('defaults to horizontal layout', () => {
    layoutResult.nodes.forEach((node) => {
      // expect child.x > parent.x for all children
      const children_x = [...node.children()].map((c) => c.x);
      expect(children_x.every((cx) => cx > node.x)).to.be.true;
    });
  });
  it('can be set to vertical layout', () => {
    calculator = new D3DAGLayoutCalculator({ orientation: Vertical });
    const importer = new FamilyTreeDataV1Importer();
    const clickableNodes = importer.import(SimpleFamilyTree);
    for (let n of clickableNodes) n.data.visible = true;
    layoutResult = calculator.calculateLayout(clickableNodes);
    expect(layoutResult.orientation).to.equal(Vertical);
    layoutResult.nodes.forEach((node) => {
      // expect child.y > parent.y for all children
      const children_y = [...node.children()].map((c) => c.y);
      expect(children_y.every((cy) => cy > node.y)).to.be.true;
    }); 
  });
});
