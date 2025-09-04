import { FamilyTree } from '../src';
import { ClickableNode } from '../src/clickableNode';
import { CircleFamilyTree } from './fixtures';
import { expect } from 'chai';
import { JSDOM } from 'jsdom';

let ft: FamilyTree;
let p2: ClickableNode;
let p3: ClickableNode;
let p5: ClickableNode;
const dom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`);
const div: HTMLDivElement = dom.window.document.createElement('div');
dom.window.document.body.appendChild(div);

describe('Circular Family Tree', () => {
  it('creates a FamilyTree instance', () => {
    ft = new FamilyTree(CircleFamilyTree, div);
    expect(ft).to.be.instanceOf(FamilyTree);
  });
  it('shows only the root initially', () => {
    const visible = ft.nodes.filter((n) => n.data.visible);
    expect(visible.length).to.equal(1);
    expect(visible[0].data.id).to.equal('p6');
  });
  it('expands when clicking root', () => {
    ft.root.click();
    const visibleIds = ft.nodes
      .filter((n) => n.data.visible)
      .map((n) => n.data.id);
    expect(visibleIds.length).to.equal(4);
    expect(visibleIds).to.contain('p6');
    expect(visibleIds).to.contain('u3');
    expect(visibleIds).to.contain('p3');
    expect(visibleIds).to.contain('p5');
    expect(visibleIds).to.not.contain('u2');
    expect(visibleIds).to.not.contain('p4');
    expect(visibleIds).to.not.contain('p2');
    expect(visibleIds).to.not.contain('u1');
    expect(visibleIds).to.not.contain('p1');
  });
  it('expands further when clicking p5', () => {
    p5 = ft.nodes.find((n) => n.data.id == 'p5') as ClickableNode;
    p5.click();
    const visibleIds = ft.nodes
      .filter((n) => n.data.visible)
      .map((n) => n.data.id);
    expect(visibleIds).to.contain('p6');
    expect(visibleIds).to.contain('u3');
    expect(visibleIds).to.contain('p3');
    expect(visibleIds).to.contain('p5');
    expect(visibleIds).to.contain('u2');
    expect(visibleIds).to.contain('p4');
    expect(visibleIds).to.contain('p2');
    expect(visibleIds).to.not.contain('u1');
    expect(visibleIds).to.not.contain('p1');
  });
  it('expands further when clicking p2', () => {
    p2 = ft.nodes.find((n) => n.data.id == 'p2') as ClickableNode;
    p2.click();
    const visibleIds = ft.nodes
      .filter((n) => n.data.visible)
      .map((n) => n.data.id);
    expect(visibleIds).to.contain('p6');
    expect(visibleIds).to.contain('u3');
    expect(visibleIds).to.contain('p3');
    expect(visibleIds).to.contain('p5');
    expect(visibleIds).to.contain('u2');
    expect(visibleIds).to.contain('p4');
    expect(visibleIds).to.contain('p2');
    expect(visibleIds).to.contain('u1');
    expect(visibleIds).to.contain('p1');
  });
  it("doesn't change when clicking p3", () => {
    p3 = ft.nodes.find((n) => n.data.id == 'p3') as ClickableNode;
    p3.click();
    const visibleIds = ft.nodes
      .filter((n) => n.data.visible)
      .map((n) => n.data.id);
    expect(visibleIds).to.contain('p6');
    expect(visibleIds).to.contain('u3');
    expect(visibleIds).to.contain('p3');
    expect(visibleIds).to.contain('p5');
    expect(visibleIds).to.contain('u2');
    expect(visibleIds).to.contain('p4');
    expect(visibleIds).to.contain('p2');
    expect(visibleIds).to.contain('u1');
    expect(visibleIds).to.contain('p1');
  });
  it('collapses fully when clicking p6', () => {
    ft.root.click();
    const visibleIds = ft.nodes
      .filter((n) => n.data.visible)
      .map((n) => n.data.id);
    expect(visibleIds.length).to.equal(1);
    expect(visibleIds[0]).to.equal('p6');
  });
  it('re-expands when clicking p6 again', () => {
    ft.root.click();
    const visibleIds = ft.nodes
      .filter((n) => n.data.visible)
      .map((n) => n.data.id);
    expect(visibleIds).to.contain('p6');
    expect(visibleIds).to.contain('u3');
    expect(visibleIds).to.contain('p3');
    expect(visibleIds).to.contain('p5');
    expect(visibleIds).to.contain('u2');
    expect(visibleIds).to.contain('p4');
    expect(visibleIds).to.contain('p2');
    expect(visibleIds).to.contain('u1');
    expect(visibleIds).to.contain('p1');
  });
  it('collapses partly when clicking p5', () => {
    p5.click();
    const visibleIds = ft.nodes
      .filter((n) => n.data.visible)
      .map((n) => n.data.id);
    expect(visibleIds).to.contain('p6');
    expect(visibleIds).to.contain('u3');
    expect(visibleIds).to.contain('p3');
    expect(visibleIds).to.contain('p5');
    expect(visibleIds).to.not.contain('u2');
    expect(visibleIds).to.not.contain('p4');
    expect(visibleIds).to.not.contain('p2');
    expect(visibleIds).to.not.contain('u1');
    expect(visibleIds).to.not.contain('p1');
  });
  it('expands partly when clicking p3', () => {
    p3.click();
    const visibleIds = ft.nodes
      .filter((n) => n.data.visible)
      .map((n) => n.data.id);
    expect(visibleIds).to.contain('p6');
    expect(visibleIds).to.contain('u3');
    expect(visibleIds).to.contain('p3');
    expect(visibleIds).to.contain('p5');
    expect(visibleIds).to.not.contain('u2');
    expect(visibleIds).to.not.contain('p4');
    expect(visibleIds).to.contain('p2');
    expect(visibleIds).to.contain('u1');
    expect(visibleIds).to.contain('p1');
  });
  it('expands further when clicking p2', () => {
    p2.click();
    const visibleIds = ft.nodes
      .filter((n) => n.data.visible)
      .map((n) => n.data.id);
    expect(visibleIds).to.contain('p6');
    expect(visibleIds).to.contain('u3');
    expect(visibleIds).to.contain('p3');
    expect(visibleIds).to.contain('p5');
    expect(visibleIds).to.contain('u2');
    expect(visibleIds).to.contain('p4');
    expect(visibleIds).to.contain('p2');
    expect(visibleIds).to.contain('u1');
    expect(visibleIds).to.contain('p1');
  });
  it('collapses when clicking p2 again', () => {
    p2.click();
    const visibleIds = ft.nodes
      .filter((n) => n.data.visible)
      .map((n) => n.data.id);
    expect(visibleIds).to.contain('p6');
    expect(visibleIds).to.contain('u3');
    expect(visibleIds).to.contain('p3');
    expect(visibleIds).to.contain('p5');
    expect(visibleIds).to.not.contain('u2');
    expect(visibleIds).to.not.contain('p4');
    expect(visibleIds).to.contain('p2');
    expect(visibleIds).to.contain('u1');
    expect(visibleIds).to.contain('p1');
  });
  it('collapses fully when clicking p6 again', () => {
    ft.root.click();
    const visibleIds = ft.nodes
      .filter((n) => n.data.visible)
      .map((n) => n.data.id);
    expect(visibleIds.length).to.equal(1);
    expect(visibleIds[0]).to.equal('p6');
  });
  it('re-expands partly when clicking p6 again', () => {
    ft.root.click();
    const visibleIds = ft.nodes
      .filter((n) => n.data.visible)
      .map((n) => n.data.id);
    expect(visibleIds).to.contain('p6');
    expect(visibleIds).to.contain('u3');
    expect(visibleIds).to.contain('p3');
    expect(visibleIds).to.contain('p5');
    expect(visibleIds).to.not.contain('u2');
    expect(visibleIds).to.not.contain('p4');
    expect(visibleIds).to.contain('p2');
    expect(visibleIds).to.contain('u1');
    expect(visibleIds).to.contain('p1');
  });
  it('expands fully when clicking p5 again', () => {
    p5.click();
    const visibleIds = ft.nodes
      .filter((n) => n.data.visible)
      .map((n) => n.data.id);
    expect(visibleIds).to.contain('p6');
    expect(visibleIds).to.contain('u3');
    expect(visibleIds).to.contain('p3');
    expect(visibleIds).to.contain('p5');
    expect(visibleIds).to.contain('u2');
    expect(visibleIds).to.contain('p4');
    expect(visibleIds).to.contain('p2');
    expect(visibleIds).to.contain('u1');
    expect(visibleIds).to.contain('p1');
  });
  it('nothing changes when clicking p2', () => {
    p2.click();
    const visibleIds = ft.nodes
      .filter((n) => n.data.visible)
      .map((n) => n.data.id);
    expect(visibleIds).to.contain('p6');
    expect(visibleIds).to.contain('u3');
    expect(visibleIds).to.contain('p3');
    expect(visibleIds).to.contain('p5');
    expect(visibleIds).to.contain('u2');
    expect(visibleIds).to.contain('p4');
    expect(visibleIds).to.contain('p2');
    expect(visibleIds).to.contain('u1');
    expect(visibleIds).to.contain('p1');
  });
  it('collapses partly when clicking p5 again', () => {
    p5.click();
    const visibleIds = ft.nodes
      .filter((n) => n.data.visible)
      .map((n) => n.data.id);
    expect(visibleIds).to.contain('p6');
    expect(visibleIds).to.contain('u3');
    expect(visibleIds).to.contain('p3');
    expect(visibleIds).to.contain('p5');
    expect(visibleIds).to.not.contain('u2');
    expect(visibleIds).to.not.contain('p4');
    expect(visibleIds).to.contain('p2');
    expect(visibleIds).to.contain('u1');
    expect(visibleIds).to.contain('p1');
  });
  it('expands fully when clicking p2 again', () => {
    p2.click();
    const visibleIds = ft.nodes
      .filter((n) => n.data.visible)
      .map((n) => n.data.id);
    expect(visibleIds).to.contain('p6');
    expect(visibleIds).to.contain('u3');
    expect(visibleIds).to.contain('p3');
    expect(visibleIds).to.contain('p5');
    expect(visibleIds).to.contain('u2');
    expect(visibleIds).to.contain('p4');
    expect(visibleIds).to.contain('p2');
    expect(visibleIds).to.contain('u1');
    expect(visibleIds).to.contain('p1');
  });
});
