/**
 * Created by renzo on 20/04/2017.
 */
let fillFlatGradientOnReference = (ctx, height, gradientThreshold, fillColorUp, fillColorDown) => {
    var fillStyle;

    if (gradientThreshold < 0) {
        fillStyle = fillColorDown;
    } else if (gradientThreshold > 1) {
        fillStyle = fillColorUp;
    } else {
        var offset = 0.0;
        if (gradientThreshold >= 1) offset = 0;
        fillStyle=ctx.createLinearGradient(0,0,0,height);
        fillStyle.addColorStop(0,fillColorUp);
        fillStyle.addColorStop(gradientThreshold,fillColorUp);
        fillStyle.addColorStop(gradientThreshold + offset,fillColorDown);
        fillStyle.addColorStop(1,fillColorDown);
    }

    return fillStyle;
}
export default fillFlatGradientOnReference;

let fillFlatGradientOnReferenceToPoint = (ctx, {x1, y1, x2, y2}, gradientThreshold, fillColorUp, fillColorDown) => {
    var fillStyle;

    if (gradientThreshold < 0) {
        fillStyle = fillColorDown;
    } else if (gradientThreshold > 1) {
        fillStyle = fillColorUp;
    } else {
        var offset = 0.0;
        if (gradientThreshold >= 1) offset = 0;
        fillStyle=ctx.createLinearGradient(x1, y1, x2, y2);
        fillStyle.addColorStop(0,fillColorUp);
        fillStyle.addColorStop(gradientThreshold,fillColorUp);
        fillStyle.addColorStop(gradientThreshold + offset,fillColorDown);
        fillStyle.addColorStop(1,fillColorDown);
    }

    return fillStyle;
}
export {
    fillFlatGradientOnReference,
    fillFlatGradientOnReferenceToPoint
};