import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Recebe a prop onEventoCriado e a nova prop eventoParaEditar
function FormularioEvento({ onEventoCriado, eventoParaEditar }) {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [data, setData] = useState('');
  const [local, setLocal] = useState('');
  const [capacidade, setCapacidade] = useState(0);

  // UseEffect para preencher o formulário quando um evento for selecionado para edição
  useEffect(() => {
    if (eventoParaEditar) {
      setTitulo(eventoParaEditar.titulo);
      setDescricao(eventoParaEditar.descricao);
      setData(eventoParaEditar.data);
      setLocal(eventoParaEditar.local);
      setCapacidade(eventoParaEditar.capacidade);
    } else {
      // Limpa o formulário se não houver evento para editar
      setTitulo('');
      setDescricao('');
      setData('');
      setLocal('');
      setCapacidade(0);
    }
  }, [eventoParaEditar]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const dadosDoEvento = {
      titulo: titulo,
      descricao: descricao,
      data: data,
      local: local,
      capacidade: capacidade
    };

    if (eventoParaEditar) {
      // Se houver um evento para editar, envia um PUT
      axios.put(`http://127.0.0.1:8000/api/eventos/${eventoParaEditar.id}/`, dadosDoEvento)
        .then(response => {
          console.log("Evento editado com sucesso!", response.data);
          alert("Evento editado com sucesso!");
          onEventoCriado(response.data); // Atualiza a lista com os dados editados
          // Limpa o formulário após a edição
          setTitulo('');
          setDescricao('');
          setData('');
          setLocal('');
          setCapacidade(0);
        })
        .catch(error => {
          console.error("Houve um erro ao editar o evento!", error);
        });
    } else {
      // Se não houver, cria um novo evento com POST
      axios.post('http://127.0.0.1:8000/api/eventos/', dadosDoEvento)
        .then(response => {
          console.log("Evento criado com sucesso!", response.data);
          alert("Evento criado com sucesso!");
          onEventoCriado(response.data); // Adiciona o novo evento à lista
          // Limpa o formulário após a criação
          setTitulo('');
          setDescricao('');
          setData('');
          setLocal('');
          setCapacidade(0);
        })
        .catch(error => {
          console.error("Houve um erro ao criar o evento!", error);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{eventoParaEditar ? 'Editar Evento' : 'Criar Novo Evento'}</h2>
      <label>Título:</label>
      <input type="text" value={titulo} onChange={e => setTitulo(e.target.value)} required />
      
      <label>Descrição:</label>
      <textarea value={descricao} onChange={e => setDescricao(e.target.value)}></textarea>
      
      <label>Data:</label>
      <input type="date" value={data} onChange={e => setData(e.target.value)} required />
      
      <label>Local:</label>
      <input type="text" value={local} onChange={e => setLocal(e.target.value)} required />
      
      <label>Capacidade:</label>
      <input type="number" value={capacidade} onChange={e => setCapacidade(e.target.value)} required />
      
      <button type="submit">{eventoParaEditar ? 'Salvar Edição' : 'Criar Evento'}</button>
    </form>
  );
}

export default FormularioEvento;