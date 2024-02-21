import axios from "axios";
import { useEffect } from 'react'
import AkvoSpinner from "../../components/loading/AkvoSpinner";
import baseUrl from "../../../utils/baseUrl";



export default function ConsultantRedirect() {



    useEffect(() => {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const queryConsId = urlSearchParams.get("id");
        const queryConsToken = urlSearchParams.get("consToken");
        const queryCompanyId = urlSearchParams.get("companyId");

        dataFunction(queryConsId, queryConsToken, queryCompanyId)

    }, [])

    const dataFunction = async (queryConsId, queryConsToken, queryCompanyId) => {

        await axios.post(`${baseUrl()}/api/consultantRedirect`, {
            consToken: queryConsToken,
            consId: queryConsId,
            companyId: queryCompanyId
        }).then(res => {
            console.log('foi')
            window.location.href = baseUrl()
        }).catch(e => {
            console.log('nao foi')
        })

    }




    return (
        <div className="d-flex align-items-center" style={{ height: '100vh', width: '100vw' }}>
            <div className="col-12 d-flex justify-content-center ">
                <AkvoSpinner static />
                <span className="text-secondary ms-2 pt-1">Redirecionando...</span>

            </div>
        </div>
    )
}