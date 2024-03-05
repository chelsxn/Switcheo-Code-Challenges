import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Input, Popover, Radio, Modal, message } from "antd";
import {DownOutlined, SettingsOutlined, } from "@ant-design/icons"
import currencySvgImports from './currencySvgImports'; // Import the mapping
import SwapVertIcon from '@mui/icons-material/SwapVert';


function App() {
  const [amount, setAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState("BLUR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [changeToken, setChangeToken] = useState(1);

  const currencies = [
    "USD", "BLUR", "bNEO", "BUSD", "ETH", "GMX", "STEVMOS",
    "LUNA", "RATOM", "STRD", "EVMOS", "IBCX", "IRIS", "ampLUNA", "KUJI", "STOSMO",
    "USDC", "ATOM", "STATOM", "OSMO", "rSWTH", "STLUNA", "LSI", "OKB", "OKT",
    "SWTH", "USC", "WBTC", "wstETH", "YieldUSD", "ZIL"
  ];

  useEffect(() => {
    handleConversion();
  }, [fromCurrency, toCurrency, amount]);

  const handleCurrencyChange = (event, type) => {
    if (type === 'from') {
      setFromCurrency(event);
    } else {
      setToCurrency(event);
    }

    setIsOpen(false)
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  function switchToken() {
    const one = fromCurrency;
    const two = toCurrency;
    setFromCurrency(two);
    setToCurrency(one);
  }

  function openModal(asset) {
    setChangeToken(asset);
    setIsOpen(true);
  }
  const fetchCurrentRates = async () => {
    // Replace this with your actual API call to fetch current rates
    // For demonstration purposes, we'll use a mock API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          "BLUR": 0.20811525423728813,
          "bNEO": 7.1282679,
          "BUSD": 0.999183113,
          "ETH": 1645.9337373737374,
          "GMX": 36.345114372881355,
          "STEVMOS": 0.07276706779661017,
          "LUNA": 0.40955638983050846,
          "RATOM": 10.250918915254237,
          "STRD": 0.7386553389830508,
          "EVMOS": 0.06246181355932203,
          "IBCX": 41.26811355932203,
          "IRIS": 0.0177095593220339,
          "ampLUNA": 0.49548589830508477,
          "KUJI": 0.675,
          "STOSMO": 0.431318,
          "USDC": 0.989832,
          "ATOM": 7.186657333333334,
          "STATOM": 8.512162050847458,
          "OSMO": 0.3772974333333333,
          "rSWTH": 0.00408771,
          "STLUNA": 0.44232210169491526,
          "LSI": 67.69661525423729,
          "OKB": 42.97562059322034,
          "OKT": 13.561577966101694,
          "SWTH": 0.004039850455012084,
          "USC": 0.994,
          "WBTC": 26002.82202020202,
          "wstETH": 1872.2579742372882,
          "YieldUSD": 1.0290847966101695,
          "ZIL": 0.01651813559322034,
          "USD": 1,


        });
      }, 1000);
    });
  };

  const handleConversion = async () => {
    const rates = await fetchCurrentRates();
    const rate = rates[fromCurrency] / rates[toCurrency];
    setConvertedAmount(amount * rate);
    setExchangeRate(rate);
  };

  return (
    <>
      <Modal
        open={isOpen}
        footer={null}
        onCancel={() => setIsOpen(false)}
        title="Select a token"
      >


        <div className="modalContent">
          {currencies.map((currency) => {
            return (
              <div
                className="tokenChoice"
                key={currency}
                onClick={(e) => handleCurrencyChange(currency, changeToken)}
              >
                <img src={currencySvgImports[currency]} className="tokenLogo" />
                <div clsasName="tokenChoiceNames">
                  <div className="tokenName">{currency}</div>
                </div>
              </div>
            );
          })}
        </div>

      </Modal>
 
      <div className="center">
        <div className="swapBox">
          <div className="swapBoxHeader">
            <h2>Swapping Currency~</h2>
          </div>
          <div className="inputs">
            <Input placeholder="0" type="number" value={amount} onChange={handleAmountChange} />
            <Input placeholder="0" type="number" value={convertedAmount} disabled={true} />
            <div className="switchButton" onClick={switchToken}>
              <SwapVertIcon className="switchArrow" />
            </div>
            <div className="fromCurrency" onClick={() => openModal("from")}>
              <img src={currencySvgImports[fromCurrency]} alt="from-currencyLogo" className="assetLogo" />
              {fromCurrency}
              <DownOutlined />

            </div>
            <div className="toCurrency" onClick={() => openModal("to")}>
              <img src={currencySvgImports[toCurrency]} alt="to-currencyLogo" className="assetLogo" />
              {toCurrency}
              <DownOutlined />

            </div>

            {exchangeRate > 0 && (
              <div>
                <p>Exchange Rate: 1 {fromCurrency} = {exchangeRate.toFixed(5)} {toCurrency}</p>
              </div>
            )}
            <div className="Button">
            <button>
                Swap
              </button>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default App;