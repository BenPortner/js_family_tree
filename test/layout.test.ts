import { D3DAGGraphBuilder } from '../src/graph/d3-dag';
import { FamilyTreeDataImporter } from '../src/import/familyTreeData';
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
    const importer = new FamilyTreeDataImporter();
    const nodeData = importer.import(SimpleFamilyTree);
    const builder = new D3DAGGraphBuilder();
    const clickableNodes = builder.buildGraph(nodeData);
    const visibleNodes = clickableNodes.map((n) => {
      // show all nodes
      return { ...n.data, visible: true };
    });
    layoutResult = calculator.calculateLayout(visibleNodes);
    expect(layoutResult).not.undefined;
  });
  it('result contains width and height of the canvas', () => {
    // width and height
    expect(layoutResult).to.haveOwnProperty('width');
    expect(layoutResult.width).to.be.greaterThan(0);
    expect(layoutResult).to.haveOwnProperty('height');
    expect(layoutResult.height).to.be.greaterThan(0);
    expect(layoutResult).to.haveOwnProperty('graph');
  });
  it('result has a valid orientation', () => {
    // orientation
    expect(layoutResult).to.haveOwnProperty('orientation');
    expect(layoutResult.orientation).to.be.oneOf([Horizontal, Vertical]);
  });
  it('result contains the graph', () => {
    // graph
    expect([...layoutResult.graph.nodes()]).to.have.length(
      numberPersons + numberUnions
    );
    expect([...layoutResult.graph.links()]).to.have.length(numberLinks);
  });
  it('assigned x and y coordinates to all nodes', () => {
    [...layoutResult.graph.nodes()].forEach((n) => {
      expect(n.x).greaterThan(0);
      expect(n.y).greaterThan(0);
    });
  });
  it('assigned source and target to all links', () => {
    const nodes = [...layoutResult.graph.nodes()];
    [...layoutResult.graph.links()].forEach((l) => {
      expect(nodes).to.include(l.source);
      expect(nodes).to.include(l.target);
    });
  });
  it('defaults to horizontal layout', () => {
    const nodes = [...layoutResult.graph.nodes()];
    nodes.forEach((node) => {
      // expect child.x > parent.x for all children
      const children_x = [...node.children()].map(c => c.x);
      expect(children_x.every(cx => cx > node.x)).to.be.true;
    })
  });
});
