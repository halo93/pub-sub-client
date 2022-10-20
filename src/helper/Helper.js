export const encode = (theInput) => {
    //Do something with the input
    return theInput;
};

export const decode = (theInput) => {
    return theInput;
};

export const convertToTimestampToLocaleString = (timestamp) => {
    return new Date(timestamp).toLocaleString().replace(',','');
}
