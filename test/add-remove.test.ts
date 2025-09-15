import { FamilyTree } from '../src';
import { ClickableNode } from '../src/clickableNode';
import { AddRemoveFamilyTree } from './fixtures';
import { expect } from 'chai';
import { JSDOM } from 'jsdom';

let ft: FamilyTree;
const dom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`);
const div: HTMLDivElement = dom.window.document.createElement('div');
dom.window.document.body.appendChild(div);

describe('Add & remove nodes dynamically', () => {
  it('creates a FamilyTree instance', () => {
    ft = new FamilyTree(AddRemoveFamilyTree, div);
    expect(ft).to.be.instanceOf(FamilyTree);
  });
  it('has the correct number of nodes', () => {
    expect(ft.nodes.length).to.equal(1);
  });
  it('root is visible', () => {
    expect(ft.root.data.visible).to.be.true;
  });
  it('adds a person node', () => {
    ft.addPerson({ id: 'p2', name: 'Person 2' });
    expect(ft.nodes.length).to.equal(2);
    const p2 = ft.nodes.find((n) => n.data.id === 'p2');
    expect(p2).to.not.be.undefined;
    expect(p2?.data.visible).to.be.true;
  });
  it('adds a union node', () => {
    ft.addUnion({ id: 'u1' });
    expect(ft.nodes.length).to.equal(3);
    const u1 = ft.nodes.find((n) => n.data.id === 'u1');
    expect(u1).to.not.be.undefined;
    expect(u1?.data.visible).to.be.true;
  });
  it('adds links', () => {
    ft.addLink('p1', 'u1');
    ft.addLink('u1', 'p2');
    expect(ft.nodes.length).to.equal(3);
    const p1 = ft.nodes.find((n) => n.data.id === 'p1');
    const p2 = ft.nodes.find((n) => n.data.id === 'p2');
    const u1 = ft.nodes.find((n) => n.data.id === 'u1');
    expect(p1?.visibleNeighbors).to.include(u1);
    expect(p2?.visibleNeighbors).to.include(u1);
    expect(u1?.visibleNeighbors).to.include(p1);
    expect(u1?.visibleNeighbors).to.include(p2);
  });
  it('removes the union', () => {
    ft.deleteUnion('u1');
    expect(ft.nodes.length).to.equal(2);
    const p1 = ft.nodes.find((n) => n.data.id === 'p1');
    const p2 = ft.nodes.find((n) => n.data.id === 'p2');
    const u1 = ft.nodes.find((n) => n.data.id === 'u1');
    expect(u1).to.be.undefined;
    expect(p1?.visibleNeighbors).to.have.lengthOf(0);
    expect(p2?.visibleNeighbors).to.have.lengthOf(0);
  });
  it('removes person 2', () => {
    ft.deletePerson('p2');
    expect(ft.nodes.length).to.equal(1);
    const p2 = ft.nodes.find((n) => n.data.id === 'p2');
    expect(p2).to.be.undefined;
  });
});
