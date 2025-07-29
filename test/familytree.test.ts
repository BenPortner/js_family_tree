import { FamilyTree } from '../src';
import { SimpleFamilyTree } from './fixtures';
import { expect } from 'chai';
import { JSDOM } from "jsdom";

let ft: FamilyTree;
const dom = new JSDOM(`<!DOCTYPE html><body></body>`);
const div: HTMLDivElement = dom.window.document.createElement("div");

describe('FamilyTree', () => {
  it('creates a FamilyTree instance', () => {
    ft = new FamilyTree(SimpleFamilyTree, div);
    expect(ft).to.be.instanceOf(FamilyTree);
  });
  it('getNodeById works', () => {
    const rootId = SimpleFamilyTree.start;
    expect(ft.getNodeById(rootId)).not.undefined;
  });
});