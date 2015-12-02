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


/*
[[a,3],[b,3],[c,2],[d,2],[e,2]] -> [[a,b],[a,c],[a,d],[b,e],[b,c],[e,d]]


3,3,2,2,2
a b c d e

a,b  a -= 1 b-=1
a,c  a -= 1 c-=1
a,d  a -= 1 d-=1

2,1,1,2
b c d e
ordenar
2,2,1,1
b e c d

b,e  b-=1 e-=1
b,c  b-=1 c-=1

1,1
e d

e,d  d-=1 e-=1
*/

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
  /*  elements: [ // list of graph elements to start with
      { // node a
        data: {
          id: 'a'
        }
      }, 
      { // node b
        data: {
          id: 'b'
        }
      }, 
          { // node b
        data: {
          id: 'c'
        }
      }, 
          { // node b
        data: {
          id: 'd'
        }
      }, 
      { // edge ab
        data: {
          id: 'ab',
          source: 'a',
          target: 'b'
        }
      },
          { // edge ab
        data: {
          id: 'ad',
          source: 'a',
          target: 'd'
        }
      },
          { // edge ab
        data: {
          id: 'cd',
          source: 'c',
          target: 'd'
        }
      }
    ],*/

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
          'line-color': '#ccc',
        }
      }
    ],

    layout: {
      name: 'random',
    }
  });
}

