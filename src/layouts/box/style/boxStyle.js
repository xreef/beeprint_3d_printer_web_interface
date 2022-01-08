import headerLinksStyle from '../../../component/header/style/headerLinksStyle';

const boxStyle = theme => ({
  executionMarker: {
    backgroundColor: 'yellow',
    position: 'absolute'
  },
  imageIcon: {
    fill: 'rgba(255,255,255,.62)',
    width: '1em',
    height: '1em'
  },
  iconRoot: {
    textAlign: 'center'
  },
  cardCategory: {
    color: '#999999',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    paddingTop: '10px',
    marginBottom: '0'
  },
  cardCategoryWhite: {
    '&,& a,& a:hover,& a:focus': {
      color: 'rgba(255,255,255,.62)',
      margin: '0',
      fontSize: '14px',
      marginTop: '0',
      marginBottom: '0'
    },
    '& a,& a:hover,& a:focus': {
      color: '#FFFFFF'
    }
  },
  cardTitle: {
    color: '#3C4858',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
    '& small': {
      color: '#777',
      fontWeight: '400',
      lineHeight: '1'
    }
  },
  cardTitleWhite: {
    lineHeight: '20px',
    color: '#FFFFFF',
    margin: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
    '& small': {
      color: '#777',
      fontWeight: '400',
      lineHeight: '1'
    }
  },
  tableSize: {
    // maxHeight: "224px",
    overflowY: 'auto'
  },
  divContainer: {
    width: '100%',
    minHeight: '250px'
  },
  progress: {
    margin: 0,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  icons: {
    width: '17px',
    height: '17px',
    color: '#FFFFFF'
  },
  textField: {
    marginLeft: theme.spacing(),
    marginRight: theme.spacing(),
    // width: 122
  },
  textFieldInput: {
    padding: '4px 0 7px',
    marginBottom: '-5px'
  },
  selectInput: {
    paddingRight: '20px',
    marginBottom: '-5px'
  },
  buttonFooter: {
    right: '10px',
    position: 'absolute',
    padding: '0px 0px 7px',
    margin: '0px'
  },
  buttonFavoriteHeader: {
    right: '-8px',
    top: '-3px',
    margin: '0px',
    padding: '0px',
    position: 'absolute'
  },
  buttonHeader: {
    position: 'absolute',
    right: '10px',
    top: '10px'
  },
  buttonHeader2: {
    position: 'absolute',
    right: '60px',
    top: '10px'
  },
  tableActionButton: {
    width: '27px',
    height: '27px',
    padding: '0'
  },
  tableActionButtonIcon: {
    width: '17px',
    height: '17px'
  }

});

export default boxStyle;
