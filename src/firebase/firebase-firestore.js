export const postCollection = (post, userName, photoUser, email, uid, photoURL) => firebase.firestore().collection('posts').add({
  text: post,
  user: userName,
  photoUser,
  email,
  uid,
  postImage: photoURL,
  likes: [],
  timePost: firebase.firestore.FieldValue.serverTimestamp(),
});

// Función para traer la postCollection
export const getCollection = () => firebase.firestore().collection('posts').orderBy('timePost', 'desc');

// Función para traer todos los posts de firestore
export const getPost = (id) => firebase.firestore().collection('posts').doc(id).get();

// Función que crea la colección de usuarios
export const postUserCollection = (usuario, email, bio) => firebase.firestore().collection('user').add({
  usuario,
  email,
  bio,
});

// Función que trae la collección de usuarios
export const getUserCollection = (id) => firebase.firestore().collection('user').doc(id).get();

// Función para eliminar posts
export const deletePost = (id) => firebase.firestore().collection('posts').doc(id).delete();

// Función para editar posts
export const editPost = (id, text) => firebase.firestore().collection('posts').doc(id).update({ text });

// Función para agregar y quitar likes
export const editLike = (id, likes) => firebase.firestore().collection('posts').doc(id).update({ likes });

// Función para editar biografía
export const editBio = (id, bio) => firebase.firestore().collection('user').doc(id).update({ bio });
