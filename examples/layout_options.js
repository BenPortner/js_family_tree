import * as d3 from "d3";
import { data } from "./data/data.js";
import { coordCenter, decrossTwoLayer, layeringCoffmanGraham } from "../js/d3-dag.js";
import FamilyTree from "../js/familytree.js";

// insert svg object to hold the family tree
const svg = d3.select("body").append("svg")
    .attr("width", document.body.offsetWidth)
    .attr("height", document.documentElement.clientHeight);

// make family tree object
let FT = new FamilyTree(data, svg)
    .node_separation([100, 50])
    .layering(layeringCoffmanGraham())
    .decross(decrossTwoLayer)
    .coord(coordCenter());

// draw family tree
FT.draw();
