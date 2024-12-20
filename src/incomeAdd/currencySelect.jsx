import currencies from "../../utils/currencies.json"



export default function CurrencySelect(props) {

    const { currencyId, setCurrencyId } = props

    const currency = currencies.find(elem => elem.id === currencyId)


    return (
        <div className="d-flex fs-3 align-items-center">
            <div class="dropdown">
                <span class=" dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    {currency.code}
                </span>
                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
                    <li><span className="ms-2 small text-secondary">Favoritas</span></li>
                    {currencies.filter(elem => elem.id >= 1 && elem.id <= 3).map(elem => (
                        <span type="button" className="dropdown-item cursor-pointer" key={elem.id} onClick={() => setCurrencyId(elem.id)}>{elem.code}</span>
                    ))}
                    {/* <hr />
                    <li className="dropdown-item">Outras...</li> */}
                </ul>
            </div>
        </div>
    )






}