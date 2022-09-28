import { IPhone } from 'interfaces/phone';
import React from 'react';

export const Card = (phone: IPhone) => {
  const imageSource = 'images/phones/' + phone.num + '.png';
  return (
    <div className="card" key={phone.name}>
      <h4 className="card__title">{phone.name}</h4>
      <div className="card__image-box">
        <img className="card__image" src={imageSource}></img>
      </div>
      <ul className="card__props">
        <li id="quantity">Количество: {phone.quantity}</li>
        <li id="year">Год выпуска: {phone.year}</li>
        <li id="shape">Изготовитель: {phone.shape}</li>
        <li id="color">Цвет: {phone.color}</li>
        <li id="size">Количество камер: {phone.size}</li>
        <li id="favorite">Популярен: {phone.favorite}</li>
      </ul>
    </div>
  );
};
