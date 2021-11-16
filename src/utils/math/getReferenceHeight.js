/**
 * Created by renzo on 20/04/2017.
 */
let getReferenceHeight = (reference, minDomain, maxDomain, minRange, maxRange) =>{
	var height = minRange;
    var yn;

        let stop = reference;
        if (stop > maxDomain) yn = maxRange;
        else if (stop < minDomain) yn = minRange;
        else yn = height - ((stop - minDomain) / (maxDomain - minDomain) * (minRange - maxRange));

    return yn;
}
export default getReferenceHeight;