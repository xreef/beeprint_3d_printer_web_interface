const overlayStyle = {
  backGround: {
    position: 'fixed', /* Sit on top of the page content */
    // display: 'none', /* Hidden by default */
    width: '100%', /* Full width (cover the whole page) */
    height: '100%', /* Full height (cover the whole page) */
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)', /* Black background with opacity */
    zIndex: 2000, /* Specify a stack order in case you're using a different order for other  */
    cursor: 'pointer' /* Add a pointer on hover */

  },
  progress: {
    margin: 0,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  }
};

export default overlayStyle;
