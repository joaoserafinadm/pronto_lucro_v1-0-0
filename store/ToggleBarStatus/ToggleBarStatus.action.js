export function toggleBarChange(data) {
    return {
        type: "TOGGLE_BAR_CHANGE",
        payload: !data
    }
}

export function toggleBarOff() {
    return {
        type: "TOGGLE_BAR_OFF",
        payload: false
    }
}
export function toggleBarOn() {
    return {
        type: "TOGGLE_BAR_ON",
        payload: true
    }
}