import { data } from 'helpers/data';
import { IPhones } from 'interfaces/phone';
import React, { Component, useState } from 'react';
import { Card } from './cards';

const Cards = (data: IPhones) => {
  const res = data.map((el) => {
    return Card(el);
  });
  return res;
};

export const PageMainOnHooks = () => {
  const [inputValue, setInputValue] = useState(localStorage.getItem('inputDataHooks') || '');
  return (
    <div className="main__wrapper">
      <div className="search-cont">
        <input
          id="input"
          type="text"
          className="search-cont__input"
          defaultValue={inputValue}
          onChange={(evt) => {
            localStorage.setItem('inputDataHooks', evt.currentTarget.value);
          }}
        ></input>
        <button type="submit" className="search-cont__btn">
          <svg
            className="loupe"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="50"
            height="50"
            viewBox="0 0 50 50"
            fill="white"
          >
            <path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"></path>
          </svg>
        </button>
      </div>
      <div className="cards-cont">{Cards(data)}</div>
    </div>
  );
};
