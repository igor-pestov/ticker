import React, { useState } from 'react';
import { Input, InputAdornment } from '@material-ui/core';
import loading from '../img/loading.svg';
import searchIcon from '../img/searchIcon.svg';
import SearchBarOption from './SearchBarOption';
import './SearchBar.scss';
import StockCard from './StockCard';

const SearchBar = () => {
  const [search, setSearch] = useState('');
  const [searchRes, setSearchRes] = useState([]);
  const [displayed, setDisplayed] = useState('');
  let buff = '';

  const handleClick = (elem) => {
    setSearch('');
    setDisplayed(elem);
    setSearchRes('');
  }
  
  const handleSearch = (event) => {
    setSearchRes([]);
    setSearch(event.target.value);
    buff = event.target.value;

    const getStocks = () => {
      if (buff === event.target.value && event.target.value !== '') {
        fetch(`https://api.polygon.io/v2/reference/tickers?sort=ticker&market=STOCKS&search=${event.target.value}&perpage=10&page=1&apiKey=stk73LMEBB03kjkItApzWKnRnWSkJnIP`,
        {method: 'GET'})
        .then(res => res.json())
        .then(async(data) => {
         const getData  = async() => {
          for (let item of data.tickers) {
            await fetch(`https://api.polygon.io/v1/meta/symbols/${item.ticker}/company?&apiKey=stk73LMEBB03kjkItApzWKnRnWSkJnIP`,
            {method: 'GET'})
            .then(res => res.json())
            .then(data => {
             item.logo = data.logo;
             item.industry = data.industry;
            })
            .catch(err => console.log(err))
 
            await fetch(`https://api.polygon.io/v2/aggs/ticker/${item.ticker}/prev?unadjusted=true&apiKey=stk73LMEBB03kjkItApzWKnRnWSkJnIP`,
            {method: 'GET'})
            .then(res => res.json())
            .then(data => {
              item.price = data.results[0].c;
              item.lastPrice= data.results[0].o;
            })
            .catch(err => console.log(err));
          }
         }
         if (data.tickers.length) {
          await getData();
          setSearchRes(data.tickers);
         } else {
          setSearchRes([{name: 'Not found.'}])
         }
         
        })
        
      }
    }
    setTimeout(getStocks, 3000);
  }

  return (
    <div className='search-bar'>
      <Input
        value={search}
        onChange={(event) => handleSearch(event)}
        className='search-bar_input'
        startAdornment={
        <InputAdornment>
          <img src={searchIcon} alt='' />
        </InputAdornment>
        }
        placeholder='Search for stock ticker'
      />
      <div 
        className='search-bar_menu'
      >
        {
          search
          ? !searchRes.length 
            ? <img className='loading' src={loading} alt='' /> 
            : searchRes.map((e, i) => {
              return <SearchBarOption
                key={`option${i}`}
                setDisplayed={handleClick} 
                elem={e} 
                index={i} 
              />
            })
          : null
        }
      </div>
      {
        displayed && <StockCard elem={displayed} />
      }
    </div>
  );
}

export default SearchBar;