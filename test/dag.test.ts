import { D3DAGAdapter } from "../src/dag";
import { SimpleFamilyTree } from "./fixtures";
import { expect } from "chai";

let dag: D3DAGAdapter;
const numberPersons = Object.keys(SimpleFamilyTree.persons).length;
const numberUnions = Object.keys(SimpleFamilyTree.unions).length;
const numberLinks = SimpleFamilyTree.links.length;

describe("D3DAGAdapter", () => {
  it("should create a D3DAGAdapter instance", () => {
    dag = new D3DAGAdapter(SimpleFamilyTree);
    expect(dag).to.be.instanceOf(D3DAGAdapter);
  });
  it("should have a graph property", () => {
    expect(dag.graph).not.undefined;
  });
  it("should contain all nodes and links", () => {
    expect(dag.graph.nlinks()).to.equal(numberLinks);
    expect(dag.graph.nnodes()).to.equal(numberPersons + numberUnions);
  });
  it("should contain coordinates for all nodes", () => {
    const nodes = [...dag.graph.nodes()];
    nodes.forEach((node) => {
      expect(node).to.have.property("x");
      expect(node).to.have.property("y");
      expect(node.x).to.be.a("number");
      expect(node.y).to.be.a("number");
    });
  });
  it("should contain node metadata", () => {
    const nodes = [...dag.graph.nodes()];
    nodes.forEach((node) => {
      expect(node).to.have.property("data");
      const data = node.data;
      expect(data).to.have.property("id");
      expect(data).to.have.property("type");
      if (data.type === "person") {
        expect(data).to.have.property("name");
        expect(data).to.have.property("birthyear");
      }
      if (data.type === "union") {
        expect(data).to.have.property("partner");
        expect(data).to.have.property("children");
      }
    });
  });
  it("should have horizontal layout", () => {
    const nodes = [...dag.graph.nodes()];
    nodes.forEach((node) => {
      // expect child.x > parent.x for all children
      const children_x = [...node.children()].map(c => c.x);
      expect(children_x.every(cx => cx > node.x)).to.be.true;
    })
  })
});
