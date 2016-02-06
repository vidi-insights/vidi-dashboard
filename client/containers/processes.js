'use strict'

import React from 'react'
import {connect} from 'react-redux'
import Panel from '../components/panel'
import ChartistGraph from 'react-chartist'

export const Processes = React.createClass({
  render () {
    var data = fake_data()

    return (
      <div className="page container-fluid">
        <div className="row middle-xs">
          <h1 className="col-xs-12 col-sm-6">Processes</h1>
          <div className="col-xs-12 col-sm-6 txt-right">
            <select>
              <option>120 seconds</option>
              <option>5 minutes</option>
              <option>30 minutes</option>
              <option>1 hour</option>
            </select>
          </div>
        </div>

        <div className="row middle-xs">
          <h2 className="col-xs-12"><b>50526 - 'node'</b></h2>
        </div>

        <div className="row middle-xs">
          <h5 className="col-xs-3">Process uptime</h5>
          <h1 className="col-xs-3">00:05:55</h1>
          <h5 className="col-xs-3">System uptime</h5>
          <h1 className="col-xs-3">02:30:55</h1>
        </div>

        <div className="row middle-xs">
          <h5 className="col-xs-3"><b>Pid</b></h5>
          <h5 className="col-xs-3"><b>Title</b></h5>
          <h5 className="col-xs-3"><b>Architecture</b></h5>
          <h5 className="col-xs-3"><b>Platform</b></h5>
          <p  className="col-xs-3">50526</p>
          <p  className="col-xs-3">node</p>
          <p  className="col-xs-3">x64</p>
          <p  className="col-xs-3">darwin</p>
        </div>

        <div className="row middle-xs">
          <h5 className="col-xs-12">Memory Usage</h5>
          <div className="col-xs-12">
            <ChartistGraph
              type={'Line'}
              data={data.memory_usage}
              options={{
                fullWidth: true,
                showArea: true,
                showLine: false,
                showPoint: true,
                chartPadding: {right: 30},
                axisX: {showGrid: false, labelOffset: {x: -15}},
              }}/>
          </div>
        </div>

        <div className="row middle-xs">
          <h3 className="col-xs-12">Event Loop</h3>
        </div>

        <div className="row middle-xs">
          <h5 className="col-xs-1">Delay</h5>
          <h1 className="col-xs-4">0.7122030405</h1>
          <h5 className="col-xs-1">Limit</h5>
          <h1 className="col-xs-2">30</h1>
          <h5 className="col-xs-2">Over Limit</h5>
          <h1 className="col-xs-2">false</h1>
        </div>

        <div className="row middle-xs">
          <div className="col-xs-12">
            <ChartistGraph
              type={'Line'}
              data={data.memory_usage}
              options={{
                fullWidth: true,
                showArea: false,
                showLine: true,
                showPoint: false,
                chartPadding: {right: 30},
                axisX: {showGrid: false, labelOffset: {x: -15}},
                axisY: {showGrid: false},
              }}/>
          </div>
        </div>

        <div className="row middle-xs">
          <h3 className="col-xs-12">CPU Utilisation</h3>
        </div>

        <div className="row middle-xs">
          <h5 className="col-xs-12">Intel(R) Core(TM) i7-5557U CPU @ 3.10GHz</h5>
          <div className="col-xs-3">
            <ChartistGraph
              type={'Bar'}
              data={data.distBar}
              options={{
                distributeSeries: true,
                height: 100,
                high: 100,
                low: 0,
                axisX: {showGrid: false}

              }}
            />
          </div>
          <div className="col-xs-9">
            <ChartistGraph
              type={'Bar'}
              data={data.series}
              options={{
                fullWidth: true,
                stackBars: true,
                height: 100,
                high: 100,
                low: 0,
                chartPadding: {right: 30},
                axisX: {showGrid: false},
                axisY: {showGrid: true, showLabel: false},
              }}
            />
          </div>
        </div>

        <div className="row middle-xs">
          <h5 className="col-xs-12">Intel(R) Core(TM) i7-5557U CPU @ 3.10GHz</h5>
          <div className="col-xs-3">
            <ChartistGraph
              type={'Bar'}
              data={data.distBar}
              options={{
                distributeSeries: true,
                height: 100,
                high: 100,
                low: 0,
                axisX: {showGrid: false}

              }}
            />
          </div>
          <div className="col-xs-9">
            <ChartistGraph
              type={'Bar'}
              data={data.series}
              options={{
                fullWidth: true,
                stackBars: true,
                height: 100,
                high: 100,
                low: 0,
                chartPadding: {right: 30},
                axisX: {showGrid: false},
                axisY: {showGrid: true, showLabel: false},
              }}
            />
          </div>
        </div>

        <div className="row middle-xs">
          <h5 className="col-xs-12">Intel(R) Core(TM) i7-5557U CPU @ 3.10GHz</h5>
          <div className="col-xs-3">
            <ChartistGraph
              type={'Bar'}
              data={data.distBar}
              options={{
                distributeSeries: true,
                height: 100,
                high: 100,
                low: 0,
                axisX: {showGrid: false}

              }}
            />
          </div>
          <div className="col-xs-9">
            <ChartistGraph
              type={'Bar'}
              data={data.series}
              options={{
                fullWidth: true,
                stackBars: true,
                height: 100,
                high: 100,
                low: 0,
                chartPadding: {right: 30},
                axisX: {showGrid: false},
                axisY: {showGrid: true, showLabel: false},
              }}
            />
          </div>
        </div>


        <div className="row middle-xs">
          <h5 className="col-xs-12">Intel(R) Core(TM) i7-5557U CPU @ 3.10GHz</h5>
          <div className="col-xs-3">
            <ChartistGraph
              type={'Bar'}
              data={data.distBar}
              options={{
                distributeSeries: true,
                height: 100,
                high: 100,
                low: 0,
                axisX: {showGrid: false}

              }}
            />
          </div>
          <div className="col-xs-9">
            <ChartistGraph
              type={'Bar'}
              data={data.series}
              options={{
                fullWidth: true,
                stackBars: true,
                height: 100,
                high: 100,
                low: 0,
                chartPadding: {right: 30},
                axisX: {showGrid: false},
                axisY: {showGrid: true, showLabel: false},
              }}
            />
          </div>
        </div>
      </div>
    )
  }
})

export default connect((state) => {
  return {
  }
})(Processes)

function fake_data () {
  return {
    distBar: {
      labels: ['user', 'nice', 'idle', 'irq'],
      series: [0, 65, 25, 10]
    },
    memory_usage: {
      labels: ['03:00', '03:10', '03:20', '03:30', '03:40', '03:50', '03:60'],
      series: [
        [10, 10, 5, 40, 50, 60, 30],
        [20, 20, 6, 50, 60, 80, 40],
        [30, 20, 7, 60, 60, 90, 50]
      ]
    },
    series: {
      labels: ['03:00', '03:10', '03:20', '03:30', '03:40', '03:50', '03:60'],
      series: [
        [10, 10, 90, 70, 80, 50, 20],
        [10, 20, 8, 30, 70, 30, 9],
        [10, 10, 1, 40, 50, 60, 30],
        [10, 10, 1, 40, 50, 60, 20]
      ]
    }

  }
}
