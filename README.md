# js_family_tree

A javascript example demonstrating interactive family tree visualization and -exploration with [d3-dag](https://github.com/erikbrinkman/d3-dag).

Author: Benjamin W. Portner
License: GNU General Public License v3.0

## Features
The code is based on the d3-collapsible-tree example by d3noob: https://bl.ocks.org/d3noob/43a860bc0024792f8803bba8ca0d5ecd.

Features in the original:
- uses [d3-hierarchy](https://github.com/d3/d3-hierarchy)
- collapsible children nodes
- nice transitions
 
New features:
- uses [d3-dag](https://github.com/erikbrinkman/d3-dag) instead of d3-hierarchy (allows two parents per node)
- introduced union nodes to connect parents and children via common way point
- nodes are collapsible in all directions: children, parents, partners (nodes memorize their dependencies)
- use [d3-tip](https://github.com/caged/d3-tip) to show metadata on hover
