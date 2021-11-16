import { connect } from 'react-redux';
import { selectors as homeSelector } from '../../../redux/reducers/home';

import {
  addElementToHome,
  removeElementFromHome
} from '../../../redux/actions';

// import ChartBoxProduction from '../../../layouts/box/chartBox/ChartBoxProduction';
import ChartBoxTemperaturesRealtime from '../../../layouts/box/chartBox/ChartBoxTemperaturesRealtime';
import { defaultStyleLine } from '../../../component/charts/AreaChart';

const isElementInHome = (element, homeElements) => homeElements.some(elem => elem.additionalInfo.boxType === element);

const getYCoordinateList = (state) => {
  const yC = [];
  if (state.temperatures.T0Target) {
    yC.push({
      ...defaultStyleLine,
      text: 'E1',
      yValue: state.temperatures.T0Target,
      id: 'E1Id',
      stroke: '#59b15d'
    });
  }
  if (state.temperatures.T1Target) {
    yC.push({
      ...defaultStyleLine,
      text: 'E2',
      yValue: state.temperatures.T1Target,
      id: 'E1Id',
      stroke: '#fd9a14'
    });
  }
  if (state.temperatures.BTarget) {
    yC.push({
      ...defaultStyleLine,
      text: 'Bed',
      yValue: state.temperatures.BTarget,
      id: 'BId',
      stroke: '#eb4945'
    });
  }

  return yC;
};

const mapStateToProps = (state, ownProps) => ({
  data: state.temperatures.historicalValues.map(elem => { elem.val = elem.T0; elem.date = elem.dateValue; return elem; }),
  isFetching: state.temperatures.historicalValues.lenght < 3,
  dataType: 'temperature',
  isInHome: isElementInHome(ownProps.boxType, homeSelector.elements(state)),
  yCoordinateList: getYCoordinateList(state)
});

const mapDispatchToProps = {
  addElementToHome,
  removeElementFromHome
};

export default connect(mapStateToProps, mapDispatchToProps)(ChartBoxTemperaturesRealtime);
