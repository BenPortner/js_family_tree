# v1.0.0

The entire codebase was re-written in TypeScript (previously vanilla JavaScript UMD) to facilitate future development and better adoption by third-party libraries and apps. Care was taken to keep the user experience backward compatible. However, a lot of breaking changes were introduced for developers (see below).

## Users

- Improved zoom behavior: The screen now centers around the clicked node after each click. This helps to keep an overview after expanding/collapsing large subgraphs. Fixed "wiggling" movement of nodes after clicking.
- Keep partners together: Implemented new decross operator to keep partners next to each other in the tree layers.
- Remove redundant data fields: Simplified `data.js` format to remove redundant information. Care was taken to keep the user experience backward compatible. Existing data should work with the new version without modification.
  - No more `id` field in the metadata: `id`s are taken from the `persons` and `unions` keys
  - No more `own_unions` and `parent_union` fields in `persons`, no more `partner` and `children` fields in `unions` : the `links`-array is now the single source of truth for node connections

## Developers

- Adopted TypeScript for modern developer experience
- Library is provided in two flavors: UMD and ESM
- Simplified UMD imports: No need to include `d3` and `d3-dag` via script tags. `dist/js_family_tree.umd.js` now includes all necessary dependencies. The `FamilyTree` constructor is accessible via the global `FT` object.
- The code logic has been split into importers (converting arbitrary JSON data into a directed graph with linked nodes), layouters (assigning x and y coordinates to nodes) and renderers (drawing nodes and edges on a canvas to display in the browser). Each of these have their own folder in the directory structure. New importers, layouters and renderers can be implemented, as long as they respect the interfaces defined in the respective `types.ts` files.
- `index.ts` exposes all relevant classes (currently only `FamilyTree`) and acts as the central entry point for programs.
- `familyTree.ts` holds the `FamilyTree` class, which is the central helper class for users. It instantiates an importer, layouter and renderer under the hood. The constructor further accepts an `opts` parameter to customize graph layout, CSS styles and more. NOTE: the D3-like setter syntax for options has been dropped.
- `familyTreeData.ts` defines types and interfaces that describe a custom data format for family trees (see the `data`-folder for implementations). New data formats can be added by defining their structure in a definitions file and implementing an importer that satisfies the `Importer` interface.
- `clickableNode.ts` uses JavaScript's prototype augmentation feature to add new methods to `d3-dag`'s `GraphNode` class. These methods are necessary to add interactivity to the graph display.
- The API for adding / removing nodes at runtime has changed. There are now three methods: `addPerson`, `addUnion` and `addLink`. Usage example [here](examples/add-remove-nodes.html).