/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: '#000',
      white: '#fff',
      gray: {
        1: '#fafafa',
        2: '#f5f5f5',
        3: '#f0f0f0',
        4: '#eaeaea',
        5: '#cccccc',
        6: '#A9A9A9',
        7: '#999999',
        8: '#666666',
        9: '#3c3c3c',
        10: '#232323'
      },
      orange: {
        DEFAULT: '#ff6f32',
        1: '#fff7f0',
        2: '#ffe8d6',
        3: '#ffcead',
        4: '#ffb185',
        5: '#ff925c',
        6: '#ff6f32',
        7: '#d95221',
        8: '#b33712',
        9: '#8c2207',
        10: '#661404'
      },
      blue: {
        DEFAULT: '#1469f5',
        1: '#e6f4ff',
        2: '#b8dcff',
        3: '#8fc5ff',
        4: '#66abff',
        5: '#3d8eff',
        6: '#1469f5',
        7: '#064ccf',
        8: '#0035a8',
        9: '#002582',
        10: '#00175c'
      },
      red: {
        DEFAULT: '#ff3b30',
        1: '#fff3f0',
        2: '#ffdcd4',
        3: '#ffb7ab',
        4: '#ff9182',
        5: '#ff6759',
        6: '#ff3b30',
        7: '#d9211e',
        8: '#b31013',
        9: '#8c060c',
        10: '#66030b'
      },
      green: {
        DEFAULT: '#2dad69',
        1: '#dfede3',
        2: '#cae0d1',
        3: '#9dd4b1',
        4: '#73c795',
        5: '#4eba7d',
        6: '#2dad69',
        7: '#1c8752',
        8: '#10613b',
        9: '#063b24',
        10: '#02140d'
      },
      yellow: {
        DEFAULT: '#ffa623',
        1: '#fffbf0',
        2: '#fff0c7',
        3: '#ffe29e',
        4: '#ffd175',
        5: '#ffbe4d',
        6: '#ffa623',
        7: '#d98314',
        8: '#b36307',
        9: '#8c4600',
        10: '#663000'
      }
    }
  },
  plugins: []
};
