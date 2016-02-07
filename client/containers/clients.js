'use strict'

import React from 'react'
import {connect} from 'react-redux'
import LineChart from '../components/line-chart'
import Panel from '../components/panel'
import D3 from 'd3'
import Lodash from 'lodash'

export const Clients = React.createClass({
  render: function () {
    const {data} = this.props

    const cpuRows = []
    Lodash.each(data.cpu, (row) => {
      cpuRows.push(
        <Panel title={row.name}>
          <LineChart
            data={row}
            height={250}
            xAxis={{innerTickSize: 6, label: 'Timestamp'}}
            yAxis={{label: 'Utilization %'}}
          />
        </Panel>
      )
    })

    return (
      <div className="page container-fluid">
        <div className="row middle-xs">
          <h2 className="col-xs-12 col-sm-6">Clients</h2>
        </div>

        <Panel title={'CPU Utilization'}>
          {cpuRows}
        </Panel>
      </div>
    )
  }
})

export default connect((state) => {
  return {
    data: {
      cpu: [
        {name: 'Client 1', values: [{x: 1, y: 82}, {x: 2, y: 70}, {x: 3, y: 10}, {x: 4, y: 90}]},
        {name: 'Client 2', values: [{x: 1, y: 62}, {x: 2, y: 80}, {x: 3, y: 20}, {x: 4, y: 10}]},
        {name: 'Client 3', values: [{x: 1, y: 52}, {x: 2, y: 50}, {x: 3, y: 51}, {x: 4, y: 90}]}
      ]
    }
  }
})(Clients)
