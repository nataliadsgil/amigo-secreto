import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { RecoilRoot } from 'recoil';
import { useListaParticipantes } from '../state/hook/useListaParticipantes';
import Rodape from './Rodape';


jest.mock('../state/hook/useListaParticipantes', () => {
  return {
    useListaParticipantes: jest.fn()
  }
})

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    useNavigate: () => mockNavigate
  }
});

const mockSorteio = jest.fn();

jest.mock('../state/hook/useSorteador', () => {
  return {
    useSorteador: () => mockSorteio
  }
});

describe('<Rodape />', () => {
  describe('Não existem participantes suficientes', () => {
    beforeEach(() => {
      (useListaParticipantes as jest.Mock).mockReturnValue([]);
    });

    test('Botão deve estar desabilitado', () => {
      render(
      <RecoilRoot>
        <Rodape/>
      </RecoilRoot>
      );

      const botao = screen.getByRole('button');

      expect(botao).toBeDisabled();
    })
  });

  describe('Existem participantes suficientes', () => {

    beforeEach(() => {
      const participantes = ['Maria', 'João', 'José'];
      (useListaParticipantes as jest.Mock).mockReturnValue(participantes);
    });
    
    test('Botão deve estar habilitado', () => {
      render(
        <RecoilRoot>
          <Rodape/>
        </RecoilRoot>
      );
  
      const botao = screen.getByRole('button');
  
      expect(botao).not.toBeDisabled();
    });

    test('Redirecionar para /sorteio após clique no botão', () => {
      render(
        <RecoilRoot>
          <Rodape/>
        </RecoilRoot>
      );
  
      const botao = screen.getByRole('button');
      fireEvent.click(botao);
      expect(mockNavigate).toHaveBeenCalledTimes(1);
      expect(mockNavigate).toHaveBeenCalledWith('/sorteio');
      expect(mockSorteio).toHaveBeenCalledTimes(1);
    });
  });
});