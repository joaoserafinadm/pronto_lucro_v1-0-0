



export default function dataUpdateReducer(state = false, action) {

    switch (action.type) {
        case 'UPDATE_ON':
            return action.payload

        case 'UPDATE_OFF':
            return action.payload


        default: return state
    }

}