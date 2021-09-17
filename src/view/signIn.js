import { signInUser, registerGoogle } from '../firebase/firebase-functions.js';

export const signIn = () => {
  const viewSignIn = `
    <div class='home-container'>
      <figure class='container-img'>
        <img class='cat-gif' src='https://i.pinimg.com/originals/35/ce/9f/35ce9f85da291b4c1c504d8cbd37e8ee.gif'>
      </figure>

        <form id='signin-form' action=''>
          <div class="input-div one">
            <div class="i">
              <i class="fas fa-user"></i>
            </div>
            <div class='div'>
              <input class='form-input' type='email' id='signin-email' placeholder=" "  autocomplete=off required>
              <label class='form-label'>Email</label>
            </div>
          </div>
          <span class="error-email"></span>

          <div class="input-div one">
            <div class="i">
              <i class="fas fa-lock"></i>
            </div>
            <div class='div'>
              <input class='form-input' type="password"  id="signin-password" placeholder=" " autocomplete=off required>
              <label class='form-label'>Contraseña</label>
            </div>
          </div>
          <p class="error-password"></p>

          <div class='form-div'>
            <input type="submit" id="start-button" class="form-button" value="Iniciar sesión">
          </div>
        </form>


      <ul class="home-list">
        <li class="signin-access-items">
         <button class="google-button"> <a id="signin-google" href="#/google">Acceder con Google</a></button>
        </li>
        <li class="signin-access-items">
          <span>¿No tienes cuenta?</span><a class="sgn" href="#/signup">Create una</a>
        </li>
      </ul>
    </div>`;

  const sectionElement = document.createElement('div');
  sectionElement.classList.add('container-box');
  sectionElement.innerHTML = viewSignIn;

  const signinBtm = sectionElement.querySelector('#start-button');
  signinBtm.addEventListener('click', (e) => {
    e.preventDefault();
    const signInEmail = sectionElement.querySelector('#signin-email').value;
    const signInPassword = sectionElement.querySelector('#signin-password').value;
    const errorEmail = sectionElement.querySelector('.error-email');
    const errorPassword = sectionElement.querySelector('.error-password');

    errorEmail.innerHTML = '';
    errorPassword.innerHTML = '';
    if (signInPassword === '' && signInEmail === '') {
      errorPassword.innerHTML = 'Inserte contraseña';
      errorEmail.innerHTML = 'Inserte email';
    } else if (signInPassword === '') {
      errorPassword.innerHTML = 'Inserte contraseña';
    } else if (signInEmail === '') {
      errorEmail.innerHTML = 'Inserte email';
    } else {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          const emailVerified = user.emailVerified;
          if (emailVerified === true) {
            signInUser(signInEmail, signInPassword)
              .then(() => {
                window.location.hash = '#/onlycats';
                // console.log('inscrito');
              })
              .catch((error) => {
                const errorCode = error.code;
                /* const errorMessage = error.message; */
                if (errorCode === 'auth/user-not-found') {
                  errorEmail.innerHTML = 'El usuario no existe';
                } else if (errorCode === 'auth/wrong-password') {
                  errorPassword.innerHTML = 'La contraseña es inválida o el usuario no tiene contraseña';
                }
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
              });
          } else {
            window.alert('Revisa el correo de verificación');
          }
        }
      });
    }
  });

  const signInGoogle = sectionElement.querySelector('#signin-google');
  signInGoogle.addEventListener('click', (e) => {
    e.preventDefault();
    registerGoogle()
      .then(() => {
        window.location.hash = '#/onlycats';
        // console.log('You\'re now signed in !');
      })
    // eslint-disable-next-line arrow-body-style
      .catch((error) => {
        // console.error(error);
        return error;
      });
  });
  return sectionElement;
};
