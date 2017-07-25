import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class BuildingMarkers extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      showContent: false,
      markerStyle: {top: 0, left: 0}
    };
  }
  showContent ({nativeEvent}) {
    /* eslint-disable no-console */
    this.setState({
      showContent: !this.state.showContent,
      markerStyle: {
        top: nativeEvent.clientY,
        left: nativeEvent.clientX,
      }
    });
  }

  render () {
    let {data, height} = this.props;
    let contentClass = classnames({
      'marker-content': true,
      'open': this.state.showContent
    });

    return (
      <div className="markers">
        {data.map(el =>
          <div key={el.pos} className="tile" style={{...el.style, height: height}}>
            <div className="marker-tile">
              <div className="dot-background"></div>
              <div onClick={this.showContent.bind(this)} className="dot">
              </div>
            </div>
          </div>)}

          <div className={contentClass} style={this.state.markerStyle}>
            content
          </div>
      </div>
    );
  }
}

BuildingMarkers.propTypes = {
  data: PropTypes.array.isRequired,
  height: PropTypes.number.isRequired
};

export default BuildingMarkers;
