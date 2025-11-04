import { FamilyTree } from '../src';
import { NoNodesFamilyTree } from './fixtures';
import { expect } from 'chai';
import { JSDOM } from 'jsdom';

let ft: FamilyTree;
const dom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`);
const div: HTMLDivElement = dom.window.document.createElement('div');
dom.window.document.body.appendChild(div);

describe('Create family tree without nodes', () => {
  it('creates a FamilyTree instance', () => {
    ft = new FamilyTree(NoNodesFamilyTree, div);
    expect(ft).to.be.instanceOf(FamilyTree);
  });
  it('has no nodes', () => {
    expect(ft.nodes.length).to.equal(0);
  });
  it('has no root', () => {
    expect(ft.root).to.be.undefined;
  });
  it('can add a node', () => {
    ft.addPerson({ id: 'p1', name: 'Person 1' });
    expect(ft.nodes.length).to.equal(1);
    const p1 = ft.nodes.find((n) => n.data.id === 'p1');
    expect(p1).to.not.be.undefined;
    expect(p1?.data.visible).to.be.true;
  });
  it('root is set correctly', () => {
    expect(ft.root).to.not.be.undefined;
    expect(ft.root!.data.id).to.equal('p1');
  });
  it('can add another node', () => {
    ft.addPerson({ id: 'p2', name: 'Person 2' });
    expect(ft.nodes.length).to.equal(2);
    const p2 = ft.nodes.find((n) => n.data.id === 'p2');
    expect(p2).to.not.be.undefined;
    expect(p2?.data.visible).to.be.true;
  });
  it('can link the nodes', () => {
    ft.addLink('p1', 'p2');
    const p1 = ft.nodes.find((n) => n.data.id === 'p1');
    const p2 = ft.nodes.find((n) => n.data.id === 'p2');
    expect(p1?.visibleNeighbors).to.include(p2);
    expect(p2?.visibleNeighbors).to.include(p1);
  });
});
