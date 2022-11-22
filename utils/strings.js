const capitalizeAll = (metricName) => {
    const wordArr = metricName.split(' ');
    const capitalizedWordArr = wordArr.map(word => word[0].toUpperCase() + word.substr(1));
    return capitalizedWordArr.join(' ');
}

const abbreviateNumber = (number) => {
    return new Intl.NumberFormat('en-US', {
        notation: "compact",
        maximumFractionDigits: 2 }).format(number);
}

export { capitalizeAll, abbreviateNumber };
