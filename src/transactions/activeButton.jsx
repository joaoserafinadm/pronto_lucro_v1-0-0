import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import tippy from "tippy.js";
import ActiveTransactionModal from "./activeTransactionModal";
import { useStateContext } from "./context/transactionsContext";




export default function ActiveButton(props) {

    const { elem, smallScreen } = props
    const { incomeSelected, setIncomeSelected } = useStateContext()

    useEffect(() => {
        console.log("incomeSelected", incomeSelected)
    }, [incomeSelected])

    useEffect(() => {
        tippyFunction()
    }, [])



    const tippyFunction = () => {

        setTimeout(() => {
            tippy('#activeButton', {
                content: 'Confirmar transação',
                placement: 'bottom',
            }, 700)



        })
    }




    return (

        <>

            <span className=" cardAnimation checkButton shadow"
                type="button" onClick={() =>setIncomeSelected(elem)}
                id="activeButton"
                data-bs-toggle="modal" data-bs-target={"#activeTransactionModal"}>

                <FontAwesomeIcon icon={faCheck} className=" text-secondary " />
            </span>
        </>
    )
}