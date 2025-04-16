import { useState } from "react"




export default function SaldoBalancoToggle(props) {

  const { valueStatus, setValueStatus } = props

  return (
    <div className="rounded-pill" style={{ backgroundColor: '#f8f9fa' }} >
      <button
        type="button"
        className={`btn btn-sm rounded-pill px-2  fw-bold text-secondary ${valueStatus === 'saldo' ? 'btn-c-tertiary text-light' : ''}`}
        style={{ fontSize: '11px' }}
        onClick={() => setValueStatus('saldo')} >
        Saldo em conta
      </button>
      <button type="button"
        className={`btn btn-sm rounded-pill px-2  fw-bold text-secondary ${valueStatus === 'balanco' ? 'btn-c-tertiary text-light' : ''}`}
        style={{ fontSize: '11px' }}
        onClick={() => setValueStatus('balanco')} >
        Balanço do mês
      </button>
    </div>
  )


}