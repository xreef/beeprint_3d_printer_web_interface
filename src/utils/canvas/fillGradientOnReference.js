let fillGradientOnReference = (ctx, height, gradientThreshold, fillColorUp, fillColorMiddleUp, fillColorMiddleDown, fillColorDown) => {
    let gradi = ctx.createLinearGradient(0, 0, 0, height);

    var offset = 0.0;

    if ( gradientThreshold >= 1 )
    {
        gradi.addColorStop( 0, fillColorUp );
        gradi.addColorStop( 1, fillColorMiddleUp );
    }
    else if ( gradientThreshold <= 0 )
    {
        gradi.addColorStop( 0, fillColorMiddleDown );
        gradi.addColorStop( 1, fillColorDown );
    }
    else
    {
        gradi.addColorStop( 0, fillColorUp );
        gradi.addColorStop( gradientThreshold, fillColorMiddleUp );
        gradi.addColorStop( gradientThreshold + offset, fillColorMiddleDown );
        gradi.addColorStop( 1, fillColorDown );
    }

    return gradi;
};
export default fillGradientOnReference;

let fillGradientOnReferencePoint = (ctx, {x1, y1, x2, y2}, gradientThreshold, fillColorUp, fillColorMiddleUp, fillColorMiddleDown, fillColorDown) => {
    let gradi = ctx.createLinearGradient(x1, y1, x2, y2);

    var offset = 0.0;

    if ( gradientThreshold >= 1 )
    {
        gradi.addColorStop( 0, fillColorUp );
        gradi.addColorStop( 1, fillColorMiddleUp );
    }
    else if ( gradientThreshold <= 0 )
    {
        gradi.addColorStop( 0, fillColorMiddleDown );
        gradi.addColorStop( 1, fillColorDown );
    }
    else
    {
        gradi.addColorStop( 0, fillColorUp );
        gradi.addColorStop( gradientThreshold, fillColorMiddleUp );
        gradi.addColorStop( gradientThreshold + offset, fillColorMiddleDown );
        gradi.addColorStop( 1, fillColorDown );
    }

    return gradi;
};
let fillLinearGradientOnReferencePoint = (ctx, {x1, y1, x2, y2}, gradientThreshold, fillColorUp, fillColorDown) => {
    let gradi = ctx.createLinearGradient(x1, y1, x2, y2);

    var offset = 0.0;

    if ( gradientThreshold >= 1 )
    {
        gradi.addColorStop( 0, fillColorUp );
        gradi.addColorStop( 1, fillColorUp );
    }
    else if ( gradientThreshold <= 0 )
    {
        gradi.addColorStop( 0, fillColorDown );
        gradi.addColorStop( 1, fillColorDown );
    }
    else
    {
        gradi.addColorStop( 0, fillColorUp );
        gradi.addColorStop( 1, fillColorDown );
    }

    return gradi;
};
export {
    fillGradientOnReference,
    fillGradientOnReferencePoint,
    fillLinearGradientOnReferencePoint
};