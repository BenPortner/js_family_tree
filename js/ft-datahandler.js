class FTDataHandler {

    constructor(data, start_node_id = data.start) {

        // make dag from edge list
        this.dag = d3.dagConnect()(data.links);

        // dag must be a node with id undefined. fix if necessary
        if (this.dag.id != undefined) {
            this.root = this.dag.copy();
            this.root.id = undefined;
            this.root.children = [this.dag];
            this.dag = this.root;
        }

        // get all d3-dag nodes and create family tree nodes
        this.nodes = this.dag.descendants().map(node => {
            if (node.id in data.unions) return new Union(node, this)
            else if (node.id in data.persons) return new Person(node, this);
        });

        // relink children arrays: use family tree nodes instead of d3-dag nodes
        this.nodes.forEach(n => n._children = n._children.map(c => c.ftnode));

        // make sure each node has an id
        this.number_nodes = 0;
        this.nodes.forEach(node => {
            node.id = node.id || this.number_nodes;
            this.number_nodes++;
        })

        // set root node
        this.root = this.find_node_by_id(start_node_id);
        this.root.visible = true;
        this.dag.children = [this.root];

    };

    update_roots() {
        this.dag.children = [this.root];
        const FT = this;

        function find_roots_recursive(node) {
            node.get_visible_inserted_neighbors().forEach(node => {
                if (node.is_root()) FT.dag.children.push(node);
                find_roots_recursive(node);
            });
        };
        find_roots_recursive(this.root);
    };

    find_node_by_id(id) {
        return this.nodes.find(node => node.id == id);
    };

}

class FTNode extends d3.dagNode {

    is_extendable() {
        return this.get_neighbors().filter(node => !node.visible).length > 0;
    };

    get_visible_neighbors() {
        return this.get_neighbors().filter(node => node.visible);
    }

    get_visible_inserted_neighbors() {
        return this.get_visible_neighbors().filter(node => this.inserted_nodes.includes(node));
    };

};

class Union extends FTNode {

    constructor(dagNode, family_tree) {
        super(dagNode.id, data.unions[dagNode.id]);
        // link to new object
        dagNode.ftnode = this;
        // define additional family tree properties
        this.family_tree = family_tree;
        this._children = dagNode.children;
        this.children = [];
        this._childLinkData = dagNode._childLinkData;
        this.inserted_nodes = [];
        this.inserted_links = [];
        this.visible = false;
    };

    get_neighbors() {
        return this.get_parents().concat(this.get_children())
    };

    get_parents() {
        var parents = this.data.partner
            .map(id => this.family_tree.find_node_by_id(id))
            .filter(node => node != undefined);
        if (parents) return parents
        else return [];
    }

    get_hidden_parents() {
        return this.get_parents().filter(parent => !parent.visible);
    };

    get_visible_parents() {
        return this.get_parents().filter(parent => parent.visible);
    };

    get_children() {
        var children = [];
        children = this.children.concat(this._children);
        // sort children by birth year, filter undefined
        children = children
            .filter(c => c != undefined)
        // .sort((a, b) => Math.sign((getBirthYear(a) || 0) - (getBirthYear(b) || 0)));
        return children
    };

    get_hidden_children() {
        return this.get_children().filter(child => !child.visible);
    };

    get_visible_children() {
        return this.get_children().filter(child => child.visible);
    };

    show_child(child) {
        if (!this._children.includes(child)) {
            console.warn("Child node not in this' _children array.");
        }
        this.children.push(child);
        this._children.remove(child);
        // if child is already visible, note a connection to destroy it later
        if (child.visible) {
            this.inserted_links.push([this, child]);
        }
        // if child is hidden, show it
        else {
            child.visible = true;
            this.inserted_nodes.push(child);
            // downstream part of the family tree is automatically reconstructed because children attribute
            // is not reset when hiding

        }
    };

    show_parent(parent) {
        if (!parent._children.includes(this)) {
            console.warn("This node not in parent's _children array.");
        }
        parent.children.push(this);
        parent._children.remove(this);
        // if parent is already visible, note a connection to destroy it later
        if (parent.visible) {
            this.inserted_links.push([parent, this]);
        }
        // if parent is hidden, show it
        else {
            parent.visible = true;
            this.inserted_nodes.push(parent);
        }
    };

    show() {

        this.visible = true;

        // show neighboring children
        this.get_children().forEach(child => {
            this.show_child(child);
        });

        // show neighboring parents
        this.get_parents().forEach(parent => {
            this.show_parent(parent);
        });

    };

    get_visible_inserted_children() {
        return this.children.filter(child => this.inserted_nodes.includes(child));
    };

    get_visible_inserted_parents() {
        return this.get_visible_parents().filter(parent => this.inserted_nodes.includes(parent));
    };

    is_root() {
        return false;
    }

    hide_child(child) {
        if (!this.children.includes(child)) {
            console.warn("Child node not in this's children array.");
        }
        child.visible = false;
        this._children.push(child);
        this.children.remove(child);
        this.inserted_nodes.remove(child);
    };

    hide_parent(parent) {
        if (!parent.children.includes(this)) {
            console.warn("This node not in parent's children array.");
        }
        parent.visible = false;
        parent._children.push(this);
        parent.children.remove(this);
        this.inserted_nodes.remove(parent);
    };

    hide() {

        this.visible = false;

        // hide neighboring children, if inserted by this node
        this.get_visible_inserted_children().forEach(child => {
            this.hide_child(child);
        });

        // hide neighboring parents, if inserted by this node
        this.get_visible_inserted_parents().forEach(parent => {
            this.hide_parent(parent);
        });

        // hide only edge (not node) if not inserted by this node
        this.inserted_links.forEach(edge => {
            const source = edge[0];
            const target = edge[1];
            if (this == source) {
                this._children.push(target);
                this.children.remove(target);
            } else if (this == target) {
                source._children.push(this);
                source.children.remove(this);
            };
        });
        this.inserted_links = [];

    };

    get_own_unions() {
        return [];
    };

    get_parent_unions() {
        return [];
    };

    get_name() {
        return undefined;
    };

    get_birth_year() {
        return undefined;
    };

    get_birth_place() {
        return undefined;
    };

    get_death_year() {
        return undefined;
    };

    get_death_place() {
        return undefined;
    };

    is_union() {
        return true;
    };

};

class Person extends FTNode {

    constructor(dagNode, family_tree) {
        super(dagNode.id, data.persons[dagNode.id]);
        // link to new object
        dagNode.ftnode = this;
        // define additional family tree properties
        this.family_tree = family_tree;
        this._children = dagNode.children;
        this.children = [];
        this._childLinkData = dagNode._childLinkData;
        this.inserted_nodes = [];
        this.inserted_links = [];
        this.visible = false;
    };

    get_name() {
        return this.data.name;
    };

    get_birth_year() {
        return this.data.birthyear;
    };

    get_birth_place() {
        return this.data.birthplace;
    };

    get_death_year() {
        return this.data.deathyear;
    };

    get_death_place() {
        return this.data.deathplace;
    };

    get_neighbors() {
        return this.get_own_unions().concat(this.get_parent_unions());
    };

    get_parent_unions() {
        var unions = [this.data.parent_union]
            .map(id => this.family_tree.find_node_by_id(id))
            .filter(node => node != undefined);
        var u_id = this.data.parent_union;
        if (unions) return unions
        else return [];
    };

    get_hidden_parent_unions() {
        return this.get_parent_unions().filter(union => !union.visible);
    };

    get_visible_parent_unions() {
        return this.get_parent_unions().filter(union => union.visible);
    };

    get_visible_inserted_parent_unions() {
        return this.get_visible_parent_unions().filter(union => this.inserted_nodes.includes(union));
    };

    is_root() {
        return this.get_visible_parent_unions().length == 0;
    };

    is_union() {
        return false;
    };

    get_own_unions() {
        var unions = this.data.own_unions
            .map(id => this.family_tree.find_node_by_id(id))
            .filter(u => u != undefined);
        if (unions) return unions
        else return [];
    };

    get_hidden_own_unions() {
        return this.get_own_unions().filter(union => !union.visible);
    };

    get_visible_own_unions() {
        return this.get_own_unions().filter(union => union.visible);
    };

    get_visible_inserted_own_unions() {
        return this.get_visible_own_unions().filter(union => this.inserted_nodes.includes(union));
    };

    get_parents() {
        var parents = [];
        this.get_parent_unions().forEach(
            u => parents = parents.concat(u.get_parents())
        );
    };

    get_other_partner(union_data) {
        var partner_id = union_data.partner.find(
            p_id => p_id != this.id & p_id != undefined
        );
        return all_nodes.find(n => n.id == partner_id)
    };

    get_partners() {
        var partners = [];
        this.get_own_unions().forEach(
            u => {
                partners.push(this.get_other_partner(u.data))
            }
        )
        return partners.filter(p => p != undefined)
    };

    get_children() {
        var children = [];
        this.get_own_unions().forEach(
            u => children = children.concat(getChildren(u))
        )
        // sort children by birth year, filter undefined
        children = children
            .filter(c => c != undefined)
        // .sort((a, b) => Math.sign((getBirthYear(a) || 0) - (getBirthYear(b) || 0)));
        return children
    };

    show() {
        this.get_hidden_own_unions().forEach(union => {
            union.show();
            this.inserted_nodes.push(union);
        })
        this.get_hidden_parent_unions().forEach(union => {
            union.show();
            this.inserted_nodes.push(union);
        })
    };

    hide() {
        this.get_visible_inserted_own_unions().forEach(union => {
            union.hide();
            this.inserted_nodes.remove(union);
        })
        this.get_visible_inserted_parent_unions().forEach(union => {
            union.hide();
        })
    };

    click() {
        // extend if there are uncollapsed neighbor unions
        if (this.is_extendable()) this.show();
        // collapse if fully extended
        else this.hide();
        // update dag roots
        this.family_tree.update_roots();
    };

};