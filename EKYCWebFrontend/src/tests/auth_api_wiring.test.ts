import { registerUser, loginUser } from '../services/api';

test('api methods are defined and return promises', async () => {
  expect(typeof registerUser).toBe('function');
  expect(typeof loginUser).toBe('function');

  // We won't actually call backend here. Just ensure they return a Promise.
  const p1 = registerUser({ email: 'a@b.com', mobile: '9999999999', password: 'password123' });
  const p2 = loginUser({ identifier: 'a@b.com', password: 'password123' });
  expect(p1).toBeInstanceOf(Promise);
  expect(p2).toBeInstanceOf(Promise);
});
