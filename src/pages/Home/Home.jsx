import React, { useEffect, useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchallcoin } from "../../store/marketSlice";

export default function HomePage() {
  const dispatch = useDispatch();
  const { allCoin, currency } = useSelector((state) => state.coin);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [input, setInput] = useState('')

  const inputHandler = (event) => {
    setInput(event.target.value)
    if(event.target.value === ""){
      setDisplayCoin(allCoin)
    }
  }

  const searchHandler = async (event) => {
    event.preventDefault()
    const coins = await allCoin.filter((item)=>{
      return item.name.toLowerCase().includes(input.toLocaleLowerCase())
    })
    setDisplayCoin(coins)
  }

  useEffect(() => {
    dispatch(fetchallcoin(currency));
  }, [dispatch, currency]);

  useEffect(() => {
    setDisplayCoin(allCoin);
  }, [allCoin]);

  return (
    <div className="home">
      <h1 className="home-title">
        Largest <br /> Crypto Marketplace
      </h1>
      <p className="home-subtitle">
        Welcome to the world’s largest cryptocurrency marketplace. <br />
        Sign up to explore more about cryptos.
      </p>

      <div className="search-container"  onSubmit={searchHandler}>
        <input onChange={inputHandler} list="coinlist" value={input} 
        type="text" placeholder="Search crypto.."  required/>

        <datalist id="coinlist">
          {allCoin.map((item,index)=>(<option key={index} value={item.name}/>))}
        </datalist>
        <button >Search</button>
      </div>

      <table className="coin-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Coins</th>
            <th>Price</th>
            <th style={{ textAlign: "center" }}>24H Change</th>
            <th className="market-cap">Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {displayCoin.slice(0, 10).map((item, index) => (
            <tr key={index}>
              <td>{item.market_cap_rank}</td>
              <td>
                <Link to={`/coin/${item.id}`} className="coin-info">
                  <img src={item.image} alt={item.name} />
                  <span>{item.name} ({item.symbol.toUpperCase()})</span>
                </Link>
              </td>
              <td>
                {currency.symbol} {item.current_price.toLocaleString()}
              </td>
              <td style={{ textAlign: "center" }}>
                <span
                  className={
                    item.price_change_percentage_24h >= 0
                      ? "price-change positive"
                      : "price-change negative"
                  }
                >
                  {Math.floor(item.price_change_percentage_24h * 100) / 100}%
                </span>
              </td>

              <td className="market-cap">
                {currency.symbol} {item.market_cap.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
