// options
var x_sep = 120,
    y_sep = 50;

// append the svg object to the body of the page
// assigns width and height
// activates zoom/pan and tooltips
const svg = d3.select("body").append("svg")
    .attr("width", document.body.offsetWidth)
    .attr("height", document.documentElement.clientHeight);

// declare a dag layout
const assign_coords = d3.sugiyama()
    .nodeSize([y_sep, x_sep])
    .layering(d3.layeringSimplex())
    .decross(d3.decrossOpt)
    .coord(d3.coordVert())
    .separation(
        (a, b) => {
            return 1
        }
    );

// create family tree data object
const ft_datahandler = new FTDataHandler(data);

label_func = node => node.get_name();

// create family tree drawing object
const ft_drawer = new FTDrawer(ft_datahandler, svg);//.node_label(label_func);

// draw dag
ft_drawer.draw(ft_datahandler.root);