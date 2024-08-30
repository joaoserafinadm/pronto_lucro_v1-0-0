import { faAngleRight, faBank, faChevronLeft, faChevronRight, faMagnifyingGlass, faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";




export default function BankSelectPage(props) {

    const { institutions, setBankSelected } = props

    const [searchValue, setSearchValue] = useState('')
    const [bankList, setBankList] = useState([])




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
        <div className="row">
            <div className="col-12 d-flex justify-content-center text-center my-3 fadeItem">
                <span className=" fs-4">Adicionar conta</span>
            </div>
            <hr />
            <div className="col-12 my-3 d-flex justify-content-between fadeItem2s">
                <span className="cardAnimation  " type="button" data-bs-target="#tutorialPages" data-bs-slide-to={3}>
                    <FontAwesomeIcon icon={faChevronLeft} className="me-1" /> Voltar
                </span>

            </div>
            <div className="col-12 my-3 fadeItem1s d-flex flex-column">
                <span className=" fs-5 my-1">Escolha a instituição financeira: </span>
                <div className="input-group mt-2">
                    <input type="text" className="form-control"
                        placeholder="Procure pelo nome" id="bankInput"
                        onChange={e => { handleSearchBank(e.target.value) }} />
                    <span className="input-group-text" htmlFor="bankInput"><FontAwesomeIcon icon={faMagnifyingGlass} /></span>
                </div>
            </div>
            <hr />

            {!searchValue ?

                <>
                    <div className="col-12 px-4">
                        <label >Mais usados</label>
                        {handleMostUsedBanks().map(elem => {
                            return (
                                <span className="hoverSelect py-3 row my-2 d-flex" type="button" onClick={() => setBankSelected(elem)}
                                    data-bs-target="#tutorialPages" data-bs-slide-to={5}>
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
                    <div className="col-12 px-4">
                        <label >Todos os bancos</label>
                        {institutions?.map(elem => {
                            return (
                                <span className="hoverSelect py-3 row my-2 d-flex" type="button" onClick={() => setBankSelected(elem)}
                                    data-bs-target="#tutorialPages" data-bs-slide-to={5}>
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
                            <div className="col-12 px-4">
                                {bankList?.map(elem => {
                                    return (
                                        <span className="hoverSelect py-3 row my-2 d-flex" type="button" onClick={() => setBankSelected(elem)}
                                        data-bs-target="#tutorialPages" data-bs-slide-to={5} >
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
                            <div className="col-12 text-center my-5">
                                <span className="text-secondary small" >
                                    Nenhuma instituição encontrada
                                </span>
                            </div>

                        </>

                    }
                </>

            }
        </div>
    )
}