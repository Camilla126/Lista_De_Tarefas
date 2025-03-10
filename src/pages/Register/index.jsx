import { useState } from "react"

import { toast } from "react-toastify"

import { Link } from "react-router-dom"
import { auth } from '../../firebaseConnection'
import { createUserWithEmailAndPassword } from "firebase/auth"
import { useNavigate } from "react-router-dom"

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();

    if (email !== '' && password !== '') {
      await createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          toast.success("Cadastro realizado!")
          navigate('/admin', { replace: true })
        })
        .catch(() => {
          toast.error('Erro ao fazer cadastro')
        })

    } else {
      toast.error('Preencha todos os campos!')
    }


  }

  return (
    <div className="home-container">
      <h1>Cadastra-se</h1>
      <span>Vamos criar sua conta!</span>

      <form className="form" onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Digite seu email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input

          type="password"
          placeholder="******"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Cadastrar</button>
      </form>

      <Link className="button-link" to='/'>
        Já possui uma conta? Faça login!</Link>

    </div>
  )
}