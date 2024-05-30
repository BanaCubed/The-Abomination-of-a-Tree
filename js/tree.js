var layoutInfo = {
    startTab: "none",
    startNavTab: "tree-tab",
	showTree: true,

    treeLayout: ""

    
}


// A "ghost" layer which offsets other layers in the tree
addNode("blank", {
    layerShown: "ghost",
}, 
)


addLayer("tree-tab", {
    tabFormat: [
        ["display-text", "Warning! This tree is really bad, so don't play it please.<br>Also, it is possible to beat it"],
        "blank",
        ["tree", function() {return (layoutInfo.treeLayout ? layoutInfo.treeLayout : TREE_LAYERS)}]],
    previousTab: "",
    leftTab: true,
})

function debugpoint() {
    text = 'sure that you want to gain a free point?'
    while(true) {
        if(!confirm('Are you ' + text)) return
        text = 'sure that you are ' + text
    }
}