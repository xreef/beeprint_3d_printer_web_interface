import React from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';

import { Responsive, WidthProvider } from 'react-grid-layout';
import Button from '@material-ui/core/Button';

import './style/responsiveGridLayout.scss';

import { Fab, withStyles, Zoom } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import Tooltip from '@material-ui/core/Tooltip';

import { FormattedMessage, injectIntl } from 'react-intl';
import responsiveGridLayoutStyle from './style/responsiveGridLayoutStyle';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

class ResponsiveGrid extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = this.init();
  }

  componentDidUpdate(oldProps) {
    if (this.props.elements.length !== oldProps.elements.length) {
      this.setState(this.init());
    }
  }

  init = () => {
    let { layouts, gridConfig } = this.props;

    const additionalInfo = {};

    // layouts['lg'].forEach((elem)=>{
    //     additionalInfo.push(elem.additionalInfo);
    // });
    //

    this.props.elements.forEach((elem) => {
      const firstKey = Object.keys(layouts)[0];
      const isAlreadyInLayout = layouts[firstKey].some(elemLay => elemLay.i === elem.i) || false;
      if (!isAlreadyInLayout) {
        layouts = this.addNewItem(elem, layouts, additionalInfo, gridConfig);
      }
      elem.additionalInfo.id = elem.i;
      additionalInfo[elem.i] = elem.additionalInfo;
    });

    setTimeout(() => window.dispatchEvent(new Event('resize')), 250);

    return {
      breakpoint: 'lg',
      layouts,
      additionalInfo
    };
  };

  addNewItem = (elem, layouts, additionalInfo, gridConfig) => {
    // console.log('adding', divUniqueId);
    if (elem.id in additionalInfo) {
      throw 'Elemento già presente!';
      // return;
    }

    const newLayouts = { ...layouts };
    Object.keys(newLayouts).forEach((key) => {
      let total = 0;

      const layout = newLayouts[key];

      if (layout.length > 0) total += layout[layout.length - 1].w + layout[layout.length - 1].x;

      if (total + elem.w > gridConfig.cols[key]) {
        total = 0;
      }

      layout.push({ ...elem, ...{ x: total % (gridConfig.cols[key]), y: Infinity }/* , additionalInfo: {...elem.additionalInfo, ...{id: elem.i}} */ });
      newLayouts[key] = layout;
    });

    return newLayouts;
  };

    onBreakpointChange = (breakpoint) => {
      this.setState({ breakpoint });
    };

    onLayoutChange = (layout, layouts) => {
      this.setState({ tmpLayouts: layouts });
    };

    onResizeStart = (layout, from, to) => {
      const addI = this.state.additionalInfo[from.i];
    };

    onResize = (layout, from, to, elem, event, dragger) => {
      // console.log(layout, from, to, elem, event, dragger);
      const addI = this.state.additionalInfo[from.i];
    };

    onResizeStop = (layout, from, to) => {
      const addI = this.state.additionalInfo[from.i];

      setTimeout(() => window.dispatchEvent(new Event('resize')), 250);
    };

    onDragStop = (layout, from, to) => {
      const addI = this.state.additionalInfo[from.i];
    };

    onDragStart = (layout, from, to) => {
      const addI = this.state.additionalInfo[from.i];
    };

    onDrag = (layout, from, to, elem, event, dragged) => {
      // console.log(layout, from, to, elem, event, dragged);
      const addI = this.state.additionalInfo[from.i];
    };

    getCard = (additionalInfo) => {
      if (additionalInfo.classObj) {
        return additionalInfo.classObj(additionalInfo.id, { ...(additionalInfo.settingsProps || additionalInfo.defaultProps), boxType: additionalInfo.boxType });
      }
    };

    getAllDivs = () => {
      const { layouts, breakpoint, additionalInfo } = this.state;
      const alldivs = [];
      if (layouts[breakpoint]) {
        layouts[breakpoint].forEach((elem) => {
          alldivs.push(<div id={elem.i} key={elem.i}>{this.getCard(additionalInfo[elem.i])}</div>);
        });
      }
      return alldivs;
    };

    render() {
      const { gridConfig, classes } = this.props;
      const { showSaveLayoutsButton, saveLayouts } = this.props;
      const { layouts, tmpLayouts } = this.state;

      let fabButtons = null;
      if (showSaveLayoutsButton) {
        fabButtons = (
          <Tooltip key="responsiveGridButtonTooltipId" placement="left" title={<FormattedMessage id="home.fab.tooltip" />}>
            <Fab aria-label="Save" className={classes.fab} color="secondary" onClick={() => saveLayouts(tmpLayouts || layouts)}>
              <SaveIcon />
            </Fab>
          </Tooltip>
        );
      }

      return [<ResponsiveReactGridLayout
        key="responsiveGridId"
        layouts={layouts}
        onBreakpointChange={this.onBreakpointChange}
        onLayoutChange={this.onLayoutChange}

        onResizeStart={this.onResizeStart}
        onResize={this.onResize}
        onResizeStop={this.onResizeStop}

        onDragStop={this.onDragStop}
        onDragStart={this.onDragStart}
        onDrag={this.onDrag}

            // WidthProvider option
        measureBeforeMount={false}


        {...gridConfig}
      >
        {this.getAllDivs()}
              </ResponsiveReactGridLayout>,
      fabButtons
      ];
    }
}

const type = obj => Object.prototype.toString.call(obj);

ResponsiveGrid.propTypes = {
  gridConfig: PropTypes.object.isRequired,
  // layouts is an object mapping breakpoints to layouts.
  // e.g. {lg: Layout, md: Layout, ...}
  layouts(props, propName, _componentName) {
    if (type(props[propName]) !== '[object Object]') {
      throw new Error(`Layout property must be an object. Received: ${type(props[propName])}`);
    }
    Object.keys(props[propName]).forEach((key) => {
      if (!(key in props.gridConfig.breakpoints)) {
        throw new Error('Each key in layouts must align with a key in breakpoints.');
      }
      validateLayout(props.layouts[key], `layouts.${key}`);
    });
  },
  elements: PropTypes.array,

  showSaveLayoutsButton: PropTypes.bool,
  saveLayouts: PropTypes.func
};

ResponsiveGrid.defaultProps = {
  gridConfig: {
    // draggableHandle: '.dragHeader',
    draggableHandle: '.dragHeader',
    className: 'responsive-grid-layout',
    rowHeight: 175,
    // currentBreakpoint: this.previousLayoutBreakpoint,
    // Various layout that can be present on windows size change
    cols: {
      lg: 5, md: 4, sm: 3, xs: 2, xxs: 1
    },
    // cols: {lg: 3, md: 2, sm: 1},
    // The breaking layout
    breakpoints: {
      lg: 1800, md: 1400, sm: 1100, xs: 720, xxs: 0
    },
    // breakpoints: {lg: 1800, md: 1100, sm: 0}
    // ,sizeParameter: {
    //     maxH: undefined,
    //     maxW: undefined,
    //     minH: undefined,
    //     minW: undefined
    // },
    // moveParameter: {
    //     isDraggable: true,
    //     isResizable: false,
    //     static: false
    // }
    isDraggable: true,
    isResizable: true
  },
  layouts: {
    lg: [], md: [], sm: [], xs: [], xxs: []
  },

  elements: [],

  showSaveLayoutsButton: false
};

export default withStyles(responsiveGridLayoutStyle)(ResponsiveGrid);

/**
 * Validate a layout. Throws errors.
 *
 * @param  {Array}  layout        Array of layout items.
 * @param  {String} [contextName] Context name for errors.
 * @throw  {Error}                Validation error.
 */
function validateLayout(layout, contextName) {
  contextName = contextName || 'Layout';
  const subProps = ['x', 'y', 'w', 'h'];
  if (!Array.isArray(layout)) throw new Error(`${contextName} must be an array!`);
  for (let i = 0, len = layout.length; i < len; i++) {
    const item = layout[i];
    for (let j = 0; j < subProps.length; j++) {
      if (typeof item[subProps[j]] !== 'number') {
        if (j === 1) {
          item[subProps[j]] = Infinity;
        } else {
          throw new Error(`ReactGridLayout: ${contextName}[${i}].${subProps[j]} must be a number!`);
        }
      }
    }
    if (item.i && typeof item.i !== 'string') {
      throw new Error(`ReactGridLayout: ${contextName}[${i}].i must be a string!`);
    }
    if (item.static !== undefined && typeof item.static !== 'boolean') {
      throw new Error(`ReactGridLayout: ${contextName}[${i}].static must be a boolean!`);
    }
  }
}
