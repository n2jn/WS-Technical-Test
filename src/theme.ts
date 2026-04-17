export const theme = {
  colors: {
    // Primary colors
    primary: '#FF4D00',

    // Background colors
    background: '#F7F5F0',
    surface: 'white',

    // Text colors
    text: {
      primary: 'black',
      secondary: '#9A9590',
    },

    // Border colors
    border: {
      default: '#E8E4DC',
      divider: '#9A9590',
    },

    // Accent colors
    accent: {
      red: 'red',
      redLight: 'rgba(247, 0, 0, 0.04)',
    },

    // Gradient colors
    gradient: {
      start: 'rgba(247, 245, 240, 0)',
      end: 'rgba(247, 245, 240, 1)',
    },
  },

  spacing: {
    xs: 3,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
  },

  typography: {
    title: {
      fontSize: 32,
      fontWeight: '900' as const,
      lineHeight: 32,
    },
    titleItalic: {
      fontSize: 32,
      fontWeight: '900' as const,
      fontStyle: 'italic' as const,
      lineHeight: 32,
    },
    heading: {
      fontSize: 24,
      fontWeight: '900' as const,
    },
    body: {
      fontSize: 16,
      fontWeight: '500' as const,
      lineHeight: 16,
    },
    bodyBold: {
      fontSize: 16,
      fontWeight: '700' as const,
      lineHeight: 16,
    },
    label: {
      fontSize: 14,
      fontWeight: '700' as const,
    },
    caption: {
      fontSize: 12,
      fontWeight: '500' as const,
    },
    captionSmall: {
      fontSize: 12,
      fontWeight: '500' as const,
      lineHeight: 12,
    },
  },

  borderRadius: {
    sm: 5,
    md: 8,
    lg: 24,
  },

  shadows: {
    card: {
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.17,
      shadowRadius: 3.05,
      elevation: 4,
    },
    search: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.06,
      shadowRadius: 12,
      elevation: 3,
    },
  },

  map: {
    zoom: {
      latitudeDelta: 0.01,
      longitudeDelta: 0.0421,
    },
  },

  layout: {
    storeItemHeight: 200,
    mapHeight: 130,
    detailMapHeight: 300,
  },
} as const;

export type Theme = typeof theme;
