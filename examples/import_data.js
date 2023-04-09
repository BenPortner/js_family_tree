import * as d3 from "d3";
import { data } from "./data/data.js";
import FamilyTree from "../js/familytree.js";

// insert svg object to hold the family tree
const svg = d3.select("body").append("svg")
    .attr("width", document.body.offsetWidth)
    .attr("height", document.documentElement.clientHeight);

// make family tree object
let FT = new FamilyTree(data, svg);

// draw family tree
FT.draw();

// change data after two seconds
// TODO: DO DIFFERENTLY
// setTimeout(_ => FT.load_data("https://cdn.jsdelivr.net/gh/BenPortner/js_family_tree/data/data_simple.js"), 2000);
