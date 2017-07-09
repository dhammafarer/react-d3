import React from 'react';
import { getSolarIrradiance } from '../../api/solar.js';

class MicrogridApp extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: []
    }
  }

  componentDidMount () {
    getSolarIrradiance('2010-06-01')
      .then(csv => this.setState({data: csv}));
  }

  render () {
    let data = this.state.data.map(d =>
      <li key={d.date}>{d.date}, {d.value}</li>
    );

    return (
      <div>
        <ul>
          {data}
        </ul>
      </div>
    )
  }
}

export default MicrogridApp ;
