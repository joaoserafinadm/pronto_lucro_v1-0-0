export default function reportLoadingReducer(state = 0, action) {
    switch (action.type) {
        case 'REPORT_LOADING':
            return action.payload

        default: return state
    }
}