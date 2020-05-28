<template>
  <div style="position: relative; height: calc(100vh -70px)" class="row">
    <v-responsive >
      <div id="idChart"/>
    </v-responsive>
  </div>
</template>

<script>
import * as d3 from 'd3'
export default {
  name: 'CChart',
  data () {
    return {
      dataset: this.data,
      chartWidth: this.svgWidth,
      chartHeight: this.svgHeight,
      nameChartInterno: this.nameChart,
      margin: {
        top: 20, 
        right: 30, 
        bottom: 30, 
        left: 50
      },
    }
  },

  props: {
    nameChart: {
      type: String
    },
    data: {
      type: Array
    },
    svgWidth: {
      type: Number,
      default: 400
    },
    svgHeight: {
      type: Number,
      default: 200
    },
    labelX: {
      type: String,
      required: true
    },
    labelY: {
      type: String,
      required: true
    },
    labelLegend: {
      type: String
    },
    labelAxisX: {
      type: String
    },
    labelAxisY: {
      type: String
    },
    setYScale: {
      type: Array
    }
  },

  computed: {

    width () {
      return this.chartWidth - this.margin.left - this.margin.right
    },

    height () {
      return this.chartHeight - this.margin.top - this.margin.bottom
    },

    viewBoxWidth () {
      return this.width + this.margin.left + this.margin.right + 200
    },

    viewBoxHeight () {
      return this.height + this.margin.top + this.margin.bottom
    },

    svg () {
      return d3.select('#idChart')
        .append("svg")
          .attr("viewBox", `-50 0 ${this.viewBoxWidth + 150} ${this.viewBoxHeight + 50}`)
    },

    yScale () {
      return d3.scaleLinear()
        .domain(this.setYScale)
        .range([this.height, 0])
    },

    xScale () {
      return d3.scaleBand()
        .domain(this.dataset.map(d => d[this.labelX]))
        .range([0, this.width])
        .padding(.2)
    },

    xAxis () {
      return this.svg.append("g")
        .classed("xAxis", true)
        .attr('transform', `translate(${ this.margin.left }, ${ this.height + this.margin.top })`)
        .call(d3.axisBottom(this.xScale))
    },

    yAxis () {
      return this.svg.append("g")
        .classed("yAxis", true)
        .attr('transform', `translate(${ this.margin.left }, ${ this.margin.top })`)
        .call(d3.axisLeft(this.yScale))
    },

    legend () {
      return this.svg.append("g")
        .attr("transform", "translate(100, 20)")
        .attr('class', 'legend')
        .selectAll("legenda").data(this.dataset).enter()
    },

    chartBar () {
      return this.svg.append("g")
        .attr('transform', `translate(${ this.margin.left }, ${ this.margin.top })`)
    },

    titleYAxis () {
      return this.svg.append("g")
        .attr('class', 'titleYAxios')
    },

    titleXAxis () {
      return this.svg.append("g")
        .attr('class', 'titleXAxios')
    },

  },

  methods: {
    callChartBar () {
      this.chartBar.selectAll("rect").data(this.dataset).enter()
        .append("rect")
          .attr("width", this.xScale.bandwidth())
          .attr("height", () => this.height - this.yScale(0))
          .attr("x", d => this.xScale(d[this.labelX]))
          .attr("y", () => this.yScale(0))
          .attr("fill", d => d.color)
        .on("mouseover", (v) =>  this.$emit('onMouseover', { ...v, nameChart: this.nameChart }))
        .on("mouseout", () => this.$emit('onMouseover', ''))
        .transition()
          .duration(800)
          .attr("y", (v) => this.yScale(v[this.labelY]))
          .attr("height", (v) => this.height - this.yScale(v[this.labelY]))
          .delay((v, i ) => i * 100)  
    },

    callLegend () {
      this.legend
        .append("rect")
          .attr("x", this.width - 17)
          .attr("y", (d, i) => i * 16 - 5)
          .attr("width", 10)
          .attr("height", 10)
          .attr("fill", d => d.color)
          .attr("stroke", d => d.color)
          .attr("stroke-width", 2)
      
      this.legend
        .append("text")
          .attr("x", this.width)
          .attr("y", (d, i) => i * 16)
          .attr("text-anchor", "start")
          .attr("font-size", "0.7em")
          .attr("fill", 'white')
          .attr("dy", "0.40em")
          .text(d => d[this.labelLegend])
    },

    showLabelTitleYAxios () {
      this.titleYAxis
        .append('text')
          .attr("text-anchor", "end")
          .attr('x', 0)
          .attr('y', 100)
          .attr('transform', 'rotate(-90, 0, 100)')
          .attr("font-size", "10px")
          .attr("fill", 'white')
          .text(this.labelAxisY)
    },

    showLabelTitleXAxios () {
      this.titleYAxis
        .append('text')
          .attr("text-anchor", "middle")
          .attr('x', this.width / 2)
          .attr('y', this.height + 65)
          .attr("font-size", "10px")
          .attr("fill", 'white')
          .text(this.labelAxisX)
    },

    renderChartBar () {
      this.yAxis
      this.xAxis
      this.callChartBar()
      this.callLegend()
      this.showLabelTitleYAxios()
      this.showLabelTitleXAxios()
    }
  },
  
  async mounted () {
    await this.renderChartBar()
  }

}
</script>

  