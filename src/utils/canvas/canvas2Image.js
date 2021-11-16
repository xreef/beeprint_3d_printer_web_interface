/**
 * Refactoring to add getDataUrl (canvas.getDataUrl not work on IE11)
 *
 * https://github.com/hongru/canvas2image
 * covert canvas to image
 * and save the image file
 */


    // check if support sth.
    let $support = function () {
        let canvas = document.createElement('canvas'),
            ctx = canvas.getContext('2d');

        return {
            canvas: !!ctx,
            imageData: !!ctx.getImageData,
            dataURL: !!canvas.toDataURL,
            btoa: !!window.btoa
        };
    }();

    let downloadMime = 'image/octet-stream';

    function scaleCanvas (canvas, width, height) {
        let w = canvas.width,
            h = canvas.height;
        if (width == undefined) {
            width = w;
        }
        if (height == undefined) {
            height = h;
        }

        let retCanvas = document.createElement('canvas');
        let retCtx = retCanvas.getContext('2d');
        retCanvas.width = width;
        retCanvas.height = height;
        retCtx.drawImage(canvas, 0, 0, w, h, 0, 0, width, height);
        return retCanvas;
    }

    function getDataURL (canvas, type, width, height) {
        canvas = scaleCanvas(canvas, width, height);
        return canvas.toDataURL(type);
    }

    function saveFile (strData) {
        document.location.href = strData;
    }

    function genImage(strData) {
        let img = document.createElement('img');
        img.src = strData;
        return img;
    }
    function fixType (type) {
        type = type.toLowerCase().replace(/jpg/i, 'jpeg');
        let r = type.match(/png|jpeg|bmp|gif/)[0];
        return 'image/' + r;
    }
    function encodeData (data) {
        if (!window.btoa) { throw 'btoa undefined' }
        let str = '';
        if (typeof data == 'string') {
            str = data;
        } else {
            for (let i = 0; i < data.length; i ++) {
                str += String.fromCharCode(data[i]);
            }
        }

        return btoa(str);
    }
    function getImageData (canvas) {
        let w = canvas.width,
            h = canvas.height;
        return canvas.getContext('2d').getImageData(0, 0, w, h);
    }
    function makeURI (strData, type) {
        return 'data:' + type + ';base64,' + strData;
    }


    /**
     * create bitmap image
     *
     */
    let genBitmapImage = function (data) {
        let imgHeader = [],
            imgInfoHeader = [];

        let width = data.width,
            height = data.height;

        imgHeader.push(0x42); // 66 -> B
        imgHeader.push(0x4d); // 77 -> M

        let fsize = width * height * 3 + 54; // header size:54 bytes
        imgHeader.push(fsize % 256); // r
        fsize = Math.floor(fsize / 256);
        imgHeader.push(fsize % 256); // g
        fsize = Math.floor(fsize / 256);
        imgHeader.push(fsize % 256); // b
        fsize = Math.floor(fsize / 256);
        imgHeader.push(fsize % 256); // a

        imgHeader.push(0);
        imgHeader.push(0);
        imgHeader.push(0);
        imgHeader.push(0);

        imgHeader.push(54); // offset -> 6
        imgHeader.push(0);
        imgHeader.push(0);
        imgHeader.push(0);

        // info header
        imgInfoHeader.push(40); // info header size
        imgInfoHeader.push(0);
        imgInfoHeader.push(0);
        imgInfoHeader.push(0);

        // info
        let _width = width;
        imgInfoHeader.push(_width % 256);
        _width = Math.floor(_width / 256);
        imgInfoHeader.push(_width % 256);
        _width = Math.floor(_width / 256);
        imgInfoHeader.push(_width % 256);
        _width = Math.floor(_width / 256);
        imgInfoHeader.push(_width % 256);

        // info
        let _height = height;
        imgInfoHeader.push(_height % 256);
        _height = Math.floor(_height / 256);
        imgInfoHeader.push(_height % 256);
        _height = Math.floor(_height / 256);
        imgInfoHeader.push(_height % 256);
        _height = Math.floor(_height / 256);
        imgInfoHeader.push(_height % 256);

        imgInfoHeader.push(1);
        imgInfoHeader.push(0);
        imgInfoHeader.push(24); // 24λbitmap
        imgInfoHeader.push(0);

        // no compression
        imgInfoHeader.push(0);
        imgInfoHeader.push(0);
        imgInfoHeader.push(0);
        imgInfoHeader.push(0);

        // pixel data
        let dataSize = width * height * 3;
        imgInfoHeader.push(dataSize % 256);
        dataSize = Math.floor(dataSize / 256);
        imgInfoHeader.push(dataSize % 256);
        dataSize = Math.floor(dataSize / 256);
        imgInfoHeader.push(dataSize % 256);
        dataSize = Math.floor(dataSize / 256);
        imgInfoHeader.push(dataSize % 256);

        // blank space
        for (let i = 0; i < 16; i ++) {
            imgInfoHeader.push(0);
        }

        let padding = (4 - ((width * 3) % 4)) % 4;
        let imgData = data.data;
        let strPixelData = '';
        let y = height;
        do {
            let offsetY = width * (y - 1) * 4;
            let strPixelRow = '';
            for (let x = 0; x < width; x ++) {
                let offsetX = 4 * x;
                strPixelRow += String.fromCharCode(imgData[offsetY + offsetX + 2]);
                strPixelRow += String.fromCharCode(imgData[offsetY + offsetX + 1]);
                strPixelRow += String.fromCharCode(imgData[offsetY + offsetX]);
            }
            for (let n = 0; n < padding; n ++) {
                strPixelRow += String.fromCharCode(0);
            }

            strPixelData += strPixelRow;
        } while(-- y);

        return (encodeData(imgHeader.concat(imgInfoHeader)) + encodeData(strPixelData));

    };

    /**
     * saveAsImage
     * @param canvasElement
     * @param {String} image type
     * @param {Number} [optional] png width
     * @param {Number} [optional] png height
     */
    export const saveAsImage = function (canvas, width, height, type) {
        if ($support.canvas && $support.dataURL) {
            if (type == undefined) { type = 'png'; }
            type = fixType(type);
            if (/bmp/.test(type)) {
                let data = getImageData(scaleCanvas(canvas, width, height));
                let strData = genBitmapImage(data);
                saveFile(makeURI(strData, downloadMime));
            } else {
                let strData = getDataURL(canvas, type, width, height);
                saveFile(strData.replace(type, downloadMime));
            }

        }
    }

    export const convertToImage = function (canvas, width, height, type) {
        if ($support.canvas && $support.dataURL) {
            if (type == undefined) { type = 'png'; }
            type = fixType(type);

            if (/bmp/.test(type)) {
                let data = getImageData(scaleCanvas(canvas, width, height));
                let strData = genBitmapImage(data);
                return genImage(makeURI(strData, 'image/bmp'));
            } else {
                let strData = getDataURL(canvas, type, width, height);
                return genImage(strData);
            }
        }
    }

    export const convertToDataUrl = function (canvas, width, height, type) {
        if ($support.canvas && $support.dataURL) {
            if (type == undefined) { type = 'png'; }
            type = fixType(type);

            if (/bmp/.test(type)) {
                let data = getImageData(scaleCanvas(canvas, width, height));
                let strData = genBitmapImage(data);
                return makeURI(strData, 'image/bmp');
            } else {
                let strData = getDataURL(canvas, type, width, height);
                return strData;
            }
        }
    }



    // return {
    //     saveAsImage: saveAsImage,
        export const saveAsPNG = function (canvas, width, height) {
            return saveAsImage(canvas, width, height, 'png');
        };
        export const saveAsJPEG = function (canvas, width, height) {
            return saveAsImage(canvas, width, height, 'jpeg');
        };
        export const saveAsGIF = function (canvas, width, height) {
            return saveAsImage(canvas, width, height, 'gif')
        };
        export const saveAsBMP = function (canvas, width, height) {
            return saveAsImage(canvas, width, height, 'bmp');
        };


        export const convertToPNG = function (canvas, width, height) {
            return convertToImage(canvas, width, height, 'png');
        };
        export const convertToJPEG = function (canvas, width, height) {
            return convertToImage(canvas, width, height, 'jpeg');
        };
        export const convertToGIF = function (canvas, width, height) {
            return convertToImage(canvas, width, height, 'gif');
        };
        export const convertToBMP = function (canvas, width, height) {
            return convertToImage(canvas, width, height, 'bmp');
        };

        export const convertToDataUrlPNG =  function (canvas, width, height) {
            return convertToDataUrl(canvas, width, height, 'png');
        };
        export const convertToDataUrlJPEG = function (canvas, width, height) {
            return convertToDataUrl(canvas, width, height, 'jpeg');
        };
        export const convertToDataUrlGIF = function (canvas, width, height) {
            return convertToDataUrl(canvas, width, height, 'gif');
        };
        export const convertToDataUrlBMP = function (canvas, width, height) {
            return convertToDataUrl(canvas, width, height, 'bmp');
        }
    // };

