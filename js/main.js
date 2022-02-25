    // Set the dimensions and margins of the diagram
    var screen_width = document.body.offsetWidth,
        screen_height = document.documentElement.clientHeight;


    // initialize panning, zooming
    var zoom = d3.zoom()
        .on("zoom", _ => g.attr("transform", d3.event.transform));


    // tooltip function
    function make_tooltip(node) {
        if (node.is_union()) return;
        var content = `
            <span style='margin-left: 2.5px;'><b>` + node.get_name() + `</b></span><br>
            <table style="margin-top: 2.5px;">
                    <tr><td>born</td><td>` + (node.get_birth_year() || "?") + ` in ` + (node.data.birthplace || "?") + `</td></tr>
                    <tr><td>died</td><td>` + (node.get_death_year() || "?") + ` in ` + (node.data.deathplace || "?") + `</td></tr>
            </table>
            `
        return content.replace(new RegExp("null", "g"), "?");
    }


    // initialize tooltips
    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .direction('e')
        .offset([0, 5])
        .html(make_tooltip);


    // append the svg object to the body of the page
    // assigns width and height
    // activates zoom/pan and tooltips
    const svg = d3.select("body").append("svg")
        .attr("width", screen_width)
        .attr("height", screen_height)
        .call(zoom)
        .call(tip)

    // append group element
    const g = svg.append("g");

    // helper variables
    var i = 0,
        transition_duration = 750,
        x_sep = 120,
        y_sep = 50;

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

    FT = new FamilyTree(data, screen_height / 2, screen_width / 2);


    // draw dag
    update(FT.root);

    function update(source) {

        // Assigns the x and y position for the nodes
        var dag_tree = assign_coords(FT.dag),
            nodes = FT.dag.descendants(),
            links = FT.dag.links();


        // ****************** Nodes section ***************************

        // Update the nodes...
        var node = g.selectAll('g.node')
            .data(nodes, function(d) {
                return d.id || (d.id = ++i); // if node id is non-numeric, use i instead
            })

        // Enter any new nodes at the parent's previous position.
        var nodeEnter = node.enter().append('g')
            .attr('class', 'node')
            .attr("transform", function(d) {
                return "translate(" + source.y0 + "," + source.x0 + ")";
            })
            .on('click', d => d.click())
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide)
            .attr('visible', true);

        // Add Circle for the nodes
        nodeEnter.append('circle')
            .attr('class', 'node')
            .attr('r', 1e-6)
            .style("fill", function(d) {
                return d.is_extendable() ? "lightsteelblue" : "#fff";
            });

        // add node label
        // no easy way to add linebreak -> make two labels with offset
        // name
        nodeEnter.append('text')
            .attr("dy", "-2")
            .attr("x", 13)
            .attr("text-anchor", "start")
            .text(d => d.get_name());
        // birth and death date
        nodeEnter.append('text')
            .attr("dy", "10")
            .attr("x", 13)
            .attr("text-anchor", "start")
            .text(node => {
                if (node.is_union()) return;
                else return (node.get_birth_year() || "?") + " - " + (node.get_death_year() || "?")
            });

        // UPDATE
        var nodeUpdate = nodeEnter.merge(node);

        // Transition to the proper position for the node
        nodeUpdate.transition()
            .duration(transition_duration)
            .attr("transform", function(d) {
                return "translate(" + d.y + "," + d.x + ")";
            });

        // Update the node attributes and style
        nodeUpdate.select('circle.node')
            .attr('r', d => 10 * !d.is_union() + 0 * d.is_union())
            .style("fill", function(d) {
                return d.is_extendable() ? "lightsteelblue" : "#fff";
            })
            .attr('cursor', 'pointer');


        // Remove any exiting nodes
        var nodeExit = node.exit().transition()
            .duration(transition_duration)
            .attr("transform", function(d) {
                return "translate(" + source.y + "," + source.x + ")";
            })
            .attr('visible', false)
            .remove();

        // On exit reduce the node circles size to 0
        nodeExit.select('circle')
            .attr('r', 1e-6);

        // On exit reduce the opacity of text labels
        nodeExit.select('text')
            .style('fill-opacity', 1e-6);

        // ****************** links section ***************************

        // Update the links...
        var link = g.selectAll('path.link')
            .data(links, function(d) {
                return d.source.id + d.target.id
            });

        // Enter any new links at the parent's previous position.
        var linkEnter = link.enter().insert('path', "g")
            .attr("class", "link")
            .attr('d', function(d) {
                var o = {
                    x: source.x0,
                    y: source.y0
                }
                return diagonal(o, o)
            });

        // UPDATE
        var linkUpdate = linkEnter.merge(link);

        // Transition back to the parent element position
        linkUpdate.transition()
            .duration(transition_duration)
            .attr('d', d => diagonal(d.source, d.target));

        // Remove any exiting links
        var linkExit = link.exit().transition()
            .duration(transition_duration)
            .attr('d', function(d) {
                var o = {
                    x: source.x,
                    y: source.y
                }
                return diagonal(o, o)
            })
            .remove();

        // expanding a big subgraph moves the entire dag out of the window
        // to prevent this, cancel any transformations in y-direction
        svg.transition()
            .duration(transition_duration)
            .call(
                zoom.transform,
                d3.zoomTransform(g.node()).translate(-(source.y - source.y0), -(source.x - source.x0)),
            );

        // Store the old positions for transition.
        nodes.forEach(function(d) {
            d.x0 = d.x;
            d.y0 = d.y;
        });


        // Creates a curved (diagonal) path from parent to the child nodes
        function diagonal(s, d) {

            path = `M ${s.y} ${s.x}
            C ${(s.y + d.y) / 2} ${s.x},
              ${(s.y + d.y) / 2} ${d.x},
              ${d.y} ${d.x}`

            return path
        }
    }