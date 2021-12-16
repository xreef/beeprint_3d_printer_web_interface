import React from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import ResponsiveGrid from '../component/responsiveGrid/ResponsiveGrid';
import boxes from '../layouts/box/boxes';

import {
  setMovementPageLayout
} from '../redux/actions';
import { selectors as movementPageSelectors } from '../redux/reducers/movementPage';

class MovementPage extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      elements: [
        // {i: guid(), ...{...boxes['tableBoxInverterInformationContainer']}},
        // {i: guid(), ...{...boxes['chartBoxMonthly']}},
        // {i: guid(), ...{...boxes['informativeBoxLifetimeProductionContainer']}},
        // {i: guid(), ...{...boxes['informativeBoxYearlyProductionContainer']}},
        // {i: guid(), ...{...boxes['informativeBoxMontlyProductionContainer']}},
        // {i: guid(), ...{...boxes['informativeBoxWeeklyProductionContainer']}}
        // { i: 'informativeBoxT0TempContainerId', ...{ ...boxes.informativeBoxT0TempContainer } },
        { i: 'inputGCodeEditor', ...{ ...boxes.inputGCodeEditor } },
        { i: 'informativeBoxMoveContainer', ...{ ...boxes.informativeBoxMoveContainer } }
        // { i: 'tableBoxFileListContainerId', ...{ ...boxes.tableBoxFileListContainer } },
        // { i: 'fileUploadContainerId', ...{ ...boxes.fileUploadContainer } }
        // { i: 'informativeBoxBedTempContainerId', ...{ ...boxes.informativeBoxBedTempContainer } },
        // { i: 'informativeBoxStatusContainerId', ...{ ...boxes.informativeBoxStatusContainer } },
        // { i: 'chartBoxTemperaturesId', ...{ ...boxes.chartBoxTemperatures } },
        // { i: 'informativeBoxDailyProductionContainerId', ...{ ...boxes.informativeBoxDailyProductionContainer } },
        // { i: 'chartBoxProductionPowerId', ...{ ...boxes.chartBoxProductionPower } }
        // { i: 'chartBoxProductionCurrentId', ...{ ...boxes.chartBoxProductionCurrent } },
        // {
        //   i: 'chartBoxProductionVoltageId',
        //   ...{ ...boxes.chartBoxProductionVoltage },
        //   ...{
        //     additionalInfo: {
        //       ...boxes.chartBoxProductionVoltage.additionalInfo,
        //       // settingsProps: {
        //       //   day: '20181019',
        //       // },
        //     },
        //   },
        // },
      ]
    };
  }

  render () {
    const { layouts, saveLayouts } = this.props;

    return (
      <ResponsiveGrid
        elements={[...this.state.elements]}
        layouts={layouts}
        showSaveLayoutsButton
        saveLayouts={saveLayouts}
      />
    );
  }
}

MovementPage.propTypes = {
  layouts: PropTypes.object,

  saveLayouts: PropTypes.func
};

MovementPage.defaultProps = {
  layouts: {
    lg: [], md: [], sm: [], xs: [], xxs: []
  },
  saveLayouts: () => console.log('Save layout')
};

const mapStateToProps = (state, ownProps) => ({
  layouts: movementPageSelectors.layouts(state)
});

const mapDispatchToProps = {
  saveLayouts: setMovementPageLayout
};

export default connect(mapStateToProps, mapDispatchToProps)(MovementPage);
