export function akvoToolInitialValues() {
    return {
        type: 'TOOL_INITIAL_VALUES',
        payload: ''
    }
}

export function setAkvoTool(data) {
    return {
        type: 'SET_AKVO_TOOL',
        payload: data
    }
}