export const GET_LOCAL = (keyName) => {
    let temp = window.localStorage.getItem(keyName)
    if (!!temp) return temp
}

export const SET_LOCAL = (key, value) => {
    window.localStorage.setItem(key, value)
}

export const GET_COOKIE = (cname) => {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

export const SET_COOKIE = (cname, cvalue, exdays) => {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    //setting a domain name in cookie if project is running on dev or production
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/; secure;";
}

export const DELETE_COOKIE = (name) => {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

