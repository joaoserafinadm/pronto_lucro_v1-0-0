import Title from "../src/components/title/Title2";
import Cookie from 'js-cookie'
import jwt from 'jsonwebtoken';
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import { useState } from "react";
import AccountSetupSections from "../src/accountSetup/accoutSetupSections";
import AccountDetailsPage from "../src/accountSetup/accountDetailsPage";
import AccountProductsPage from "../src/accountSetup/accountProductsPage";
import BillingPage from "../src/accountSetup/billingPage";
import { useEffect } from "react";
import { SpinnerLG } from "../src/components/loading/Spinners";
import Sections from "../src/components/Sections";
import { useDispatch } from "react-redux";
import navbarHide from "../utils/navbarHide";
import tippy from "tippy.js";

import ExitAccountModal from "../src/accountSetup/ExitAccountModal";



export default function AccountSetup() {

    const token = jwt.decode(Cookie.get('auth'))

    const dispatch = useDispatch()


    const [userData, setUserData] = useState('')
    const [companyData, setCompanyData] = useState('')


    const [section, setSection] = useState('Detalhes da conta')
    const [loadingPage, setLoadingPage] = useState(true)



    useEffect(() => {
        navbarHide(dispatch)

        tooltipFunction()

        dataFunction(token.sub)

    }, [])

    const tooltipFunction = () => {

        const editIcons = document.querySelectorAll('.editIcon');
        editIcons.forEach((editIcon) => {
            tippy(editIcon, {
                content: "Adicionar foto de capa",
                placement: "bottom",
            });
        });
    }


    const dataFunction = async (user_id) => {


        await axios.get(`${baseUrl()}/api/accountSetup`, {
            params: {
                user_id,
            }
        }).then(res => {
            setUserData(res.data.user)
            setCompanyData(res.data.user.companyData || null)
            setLoadingPage(false)
        }).catch(e => {

            console.log(e)
        })
    }




    return (
        <div>
            <Title title={`Configuração da conta`} subtitle={''} backButton />

            {loadingPage ?

                <SpinnerLG />
                :


                <div className="pagesContent shadow fadeItem mb-5">
                    <div className=" carousel  slide" data-bs-touch="false" data-bs-interval='false' id="accoutSetupPages">

                        <Sections
                            section={section} idTarget="accoutSetupPages"
                            setSection={value => setSection(value)}
                            sections={["Detalhes da conta", "Produtos", "Assinatura"]} />

                        <div className="carousel-inner ">
                            <div className="carousel-item active">
                                <AccountDetailsPage userData={userData} companyData={companyData} />
                            </div>
                            <div className="carousel-item">
                                1
                                {/* <AccountProductsPage companyData={companyData} /> */}
                            </div>
                            <div className="carousel-item">
                                2
                                {/* <BillingPage /> */}
                            </div>
                        </div>
                    </div>
                </div >
            }

        </div >
    )
}






// export default function AccountSetup() {


//     return (
//         <div className="row mt-2">
//             <div className="col-12 d-flex justify-content-end">
//                 <button data-bs-toggle="modal" data-bs-target="#exitAccountModal" className="btn btn-sm btn-outline-danger">Sair da conta</button>
//             </div>
//             <ExitAccountModal />
//         </div>
//     )
// }