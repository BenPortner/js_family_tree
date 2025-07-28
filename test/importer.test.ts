import { FamilyTreeDataImporter } from '../src/import/familyTreeData';
import { type NodeData, PersonType, UnionType } from '../src/import/types';
import { SimpleFamilyTree } from './fixtures';
import { expect } from 'chai';

let importer: FamilyTreeDataImporter;
let nodeData: NodeData[];
const allNodes = { ...SimpleFamilyTree.persons, ...SimpleFamilyTree.unions };
const allIds = Object.keys(allNodes);
const numberPersons = Object.keys(SimpleFamilyTree.persons).length;
const numberUnions = Object.keys(SimpleFamilyTree.unions).length;

describe('FamilyTreeDataImporter', () => {
  it('creates a FamilyTreeDataImporter instance', () => {
    importer = new FamilyTreeDataImporter();
    expect(importer).to.be.instanceOf(FamilyTreeDataImporter);
  });
  it('imports a simple family tree', () => {
    expect(importer).to.have.property('import');
    nodeData = importer.import(SimpleFamilyTree);
  });
  it('imported all nodes', () => {
    expect(nodeData).to.have.length(numberPersons + numberUnions);
  });
  it('added valid field: type', () => {
    nodeData.forEach((node) => {
      expect(node).to.have.property('type');
      expect(node.type).to.be.oneOf([PersonType, UnionType]);
    });
  });
  it('added valid field: visible', () => {
    nodeData.forEach((node) => {
      expect(node).to.have.property('visible');
      expect(node.visible).to.be.a('boolean');
    });
  });
  it('added valid field: parentIds', () => {
    nodeData.forEach((node) => {
      expect(node).to.have.property('parentIds');
      expect(node.parentIds).to.be.an('array');
      // every parentId should refer to an existing node
      node.parentIds.forEach((id) => expect(allIds).to.include(id));
    });
  });
  it('preserved node metadata: id', () => {
    expect(nodeData.every((node) => node.hasOwnProperty('id'))).to.be.true;
  });
  it('preserved node metadata: name', () => {
    expect(nodeData.some((node) => node.hasOwnProperty('name'))).to.be.true;
  });
  it('preserved node metadata: birth year', () => {
    expect(nodeData.some((node) => node.hasOwnProperty('birthyear'))).to.be
      .true;
  });
});
