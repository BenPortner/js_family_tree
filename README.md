# js_family_tree

Interactive family tree visualization and -exploration with [d3-dag](https://github.com/erikbrinkman/d3-dag).

Author: Benjamin W. Portner

License: GNU General Public License v3.0

[Live example here.](https://rawcdn.githack.com/BenPortner/js_family_tree/b29b76fb604ef2e51a9360819ca13f2ab0060cb6/familytree.html)  (Kudos to [Pavel Puchkin](https://neoascetic.me/) from [githack.com](https://raw.githack.com/) for prividing the chaching proxy!)

## Features
The code is based on the [collapsible d3 tree example](https://bl.ocks.org/d3noob/43a860bc0024792f8803bba8ca0d5ecd) by d3noob.

Features in the original:
- uses [d3-hierarchy](https://github.com/d3/d3-hierarchy)
- collapsible children nodes
- nice transitions
 
New features:
- uses [d3-dag](https://github.com/erikbrinkman/d3-dag) instead of d3-hierarchy (allows two parents per node)
- introduces union nodes to connect parents and children via common way point
- nodes are collapsible in all directions: children, parents, partners (nodes memorize their dependencies)
- use [d3-tip](https://github.com/caged/d3-tip) to show metadata on hover
