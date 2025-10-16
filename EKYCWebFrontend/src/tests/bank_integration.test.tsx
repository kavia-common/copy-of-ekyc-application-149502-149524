import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import BankDetails from '../pages/BankDetails';

jest.useFakeTimers();

test('ifsc helper shows format warning and then lookup status', async () => {
  render(
    <MemoryRouter initialEntries={['/bank']}>
      <Routes>
        <Route path="/bank" element={<BankDetails />} />
      </Routes>
    </MemoryRouter>
  );
  const ifsc = screen.getByLabelText(/IFSC Code/i) as HTMLInputElement;
  fireEvent.change(ifsc, { target: { value: 'ABCD012' } });
  expect(screen.getByText(/does not match expected format/i)).toBeInTheDocument();

  fireEvent.change(ifsc, { target: { value: 'ABCD0EF1234' } });
  await act(async () => {
    jest.advanceTimersByTime(450);
  });
  expect(screen.getByText(/Branch:/i)).toBeInTheDocument();
});
