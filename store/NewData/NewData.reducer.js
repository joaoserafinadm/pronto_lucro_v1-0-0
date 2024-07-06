export default function newDataReducer(state = false, action) {
    switch (action.type) {
        case 'NEW_DATA':
            return action.payload

        default: return state
    }
}