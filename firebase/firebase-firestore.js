// Función que crea una colección de posts
export const postCollection = (post, userName, photo, email) => firebase.firestore().collection('posts').add({
  user: userName,
  text: post,
  photo,
  email,
  timePost: firebase.firestore.FieldValue.serverTimestamp(),
});

// Función para traer todos los posts de firestore
export const getCollection = () => firebase.firestore().collection('posts').orderBy('timePost', 'desc');

// Función que crea la colección de usuarios
export const postUserCollection = (usuario, email) => firebase.firestore().collection('user').add({
  usuario,
  email,
});

// Función que trae la collección de usuarios
export const getUserCollection = () => firebase.firestore().collection('user');

// Función para eliminar posts
export const deletePost = (id) => firebase.firestore().collection('posts').doc(id).delete();

// Función para editar posts
export const editPost = (id, updatePost) => firebase.firestore().collection('posts').doc(id).update({ text: updatePost });
