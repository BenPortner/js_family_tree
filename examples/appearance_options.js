import * as d3 from "d3";
import { data } from "./data/data.js";
import FamilyTree from "../js/familytree.js";

// insert svg object to hold the family tree
const svg = d3.select("body").append("svg")
    .attr("width", document.body.offsetWidth)
    .attr("height", document.documentElement.clientHeight);

// make family tree object
let FT = new FamilyTree(data, svg)
    .tooltip(node => node.data.birthyear) // change tooltips: show only birth year
    .node_label(node => node.is_union() ? null : node.data.name) // change node labels: show only names
    .node_size(node => node.is_union() ? 0 : 5) // change node size to 5 px
    .node_class(node => node.is_union() ? null : "node-black") // change node css class to "node-black"
    .transition_duration(0); // switch off animations

// draw family tree
FT.draw();
