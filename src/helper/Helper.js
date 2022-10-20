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

export const send_dummy = (theInput) => {
    //Do something with the input
    return {status:100,message:"Failed to send message"};
};
