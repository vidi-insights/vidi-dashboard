'use strict'

import React from 'react'
import {connect} from 'react-redux'
import Panel from '../components/panel'
import LineChart from '../components/line-chart'
import Moment from 'moment'

export const Messages = React.createClass({
  render () {
    const {data} = this.props

    return (
      <div className="page container-fluid">
        <div className="row middle-xs">
          <h2 className="col-xs-12 col-sm-6">Messages</h2>
          <div className="col-xs-12 col-sm-6 txt-right">
            <select>
              <option>120 seconds</option>
              <option>5 minutes</option>
              <option>30 minutes</option>
              <option>1 hour</option>
            </select>
          </div>
        </div>

        <Panel title={'role:search, cmd:search'}>
          <LineChart
            data={data}
            height={250}
            xAxis={{innerTickSize: 6, label: "Timestamp"}}
            yAxis={{label: "Flow Rate"}}
          />
        </Panel>
        <Panel title={'role:info, get:req'}>
          <LineChart
            data={data}
            height={250}
            xAxis={{innerTickSize: 6, label: "Timestamp"}}
            yAxis={{label: "Flow Rate"}}
          />
        </Panel>
        <Panel title={'role:info, get:res'}>
          <LineChart
            data={data}
            height={250}
            xAxis={{innerTickSize: 6, label: "Timestamp"}}
            yAxis={{label: "Flow Rate"}}
          />
          <Panel title={'role:info, get:res'}>
            <LineChart
              data={data}
              height={250}
              xAxis={{innerTickSize: 6, label: "Timestamp"}}
              yAxis={{label: "Flow Rate"}}
            />
          </Panel>
        </Panel>
      </div>
    )
  }
})

export default connect((state) => {
  return {
    data: {
      name: "dummy",
      values: [
        { x: 70, y: 1 },
        { x: 71, y: 2 },
        { x: 72, y: 4 },
        { x: 73, y: 5 },
        { x: 74, y: 1 },
        { x: 75, y: 3 },
        { x: 76, y: 2 },
        { x: 75, y: 3 }
      ]
    }
  }
})(Messages)


function formatTimeAxis (x) {
  if (!x) return ''
  return Moment(x).format('hh:mm:ss')
}
