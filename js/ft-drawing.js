class FTDrawer {

    static label_delimiter = "_";

    constructor(
        ft_datahandler,
        svg,
        x0 = svg.attr("height") / 2,
        y0 = svg.attr("width") / 2,
    ) {
        this.ft_datahandler = ft_datahandler;
        this.svg = svg;
        this.link_css_class = "link";

        // append group element to draw family tree in
        this.g = this.svg.append("g");

        // initialize panning, zooming
        this.zoom = d3.zoom().on("zoom", _ => this.g.attr("transform", d3.event.transform));
        this.svg.call(this.zoom);

        // initialize tooltips
        this.tip = d3.tip()
            .attr('class', 'tooltip')
            .direction('e')
            .offset([0, 5]);
        this.svg.call(this.tip);
        this.tooltip(FTDrawer.default_tooltip_func);

        // defaults
        this.transition_duration(750);
        this.link_path(FTDrawer.default_link_path_func);
        this.node_label(FTDrawer.default_node_label_func);
        this.node_size(FTDrawer.default_node_size_func);
        this.node_class(FTDrawer.default_node_class_func);

        // set starting position for root node
        this.ft_datahandler.root.x0 = x0;
        this.ft_datahandler.root.y0 = y0;
    };

    transition_duration(value) {
        if (!value) return this._transition_duration;
        else {
            this._transition_duration = value;
            return this;
        }
    };

    static default_tooltip_func(node) {
        if (node.is_union()) return;
        var content = `
                <span style='margin-left: 2.5px;'><b>` + node.get_name() + `</b></span><br>
                <table style="margin-top: 2.5px;">
                        <tr><td>born</td><td>` + (node.get_birth_year() || "?") + ` in ` + (node.data.birthplace || "?") + `</td></tr>
                        <tr><td>died</td><td>` + (node.get_death_year() || "?") + ` in ` + (node.data.deathplace || "?") + `</td></tr>
                </table>
                `
        return content.replace(new RegExp("null", "g"), "?");
    };

    tooltip(tooltip_func) {
        if (!tooltip_func) {
            this.show_tooltips = false;
        }
        else {
            this.show_tooltips = true;
            this.tip.html(tooltip_func);
        }
        return this;
    };

    static default_node_label_func(node) {
        // node label function
        // text will be split into multiple lines where `label_delimiter` is used
        if (node.is_union()) return;
        return node.get_name() +
            FTDrawer.label_delimiter +
            (node.get_birth_year() || "?") + " - " + (node.get_death_year() || "?");
    };

    node_label(node_label_func) {
        if (!node_label_func) { }
        else { this.node_label_func = node_label_func };
        return this;
    };

    static default_node_class_func(node) {
        // returns a stirng which determines a node's css class assignments
        if (node.is_union()) return;
        else {
            if (node.is_extendable()) return "person extendable"
            else return "person non-extendable"
        };
    };

    node_class(node_class_func) {
        if (!node_class_func) { }
        else { this.node_class_func = node_class_func };
        return this;
    };

    static default_node_size_func(node) {
        // returns an integer determining the node's size
        if (node.is_union()) return 0;
        else return 10;
    }

    node_size(node_size_func) {
        if (!node_size_func) { }
        else { this.node_size_func = node_size_func };
        return this;
    };

    static default_link_path_func(s, d) {
        function diagonal(s, d) {
            // Creates a curved (diagonal) path from parent to the child nodes
            return `M ${s.y} ${s.x}
                C ${(s.y + d.y) / 2} ${s.x},
                  ${(s.y + d.y) / 2} ${d.x},
                  ${d.y} ${d.x}`
        }
        return diagonal(s, d);
    }

    link_path(link_path_func) {
        if (!link_path_func) { }
        else { this.link_path_func = link_path_func };
        return this;
    }

    static make_unique_link_id(link) {
        return link.id || link.source.id + "_" + link.target.id;
    }

    draw(source) {

        // get visible nodes and links
        const nodes = this.ft_datahandler.dag.descendants(),
            links = this.ft_datahandler.dag.links();

        // assign new x and y positions to all nodes
        assign_coords(this.ft_datahandler.dag);

        // ****************** Nodes section ***************************

        // assign node data
        var node = this.g.selectAll('g.node')
            .data(nodes, node => node.id)

        // insert new nodes at the parent's previous position.
        var nodeEnter = node.enter().append('g')
            .attr('class', 'node')
            .attr("transform", _ => "translate(" + source.y0 + "," + source.x0 + ")")
            .on('click', node => {
                node.click();
                this.draw(node);
            })
            .attr('visible', true);

        // add tooltip
        if (this.show_tooltips) nodeEnter.on('mouseover', this.tip.show).on('mouseout', this.tip.hide);

        // add a circle for each node
        nodeEnter.append('circle')
            .attr('class', this.node_class_func)
            .attr('r', 1e-6)

        // add node label
        const this_object = this;
        nodeEnter.each(function (node) {
            d3_append_multiline_text(
                d3.select(this),
                this_object.node_label_func(node),
                FTDrawer.label_delimiter,
                "node-label",
            )
        });

        // UPDATE
        var nodeUpdate = nodeEnter.merge(node);

        // transition node to final coordinates
        nodeUpdate.transition()
            .duration(this.transition_duration())
            .attr("transform", d => "translate(" + d.y + "," + d.x + ")");

        // update node style
        nodeUpdate.select('.node circle')
            .attr('r', this.node_size_func)
            .attr('class', this.node_class_func)
            .attr('cursor', 'pointer');

        // remove hidden nodes
        var nodeExit = node.exit().transition()
            .duration(this.transition_duration())
            .attr("transform", _ => "translate(" + source.y + "," + source.x + ")")
            .attr('visible', false)
            .remove();

        // animation: shrink hidden nodes
        nodeExit.select('circle')
            .attr('r', 1e-6);

        // animation: hide hidden nodes' labels
        nodeExit.select('text')
            .style('fill-opacity', 1e-6);

        // ****************** links section ***************************

        // Update the links...
        var link = this.g.selectAll('path.' + this.link_css_class)
            .data(links, FTDrawer.make_unique_link_id);

        // Enter any new links at the parent's previous position.
        var linkEnter = link.enter().insert('path', "g")
            .attr("class", this.link_css_class)
            .attr('d', _ => {
                var o = {
                    x: source.x0,
                    y: source.y0
                }
                return this.link_path_func(o, o)
            });

        // UPDATE
        var linkUpdate = linkEnter.merge(link);

        // Transition back to the parent element position
        linkUpdate.transition()
            .duration(this.transition_duration())
            .attr('d', d => this.link_path_func(d.source, d.target));

        // Remove any exiting links
        var linkExit = link.exit().transition()
            .duration(this.transition_duration())
            .attr('d', _ => {
                var o = {
                    x: source.x,
                    y: source.y
                }
                return this.link_path_func(o, o)
            })
            .remove();

        // expanding a big subgraph moves the entire dag out of the window
        // to prevent this, cancel any transformations in y-direction
        this.svg.transition()
            .duration(this.transition_duration())
            .call(
                this.zoom.transform,
                d3.zoomTransform(this.g.node()).translate(-(source.y - source.y0), -(source.x - source.x0)),
            );

        // store current node positions for next transition
        nodes.forEach(function (d) {
            d.x0 = d.x;
            d.y0 = d.y;
        });

    }
}