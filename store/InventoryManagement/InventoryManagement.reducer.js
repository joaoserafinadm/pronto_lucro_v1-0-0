
export default function inventoryManagementStore(state = {}, action) {
    switch (action.type) {
        case 'INITIAL_STATES':
            return action.payload

        case 'PASSO1_SELECTED':
            return { ...state, passo1: action.payload }

        case 'GROUP_SELECTED':
            return { ...state, group: action.payload }

        case 'UNID_ID_SELECTED':
            return { ...state, unid_id: action.payload }

        case 'UNID_NAME_SELECTED':
            return { ...state, unidName: action.payload }

        case 'ANO_BASE_SELECTED':
            return { ...state, anoBase: action.payload }

        case 'FILTERED_INVENTORY':
            return { ...state, filteredInventory: action.payload }

        case 'GET_METAS':
            return { ...state, metas: action.payload }

        case 'NETZERO_FILTER':
            return { ...state, netZeroFilter: action.payload }

        default: return state
    }
}