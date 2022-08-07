import { useSetRecoilState } from "recoil";
import { resultadoSorteioState } from "../atom";
import { realizarSorteio } from "../helpers/realizarSorteio";
import { useListaParticipantes } from "./useListaParticipantes"

export const useSorteador = () => {
  const participantes = useListaParticipantes();
  const setResultado = useSetRecoilState(resultadoSorteioState)

  return () => {
    
    const resultado = realizarSorteio(participantes);
    
    setResultado(resultado);
  }
}