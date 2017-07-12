import React from 'react';
import { getSolarIrradiance } from '../../api/solar.js';
import { TimelineMax } from 'gsap';
import MicrogridChart from './MicrogridChart.js';
import MicrogridGraphic from './MicrogridGraphic.js';
import ChartControls from './ChartControls.js';

const margin = {top: 30, bottom: 30, left: 60, right: 30};

class MicrogridApp extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      data: [],
      size: { width: 0, height: 0 },
      timeline: new TimelineMax({paused: true, onUpdate: this.updateSlider.bind(this)}),
      progress: 0
    };
    this.handleRangeChange = this.handleRangeChange.bind(this);
  }

  handleRangeChange (e) {
    this.state.timeline.pause();
    this.setState({progress: e.target.value});
    this.state.timeline.progress(e.target.value / 100);
  }

  updateSlider () {
    this.setState({progress: this.state.timeline.progress() * 100});
  }

  componentDidMount () {
    let w = this.app.offsetWidth - margin.left - margin.right;
    let h = this.app.offsetWidth * 0.75 - margin.top - margin.bottom;
    this.setState({size: {width: w, height: h}});

    getSolarIrradiance('2010-06-01')
      .then(csv => this.setState({data: csv}));
  }

  render () {
    return (
      <div id="microgrid-app" ref={app => this.app = app}>
        <ChartControls tl={this.state.timeline} progress={this.state.progress} handleRangeChange={this.handleRangeChange}/>
        <MicrogridChart {...this.state} {...this.state.size} margin={margin}/>
        <MicrogridGraphic {...this.state}/>
      </div>
    );
  }
}

export default MicrogridApp ;
