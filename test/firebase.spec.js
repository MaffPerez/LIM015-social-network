// eslint-disable-next-line object-curly-newline
import { createUser, registerGoogle, emailVerification, signInUser } from '../src/firebase/firebase-functions.js';

const firebasemock = require('firebase-mock');

const mockauth = new firebasemock.MockAuthentication();
mockauth.autoFlush();

global.firebase = firebasemock.MockFirebaseSdk(
  // use null if your code does not use RTDB
  () => null,
  () => mockauth,
);

describe('createUser', () => {
  it('debería ser una función', () => {
    expect(typeof createUser).toBe('function');
  });
  it('Debería crear un usuario con el email miau@gmail.com', () => createUser('miau@gmail.com', '123456')
    .then((user) => {
      expect(user.email).toBe('miau@gmail.com');
    }));
  it('Debería crear un usuario con contraseña 123456', () => createUser('miau1@gmail.com', '1234567')
    .then((user) => {
      expect(user.password).toBe('1234567');
    }));
});

describe('registerGoogle', () => {
  it('debería ser una función', () => {
    expect(typeof registerGoogle).toBe('function');
  });
  it('Debe logearse con Google', () => {
    registerGoogle()
      .then((user) => {
        expect(user.displayName).toBe(undefined);
      });
  });
});

describe('emailVerification', () => {
  it('debería ser una función', () => {
    expect(typeof emailVerification).toBe('function');
  });
});

describe('signInUser', () => {
  it('debería ser una función', () => {
    expect(typeof signInUser).toBe('function');
  });
  it('Debería ingresar el email miau@gmail.com', () => signInUser('miau@gmail.com', '123456')
    .then((user) => {
      expect(user.email).toBe('miau@gmail.com');
    }));
});
