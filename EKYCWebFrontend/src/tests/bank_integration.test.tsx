import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import BankDetails from '../pages/BankDetails';

jest.useFakeTimers();

test('ifsc helper shows format warning and then lookup status', async () => {
  const utils = render(
    <MemoryRouter initialEntries={['/bank']}>
      <Routes>
        <Route path="/bank" element={<BankDetails />} />
      </Routes>
    </MemoryRouter>
  );

  const ifsc = utils.getByLabelText(/IFSC Code/i) as HTMLInputElement;

  // Enter invalid IFSC to see format warning
  await userEvent.clear(ifsc);
  await userEvent.type(ifsc, 'ABCD012');
  expect(utils.getByText(/does not match expected format/i)).toBeInTheDocument();

  // Enter valid IFSC and advance timers to allow debounce/lookup
  await userEvent.clear(ifsc);
  await userEvent.type(ifsc, 'ABCD0EF1234');

  // Allow the component's setTimeout (400ms) to run
  jest.advanceTimersByTime(450);

  // Assert branch information appears
  expect(await utils.findByText(/Branch:/i)).toBeInTheDocument();
});
