import { render, screen, fireEvent } from '@testing-library/react-native';
import { SearchBar } from './SearchBar';

jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
}));

describe('SearchBar Component', () => {
  it('should render with the correct placeholder', () => {
    const mockOnChangeText = jest.fn();
    render(<SearchBar value="" onChangeText={mockOnChangeText} />);

    expect(screen.getByPlaceholderText('Rechercher...')).toBeTruthy();
  });

  it('should display the current value', () => {
    const mockOnChangeText = jest.fn();
    render(<SearchBar value="Test search" onChangeText={mockOnChangeText} />);

    const input = screen.getByDisplayValue('Test search');
    expect(input).toBeTruthy();
  });

  it('should call onChangeText when text is entered', () => {
    const mockOnChangeText = jest.fn();
    render(<SearchBar value="" onChangeText={mockOnChangeText} />);

    const input = screen.getByPlaceholderText('Rechercher...');
    fireEvent.changeText(input, 'New text');

    expect(mockOnChangeText).toHaveBeenCalledWith('New text');
  });

  it('should have correct accessibility attributes', () => {
    const mockOnChangeText = jest.fn();
    render(<SearchBar value="" onChangeText={mockOnChangeText} />);

    const input = screen.getByLabelText('Rechercher un magasin');
    expect(input).toBeTruthy();
    expect(input.props.accessibilityRole).toBe('search');
    expect(input.props.accessibilityHint).toBe('Tapez le nom d\'un magasin pour filtrer la liste');
  });
});
