/**
 * Initialize devtool extensions.
 */
exports.init = () => {
  const {
    default: installExtension,
    REACT_DEVELOPER_TOOLS,
    REDUX_DEVTOOLS
  } = require('electron-devtools-installer');

  installExtension([REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS])
    .then(name => console.log(`Added Extension:  ${name}`))
    .catch(err => console.log('An error occurred: ', err));
};
