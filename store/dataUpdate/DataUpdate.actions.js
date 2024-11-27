export function updateOn() {
    return {
        type: 'UPDATE_ON',
        payload: true
    }
}

export function updateOff(list, index) {
    return {
        type: 'UPDATE_OFF',
        payload: false
    }
}