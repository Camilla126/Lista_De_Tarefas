import { useState, useEffect } from 'react'
import { db, auth } from "./firebaseConnection";
import "./app.css";
import { 
  doc,
  setDoc, 
  collection,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  onSnapshot

} from 'firebase/firestore'

import { createUserWithEmailAndPassword,
  signInWithEmailAndPassword

} from 'firebase/auth'

function App() {

const [titulo, setTitulo] = useState('');
const [autor, setAutor] = useState('');
const [idPost, setIdPost] = useState('');

const [email, setEmail] = useState('');
const [senha, setSenha] = useState('');

const [user, setUser] = useState(false);
const [userDetail, setUserDetail] = useState({})

const [posts, setPosts] = useState([]);

useEffect(() => {
  async function loadPost() {
    const unsub = onSnapshot(collection(db, 'posts'), (snapshot)=> {
      let listaPost = [];

      snapshot.forEach((doc) =>{
        listaPost.push({
          id: doc.id,
          titulo: doc.data().titulo,
          autor: doc.data().autor,
        })
      })
      
      setPosts(listaPost);

      
    })
  }
  loadPost();
})

 async function handleAdd(){
 // await setDoc(doc(db, 'posts', '12345'), {
    //titulo: titulo,
    //autor: autor,
 // })
//  .then(() => {
//console.log("DADOS REGISTRADOS NO BANCO")
 // })
 // .catch((error)=>{
   // console.log('GEROU ERRO' + error)
  //})

  await addDoc(collection(db, 'posts'),{
    titulo: titulo,
    autor: autor
  })
.then(() => {
console.log('CADASTRADO COM SUCESSO!')
setAutor('');
setTitulo('')
})
.catch((error) => {
  console.log('ERRO' + error)
})

}

async function buscarPost() {
 //const postRef = doc(db, 'posts', '12345')

 // await getDoc(postRef)
 // .then((snapshot) => {
 //   setAutor(snapshot.data().autor)
 //   setTitulo(snapshot.data().titulo)
 // })
 // .catch(()=>{
 //   console.log('ERRO AO BUSCAR')
 // })

 const postRef = collection(db, 'posts')
 await getDocs(postRef)
 .then((snapshot) => {
let lista = [];

snapshot.forEach((doc) =>{
  lista.push({
    id: doc.id,
    titulo: doc.data().titulo,
    autor: doc.data().autor,
  })
})

setPosts(lista);


 })
 .catch((error) => {
  console.log('DEU ALGUM ERRO AO BUSCAR')
 })
}

async function editarPost(){
  const docRef = doc(db, "posts", idPost)
await updateDoc(docRef, {
  titulo: titulo,
  autor: autor
})
.then(() =>{
console.log('POST ATUALIZADO')
setIdPost('')
setTitulo('')
setAutor('')   
})

.catch((error) => {
  console.log(error)
})

}

 async function excluirPost(id){
 const docRef = doc(db, "posts", id)
 await deleteDoc(docRef)
 .then(() =>{
  alert("POST DELETADO COM SUCESSO")
 })
 
}

 async function novoUsuario(){
  await createUserWithEmailAndPassword(auth, email, senha)
  .then(() =>{
    console.log('CADASTRADO COM SUCESSO');
    setEmail('')
    setSenha('')
  })
  .catch((error) => {
   if(error.code === 'auth/weak-password'){
    alert("Senha muito fraca.")
   }else if(error.code === 'auth/email-already-in-use'){
    alert("Email já existe!")
   }
    
  })
}

async function logarUsuario() {
  await signInWithEmailAndPassword (auth, email, senha)
  .then((value) => {
    console.log("USER LOGADO COM SUCESSO");
console.log(value.user);

setUserDetail({
  uid: value.user.uid,
  email: value.user.email,
})

    setEmail('')
    setSenha('')
    
  })
  .catch(() => {
    console.log("ERRO AO FAZER O LOGIN")
  })
  
}

  return (
    <div >
    <h1>  React e Firebase..</h1>

    <div className='container'>
<h2>Usuários</h2>

      <label>Email</label>
      <input 
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder='Digite um email'
      />

<label>senha</label>
      <input 
      value={senha}
      onChange={(e) => setSenha(e.target.value)}
      placeholder='Informe sua senha'
      />

<button onClick={novoUsuario}>Cadastrar</button>
<button onClick={logarUsuario}>Fazer login</button>


    </div>
<br /> <br />
    <hr />

    <div className="container">
      <h2>POSTS</h2>

      <label>ID do Post:</label>
      <input 
      placeholder='Digite o ID do post'
      value={idPost}
      onChange={ (e) => setIdPost(e.target.value)}
      />


      <label>Titulo:</label>
      <textarea 
      type="text"
      placeholder="Digite o titulo"
      value={titulo}
      onChange={(e)=> setTitulo(e.target.value)}
      /> <br />

      <label>Autor:</label>
      <input 
      type="text"
      placeholder="Autor do post"
      value={autor}
      onChange={(e) => setAutor(e.target.value)}
      />

      <button onClick={handleAdd}>Cadastrar</button>
<button onClick={buscarPost}>Buscar post</button>

<button onClick={editarPost}>Atualizar post</button>

<ul>
  {posts.map( (post) =>{
    return(
      <li key={post.id}>
        <strong>ID: {post.id}</strong> <br />
        <span>Titulo: {post.titulo}</span> <br />
        <span>Autor: {post.autor}</span> <br />
        <button onClick={ () => excluirPost(post.id)}>Excluir</button> <br /> <br />

      </li>
    )
  })}
</ul>
    </div>
    </div>
  );
}

export default App;
