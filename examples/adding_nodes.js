import * as d3 from "d3";
import { data } from "./data/data.js";
import FamilyTree from "../js/familytree.js";

// insert svg object to hold the family tree
const svg = d3.select("body").append("svg")
    .attr("width", document.body.offsetWidth)
    .attr("height", document.documentElement.clientHeight);

// make family tree object
let FT = new FamilyTree(data, svg);

// add children
const own_union = FT.root.add_own_union({});
own_union.add_child({
    "name": "Dan's first child",
    "birthyear": 1950
});
own_union.add_child({
    "name": "Dan's second child",
    "birthyear": 1952
});

// add partner
own_union.add_parent({
    "name": "Dan's wife",
    "birthyear": 1930,
})

// add parents
const parent_union = FT.root.add_parent_union({});
parent_union.add_parent({
    "name": "Dan's Father",
    "birthyear": 1900,
    "deathyear": 1990,
});
parent_union.add_parent({
    "name": "Dan's Mother",
    "birthyear": 1902,
    "deathyear": 2000,
});

// add siblings
parent_union.add_child({
    "name": "Dan's brother",
    "birthyear": 1928,
});
parent_union.add_child({
    "name": "Dan's sister",
    "birthyear": 1930,
});

// draw family tree
FT.draw();
