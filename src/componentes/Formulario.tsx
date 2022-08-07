import React, { useState, useRef } from "react";
import { useAdicionarParticipante } from "../state/hook/useAdicionarParticipante";
import { useMensagemDeErro } from "../state/hook/useMensagemDeErro";

const Formulario = () => {
  const [nome, setNome] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  const adicionarNaLista = useAdicionarParticipante();
  const mensagemDeErro = useMensagemDeErro();

  const adicionarParticipante = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    adicionarNaLista(nome);
    setNome('');
    inputRef.current?.focus();
  }

  return (
    <form onSubmit={adicionarParticipante}>
      <input 
        ref={inputRef}
        type="text"
        placeholder="Insira os nomes dos participantes"
        value={nome}
        onChange={e => setNome(e.target.value)}
      >  
      </input>
      <button disabled={!nome}>Adicionar</button>
      {mensagemDeErro && <p role="alert">{mensagemDeErro}</p>}
    </form>
  )
}

export default Formulario;