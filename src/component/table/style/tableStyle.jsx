import {
  warningColor,
  primaryColor,
  dangerColor,
  successColor,
  infoColor,
  roseColor,
  grayColor,
  defaultFont,
} from '../../style/material-dashboard-react.jsx';

const tableStyle = theme => ({
  warningTableHeader: {
    color: warningColor,
  },
  primaryTableHeader: {
    color: primaryColor,
  },
  dangerTableHeader: {
    color: dangerColor,
  },
  successTableHeader: {
    color: successColor,
  },
  infoTableHeader: {
    color: infoColor,
  },
  roseTableHeader: {
    color: roseColor,
  },
  grayTableHeader: {
    color: grayColor,
  },
  table: {
    marginBottom: '0',
    marginTop: '0',
    width: '100%',
    maxWidth: '100%',
    backgroundColor: 'transparent',
    borderSpacing: '0',
    borderCollapse: 'collapse',
  },
  tableHeadCell: {
    color: 'inherit',
    ...defaultFont,
    fontSize: '1em',
  },
  tableCell: {
    ...defaultFont,
    lineHeight: '1.42857143',
    padding: '4px 2px',
    verticalAlign: 'middle',
  },
  tableCellSmile: {
    textAlign: 'center',
  },
  tableResponsive: {
    width: '100%',
    marginTop: theme.spacing(),
    overflowX: 'auto',
  },
  tableCards1x: {
    overflowY: 'auto',
    // maxHeight: "220px",
    overflowScrolling: 'touch',
    position: 'relative',

  },
});

export default tableStyle;
