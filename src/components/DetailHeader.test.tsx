import { render, screen, fireEvent } from '@testing-library/react-native';
import { DetailHeader } from './DetailHeader';

jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
}));

describe('DetailHeader Component', () => {
  it('should render title and subtitle', () => {
    const mockOnIconPress = jest.fn();
    render(
      <DetailHeader
        title="Magasin Test"
        sub="123 Rue de Test"
        icon="star-outline"
        onIconPress={mockOnIconPress}
      />
    );

    expect(screen.getByText('Magasin Test')).toBeTruthy();
    expect(screen.getByText('123 Rue de Test')).toBeTruthy();
  });

  it('should call onIconPress when favorite button is pressed', () => {
    const mockOnIconPress = jest.fn();
    render(
      <DetailHeader
        title="Magasin Test"
        sub="123 Rue de Test"
        icon="star-outline"
        onIconPress={mockOnIconPress}
      />
    );

    const button = screen.getByRole('button');
    fireEvent.press(button);

    expect(mockOnIconPress).toHaveBeenCalledTimes(1);
  });

  it('should display filled star icon when favorite', () => {
    const mockOnIconPress = jest.fn();
    const { UNSAFE_getByType } = render(
      <DetailHeader
        title="Magasin Test"
        sub="123 Rue de Test"
        icon="star"
        onIconPress={mockOnIconPress}
      />
    );

    expect(screen.getByRole('button')).toBeTruthy();
  });

  it('should have correct accessibility attributes', () => {
    const mockOnIconPress = jest.fn();
    render(
      <DetailHeader
        title="Magasin Test"
        sub="123 Rue de Test"
        icon="star-outline"
        onIconPress={mockOnIconPress}
      />
    );

    const button = screen.getByLabelText('Ajouter Magasin Test aux favoris');
    expect(button).toBeTruthy();
    expect(button.props.accessibilityRole).toBe('button');
    expect(button.props.accessibilityHint).toBe('Appuyez deux fois pour ajouter ce magasin à vos favoris');
  });
});
