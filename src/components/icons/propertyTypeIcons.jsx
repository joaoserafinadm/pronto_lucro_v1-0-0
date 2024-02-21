import { faBuilding, faHouse, faMapLocation, faStore } from "@fortawesome/free-solid-svg-icons"


export function handleIconColor(elem) {

    if (elem === 'Apartamento') {
        return 'apartamento-color'
    }
    if (elem === 'Casa') {
        return 'casa-color'
    }
    if (elem === 'Terreno') {
        return 'terreno-color'
    }
    if (elem === 'Comercial') {
        return 'comercial-color'
    }
    else return ''
}

export function handleIcon(elem) {

    if (elem === 'Apartamento') {
        return faBuilding
    }
    if (elem === 'Casa') {
        return faHouse
    }
    if (elem === 'Terreno') {
        return faMapLocation
    }
    if (elem === 'Comercial') {
        return faStore
    }
    else return ''
}