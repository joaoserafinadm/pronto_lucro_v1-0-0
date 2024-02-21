export default function akvoToolReducer(state = '', action) {
    switch (action.type) {
        case 'TOOL_INITIAL_VALUES':
            return action.payload

        case 'SET_AKVO_TOOL':
            return action.payload

        default: return state
    }
}