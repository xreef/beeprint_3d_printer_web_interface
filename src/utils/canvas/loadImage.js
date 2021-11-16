const loadImage = function (src, callback) {
  const img = new Image();
  img.onload = function () {
    if (callback) callback(img);
  };
  img.src = src;
  return img;
};
export default loadImage;
