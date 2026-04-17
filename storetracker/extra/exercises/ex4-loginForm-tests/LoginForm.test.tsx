import React from 'react';
import { waitFor,  fireEvent, renderAsync } from "@testing-library/react-native";
import { LoginForm } from "./LoginForm";

const mockOnSubmit = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

describe('LoginForm', () => {

  describe('champs vides', () => {
    it('affiche une erreur si email et password sont vides', async () => {
      const { getByText, getByTestId } = await renderAsync(<LoginForm onSubmit={mockOnSubmit} />);

      fireEvent.press(getByTestId('submit-btn'))

      await waitFor(() => {
        expect(getByText('Champs obligatoires')).toBeTruthy();
      });
    });
    it('affiche une erreur si email est vide', async () => {
      const { getByText, getByTestId } = await renderAsync(<LoginForm onSubmit={mockOnSubmit} />);

      fireEvent.changeText(getByTestId('password-input'), 'password');
      fireEvent.press(getByTestId('submit-btn'))

      await waitFor(() => {
        expect(getByText('Champs obligatoires')).toBeTruthy();
      });
    });
    it('affiche une erreur si password est vide', async () => {
      const { getByText, getByTestId } = await renderAsync(<LoginForm onSubmit={mockOnSubmit} />);

      fireEvent.changeText(getByTestId('email-input'), 'nicolas.test@gmail.com');
      fireEvent.press(getByTestId('submit-btn'))

      await waitFor(() => {
        expect(getByText('Champs obligatoires')).toBeTruthy();
      });
    });
  });

  describe('soumission réussie', () => {
    it('soumission avec les bonnes données et ne montre pas d\'erreur', async () => {
      const { getByTestId, queryByTestId } = await renderAsync(<LoginForm onSubmit={mockOnSubmit} />);

      fireEvent.changeText(getByTestId('email-input'), 'nicolas.test@gmail.com');
      fireEvent.changeText(getByTestId('password-input'), 'password');
      fireEvent.press(getByTestId('submit-btn'));

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith('nicolas.test@gmail.com', 'password');
      });

      expect(queryByTestId('error-msg')).toBeNull();
    });

    describe('Erreur Api', () => {
      it('onSubmit retourne une erreur', async () => {
        mockOnSubmit.mockRejectedValueOnce(new Error('error'));

        const { getByTestId, getByText } = await renderAsync(<LoginForm onSubmit={mockOnSubmit} />);
        fireEvent.changeText(getByTestId('email-input'), 'nicolas.test@gmail.com');
        fireEvent.changeText(getByTestId('password-input'), 'password');
        fireEvent.press(getByTestId('submit-btn'));

        await waitFor(() => {
          expect(getByText('Identifiants incorrects')).toBeTruthy();
        });
      })
    })

    describe('État Loading', () => {
      it('loading lors d\'une soumission reussie', async () => {
        const { getByTestId, queryByTestId } = await renderAsync(<LoginForm onSubmit={mockOnSubmit} />);
        fireEvent.changeText(getByTestId('email-input'), 'nicolas.test@gmail.com');
        fireEvent.changeText(getByTestId('password-input'), 'password');
        fireEvent.press(getByTestId('submit-btn'));
        expect(getByTestId('loader')).toBeTruthy();

        await waitFor(() => {
          expect(queryByTestId('loader')).toBeNull();
        });
      })
      it('loading lors d\'une soumission échoué', async () => {
        mockOnSubmit.mockRejectedValueOnce(new Error('error'));

        const { getByTestId, queryByTestId } = await renderAsync(<LoginForm onSubmit={mockOnSubmit} />);
        fireEvent.changeText(getByTestId('email-input'), 'nicolas.test@gmail.com');
        fireEvent.changeText(getByTestId('password-input'), 'password');
        fireEvent.press(getByTestId('submit-btn'));
        expect(getByTestId('loader')).toBeTruthy();

        await waitFor(() => {
          expect(queryByTestId('loader')).toBeNull();
        });
      })
    })
  });
});