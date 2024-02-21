


export default function randomPassword(len) {

    let passwd = ''
    do {
        passwd += Math.random().toString(36).substr(2)
    } while (passwd.length < len)
    passwd = passwd.substr(0, len)
    return passwd.toUpperCase()

    return passwd
}