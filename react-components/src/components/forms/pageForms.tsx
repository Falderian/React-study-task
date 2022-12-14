import { imageStorage, saveItemToStorage, storage } from 'helpers/storage';
import React, { ChangeEvent, FormEvent, RefObject, useEffect, useState } from 'react';
import { DeliveryCard } from './deliveryCard/deliveryCard';
import { disableForm } from './disableForm/disableForm';
import { useForm } from 'react-hook-form';
import { formData, IItemToRender } from 'interfaces/delivery';
import { useDispatch, useSelector } from 'react-redux';
import { IStore } from 'helpers/redux/store';
import { addItemForm } from 'helpers/redux/formSlice';

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
    this.optionDeliveryInput.current!.value = '???? 10 ????';
  }

  render() {
    return (
      <>
        <form className="form" onSubmit={this.handleSubmit}>
          ?????????????? ????????????:
          <label className="form__label">
            ??????:
            <input
              type="text"
              id="nameInput"
              required
              ref={this.nameInput}
              onChange={() => this.disableSubmitBtn()}
            />
          </label>
          <label className="form__label">
            ???????? ????????????????:
            <input type="date" id="dateInput" required ref={this.dateSendInput} />
          </label>
          <label className="form__label">
            ???????????????? ?????? ??????????????:
            <select required ref={this.optionDeliveryInput} id="optionDeliveryInput">
              <option>???? 10 ????</option>
              <option>?????????? 10 ????</option>
            </select>
          </label>
          <label className="form__label">
            ???????? ??????????????:
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
            ???????????????? ????????????????:
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
            value="??????????????????"
          />
          <button
            className="form__reset-btn"
            onClick={(evt) => {
              evt.preventDefault();
              disableForm(false);
              this.resetInputsValues();
            }}
          >
            ???????????????? ????????????
          </button>
          <div className="form__confirm-div inactive" id="confirm-div">
            ???????????? ??????????????????!
          </div>
        </form>
        <div id="cards" className="cards">
          <h4 className="card__heading">???????????? ??????????????: </h4>
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

export const PageFormsOnHooks = () => {
  const { register, handleSubmit, reset } = useForm<formData>();

  const formItems = useSelector<IStore>((state) => state.formsData.formItems) as IItemToRender[];
  const dispatch = useDispatch();

  const [imgSrc, setImgSrc] = useState('');

  const onSubmit = (data: formData): void => {
    const temp: IItemToRender = {
      name: data.name,
      date: data.date.toString(),
      select: data.select,
      courier: data.courier,
      imgSrc: imgSrc,
    };
    dispatch(addItemForm({ formItem: temp }));
    disableSubmitBtn(true);
    disableForm(true);
    showMsgDataSaved();
  };

  const imageChangeHandler = (event: FormEvent<HTMLInputElement>) => {
    const { files } = event.currentTarget;
    const src = window.URL.createObjectURL(files![0]);
    setImgSrc(src);
  };

  const showMsgDataSaved = () => {
    const confirmDiv = document.getElementById('confirm-div') as HTMLDivElement;
    confirmDiv.classList.toggle('inactive');
  };

  const resetInputsValues = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    disableForm(false);
    reset();
    showMsgDataSaved();
  };

  const disableSubmitBtn = (cond: boolean) => {
    (document.getElementById('submit-btn') as HTMLInputElement).disabled = cond;
  };

  return (
    <>
      <form
        className="form"
        onSubmit={handleSubmit(onSubmit)}
        onChange={() => disableSubmitBtn(false)}
      >
        ?????????????? ????????????:
        <label className="form__label">
          ??????:
          <input
            data-testid="name-input"
            type="text"
            id="nameInput"
            required
            {...register('name')}
          />
        </label>
        <label className="form__label">
          ???????? ????????????????:
          <input
            data-testid="date-input"
            type="date"
            id="dateInput"
            required
            {...register('date')}
          />
        </label>
        <label className="form__label">
          ???????????????? ?????? ??????????????:
          <select
            data-testid="select-input"
            required
            id="optionDeliveryInput"
            {...register('select')}
          >
            <option>???? 10 ????</option>
            <option>?????????? 10 ????</option>
          </select>
        </label>
        <label className="form__label">
          ???????? ??????????????:
          <input
            data-testid="file-input"
            id="file-input"
            type="file"
            required
            accept="image/*"
            onChange={(evt) => {
              imageChangeHandler(evt);
            }}
          />
        </label>
        <label className="form__label">
          ???????????????? ????????????????:
          <input
            data-testid="courier-input"
            type="checkbox"
            id="courierInput"
            defaultChecked={false}
            {...register('courier')}
          />
        </label>
        <input
          data-testid="submit-btn"
          className="form__submit-btn"
          id="submit-btn"
          disabled
          type="submit"
          value="??????????????????"
        />
        <button
          data-testid="reset-btn"
          className="form__reset-btn"
          onClick={(evt) => {
            resetInputsValues(evt);
          }}
        >
          ???????????????? ????????????
        </button>
        <div className="form__confirm-div inactive" id="confirm-div" data-testid="data-saved-text">
          ???????????? ??????????????????!
        </div>
      </form>
      <div id="cards" className="cards">
        <h4 className="card__heading">???????????? ??????????????: </h4>
        <div className="cards__cont" data-testid="cards">
          {formItems.map((el) => {
            return (
              <DeliveryCard
                key={el.name + formItems.indexOf(el)}
                name={el.name}
                dateSend={el.date.toString()}
                optionDelivery={el.select}
                courier={el.courier ? '????' : '??????'}
                imageSrc={el.imgSrc}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};
