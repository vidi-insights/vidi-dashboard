'use strict'

import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {Panel, PageHeader, HealthList, InfoCell} from '../components/index'
import ChartistGraph from 'react-chartist'
import {subscribe, unsubscribe} from '../actions/vidi'
import {ForceChart} from '../components/forceChart'
import _ from 'lodash'


export const Overview = React.createClass({
  componentDidMount () {
    this.props.dispatch(subscribe('messages'))
  },

  componentWillUnmount () {
    this.props.dispatch(unsubscribe('messages'))
  },

  render () {
    var sections = []

    var groups = _.groupBy(this.props.messages, 'pattern')

    var sortedKeys = _.keys(groups).sort()

    _.each(sortedKeys, (theKey) => {
      var group = groups[theKey]

      if (group) {
        var proc_sections = []
        var data = _.orderBy(group, ['pid'], ['desc'])
        var count = data.length
        var tag = ''
        var key

        _.each(data, (message) => {
          if (message) {
            key = message.pattern.replace(/:/, '_').replace(/,/, '_ ')
            tag = message.pattern
            proc_sections.push(makeMessageSections(message))
          }
        })

        sections.push(
          <div key={key} className="process-group panel">
          <div className="panel-heading row no-gutter cf">
            <div className="col-xs-12 col-sm-2 col-md-2">
              <h4 className="m0 fl-left"><strong>{tag}</strong></h4>
            </div>

            <div className="col-xs-12 col-sm-9 col-md-9">
              <HealthList count={count}/>
            </div>

            <div className="col-xs-1 col-sm-1 col-md-1">
              <a href="" className="fl-right icon icon-collapse"></a>
            </div>
          </div>

            <div className="panel-body">
              {proc_sections}
            </div>
          </div>
        )
      }
    })



    return (
      <div className="page page-processes">
        <div className="container-fluid">
          <PageHeader title={'Messages'} />
        </div>

        <div className="container-fluid">
          <div className="process-card">
            <div className="process-heading has-icon">
              Live Graph
            </div>

            <div className="process-stats-row row no-gutter">
              <ForceChart height={200} width={400} data={['']} />
            </div>
          </div>

          {sections}
        </div>
      </div>
   )
  }
})

export default connect((state) => {
  var vidi = state.vidi
  var messages = vidi.messages || {data: [null]}

  return {
    messages: messages.data
  }
})(Overview)

function makeMessageSections (messages) {
  var section = []
  var now = messages.latest

  var link = `/process/${now.pid}`

  return (
    <div key={now.pid} className="process-card">
      <div className="process-heading has-icon">
        <span className="status status-healthy status-small" title="Status: healthy"></span>
        <Link to={link}>{`${now.pid} - ${now.tag}`}</Link>
      </div>

      <div className="process-stats-row row no-gutter">
        <div className="col-xs-12 mt mb0">
          <ChartistGraph
            type={'Line'}
            data={{labels: messages.series.time, series: [messages.series.rate]}}
            options={{
              fullWidth: true,
              showArea: false,
              showLine: true,
              showPoint: false,
              chartPadding: {right: 30},
              axisY: {onlyInteger: true},
              axisX: {labelOffset: {x: -15}, labelInterpolationFnc: (val) => {
                if (_.last(val) == '0') return val
                else return null
              }},
            }}/>
        </div>
      </div>
    </div>
  )
}
