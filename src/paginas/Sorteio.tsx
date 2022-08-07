import { useState } from "react";
import { useListaParticipantes } from "../state/hook/useListaParticipantes";
import { useResultadoSorteio } from "../state/hook/useResultadoSorteio";
import { useSorteador } from "../state/hook/useSorteador";

const Sorteio = () => {
  const participantes = useListaParticipantes();

  const [participanteDaVez, setParticipanteDaVez] = useState<string>('');
  const [amigoSecreto, setAmigoSecreto] = useState<string>('');

  const resultadoSorteio = useResultadoSorteio();

  const sortear = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if(resultadoSorteio.has(participanteDaVez))
      setAmigoSecreto(resultadoSorteio.get(participanteDaVez)!);
  }

  return (
    <section>
      <form onSubmit={sortear}>
        <select 
          required 
          name="participanteDaVez"
          id="participanteDaVez"
          placeholder="Selecione o seu nome"
          value={participanteDaVez}
          onChange={e => setParticipanteDaVez(e.target.value)}
        >
          <option>Selecione o nome do participante</option>
          {participantes.map(participante => <option key={participante}>{participante}</option>)}
        </select>
        <button>Sortear</button>
      </form>
      {amigoSecreto && <p role="alert">{amigoSecreto}</p>}
    </section>
  );
}

export default Sorteio;