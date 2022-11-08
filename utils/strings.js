const capitalizeAll = (metricName) => {
    const wordArr = metricName.split(' ');
    const capitalizedWordArr = wordArr.map(word => word[0].toUpperCase() + word.substr(1));
    return capitalizedWordArr.join(' ');
}


export { capitalizeAll };
