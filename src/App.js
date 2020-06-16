import React, { useEffect, useState } from "react";
import CurrencyRow from "./CurrencyRow";
import "./App.css";

export default function App() {
  const [codes, setcodes] = useState([]);
  const [fromCurrency, setfromCurrency] = useState();
  const [toCurrency, settoCurrency] = useState();
  const [exchangerate, setexchangerate] = useState();
  const [amount, setamount] = useState(1);
  const [changedFrom, setchangedFrom] = useState(true);
  const [ratess, setratess] = useState();
  const url = " https://api.exchangeratesapi.io/latest";

  let fromAmount, toAmount;

  if (changedFrom) {
    fromAmount = amount;
    toAmount = amount * exchangerate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangerate;
  }

  useEffect(() => {
    const getdata = async () => {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    };
    getdata().then((res) => {
      const data = [res.base, ...Object.keys(res.rates)];
      const firstvalue = Object.keys(res.rates)[0];
      const rates = res;
      setcodes(data);
      setfromCurrency(res.base);
      settoCurrency(firstvalue);
      setexchangerate(res.rates[firstvalue]);
    });
  }, []);

  useEffect(() => {
    if (fromCurrency && toCurrency) {
      fetch(`${url}?base=${fromCurrency}&symbols=${toCurrency}`)
        .then((res) => res.json())
        .then((data) => setexchangerate(data.rates[toCurrency]));
    }
  }, [fromCurrency, toCurrency]);
  const handleFromInput = (e) => {
    setamount(e.target.value);
    setchangedFrom(true);
  };
  const handleToInput = (e) => {
    setamount(e.target.value);
    setchangedFrom(false);
  };

  return (
    <div>
      <h1 className="text-3xl">Convert</h1>
      <CurrencyRow
        codes={codes}
        selectedCurrency={fromCurrency}
        onchangecurrency={(e) => setfromCurrency(e.target.value)}
        Amount={fromAmount}
        handelInput={handleFromInput}
      />
      <div className="text-center font-bold text-4xl ">=</div>
      <CurrencyRow
        selectedCurrency={toCurrency}
        codes={codes}
        onchangecurrency={(e) => settoCurrency(e.target.value)}
        Amount={toAmount}
        handelInput={handleToInput}
      />
    </div>
  );
}
