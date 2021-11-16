
// unique key namespace used by combineReducers.
// By convention it will match the directory structure to
// make it easy to locate the src.
// Also action types will prefix with the capitalized version
export const key = 'printerFilesSD';

// action type constants
export const PRINTER_FILES_SD_SET_LAYOUTS = 'PRINTER_FILES_SD_SET_LAYOUTS';

export const actionTypes = {
  PRINTER_FILES_SD_SET_LAYOUTS
};

// action creators
export const setPrinterFilesSDLayout = layouts => ({
  type: PRINTER_FILES_SD_SET_LAYOUTS,
  layouts
});

export const actions = {
  setPrinterFilesSDLayout
};
