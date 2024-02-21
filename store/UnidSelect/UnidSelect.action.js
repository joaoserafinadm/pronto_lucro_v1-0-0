export function getUnids(data) {

    let resultArray = []

    data.map(elem => {
        resultArray.push({
            _id: elem._id,
            unidName: elem.unidName,
            setorPrimario: elem.setorPrimario,
            setorSecundario: elem.setorSecundario,
            email: elem.email,
            cidade: elem.cidade,
            estado: elem.estado,
            group: elem.group,
            groupImageUrl: elem.groupImageUrl,
            active: elem.active,
            deleted: elem.deleted,
            responsavel_id: elem.responsavel_id,
        })
    })
    return {
        type: 'GET_UNIDADES',
        payload: resultArray
    }
}

export function setUnid(data) {
    return {
        type: 'SET_UNIDADE',
        payload: data
    }
}