import './App.css';
import React,{useEffect,useState} from 'react';
import Currency from './Currency';

function App() {
  
     const[currencies,setCurrencies] = useState([])
     const[fromCurrency,setFromCurrency] = useState()
     const[toCurrency,setToCurrency] = useState()
     const[from,setFrom] = useState(true)
     const[amount,setAmount] = useState(1)
     const[exchangeRate,setExchangeRate] = useState()
     

     let fromAmount,toAmount
     if(from){
       fromAmount = amount;
       toAmount = (amount * exchangeRate).toFixed(2)
     }
     else{
       toAmount = amount;
       fromAmount = (amount / exchangeRate).toFixed(2)
     }
  console.log(process.env)
     const funct = () =>{
      const axios = require('axios');
      axios.get(`https://exchange-rates.abstractapi.com/v1/live/?api_key=95a1f5104fc8442f8eaeaf50534ccdab&base=USD`)
    .then(response => {
        console.log(response.data);
        const firstCurrency = Object.keys(response.data.exchange_rates)[0]
        console.log(firstCurrency)
        setFromCurrency(response.data.base)
        setToCurrency(firstCurrency)
        setCurrencies([response.data.base,...Object.keys(response.data.exchange_rates)])
        setExchangeRate(response.data.exchange_rates[firstCurrency])
    })
    .catch(error => {
        console.log(error);
    });
     }
 
  
  useEffect(()=>{
      funct();
      // console.log(currencies)   
  },[])

  useEffect(()=>{
    if(fromCurrency!=null && toCurrency!=null){
      const axios = require('axios');
      axios.get(`https://exchange-rates.abstractapi.com/v1/live/?api_key=95a1f5104fc8442f8eaeaf50534ccdab&base=${fromCurrency}&target=${toCurrency}`)
          .then(response => {
              console.log(response.data);
              setExchangeRate(response.data.exchange_rates[toCurrency])
          })
          .catch(error => {
              console.log(error);
          });
        }
  },[fromCurrency,toCurrency])
  
  
  return (
    <div className="App">
      <header>Currency Converter</header>
      <Currency currencies={currencies} selectedCurrency={fromCurrency}
        onChangeCurrency={e=>setFromCurrency(e.target.value)}
        amount={fromAmount} 
        onChangeAmount={e=>{
          setAmount(e.target.value)
          setFrom(true)
        }}
          />
      <div className='equal'>=</div>
      <Currency currencies={currencies}  selectedCurrency={toCurrency}
      onChangeCurrency={e=>setToCurrency(e.target.value)} 
      amount={toAmount} 
      onChangeAmount={e=>{
        setAmount(e.target.value);
        setFrom(false)
      }}
      />
    </div>
  );
}

export default App;
