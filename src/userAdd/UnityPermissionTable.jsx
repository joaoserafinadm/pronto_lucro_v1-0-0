import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMapMarkerAlt, faSearch, faUsers } from '@fortawesome/free-solid-svg-icons'
import tippy from 'tippy.js'
import isMobile from '../../utils/isMobile'


export default function UnitysPermissionTable(props) {

    const [searchElement, setSearchElement] = useState('')
    const [permissions, setPermissions] = useState(props.permissions ? props.permissions : [])
    const [permissionErrorAlert, setPermissionErrorAlert] = useState(false)
    const [groups, setGroups] = useState([])
    const [group, setGroup] = useState('')
    const [groupImgContent, setGroupImgContent] = useState('')


    console.log('unidades', props.unidades)


    useEffect(() => {
        if (!props.permissions) {
            const admGlobalPerm = []
            props.unidades.map(elem => {
                admGlobalPerm.push(elem._id)
            })
            setPermissions(admGlobalPerm)
        } else {
            setPermissions(props.permissions)
        }
    }, [props.permissions])

    useEffect(() => {
        if (groupImgContent) {
            tippy(`#${groupImgContent}`, {
                content: groupImgContent,
                placement: 'right',
                duration: [0, 200]
            });
        }
    }, [groupImgContent])

    useEffect(() => {
        let groups = []

        if (props.unidades.length > 0) {
            props.unidades.map(elem => { if (elem.group && !groups.filter(elem1 => elem1.group === elem.group).length) groups.push({ "group": elem.group, "groupImageUrl": elem.groupImageUrl }) })
        }
        setGroups(groups)

    }, [props.unidades])

    const handleUnidSelect = (id, checked, responsavel_id = '') => {

        if (responsavel_id === props.editUser_id) {
            setPermissionErrorAlert(false)
            setPermissionErrorAlert(true)

            setTimeout(() => {
                setPermissionErrorAlert(false)
            }, 5000)
        } else {
            let permissionsSelect = permissions

            const idExists = permissionsSelect.indexOf(id)

            if (idExists === -1) {
                permissionsSelect.push(id)
                props.onChange(permissionsSelect)
            } else {
                if (!checked) {
                    const filtered = permissionsSelect.filter(function (elem) { return elem !== id })
                    props.onChange(filtered)
                }
            }

        }



    }

    const selectAll = (checked) => {

        if (checked) {
            let permissionsSelect = []

            props.unidades.filter(val => {
                if (searchElement == '') {
                    return val
                } else if (
                    val.unidName.toLocaleLowerCase().includes(searchElement.toLocaleLowerCase()) ||
                    val.cidade.toLocaleLowerCase().includes(searchElement.toLocaleLowerCase()) ||
                    val.group.toLocaleLowerCase().includes(searchElement.toLocaleLowerCase()) ||
                    val.responsavel_id.toString() === props.editUser_id
                ) {
                    return val.group.toLocaleLowerCase().includes(group.toLocaleLowerCase())
                }
            }).map(elem => {
                if (elem.active && !elem.deleted) {
                    if (group && elem.group === group) {
                        permissionsSelect.push(elem._id.toString())
                    }
                    if (!group) {
                        permissionsSelect.push(elem._id.toString())
                    }
                }
            })

            props.onChange(permissionsSelect)
        } else {
            let responsavelPerm = []

            props.unidades.map(elem => {
                if (elem.responsavel_id === props.editUser_id) {
                    responsavelPerm.push(elem._id.toString())
                }
            })
            props.onChange(responsavelPerm)

            const checkbox = document.getElementById('selectAll')
            checkbox.checked = false
        }

    }


    return (
        <>
            {permissionErrorAlert && (
                <small>
                    <div className="alert alert-danger fadeItem" role="alert">
                        O usuário é responsável por esta unidade!
                    </div>
                </small>
            )}
            <div className="col-12 card bg-light">
                <div className="col-12 d-flex p-3">
                    {isMobile() ?
                        <div className="row">
                            <div className="col-12 my-2">
                                <label className=" ">
                                    Unidade:
                                </label>
                                <div className="input-group ">
                                    <input type="text"
                                        className="form-control "
                                        placeholder="Procurar" aria-label="User search" aria-describedby="user-search"
                                        value={searchElement} onChange={e => setSearchElement(e.target.value)} />
                                    <span className="akvo_btn btn-sm input-group-text" type="text"><FontAwesomeIcon icon={faSearch} /></span>
                                </div>
                            </div>
                            <div className="col-12 my-2">
                                <label className=" ">
                                    Grupo:
                                </label>
                                <select className="form-select" aria-label="Default select example" onChange={e => { setGroup(e.target.value) }}>
                                    <option selected value=''>Todos</option>
                                    {/* <option value='semGrupo'>Sem grupo</option> */}
                                    {props.groups.map((elem, i) => <option value={elem._id} key={i}>{elem.groupName}</option>
                                    )}
                                </select>
                            </div>


                            <div className="col-12 d-flex align-items-center mt-3 ms-3">
                                <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" role="switch" id="selectAll" onChange={e => selectAll(e.target.checked)} />
                                </div>
                                <label className="form-check-label " htmlFor="selectAll">Selecionar todas</label>
                            </div>

                        </div>
                        :
                        <>
                            <div className="col d-flex align-items-center ms-3">

                                <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" role="switch" id="selectAll" onChange={e => selectAll(e.target.checked)} />
                                </div>
                                <label className="form-check-label" htmlFor="selectAll">Selecionar todas</label>
                            </div>

                            <div className="col-4 pe-2">
                                <label className="form-label ">
                                    Grupo:
                                </label>
                                <select className="form-select " aria-label="Default select example" onChange={e => { setGroup(e.target.value) }}>
                                    <option selected value=''>Todos</option>
                                    {/* <option value='semGrupo'>Sem grupo</option> */}
                                    {props.groups.map((elem, i) => <option value={elem._id} key={i}>{elem.groupName}</option>
                                    )}
                                </select>
                            </div>

                            <div className="col-4 ps-2 me-4">
                                <label className="form-label ">
                                    Unidade:
                                </label>

                                <div className="input-group ">
                                    <input type="text"
                                        className="form-control "
                                        placeholder="Procurar" aria-label="User search" aria-describedby="user-search"
                                        value={searchElement} onChange={e => setSearchElement(e.target.value)} />
                                    <span className=" input-group-text" type="text"><FontAwesomeIcon icon={faSearch} /></span>
                                </div>
                            </div>
                        </>
                    }
                </div>


                <div className="col-12 px-3" style={{ height: '525px', overflow: 'auto' }}>

                    {props.unidades
                        // .filter(val => {
                        //     if (searchElement == '' && group === '') {
                        //         return val
                        //     } else if (
                        //         val.unidName.toLocaleLowerCase().includes(searchElement.toLocaleLowerCase()) ||
                        //         val.cidade.toLocaleLowerCase().includes(searchElement.toLocaleLowerCase()) ||
                        //         val.group.toLocaleLowerCase().includes(searchElement.toLocaleLowerCase())
                        //     ) {
                        //         return val.group.toLocaleLowerCase().includes(group.toLocaleLowerCase())
                        //     }
                        // })
                        .map((elem, i) => {
                            if (elem.active && !elem.deleted) {
                                return (
                                    <div className='card mb-3' key={i} >
                                        <div className="bold card-header d-flex text-light" style={{ "backgroundColor": "#225858" }}>
                                            <div className="form-check form-switch">
                                                <input className="form-check-input selectItems" type="checkbox" role="switch" id={`elem${elem._id}`} onChange={e => handleUnidSelect(elem._id, e.target.checked, elem.responsavel_id)} checked={permissions.indexOf(elem._id) !== -1} />
                                            </div>
                                            <label htmlFor={`elem${i}`}>{elem.unidName}</label>
                                        </div>
                                        <div className="small row p-3 d-flex">
                                            <div className="col-12 col-lg-4">
                                                Grupo: {props.groups?.find(group => group._id === elem.group)?.groupName ? props.groups.find(group => group._id === elem.group).groupName : "sem grupo"}
                                            </div>
                                            <div className="col-12 col-lg-4">
                                                <div><FontAwesomeIcon icon={faMapMarkerAlt} className="text-secondary" /> {elem.cidade ? elem.cidade : "não especificado"} - {elem.estado ? elem.estado : "não especificado"}</div>
                                            </div>
                                            <div className="col-12 col-lg-4">
                                                Responsável: {props.users.find(user => user._id === elem.responsavel)?.firstName} {props.users.find(user => user._id === elem.responsavel)?.lastName}
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        })}
                </div>
            </div>


        </>
    )
}