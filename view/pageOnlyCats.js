/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-console */
import { signOutUser, onAuthStateChanged } from '../firebase/firebase-auth.js';
import { postCollection, getCollection, deletePost } from '../firebase/firebase-firestore.js';

const userStateCheck = () => {
  onAuthStateChanged((user) => {
    if (user !== null && user.emailVerified) {
      window.location.hash = '#/onlycats';
    } else if (user === null) {
      window.location.hash = '';
    }
  });
};

export const pageOnlyCats = () => {
  userStateCheck();
  const localUser = JSON.parse(localStorage.getItem('user'));
  const imgDefault = 'https://pbs.twimg.com/profile_images/1101458340318568448/PpkA2kQh_400x400.jpg';
  const photo = (localUser.photoURL === null) ? imgDefault : localUser.photoURL;
  const pageOcView = `
  <div class="page-container">
    <header class = "header-container">
      <img src="./img/only-cats.png" "alt='only-cats' class="page-title">
      <i class="fas fa-sign-out-alt" id="sign-out"></i>
      <i class="fas fa-cat" style="display:none"></i>
    </header>
    <main class="scroll-container">
      <div class="label-container">
        <button class="label-btn meme">Memes</button>
        <button class="label-btn vet">Vet Cat</button>
        <button class="label-btn foodie">Foodie Cat</button>
      </div>
      <div>
        <section class="profile-post publish" >
          <div class="container-photo">
              <img src="${photo}" "alt='picture' class="profile-photo">
          </div>
          <section class="section-profile" >
            <textarea class="text-input" id="text-input" placeholder="¿Miau esta pasando?"></textarea>
            <div class="post-icon">
              <i class="fas fa-image"></i>
              <button class="post-button" id="post-button" type="submit">Meow</button>
            </div>
          </section>
        </section>
        <section  id="other-post">
        </section>
    </main>
  </div>`;

  const sectionElement = document.createElement('section');
  sectionElement.classList.add('container-box');
  sectionElement.innerHTML = pageOcView;
  // -----Botones del Post
  const btnPublish = sectionElement.querySelector('#post-button');
  const textInput = sectionElement.querySelector('#text-input');

  // -------- Crear Posts (C) --------
  const createPost = (e) => {
    e.preventDefault();
    const displayName = localUser.displayName;
    const email = localUser.email;
    const post = textInput.value;
    postCollection(post, displayName, photo, email)
      .then(() => {
        textInput.value = ' ';
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
  };

  // -------- Leer Posts (R) --------
  const readPosts = () => {
    getCollection().onSnapshot((querySnapshot) => {
      const newPost = sectionElement.querySelector('#other-post');
      newPost.innerHTML = ' ';
      querySnapshot.forEach((doc) => {
        const dataContent = doc.data();
        // console.log(dataContent);
        // console.log(doc.id);
        newPost.innerHTML += `
        <section class="profile-post">
          <div class="container-photo">
            <img src="${dataContent.photo}" "alt='picture' class="profile-photo">
          </div>
          <section class="section-post">
            <p class="name-input"> ${dataContent.user} </p>
            <p readonly class="text-output">${dataContent.text}</p>
          </section>
          <div class="update-post  ${(dataContent.email === localUser.email) ? 'show' : 'hide'}">
            <button id="btn-deletePost" class="btn-delete"><i class="fas fa-trash"  id="${doc.id}"></i></button>
            <button class="btn-edit"><i class="fas fa-edit"></i></button>
          </div>
        </section> `;
      });
      // -------- Eliminar Posts (D) --------
      const btnDelete = sectionElement.querySelectorAll('.btn-delete');
      btnDelete.forEach((btn) => {
        btn.addEventListener('click', (e) => {
          deletePost(e.target.id)
            .then(() => {
              console.log('Document successfully deleted!');
            }).catch((error) => {
              console.error('Error removing document: ', error);
            });
        });
      });
    });
  };

  btnPublish.addEventListener('click', createPost);
  readPosts();

  // ------------------ Salir de la página --------------------
  const signOut = sectionElement.querySelector('#sign-out');
  signOut.addEventListener('click', (e) => {
    e.preventDefault();
    const result = confirm('¿En serio quieres salir?');
    if (result === true) {
      signOutUser()
        .then(() => {
          window.location.hash = '';
          window.localStorage.clear();
        });
    }
  });

  return sectionElement;
};
