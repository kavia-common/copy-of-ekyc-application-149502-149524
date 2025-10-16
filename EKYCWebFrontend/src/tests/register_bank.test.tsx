import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import App from '../App';
import BankDetails from '../pages/BankDetails';

test('renders Register page by default with navigation', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByText(/Register/i)).toBeInTheDocument();
});

test('renders Bank Details page and validates account match messaging', () => {
  render(
    <MemoryRouter initialEntries={['/bank']}>
      <Routes>
        <Route path="/bank" element={<BankDetails />} />
      </Routes>
    </MemoryRouter>
  );
  const acc = screen.getByLabelText(/Account Number/i) as HTMLInputElement;
  const conf = screen.getByLabelText(/Confirm Account Number/i) as HTMLInputElement;
  fireEvent.change(acc, { target: { value: '12345678' } });
  fireEvent.change(conf, { target: { value: '12345670' } });
  expect(screen.getByText(/Must match/i)).toBeInTheDocument();
});
