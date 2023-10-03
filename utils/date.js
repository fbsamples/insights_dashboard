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

const formatEpochTimeToDateString = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}/${month}/${day}`;
}

const getLast30DaysInterval = () => {
    const today = new Date();
    const until = today.toISOString().split('T')[0];
    const since = new Date(new Date().setDate(today.getDate() - 30)).toISOString().split('T')[0];
    return { since, until };
}

const getLastNDaysInterval = (num) => {
    const today = new Date();
    const until = today.toISOString().split('T')[0];
    const since = new Date(new Date().setDate(today.getDate() - num)).toISOString().split('T')[0];
    return { since, until };
}

const getLast30DayEpoc = () => {
    const today = new Date();
    const until = Math.round(today / 1000);
    const since = Math.round(new Date().setDate(today.getDate() - 29) / 1000);
    return { since, until };
}

export { formatTimestampToDate, formatEpochTimeToDateString, getLast30DaysInterval, getLastNDaysInterval, getLast30DayEpoc, formatTimestampToDateAndTime };
