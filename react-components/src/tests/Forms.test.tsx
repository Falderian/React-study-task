import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import 'mock-local-storage';
import React from 'react';
import { PageForms } from 'components/forms/pageForms';
import userEvent from '@testing-library/user-event';

describe('Forms Page', () => {
  it('Renders Page with form, check for conrols', () => {
    render(<PageForms />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getAllByRole('option')).toHaveLength(2);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(2);
  });
  it('Does the submit button is disabled before & after typing', () => {
    render(<PageForms />);
    expect(screen.getByText(/Отправить/i)).toBeDisabled();
    const input = screen.getByLabelText('Имя:');
    fireEvent.change(input, { target: { value: 'TestName' } });
    expect(screen.getByText(/Отправить/i)).not.toBeDisabled();
  });
  it('Tests the card creating functions', () => {
    const { container } = render(<PageForms />);

    //name input tests
    const nameInput = screen.getByLabelText('Имя:');
    fireEvent.change(nameInput, { target: { value: 'TestName' } });
    expect(screen.getByLabelText('Имя:')).toHaveValue('TestName');

    //date input tests
    const dateInput = container.querySelector('#dateInput') as HTMLInputElement;
    const date = new Date();
    const currentDate = date.toISOString().substring(0, 10);
    dateInput.value = currentDate;

    //select input tests
    const selectInput = container.querySelector('#optionDeliveryInput') as HTMLSelectElement;
    selectInput.value = 'Более 10 кг';

    //file input tests
    global.URL.createObjectURL = jest.fn();
    const fileInput = container.querySelector('#file-input') as HTMLInputElement;
    const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });
    userEvent.upload(fileInput, file);

    //courier input tests
    const courierInput = container.querySelector('#courierInput') as HTMLInputElement;
    courierInput.checked = true;

    //submit button tests
    const submitBtn = container.querySelector('#submit-btn') as HTMLInputElement;
    userEvent.click(submitBtn);

    expect(screen.getByText('Данные сохранены!'));

    const card = container.querySelector('.card') as HTMLDivElement;
    expect(screen.getByText('TestName'));
    expect((card.querySelector('.card__date') as HTMLDivElement).innerHTML.includes(currentDate));
    expect((card.querySelector('.card__type') as HTMLDivElement).innerHTML.includes('Более 10 кг'));
    expect(
      (card.querySelector('.card__courier') as HTMLDivElement).innerHTML.includes('Более 10 кг')
    );
  });
});
