export function isTravelersCountValid(adultsCount, childrenCount) {
    const adultsAsInt = parseInt(adultsCount);
    const childrenAsInt = parseInt(childrenCount);

    if (!Number.isInteger(adultsAsInt) || !Number.isInteger(childrenAsInt)) {
        return false;
    }

    return adultsAsInt > 0;
}

export function isCustomerDataValid(name, email) {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return name.length > 0 && emailRegex.test(email);
}