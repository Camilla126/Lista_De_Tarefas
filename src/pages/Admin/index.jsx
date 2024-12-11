import { useState, useEffect } from 'react'
import './admin.css'
import { auth, db } from '../../firebaseConnection'
import { signOut } from 'firebase/auth'

import {
    addDoc, collectio
} from 'firebase/firestore'

export default function Admin(){
const [tarefaInput, setTarefaInput] = useState('')

useEffect (() => {
async function loadTarefa() {
    const userDetail = localStorage.getItem()
}
loadTarefa();
}, [])

   async function handleRegister(e){
        e.preventDefault();

  if(tarefaInput === ''){
    alert("Digite sua tarefa...")
    return;
  }

await addDoc(collection(db, "tarefas"), {
    tarefa: tarefaInput,
    created: new Date(),
    userUid:
})


    }

async function handleLogout() {
    await signOut(auth);
   
}

    return(
        <div className='admin-container'>
            <h1>Minha tarefas</h1>
            
            <form className='form' onSubmit={handleRegister}>
                <textarea 
                placeholder='Digite sua tarefa...'
                value={tarefaInput}
                onChange={(e) => setTarefaInput(e.target.value)}
                />

                <button className='btn-register' type='submit'>Registrar tarefa</button>
             </form>

<article className='list'>
    <p>Estudar javascript hoje</p>

    <div>
        <button>Editar</button>
        <button className='btn-delete'>Concluir</button>
    </div>
</article>

<button className='btn-logout' onClick={handleLogout}>Sair</button>

        </div>
    )
}