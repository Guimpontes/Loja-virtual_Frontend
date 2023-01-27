export default function priceFormat(price) {
    const pricePT = price.toLocaleString("pt-BR");
    const pricesIncludeComma = pricePT.includes(",");
    const pricesCommaIndexOf = pricePT.indexOf(",") + 1;
    const pricesLaterComma = pricePT.substring(pricesCommaIndexOf);

    if (!pricesIncludeComma) {
        return `${pricePT},00`
    } else if (pricesLaterComma.length < 2) {
        return `${pricePT}0`
    }

    return pricePT
}