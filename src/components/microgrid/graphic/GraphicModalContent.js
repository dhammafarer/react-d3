import React from 'react';
import PropTypes from 'prop-types';

GraphicModalContent.propTypes = {
  data: PropTypes.object.isRequired
};

function GraphicModalContent ({data}) {
  return (
    <div className="modal-card">
      <header className="modal-card-head">
        <p className="modal-card-title">{data.name}</p>
        <button className="delete"></button>
      </header>
      <section className="modal-card-body">
      </section>
      <footer className="modal-card-foot">
        <a className="button">Close</a>
      </footer>
    </div>
  );
}


export default GraphicModalContent;
