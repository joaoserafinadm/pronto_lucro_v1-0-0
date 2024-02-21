export function addAlert(list, data) {
    return {
        type: 'ADD_ALERT',
        payload: [list, data]
    }
}

export function removeAlert(list, index) {
    return {
        type: 'REMOVE_ALERT',
        payload: [list, index]
    }
}
export function resetAlert() {
    return {
        type: 'RESET_ALERT',
        payload: []
    }
}