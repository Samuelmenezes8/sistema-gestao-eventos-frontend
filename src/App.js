import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormularioEvento from './FormularioEvento';
import './App.css';

function App() {
  const [eventos, setEventos] = useState([]);
  const [eventoParaEditar, setEventoParaEditar] = useState(null);

  // Função para buscar os eventos do backend
  const fetchEventos = () => {
    axios.get('http://127.0.0.1:8000/api/eventos/')
      .then(response => {
        setEventos(response.data);
      })
      .catch(error => {
        console.error("Houve um erro a buscar os eventos!", error);
      });
  };

  useEffect(() => {
    fetchEventos();
  }, []);

  // Adiciona um novo evento à lista
  const addEvento = (novoEvento) => {
    setEventos(eventosAnteriores => [...eventosAnteriores, novoEvento]);
  };

  // Funções para deletar e editar
  const handleDelete = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/eventos/${id}/`)
      .then(() => {
        // Filtra a lista para remover o evento apagado
        setEventos(eventos.filter(evento => evento.id !== id));
        alert("Evento apagado com sucesso!");
      })
      .catch(error => {
        console.error("Houve um erro ao apagar o evento!", error);
        alert("Não foi possível apagar o evento.");
      });
  };

  const handleEdit = (evento) => {
    setEventoParaEditar(evento);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Lista de Eventos</h1>
      </header>
      <div className="event-list">
        {eventos.map(evento => (
          <div key={evento.id} className="event-item">
            <h2>{evento.titulo}</h2>
            <p>{evento.descricao}</p>
            <p>Data: {evento.data}</p>
            <p>Local: {evento.local}</p>
            {/* Adiciona a lógica para os botões */}
            <button onClick={() => handleEdit(evento)}>Editar</button>
            <button onClick={() => handleDelete(evento.id)}>Apagar</button>
          </div>
        ))}
      </div>
      
      {/* O formulário irá lidar com a edição também */}
      <FormularioEvento onEventoCriado={addEvento} eventoParaEditar={eventoParaEditar} />
    </div>
  );
}

export default App;