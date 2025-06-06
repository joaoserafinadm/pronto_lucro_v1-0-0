import { faAngleRight, faBank, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";




export default function ModalBankSelect(props) {

    const { institutions, setBankSelected, edit } = props
    
        const [searchValue, setSearchValue] = useState('')
        const [bankList, setBankList] = useState([])
    
        const [newBankData, setNewBankData] = useState(null)
    
        useEffect(() => {
    
            const data = {
                "active": true,
                "countries": ["BR"],
                "dataCriacao": '',
                "dataModificacao": '',
                "id": '',
                "institutionType": ["credit_card"],
                "keyWord": "newBank",
                "legalName": '',
                "logoUrl": "https://res.cloudinary.com/joaoserafinadm/image/upload/v1739841037/PRONTO%20LUCRO/PUBLIC/rnuzjltwxkjfghxmmii8.png",
                "name": "",
                "ranking": 99,
                "newBank": true
            }
    
    
            setNewBankData(data)
    
        }, [])
    
    
    
    
        const handleSearchBank = (value) => {
    
            setSearchValue(value)
    
            if (!value) return institutions
    
            const searchValue = value?.toUpperCase();
    
            const bankListExist = institutions?.filter(elem => elem.name.toUpperCase().includes(searchValue))
    
            if (bankListExist) setBankList(bankListExist)
    
        }
    
        const handleMostUsedBanks = () => {
    
            const mostUsed = institutions?.filter(elem => elem.ranking <= 7 && elem.countries.includes("BR"))
    
            return mostUsed
    
    
        }
    


    return (
        <div className="row d-flex px-1">
            <div className="col-12 mb-4">
                <FontAwesomeIcon icon={faBank} />
                <span className="small fw-bold  ms-3">Escolha a instituição financeira da conta</span>
                <div className="input-group mt-2">
                    <input type="text" className="form-control"
                        placeholder="Procure pelo nome" id="bankInput"
                        onChange={e => { handleSearchBank(e.target.value) }} />
                    <span className="input-group-text" htmlFor="bankInput"><FontAwesomeIcon icon={faMagnifyingGlass} /></span>
                </div>
            </div>
            {!searchValue ?

                <>
                    <hr />
                    <div className="col-12">
                        <label >Mais usados</label>
                        {handleMostUsedBanks().map(elem => {
                            return (
                                <span className="hoverSelect py-3 row my-2 d-flex" type="button" onClick={() => setBankSelected(elem)}
                                    data-bs-target={edit ? "#editAccountCarousel" : "#bankSetupCarousel"} data-bs-slide="next">
                                    <div className="d-flex justify-content-center align-items-center" style={{ width: "60px" }}>
                                        <img className="bankImage" src={elem.logoUrl} alt="" />
                                    </div>
                                    <div className="col d-flex  align-items-center">
                                        <span className="bold">{elem.name}</span>
                                    </div>
                                    <div className="d-flex justify-content-center align-items-center" style={{ width: "40px" }}>
                                        <FontAwesomeIcon icon={faAngleRight} />
                                    </div>
                                </span>

                            )
                        })}
                    </div>
                    <hr />
                    <div className="col-12">
                        <label >Todos os bancos</label>
                        {institutions?.map(elem => {
                            return (
                                <span className="hoverSelect py-3 row my-2 d-flex" type="button" onClick={() => setBankSelected(elem)}
                                    data-bs-target={edit ? "#editAccountCarousel" : "#bankSetupCarousel"} data-bs-slide="next" >
                                    <div className="d-flex justify-content-center align-items-center" style={{ width: "60px" }}>
                                        <img className="bankImage" src={elem.logoUrl} alt="" />
                                    </div>
                                    <div className="col d-flex  align-items-center">
                                        <span className="bold">{elem.name}</span>
                                    </div>
                                    <div className="d-flex justify-content-center align-items-center" style={{ width: "40px" }}>
                                        <FontAwesomeIcon icon={faAngleRight} />
                                    </div>
                                </span>

                            )
                        })}
                    </div>
                </>
                :
                <>
                    {bankList.length > 0 ?
                        <>
                            <hr />
                            <div className="col-12">
                                {bankList?.map(elem => {
                                    return (
                                        <span className="hoverSelect py-3 row my-2 d-flex" type="button" onClick={() => setBankSelected(elem)}
                                            data-bs-target={edit ? "#editAccountCarousel" : "#bankSetupCarousel"} data-bs-slide="next" >
                                            <div className="d-flex justify-content-center align-items-center" style={{ width: "60px" }}>
                                                <img className="bankImage" src={elem.logoUrl} alt="" />
                                            </div>
                                            <div className="col d-flex  align-items-center">
                                                <span className="bold">{elem.name}</span>
                                            </div>
                                            <div className="d-flex justify-content-center align-items-center" style={{ width: "40px" }}>
                                                <FontAwesomeIcon icon={faAngleRight} />
                                            </div>
                                        </span>

                                    )
                                })}
                            </div>
                        </>
                        :
                        <>
                            <div className="col-12 text-center my-3">
                                <span className="text-secondary small" >
                                    Nenhuma instituição encontrada
                                </span>
                            </div>
                            <div className="col-12 px-4">

                                <span className="hoverSelect py-3 row my-2 d-flex" type="button" onClick={() => setBankSelected(newBankData)}
                                    data-bs-target={edit ? "#editAccountCarousel" : "#bankSetupCarousel"} data-bs-slide="next" >
                                    <div className="d-flex justify-content-center align-items-center" style={{ width: "60px" }}>
                                        <img className="bankImage" src='https://res.cloudinary.com/joaoserafinadm/image/upload/v1739841037/PRONTO%20LUCRO/PUBLIC/rnuzjltwxkjfghxmmii8.png' alt="" />
                                    </div>
                                    <div className="col d-flex  align-items-center">
                                        <span className="bold">Outra instituição</span>
                                    </div>
                                    <div className="d-flex justify-content-center align-items-center" style={{ width: "40px" }}>
                                        <FontAwesomeIcon icon={faAngleRight} />
                                    </div>
                                </span>
                            </div>

                        </>

                    }
                </>

            }



        </div>
    )

}