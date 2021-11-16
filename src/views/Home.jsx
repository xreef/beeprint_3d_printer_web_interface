import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ResponsiveGrid from '../component/responsiveGrid/ResponsiveGrid';

import {
  setHomeLayout
} from '../redux/actions';
import { selectors as homeSelector } from '../redux/reducers/home';
import boxes from '../layouts/box/boxes';

class Home extends React.Component {
  constructor (props) {
    super(props);
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    if (prevProps.elements.length !== this.props.elements.length) {
      setTimeout(() => window.dispatchEvent(new Event('resize')), 250);
    }
  }

  render () {
    const { layouts, elements, saveLayouts } = this.props;
    return <ResponsiveGrid layouts={layouts} elements={elements} showSaveLayoutsButton saveLayouts={saveLayouts} />;
  }
}

Home.propTypes = {
  layouts: PropTypes.object,
  elements: PropTypes.array,

  saveLayouts: PropTypes.func
};

Home.defaultProps = {
  layouts: {
    lg: [], md: [], sm: [], xs: [], xxs: []
  },
  elements: [],
  saveLayouts: () => console.log('Save layout')
};

const mapStateToProps = (state, ownProps) => ({
  layouts: homeSelector.layouts(state),
  elements: homeSelector.elements(state).map((elementHS) => {
    const eHS = { ...elementHS };
    eHS.additionalInfo.classObj = boxes[eHS.additionalInfo.boxType].additionalInfo.classObj;
    eHS.additionalInfo.defaultProps = boxes[eHS.additionalInfo.boxType].additionalInfo.defaultProps;
    return eHS;
  })
});

const mapDispatchToProps = {
  saveLayouts: setHomeLayout
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
