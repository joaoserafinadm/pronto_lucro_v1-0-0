export function resetStates() {
    return {
        type: "INITIAL_STATES",
        payload: {
            filteredInventory: [],
            passo1: '',
            group: '',
            unid_id: '',
            unidName: '',
            anoBase: '',
            metas: [],
            netZeroFilter: []
        }
    }
}

export function passo1Store(data) {
    return {
        type: "PASSO1_SELECTED",
        payload: data
    }
}
export function groupStore(data) {
    return {
        type: "GROUP_SELECTED",
        payload: data
    }
}
export function unid_idStore(data) {
    return {
        type: "UNID_ID_SELECTED",
        payload: data
    }
}
export function unidNameStore(data) {
    return {
        type: "UNID_NAME_SELECTED",
        payload: data
    }
}
export function anoBaseStore(data) {
    return {
        type: "ANO_BASE_SELECTED",
        payload: data
    }
}

export function filteredInventory(data) {
    return {
        type: "FILTERED_INVENTORY",
        payload: data
    }
}

export function getMetas(data) {
    return {
        type: "GET_METAS",
        payload: data
    }
}

export function netZeroFilter(data) {
    return {
        type: "NETZERO_FILTER",
        payload: data
    }
}