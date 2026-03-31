import { render, screen } from '@testing-library/react';
import {describe, expect, test} from '@jest/globals';
import LoginForm, {isValidEmail, isValidPassword } from '.';

test('renders sign in page', () => {
  render(<LoginForm />);
  const signInText = screen.getByText("Sign in");
  expect(signInText).toBeInTheDocument();
});

// Add more unit test here
describe('validation logic', ()=> {
 test('return false for invalid email', ()=> {
   expect(isValidEmail('invalid-email')).toBe(false);
   expect(isValidEmail('test@')).toBe(false);
   expect(isValidEmail('')).toBe(false);
 });

 test('returns true for valid email', () => {
    expect(isValidEmail('test@example.com')).toBe(true);
    expect(isValidEmail('user.name+tag@domain.co.uk')).toBe(true);
  });

  test('returns false for password shorter than 8 characters', () => {
    expect(isValidPassword('Short1!')).toBe(false);
  });

  test('returns false when password missing uppercase letter', () => {
    expect(isValidPassword('password1!')).toBe(false);
  });

  test('returns false when password missing lowercase letter', () => {
    expect(isValidPassword('PASSWORD1!')).toBe(false);
  });

  test('returns false when password missing number', () => {
    expect(isValidPassword('Password!')).toBe(false);
  });

  test('returns false when password missing special character', () => {
    expect(isValidPassword('Password123')).toBe(false);
  });

  test('returns true for fully valid password', () => {
    expect(isValidPassword('Password123!')).toBe(true);
    expect(isValidPassword('MyStrongPass2026@')).toBe(true);
  });
})