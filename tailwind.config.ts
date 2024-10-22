import aspectRatio from '@tailwindcss/aspect-ratio';
import scrollbar from 'tailwind-scrollbar';
import containerQueries from '@tailwindcss/container-queries';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				main: {
					100: '#0076BAFF',
					80: '#0076BACC',
					60: '#0076BA99',
					40: '#0076BA66',
					20: '#0076BA33',
					5: '#0076BA0D',
				},
				'dark-main': {
					100: '#002940FF',
					80: '#002940CC',
					60: '#00294099',
					40: '#00294066',
					20: '#00294033',
					5: '#0029400D',
				},
				foreground: {
					100: '#FFFFFDFF',
					80: '#FFFFFDCC',
					60: '#FFFFFD99',
					40: '#FFFFFD66',
					20: '#FFFFFD33',
					5: '#FFFFFD0D',
				},
				secondary: {
					100: '#4BC7B7FF',
					80: '#4BC7B7CC',
					60: '#4BC7B799',
					40: '#4BC7B766',
					20: '#4BC7B733',
					5: '#4BC7B70D',
				},
				soft: {
					'100': '#A1ACBD',
				},
				error: {
					100: '#B91C1CFF',
					80: '#B91C1CCC',
					60: '#B91C1C99',
					40: '#B91C1C66',
					20: '#B91C1C33',
					5: '#B91C1C0D',
				},
			},
		},
	},

	plugins: [typography, containerQueries, aspectRatio, scrollbar],
} as Config;
