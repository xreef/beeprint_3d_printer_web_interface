const version = (state = {
  version: '0.9',
  date: '1/11/2021'
}

, action) => {
  switch (action.type) {
    case 'SET_VERSION':
      return { version: action.version, date: new Date().toISOString() };
    default:
      return state;
  }
};

export default version;
