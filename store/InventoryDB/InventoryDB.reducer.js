export default function inventoryDBReducer(state = [], action) {
    switch (action.type) {
        case 'GET_INVENTORY':
            return action.payload

        default: return state
    }
}