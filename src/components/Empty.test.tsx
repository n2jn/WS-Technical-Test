import { render, screen } from '@testing-library/react-native';
import { Empty } from './Empty';

jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
}));

describe('Empty Component', () => {
  it('should render the title text', () => {
    render(<Empty title="Test Title" sub="Test Subtitle" />);

    expect(screen.getByText('Test Title')).toBeTruthy();
  });

  it('should render the subtitle text', () => {
    render(<Empty title="Test Title" sub="Test Subtitle" />);

    expect(screen.getByText('Test Subtitle')).toBeTruthy();
  });

  it('should render with empty state message', () => {
    render(<Empty title="Aucun résultat" sub="Essayez une autre recherche" />);

    expect(screen.getByText('Aucun résultat')).toBeTruthy();
    expect(screen.getByText('Essayez une autre recherche')).toBeTruthy();
  });

  it('should render with error state message', () => {
    render(<Empty title="Erreur" sub="Une erreur est survenue" />);

    expect(screen.getByText('Erreur')).toBeTruthy();
    expect(screen.getByText('Une erreur est survenue')).toBeTruthy();
  });
});
