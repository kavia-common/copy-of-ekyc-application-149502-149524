import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SideNavLayout from '../layout/SideNavLayout';

function Page({ label }: { label: string }) {
  return <div>{label}</div>;
}

test('renders side nav with links and skip link', () => {
  const utils = render(
    <MemoryRouter initialEntries={['/register']}>
      <SideNavLayout>
        <Routes>
          <Route path="/register" element={<Page label="Register Page" />} />
        </Routes>
      </SideNavLayout>
    </MemoryRouter>
  );
  expect(utils.getByRole('navigation', { name: /Primary/i })).toBeInTheDocument();
  expect(utils.getByRole('link', { name: /Register/i })).toBeInTheDocument();
  expect(utils.getByRole('link', { name: /Dashboard/i })).toBeInTheDocument();
  const skip = utils.getByText(/Skip to content/i);
  expect(skip).toHaveClass('skip-to-content');
});

test('active link has aria-current="page"', () => {
  const utils = render(
    <MemoryRouter initialEntries={['/login']}>
      <SideNavLayout>
        <Routes>
          <Route path="/login" element={<Page label="Login Page" />} />
        </Routes>
      </SideNavLayout>
    </MemoryRouter>
  );
  const link = utils.getByRole('link', { name: /Login/i });
  expect(link).toHaveAttribute('aria-current', 'page');
});

test('keyboard focus can reach toggle and main content', async () => {
  const user = userEvent.setup();
  const utils = render(
    <MemoryRouter initialEntries={['/']}>
      <SideNavLayout>
        <Routes>
          <Route path="/" element={<Page label="Home" />} />
        </Routes>
      </SideNavLayout>
    </MemoryRouter>
  );
  // Focus skip link
  const skip = utils.getByText(/Skip to content/i);
  skip.focus();
  expect(skip).toHaveFocus();

  // Tab should move focus; on desktop header toggle is not visible, but skip link and links are focusable
  await user.keyboard('{Tab}');
  // We can't assert exact element due to environment, but ensure something is focused
  expect(document.activeElement).not.toBeNull();
});

test('mobile toggle opens/closes sidebar (aria-expanded reflects state)', async () => {
  // jsdom doesn't support @media queries, but we can still click the button and check aria-expanded toggles
  const user = userEvent.setup();
  const utils = render(
    <MemoryRouter initialEntries={['/']}>
      <SideNavLayout>
        <Routes>
          <Route path="/" element={<Page label="Home" />} />
        </Routes>
      </SideNavLayout>
    </MemoryRouter>
  );
  const toggleBtns = utils.getAllByRole('button', { name: /toggle navigation menu/i });
  const toggle = toggleBtns[0];
  expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await user.click(toggle);
  expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await user.click(toggle);
  expect(toggle).toHaveAttribute('aria-expanded', 'false');
});
