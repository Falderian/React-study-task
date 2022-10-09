import { imageStorage, saveItemToStorage, storage } from 'helpers/storage';
import React, { ChangeEvent, RefObject } from 'react';
import { DeliveryCard } from './deliveryCard/deliveryCard';

export class PageForms extends React.Component {
  nameInput!: RefObject<HTMLInputElement>;
  dateSendInput!: RefObject<HTMLInputElement>;
  optionDeliveryInput!: RefObject<HTMLSelectElement>;
  photoInput!: RefObject<HTMLInputElement>;
  courierInput!: RefObject<HTMLInputElement>;
  imageSource!: string;
  state = {
    isSubmitted: false,
  };

  constructor(props: string) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.nameInput = React.createRef();
    this.dateSendInput = React.createRef();
    this.optionDeliveryInput = React.createRef();
    this.photoInput = React.createRef();
    this.courierInput = React.createRef();
  }
  changeHandler(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target;
    const src = window.URL.createObjectURL(files![0]);
    imageStorage.push(src);
  }

  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const tempPhone = [];
    tempPhone.push(this.nameInput.current!.value);
    tempPhone.push(this.dateSendInput.current!.value);
    tempPhone.push(this.optionDeliveryInput.current!.value);
    tempPhone.push(this.photoInput.current!.value);
    saveItemToStorage(tempPhone, this.courierInput.current!.checked);
    this.setState({ isSubmitted: true });
  }

  render() {
    return (
      <>
        <form className="form" onSubmit={this.handleSubmit}>
          Внесите данные:
          <label className="form__label">
            Имя:
            <input type="text" required ref={this.nameInput} />
          </label>
          <label className="form__label">
            Дата отправки:
            <input type="date" required ref={this.dateSendInput} />
          </label>
          <label className="form__label">
            Выберите тип посылки:
            <select required ref={this.optionDeliveryInput}>
              <option>До 10 кг</option>
              <option>Более 10 кг</option>
            </select>
          </label>
          <label className="form__label">
            Фото посылки:
            <input
              id="file-input"
              type="file"
              required
              ref={this.photoInput}
              accept="image/*"
              onChange={this.changeHandler}
            />
          </label>
          <label className="form__label">
            Доставка курьером:
            <input type="checkbox" defaultChecked={false} ref={this.courierInput} />
          </label>
          <input type="submit" value="Отправить" />
        </form>
        <div id="cards" className="cards">
          <span>Список посылок</span>
          {storage.map((el) => {
            return (
              <DeliveryCard
                key={el.name + storage.indexOf(el)}
                name={el.name}
                dateSend={el.dateSend}
                optionDelivery={el.optionDelivery}
                courier={el.courier}
                imageSrc={el.imageSrc}
              />
            );
          })}
        </div>
      </>
    );
  }
}
