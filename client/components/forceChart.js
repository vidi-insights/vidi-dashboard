'use strict'

import d3 from 'd3'
import d3Wrap from 'react-d3-wrap'

export const ForceChart = d3Wrap({
  initialize (svg, data, options) {
    var width = 400
    var height = 200

    var color = d3.scale.category20()

    var graph = {
      nodes: [
        {"name":"npm", "group":0},
        {"name":"github", "group":1},
        {"name":"travis", "group":2},
        {"name":"info", "group":3},
        {"name":"search", "group":4},
        {"name":"web", "group":5}
      ],
      links: [
        {"source":0, "target":3,"value":1},
        {"source":1, "target":3,"value":8},
        {"source":2, "target":3,"value":10},
        {"source":3, "target":5,"value":6},
        {"source":4, "target":5,"value":6}
      ]
    }

    var force = d3.layout.force()
      .charge(-200)
      .linkDistance(60)
      .size([width, height])

    var g = d3
      .select(svg)
      .append("g")
      .attr("width", width)
      .attr("height", height)


    force
      .nodes(graph.nodes)
      .links(graph.links)
      .start()

    var link = g.selectAll(".link")
      .data(graph.links)
      .enter()
      .append("line")
      .attr("class", "link")
      .style("stroke-width", function(d) { return Math.sqrt(d.value) })

    var node = g.selectAll(".node")
      .data(graph.nodes)
      .enter()
      .append("circle")
      .attr("class", "node")
      .attr("r", 15)
      .style("fill", function(d) { return color(d.group) })
      .call(force.drag)

    node.append("title")
      .text(function(d) { return d.name })

    force.on("tick", function() {
      link.attr("x1", function(d) { return d.source.x })
          .attr("y1", function(d) { return d.source.y })
          .attr("x2", function(d) { return d.target.x })
          .attr("y2", function(d) { return d.target.y })

      node.attr("cx", function(d) { return d.x })
        .attr("cy", function(d) { return d.y })
    })
  }
})
