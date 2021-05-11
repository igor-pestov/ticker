import React from 'react';
import './SearchBarOption.scss';

const SearchBarOption = ({elem, index, setDisplayed}) => {
  return (
    <div className='search-bar_option' onClick={() => elem.name !== 'Not found.' && setDisplayed(elem)}>
      <div className='search-bar_option_image'>
        {elem.logo && <img src={elem.logo} alt='' />}
      </div>
      <div className='search-bar_option_about'>
        <p>{elem.name.substring(0, 45)}</p>
        <p>{elem.industry ? elem.industry : null}</p>
      </div>
      <div className='search-bar_option_price'>
        {elem.price && <p><span>{elem.currency === 'USD'? '$' : elem.currency} </span>{elem.price}</p>}
      </div>
      <div>

      </div>
    </div>
  )
}

export default SearchBarOption;