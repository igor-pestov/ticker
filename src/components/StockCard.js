import React from 'react';
import './StockCard.scss'

const StockCard = ({elem}) => {
  const diff = (elem.price - elem.lastPrice).toFixed(3);
  const percent = (diff * 100 / elem.price).toFixed(2 );
  return (
    <div className='stock-card'>
      {elem.logo && <img src={elem.logo} alt='' />}
      <p className='stock-card_company-name'>{elem.name}</p>
      <p className='stock-card_industry'>{elem.industry ? elem.industry : null}</p>
      <div className='stock-card_price'>
        {elem.price && <p className='stock-card_price_amount'><span>{elem.currency} </span>{elem.price}</p>}
        {elem.price && <p className='stock-card_price_chage'>{diff} ({percent}%) {diff > 0 ? '↑' : '↓'}</p>}
      </div>
    </div>
  )
}

export default StockCard;