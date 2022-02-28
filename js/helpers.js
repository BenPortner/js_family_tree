// extend javascript array class by a remove function
// copied from https://stackoverflow.com/a/3955096/12267732
Array.prototype.remove = function () {
    var what, a = arguments,
        L = a.length,
        ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};


function d3_append_multiline_text(d3element, text, delimiter = "_", css_class = undefined, line_sep = 14,
    line_offset = undefined, x = 13, dominant_baseline = "central") {
    // adds a multi-line text label to a d3 element
    if (!text) return;
    const d3text = d3element.append("text")
        .attr("class", css_class)
        .attr("dominant-baseline", dominant_baseline);
    const arr = text.split(delimiter);
    if (!line_offset) {line_offset = -line_sep*(arr.length-1)/2;}
    if (arr != undefined) {
        for (i = 0; i < arr.length; i++) {
            d3text.append("tspan")
                .text(arr[i])
                .attr("dy", i ==0 ? line_offset: line_sep)
                .attr("x", x);
        }
    }
};