import { imageStorage, saveItemToStorage, storage } from 'helpers/storage';
import React, { ChangeEvent, RefObject } from 'react';
import { DeliveryCard } from './deliveryCard/deliveryCard';
import { disableForm } from './disableForm/disableForm';

export class PageForms extends React.Component {
  nameInput!: RefObject<HTMLInputElement>;
  dateSendInput!: RefObject<HTMLInputElement>;
  optionDeliveryInput!: RefObject<HTMLSelectElement>;
  photoInput!: RefObject<HTMLInputElement>;
  courierInput!: RefObject<HTMLInputElement>;
  imageSource!: string;

  constructor(props: string) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.imageChangeHandler = this.imageChangeHandler.bind(this);
    this.nameInput = React.createRef();
    this.dateSendInput = React.createRef();
    this.optionDeliveryInput = React.createRef();
    this.photoInput = React.createRef();
    this.courierInput = React.createRef();
    this.state = {
      isSubmitted: false,
    };
  }

  imageChangeHandler(event: ChangeEvent<HTMLInputElement>) {
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
    this.showMsgDataSaved();
    disableForm(true);
  }

  showMsgDataSaved() {
    const confirmDiv = document.getElementById('confirm-div') as HTMLDivElement;
    confirmDiv.classList.toggle('inactive');
  }

  disableSubmitBtn() {
    !this.nameInput.current!.value
      ? ((document.getElementById('submit-btn') as HTMLInputElement).disabled = true)
      : ((document.getElementById('submit-btn') as HTMLInputElement).disabled = false);
  }

  resetInputsValues() {
    this.nameInput.current!.value = '';
    this.dateSendInput.current!.value = '';
    this.photoInput.current!.value = '';
    this.courierInput.current!.checked = false;
    this.optionDeliveryInput.current!.value = 'До 10 кг';
  }

  render() {
    return (
      <>
        <form className="form" onSubmit={this.handleSubmit}>
          Внесите данные:
          <label className="form__label">
            Имя:
            <input
              type="text"
              id="nameInput"
              required
              ref={this.nameInput}
              onChange={() => this.disableSubmitBtn()}
            />
          </label>
          <label className="form__label">
            Дата отправки:
            <input type="date" id="dateInput" required ref={this.dateSendInput} />
          </label>
          <label className="form__label">
            Выберите тип посылки:
            <select required ref={this.optionDeliveryInput} id="optionDeliveryInput">
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
              onChange={this.imageChangeHandler}
            />
          </label>
          <label className="form__label">
            Доставка курьером:
            <input
              type="checkbox"
              id="courierInput"
              defaultChecked={false}
              ref={this.courierInput}
            />
          </label>
          <input
            className="form__submit-btn"
            id="submit-btn"
            disabled
            type="submit"
            value="Отправить"
          />
          <button
            className="form__reset-btn"
            onClick={(evt) => {
              evt.preventDefault();
              disableForm(false);
              this.resetInputsValues();
            }}
          >
            Сбросить данные
          </button>
          <div className="form__confirm-div inactive" id="confirm-div">
            Данные сохранены!
          </div>
        </form>
        <div id="cards" className="cards">
          <h4 className="card__heading">Список посылок: </h4>
          <div className="cards__cont">
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
        </div>
      </>
    );
  }
}
