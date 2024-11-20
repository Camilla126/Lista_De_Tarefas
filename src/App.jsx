import { useState } from 'react'
import { db } from "./firebaseConnection";
import "./app.css";


function App() {

const [titulo, setTitulo] = useState('');
const [autor, setAutor] = useState('');


function handleAdd(){
  alert('TESTE')
}

  return (
    <div >
    <h1>  React e Firebase..</h1>

    <div className="container">
      <label>Titulo:</label>
      <textarea 
      type="text"
      placeholder="Digite o titulo"
      value={titulo}
      onChange={(e)=> setTitulo(e.target.value)}
      />

      <label>Autor:</label>
      <input 
      type="text"
      placeholder="Autor do post"
      value={autor}
      onChange={(e) => setAutor(e.target.value)}
      />

      <button onClick={handleAdd}>Cadastrar</button>

    </div>
    </div>
  );
}

export default App;
