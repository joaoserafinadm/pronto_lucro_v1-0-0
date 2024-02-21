export function unidList(state = [], action) {
    switch (action.type) {
        case 'GET_UNIDADES':
            return action.payload

        default: return state
    }
}

export function unidSelect(state = '', action) {
    switch (action.type) {
        case 'SET_UNIDADES':
            return action.payload

        default: return state
    }
}