import { IDeliveryPackage } from 'interfaces/delivery';
import React from 'react';

export const DeliveryCard = (deliveryPackage: IDeliveryPackage) => {
  const imageSrc = deliveryPackage.imageSrc;
  return (
    <div className="card" data-testid="card">
      <h4 className="card__heading">{deliveryPackage.name}</h4>
      <div className="card__image-cont">
        <img className="card__image" src={imageSrc}></img>
      </div>
      <div className="card__date">Дата отправки: {deliveryPackage.dateSend}</div>
      <div className="card__type">Тип посылки: {deliveryPackage.optionDelivery}</div>
      <div className="card__courier">Доставка курьером: {deliveryPackage.courier}</div>
    </div>
  );
};
