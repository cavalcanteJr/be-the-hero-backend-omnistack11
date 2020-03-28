import React, { useState } from 'react';
import api from '../../services/api'
import {Link, useHistory} from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import './styles.css'
import logoImg from '../../assets/logo.svg'


export default function NewIncident() {
  const history = useHistory()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [value, setValue] = useState('')

  async function handleNewIncident(e){
    e.preventDefault()
    const data = {title, description, value}
    const ongId = localStorage.getItem('ongId')

    try{
      await api.post('incidents', data, {
        headers: {
          Authorization: ongId
        }
      })

      history.push('/profile')
    }catch{
      alert("Erro ao cadastrar")
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero"/>
          <h1>Cadastrar novo caso</h1>
          <p>Descreve o caso detalhadamente para encontrar um herói para revolver isso.</p>
          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041"/>
            Voltar para Home
          </Link>
          </section>
          <form onSubmit={handleNewIncident}>
            <input 
             placeholder="Título do caso" 
             value={title} onChange={e => setTitle(e.target.value) }
             />
            <textarea 
             placeholder="Descrição" 
             value={description} onChange={e => setDescription(e.target.value) }
             />
            <input 
             placeholder="Valor em reais" 
             value={value} onChange={e => setValue(e.target.value) }
             />
            
            <button className="button" type="submit">Cadastrar</button>
          </form>
        
      </div>
    </div>
  );
}
