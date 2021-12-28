import React from 'react'

export default function Currency({currencies,selectedCurrency,onChangeCurrency,onChangeAmount,amount}) {
      
     
     
    return (
        <div className='row'>
             <input type='number' value={amount} onChange={onChangeAmount}/>
             <select value={selectedCurrency} onChange={onChangeCurrency}>
            {currencies.map((currency,index)=>{
                   return(
                      <option key={index} value={currency}>{currency}</option>
                   )
            })}
          </select>

        </div>
    )
}
