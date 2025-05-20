import { faChevronRight, faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatDate } from "../../utils/mask";
import TagSelected from "../transactions/tagSelected";
import Link from "next/link";




export default function InputsHistoric(props) {


    const { lastDataInputs, categories } = props

    const brlMoney = {
        format: (value) => value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }),
    };


    return (
        <div className="card" style={{ height: '100%', fontSize: "10px" }}>
            <div className="card-body">
                <div className="row">

                    <div className="col-12 mb-2">

                        <FontAwesomeIcon icon={faMoneyBill} />
                        <span className="small fw-bold mb-2 ms-3">Últimas de transações</span>
                    </div>
                    <hr />
                    <div
                        className="col-12"
                        style={{ maxHeight: "270px", overflowY: "scroll" }}
                    >

                        {lastDataInputs.map((elem, index) => {
                            return (
                                <div className="row d-flex small">
                                    <div className="col">
                                        <div className="row">
                                            <div className="col-12">
                                                <span className="small text-secondary">
                                                    {formatDate(elem?.paymentDate)}
                                                </span>
                                            </div>
                                            <div className="row ">
                                                <div className="col-12 d-flex justify-content-between">
                                                    <div className="d-flex">

                                                        {elem?.description ? elem?.description : 'Sem descricão'}
                                                        {elem?.creditConfig?.parcelaAtual && (
                                                            <div className="ms-2">
                                                                ({elem?.creditConfig?.parcelaAtual} / {elem?.creditConfig?.parcelas})
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div
                                                        className="d-flex justify-content-end align-items-center"
                                                        style={{ width: "150px" }}
                                                    >
                                                        <span
                                                            className={`bold text-center text-${elem?.active === false
                                                                ? "secondary"
                                                                : elem?.type === "income"
                                                                    ? "success"
                                                                    : "danger"
                                                                }`}
                                                        >
                                                            {elem?.type === "expense" && "-"}
                                                            {elem?.type === "income" && "+"}
                                                            {brlMoney.format(elem?.value)} <br />

                                                        </span>
                                                    </div>
                                                </div>
                                            </div>


                                            <div className=" my-1" style={{ fontSize: "8px" }}>
                                                <div className="col-12">
                                                    <TagSelected
                                                        subCategory_id={elem.subCategory_id}
                                                        categories={categories}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />

                                </div>
                            )
                        })}

                        <div className="col-12 text-center">
                            <Link href="/transactions">
                                <span className="small span" data-bs-dismiss="modal">
                                    Todas as transações <FontAwesomeIcon icon={faChevronRight} className="ms-1" />
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    )
}