const formatTimestampToDate = (timestamp) => {
    return timestamp.split('T')[0];
}

const getLast30DaysInterval = () => {
    const today = new Date();
    const until = today.toISOString().split('T')[0];
    const since = new Date(new Date().setDate(today.getDate() - 30)).toISOString().split('T')[0];
    return { since, until };
}

export { formatTimestampToDate, getLast30DaysInterval };
