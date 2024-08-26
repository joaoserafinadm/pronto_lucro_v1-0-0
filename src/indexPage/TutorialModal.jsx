import { useEffect, useState } from "react";
import AccountsConfigCardsTutorial from "./AccountsConfigCardsTutorial";
import AccountsConfigTutorial from "./AccountsConfigTutorial";
import BankAccountsTutorialPage from "./BankAccoutsTutorialPage";
import BankSelectPage from "./BankSelectPage";
import WelcomePage from "./WelcomePage";
import axios from "axios";
import BankSetup from "../bankAccounts/BankSetup";
import { SpinnerSM } from "../components/loading/Spinners";
import Cookie from 'js-cookie'
import jwt from 'jsonwebtoken'
import removeInputError from "../../utils/removeInputError";
import TagConfig1Page from "./TagConfig1Page";
import TagConfig2Page from "./TagConfig2Page";


export default function TutorialModal(props) {

    const token = jwt.decode(Cookie.get('auth'))


    const { bankAccounts, dataFunction } = props

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

    const [institutions, setInstitutions] = useState([])
    const [creditCardList, setCreditCardList] = useState([])

    const [loadingAccountSave, setLoadingAccountSave] = useState('')




    useEffect(() => {
        childDataFunction()
    }, [])


    const childDataFunction = async () => {

        await axios.get(`/api/bankAccounts/institutions`)
            .then(res => {
                setInstitutions(res.data.institutions)
                setCreditCardList(res.data.creditCardList)
            }).catch(err => {
                console.log(err)
            })

    }

    const validate = () => {

        removeInputError();

        let bankError = ''
        let valueError = ''
        let descriptionError = ''

        // if (!bankSelected) bankError = "Selecione a instituição financeira"
        // if (!initialValue) valueError = "Selecione a instituição financeira"
        if (!description) descriptionError = "Selecione a instituição financeira"

        if (bankError || valueError || descriptionError) {
            // if (bankError) document.getElementById('bankSelect').classList.add('inputError');
            // if (valueError) document.getElementById('valueInput').classList.add('inputError');
            if (descriptionError) document.getElementById('descriptionInput').classList.add('inputError');
            return false
        } else {
            return true
        }
    }


    const handleAccountSave = async (user_id) => {

        const isValid = validate();

        if (isValid) {

            setLoadingAccountSave(true);

            const data = {
                user_id,
                bankSelected,
                color,
                initialValue,
                description,
                valueSum,
                creditCard,
                creditLimit,
                creditNetwork,
                diaFechamento,
                diaLancamento
            };

            await axios.post('/api/bankAccounts', data)
                .then(async res => {
                    await dataFunction();
                    handleCancel();

                    var myCarousel = document.querySelector('#tutorialPages');
                    var carousel = new bootstrap.Carousel(myCarousel,);

                    // Trocar para o slide 3 (o índice começa em 0, então slide 3 é o índice 2)
                    carousel.to(3);
                })
                .catch(e => {
                    // showModalBs("newAccountModal");
                });


            setLoadingAccountSave(false);
        }
    };

    const handleCancel = () => {
        setBankSelected('')
        setInitialValue('')
        setDescription('')
        setValueSum(true)
    }

    return (
        <div class="modal fade" id='tutorialModal' tabindex="-1" aria-labelledby="tutorialModalLabel" data-bs-backdrop="static" data-bs-keyboard="false" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable ">
                <div class="modal-content">
                    <div className="modal-body">
                        <div className=" carousel  " data-bs-touch="false" data-bs-interval='false' id="tutorialPages">
                            <div className="carousel-inner ">
                                <div className="carousel-item active">{/*  0 slide */}
                                    <WelcomePage />
                                </div>
                                <div className="carousel-item"> {/*  1 slide */}
                                    <BankAccountsTutorialPage />
                                </div>
                                <div className="carousel-item"> {/*  2 slide */}
                                    <AccountsConfigTutorial />
                                </div>
                                <div className="carousel-item"> {/*  3 slide */}
                                    <AccountsConfigCardsTutorial bankAccounts={bankAccounts} />
                                </div>
                                <div className="carousel-item"> {/*  4 slide */}
                                    <BankSelectPage bankAccounts={bankAccounts} setBankSelected={setBankSelected} institutions={institutions} />
                                </div>
                                <div className="carousel-item"> {/*  5 slide */}

                                    <BankSetup tutorial
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
                                    <hr />
                                    <div className="col-12 mt-2 mb-4 d-flex justify-content-end">
                                        <button className="btn btn-sm btn-outline-secondary mx-1" data-bs-target="#tutorialPages" data-bs-slide-to={4}>
                                            Cancelar
                                        </button>
                                        <button className="btn btn-sm btn-outline-success mx-1" onClick={() => handleAccountSave(token.sub)}>
                                            {loadingAccountSave ? <SpinnerSM className="mx-3" /> : 'Salvar'}
                                        </button>

                                    </div >
                                </div>

                                <div className="carousel-item"> {/*  6 slide */}
                                    <TagConfig1Page />
                                </div>
                                <div className="carousel-item"> {/*  7 slide */}
                                    <TagConfig2Page />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}