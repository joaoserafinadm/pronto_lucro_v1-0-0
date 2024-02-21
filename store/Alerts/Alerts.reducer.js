



export default function inventoryListReducer(state = [], action) {


    
    switch (action.type) {
        case 'ADD_ALERT':
            console.log(action)
            return action.payload[0].concat(action.payload[1])

        case 'REMOVE_ALERT':
            const filtered = action.payload[0].filter((elem, index) => index !== action.payload[1])
            return filtered


        case 'RESET_ALERT':
            return action.payload

        default: return state
    }

}