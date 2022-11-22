const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';

    let color = '#';
    while (color.length < 7) {
        color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
}

const generateRandomColorArray = (size) => {
    const arr = new Array(size);
    for (let i = 0; i < size; i++) {
        arr[i] = generateRandomColor();
    }
    return arr;
}

export { generateRandomColor, generateRandomColorArray };
