function create_n_nodes(n) {
  var el = [];
  var nodes = n;

  for (var i = 0; i < n; i++) {
    var node =     { // node a
        data: {
          id: "n"+(i+1).toString(),
        }
      };
    el.push(node);
  }
  return el;
}

function create_edge(source, target){
      var edge = { // edge ab
      data: {
        id: source+target,
        source: source,
        target: target
        }
      }
      return edge;
}

function get_nodes_keys(el){
    var nodes_id = [];
    for (var i = 0; i < el.length; i++){
        nodes_id.push(el[i]["data"]["id"]);
    }
    return nodes_id;
}

function distribute_edges(nodes,edges){
  if (nodes.length == 0){
    return edges;
  }
  else {
    nodes.sort(function(i, j){return j[1]-i[1]});
    var x = 1;
    while (nodes[0][1] > 0){
      
      nodes[0][1] -= 1;
      nodes[x][1] -= 1;
      edges.push([nodes[0][0],nodes[x][0]]);
      x++;
    }
    nodes.shift();
    return distribute_edges(nodes,edges);
  }

}

function create_graph(sequence){
  var n = sequence.length;
  var names = [];
  for (var i = 0; i < n; i++) {
    names.push(["n"+(i+1),sequence[i]]);
  };
  var nedges = sequence.reduce(function(a, b) {return a + b;});
  
  console.log(names);
  console.log(nedges);
}

function draw_graph(sequence) {
  //console.log(create_graph(sequence));
  var nodenames = [];
  for (var i = 0; i < sequence.length; i++) {
    nodenames.push("n"+(i+1));
  };

  var nodes_degree = nodenames.map(function(el,i){return [nodenames[i],sequence[i]]});
  var edges = distribute_edges(nodes_degree,[]);
  
  var el = create_n_nodes(sequence.length);

  var nodeskeys = get_nodes_keys(el);
  for (var i = 0; i < edges.length; i++) {
    var cn1 = edges[i][0];
    var cn2 = edges[i][1];
    el.push(create_edge(cn1,cn2));
  };

  var cy = cytoscape({
      container: document.getElementById('cy'), // container to render in
      elements: el,


    style: [ // the stylesheet for the graph
      {
        selector: 'node',
        style: {
          "width":"9px",
          "height":"9px",
          'background-color': '#259',
          'label': 'data(id)'
        }
      },

      {
        selector: 'edge',
        style: {
          'width': 5,
          //'line-color': '#ccc',
          'selection-box-color': '#ccc',
          'line-color': '#ccd9ff'
        }
      }
    ],

    layout: {
        name:'random'
    }
  });
}

