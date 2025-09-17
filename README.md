# js_family_tree

A simplistic app for displaying family trees in your browser.

Features:
- visualize family tree data in your browser
- expand and collapse the tree by clicking on nodes
- hover over nodes to display additional information in tooltips 
- move around the tree by zooming and panning
- uses [d3-dag](https://github.com/erikbrinkman/d3-dag) for layout calculation and [d3](https://d3js.org/) for rendering

[Live example here.](https://html-preview.github.io/?url=https://github.com/BenPortner/js_family_tree/blob/typescript/examples/simple-tree.html)

[JSFiddle here.](https://jsfiddle.net/BenPortner/6mnt1wy4/)

| :exclamation:  Note for developers |
|----------------------------------------------|
| v1.0.0 introduced significant changes to the codebase. Read more [here](CHANGELOG.md). |

## Quickstart

- Edit `data/data.js` to represent your family tree
- Open `index.html`
- Done!

## Custom data format

The file `data/data.js` defines a single JavaScript object named `data` that represents your family tree. The structure is as follows:
- `start`: The ID of the person who should be the starting point of the family tree. Only this person will be visible, initially. Further family members become visible when clicking on it.
- `persons`: An object where each key is a unique person ID, and each value is an object with metadata about that person. It is recommended to at least add `name`, `birthyear`, `birthplace`, `deathyear` and `deathplace`, as these information are shown in the tooltip by default.
- `unions`: An object where each key is a unique union ID, and each value is an object with metadata about the union. The object may be empty.
- `links`: An array of pairs, each representing a connection (edge) between a person and a union. This list will be used to construct the tree.

```javascript
data = {
    "start":"p2",
    "persons": {
        "p1": { "name": "Adam", "birthyear": 1900, "deathyear": 1980, "birthplace": "Alberta", "deathplace":"Austin", "other": "enter anything here" },
        "p2": { "name": "Berta", "birthyear": 1901, "deathyear": 1985, "birthplace": "Berlin", "deathplace": "Bern" },
        "p3": { "name": "Charlene", "birthyear": 1930, "deathyear": 2010, "birthplace": "Château", "deathplace": "Cuxhaven" },
        //...
    },
    "unions": {
        "u1": { },
        "u2": { "foo": "bar" },
        //...
    },
    "links": [
        ["p1", "u1"],
        ["p2", "u1"],
        ["u1", "p3"],
        //...
    ]
}
```

## License

[GPL-3.0](LICENSE)