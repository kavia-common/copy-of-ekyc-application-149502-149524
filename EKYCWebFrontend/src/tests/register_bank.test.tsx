import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import App from '../App';
import BankDetails from '../pages/BankDetails';

test('renders Register page by default with navigation', () => {
  const utils = render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );
  // Navbar has a "Register" link and default route redirects to /register
  expect(utils.getAllByText(/Register/i)[0]).toBeInTheDocument();
});

test('renders Bank Details page and validates account match messaging', async () => {
  const utils = render(
    <MemoryRouter initialEntries={['/bank']}>
      <Routes>
        <Route path="/bank" element={<BankDetails />} />
      </Routes>
    </MemoryRouter>
  );
  const acc = utils.getByLabelText(/Account Number/i) as HTMLInputElement;
  const conf = utils.getByLabelText(/Confirm Account Number/i) as HTMLInputElement;

  await userEvent.clear(acc);
  await userEvent.type(acc, '12345678');
  await userEvent.clear(conf);
  await userEvent.type(conf, '12345670');

  expect(utils.getByText(/Must match/i)).toBeInTheDocument();
});
