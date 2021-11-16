import {
  key, CONFIGURATION_FETCH, CONFIGURATION_FETCH_CANCEL, CONFIGURATION_FETCH_FULFILLED,
  CONFIGURATION_FETCH_REJECTED, CONFIGURATION_FIELD_UPDATED, CONFIGURATION_FIELD_INVALID,
  CONFIGURATION_ADD_SUCCESS, CONFIGURATION_ADD_FAILED
} from '../actions/configuration';

export const selectors = {
  data: state => state.configuration.data,
  dataToUpdate: state => state.configuration.dataToUpdate,
  fetchStatus: state => state.fetchStatus
};

const initialState = {
  dataToUpdate: {
    // server: null,
    serverSMTP: null,
    emailNotification: null,
    camera: null
  },
  errors: [],
  valid: false,
  message: '',

  data: null,
  fetchStatus: '',
  isFetching: false,
  lastUpdate: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CONFIGURATION_FETCH:
      return {
        ...state,
        isFetching: true,
        fetchStatus: `fetching... ${(new Date()).toLocaleString()}`,
        data: null,
        lastUpdate: null
      };
    case CONFIGURATION_FETCH_FULFILLED:
      return {
        ...state,
        data: action.data,
        isFetching: false,
        fetchStatus: `Results from ${(new Date()).toLocaleString()}`,
        lastUpdate: action.lastUpdate
      };
    case CONFIGURATION_FETCH_REJECTED:
      return {
        ...state,
        isFetching: false,
        fetchStatus: `errored: ${action.payload}`
      };
    case CONFIGURATION_FETCH_CANCEL:
      return {
        ...state,
        isFetching: false,
        fetchStatus: 'user cancelled'
      };

    case CONFIGURATION_FIELD_UPDATED:
    { // updates dataToUpdate and clears errors
      const fieldUpdate = action.payload;
      const updatedFields = {
        ...state.data,
        ...fieldUpdate
      };
      return {
        ...state,
        dataToUpdate: updatedFields,
        errors: [],
        valid: true,
        message: ''
      };
    }
    case CONFIGURATION_FIELD_INVALID:
    { // updates dataToUpdate but displays errors
      const { errors, fieldUpdate } = action.payload;
      const updatedFields = {
        ...state.dataToUpdate,
        ...fieldUpdate
      };
      return {
        ...state,
        dataToUpdate: updatedFields,
        errors: errors,
        valid: false,
        message: ''
      };
    }
    case CONFIGURATION_ADD_SUCCESS:
    { // add user to list, update message
      const configuration = action.payload;
      return {
        ...state,
        dataToUpdate: { server: null },
        errors: [],
        valid: false,
        message: 'Update succesfully',
        data: configuration
      };
    }
    case CONFIGURATION_ADD_FAILED:
    { // failed to add to server, display error
      const err = action.payload;
      return {
        ...state,
        errors: state.errors.concat(err.message),
        message: ''
      };
    }

    default:
      return state;
  }
}
