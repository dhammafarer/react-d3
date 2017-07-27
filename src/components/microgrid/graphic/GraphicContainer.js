import React from 'react';
import PropTypes from 'prop-types';
import MicrogridGraphic from './MicrogridGraphic.js';
import { Transition, TransitionGroup } from 'react-transition-group';

GraphicContainer.propTypes = {
  systems: PropTypes.array.isRequired,
  activeIdx: PropTypes.number.isRequired,
  openGraphicModal: PropTypes.func.isRequired
};

function GraphicContainer ({systems, activeIdx, openGraphicModal}) {
  return (
    <div className="graphic-container">
      {systems.filter((el, i) => i == activeIdx).map(system =>
        <MicrogridGraphic key={system.name} {...system} openGraphicModal={openGraphicModal}/>
      )}
  </div>);
}


export default GraphicContainer;
