import { useEffect, useState } from "react";
import BankSetup from "./BankSetup"
import ModalBankSelect from "./modalBankSelect"
import scrollCarouselTo from "../../utils/scrollCarouselTo";
import { maskInputMoney } from "../../utils/mask";



export default function EditAccountModal(props) {

    const { accountSelected,
        setAccountSelected,
        institutions,
        creditCardList } = props


    const [bankSelected, setBankSelected] = useState('')
    const [initialValue, setInitialValue] = useState('');
    const [description, setDescription] = useState('')
    const [valueSum, setValueSum] = useState(true)
    const [color, setColor] = useState("#4d88bb")
    const [creditCard, setCreditCard] = useState(false)
    const [creditLimit, setCreditLimit] = useState(0)
    const [creditNetwork, setCreditNetwork] = useState(null)
    const [diaFechamento, setDiaFechamento] = useState(1)
    const [diaLancamento, setDiaLancamento] = useState(5)

    const [loadingSave, setLoadingSave] = useState('')

    useEffect(() => {
        if (!accountSelected) return
        console.log(accountSelected)
        setBankSelected(accountSelected?.bankSelected)
        setInitialValue(maskInputMoney((+accountSelected?.initialValue * 100).toString()))
        setDescription(accountSelected?.description)
        setValueSum(accountSelected?.valueSum)
        setColor(accountSelected?.color)
        setCreditCard(accountSelected?.creditCard)
        setCreditLimit(maskInputMoney((+accountSelected?.creditLimit * 100).toString()))
        setCreditNetwork(accountSelected?.creditNetwork)
        setDiaFechamento(accountSelected?.diaFechamento)
        setDiaLancamento(accountSelected?.diaLancamento)
        scrollCarouselTo('editAccountCarousel', 1)


    }, [accountSelected])

    const handleCancel = () => {
        setAccountSelected(null)
    }

    return (
        <div class="modal fade" id="editAccountModal" tabindex="-1" aria-labelledby="editAccountModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable ">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="editAccountModalLabel">Editar conta</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleCancel}></button>
                    </div>
                    <div className="modal-body">
                        <div className="modal-body">

                            <div id="editAccountCarousel" class="carousel slide" data-bs-touch="false" data-bs-interval='false'>
                                <div class="carousel-inner">
                                    <div class="carousel-item active">
                                        <ModalBankSelect institutions={institutions} setBankSelected={value => setBankSelected(value)} edit />

                                    </div>
                                    <div class="carousel-item ">
                                        <BankSetup edit
                                            bankSelected={bankSelected} creditCardList={creditCardList}
                                            color={color} setColor={value => setColor(value)}
                                            setInitialValue={value => setInitialValue(value)} initialValue={initialValue}
                                            setDescription={value => setDescription(value)} description={description}
                                            setValueSum={value => setValueSum(value)} valueSum={valueSum}
                                            setCreditCard={value => setCreditCard(value)} creditCard={creditCard}
                                            setCreditLimit={value => setCreditLimit(value)} creditLimit={creditLimit}
                                            setCreditNetwork={value => setCreditNetwork(value)} creditNetwork={creditNetwork}
                                            setDiaFechamento={value => setDiaFechamento(value)} diaFechamento={diaFechamento}
                                            setDiaLancamento={value => setDiaLancamento(value)} diaLancamento={diaLancamento}
                                        />
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )




}