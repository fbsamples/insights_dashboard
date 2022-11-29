const formatTimestampToDate = (timestamp) => {
    const dateArr = timestamp.split('T')[0].split('-');
    return dateArr[1] + '/' + dateArr[2] + '/' + dateArr[0].substr(-2);
}

const formatTimestampToDateAndTime = (timestamp) => {
    const arr = timestamp.split('T');
    const time = arr[1].split('+')[0];
    const date = formatTimestampToDate(timestamp);
    return 'Time: ' + time.substr(0, time.length-3) + ' · Date: ' + date;
}

const getLast30DaysInterval = () => {
    const today = new Date();
    const until = today.toISOString().split('T')[0];
    const since = new Date(new Date().setDate(today.getDate() - 30)).toISOString().split('T')[0];
    return { since, until };
}

export { formatTimestampToDate, getLast30DaysInterval, formatTimestampToDateAndTime };
