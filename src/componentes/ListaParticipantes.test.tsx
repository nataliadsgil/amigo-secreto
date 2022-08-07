import { render, screen } from '@testing-library/react';
import React from 'react';
import { RecoilRoot } from 'recoil';
import { useListaParticipantes } from '../state/hook/useListaParticipantes';
import ListaParticipantes from './ListaParticipantes';

jest.mock('../state/hook/useListaParticipantes', () => {
  return {
    useListaParticipantes: jest.fn()
  }
})

describe('<ListaParticipantes />', () => {
  describe('Lista vazia', () => {
    beforeEach(() => {
      (useListaParticipantes as jest.Mock).mockReturnValue([]);
    });

    test('Não mostrar elementos quando não houver participantes', () => {
      render(
        <RecoilRoot>
          <ListaParticipantes />
        </RecoilRoot>
      );
    
      const itens = screen.queryAllByRole('listitem');
    
      expect(itens).toHaveLength(0);
    });
  });

  describe('Lista com elementos', () => {

    beforeEach(() => {
      const participantes = ['Maria', 'João', 'José'];
      (useListaParticipantes as jest.Mock).mockReturnValue(participantes);
    });
    test('Mostrar 3 elementos quando houver 3 participantes', () => {

      render(
        <RecoilRoot>
          <ListaParticipantes />
        </RecoilRoot>
      );
    
      const itens = screen.queryAllByRole('listitem');
    
      expect(itens).toHaveLength(3);
    });
  });
});