import { FamilyTree } from '../src';
import { SingleParentFamilyTree } from './fixtures';
import { expect } from 'chai';
import { JSDOM } from 'jsdom';

let ft: FamilyTree;
const dom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`);
const div: HTMLDivElement = dom.window.document.createElement('div');
dom.window.document.body.appendChild(div);

describe('Single Parent Family Tree', () => {
  it('creates a FamilyTree instance', () => {
    ft = new FamilyTree(SingleParentFamilyTree, div);
    expect(ft).to.be.instanceOf(FamilyTree);
  });
  it('shows only the root initially', () => {
    const visible = ft.nodes.filter((n) => n.data.visible);
    expect(visible.length).to.equal(1);
    expect(visible[0].data.id).to.equal('id4');
  });
  it('expands when clicking root', () => {
    ft.root.click();
    const visibleIds = ft.nodes
      .filter((n) => n.data.visible)
      .map((n) => n.data.id);
    expect(visibleIds).to.contain('id4');
    expect(visibleIds).to.contain('id3');
    expect(visibleIds).to.contain('id5');
    expect(visibleIds).to.contain('id6');
    expect(visibleIds).to.contain('u3');
    expect(visibleIds).to.contain('u4');
    expect(visibleIds).to.not.contain('id2');
    expect(visibleIds).to.not.contain('u2');
    expect(visibleIds).to.not.contain('id1');
    expect(visibleIds).to.not.contain('u1');
  });
  it('expands further when clicking id3', () => {
    const id3 = ft.nodes.find((n) => n.data.id == 'id3');
    id3?.click();
    const visibleIds = ft.nodes
      .filter((n) => n.data.visible)
      .map((n) => n.data.id);
    expect(visibleIds).to.contain('id4');
    expect(visibleIds).to.contain('id3');
    expect(visibleIds).to.contain('id5');
    expect(visibleIds).to.contain('id6');
    expect(visibleIds).to.contain('u3');
    expect(visibleIds).to.contain('u4');
    expect(visibleIds).to.contain('id2');
    expect(visibleIds).to.contain('u2');
    expect(visibleIds).to.not.contain('id1');
    expect(visibleIds).to.not.contain('u1');
  });
  it('expands further when clicking id2', () => {
    const id2 = ft.nodes.find((n) => n.data.id == 'id2');
    id2?.click();
    const visibleIds = ft.nodes
      .filter((n) => n.data.visible)
      .map((n) => n.data.id);
    expect(visibleIds).to.contain('id4');
    expect(visibleIds).to.contain('id3');
    expect(visibleIds).to.contain('id5');
    expect(visibleIds).to.contain('id6');
    expect(visibleIds).to.contain('u3');
    expect(visibleIds).to.contain('u4');
    expect(visibleIds).to.contain('id2');
    expect(visibleIds).to.contain('u2');
    expect(visibleIds).to.contain('id1');
    expect(visibleIds).to.contain('u1');
  });
  it('collapses completely when clicking root again', () => {
    ft.root.click();
    const visibleIds = ft.nodes
      .filter((n) => n.data.visible)
      .map((n) => n.data.id);
    expect(visibleIds.length).to.equal(1);
    expect(visibleIds).to.contain('id4');
  });
});
