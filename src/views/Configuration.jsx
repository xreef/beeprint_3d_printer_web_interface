import React from 'react';

import ConfigurationPageContainer from '../containers/layouts/ConfigurationPageContainer';

class Configuration extends React.Component {
  constructor(props) {
    super(props);
    let a = 1/0;
  }

  render() {
    return (
      <ConfigurationPageContainer />
    );
  }
}

Configuration.propTypes = {

};

export default Configuration;
