import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// core components
import tableStyle from "./style/tableStyle.jsx";
import PerfectScrollbar from "perfect-scrollbar";

import fitDimensionTableBox from './utils/fitDimensionsTableBox';

class CustomTable extends React.Component {
  constructor(props) {
    super(props);
  }

  setTableContainerRef = (tableContainerRef) => {
    this.tableContainerRef = tableContainerRef;
  };

  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      const ps = new PerfectScrollbar(this.tableContainerRef);
    }
  }

  render() {
    const {classes, tableHead, tableData, tableHeaderColor} = this.props;
    const {height} = this.props;
    return (

      <div className={classes.tableResponsive + ' ' + classes.tableCards1x} style={{height: height}} ref={this.setTableContainerRef}>

        <Table className={classes.table}>
          {tableHead !== undefined ? (
            <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
              <TableRow>
                {tableHead.map((prop, key) => {
                  return (
                    <TableCell
                      className={classes.tableCell + " " + classes.tableHeadCell}
                      key={key}
                    >
                      {prop}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
          ) : null}
          <TableBody className={classes.tableBodyCardSize}>
            {tableData.map((prop, key) => {
              return (
                <TableRow key={key}>
                  {prop.map((prop, key) => {
                    return (
                      <TableCell className={classes.tableCell +" "+((typeof prop !== 'string')?classes.tableCellSmile:"")} key={key}>
                        {prop}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    );
  }
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray"
};

CustomTable.propTypes = {
  classes: PropTypes.object.isRequired,
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.array)
};

export default withStyles(tableStyle)(CustomTable);
