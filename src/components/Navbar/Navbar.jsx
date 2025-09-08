import React from 'react'
import "./Navbar.css"
import arrow_icon from "../../assets/arrow_icon.png"
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCurrency } from '../../store/marketSlice'

export default function Navbar() {
  const dispatch = useDispatch()

  const currencyHandler = (event) => {
    switch (event.target.value) {
      case "usd": {
        dispatch(setCurrency({ name: "usd", symbol: "$" }));
        break
      }
      case "inr": {
        dispatch(setCurrency({ name: "inr", symbol: "₹" }));
        break
      }
      case "eur": {
        dispatch(setCurrency({ name: "eur", symbol: "€" }));
        break
      }
      default: {
        dispatch(setCurrency({ name: "usd", symbol: "$" }));
        break
      }
    }
  }

  return (
    <div className='navbar'>
      <Link to={"/"} className='brand'>
  
      <span className='brand-name'>CoinOrbit</span>
      </Link>
      
      <div className='nav-right'>
        <select onChange={currencyHandler}>
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="inr">INR</option>
        </select>
        <button>Sign up <img src={arrow_icon} alt="" /></button>
      </div>
    </div>
  )
}
