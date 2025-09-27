/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				maroon: {
					50: '#f9f2f2',
					100: '#f3e5e5',
					200: '#e1bcbc',
					300: '#ce9393',
					400: '#a84a4a',
					500: '#7a1f1f', // primary maroon
					600: '#641919',
					700: '#4e1313', // header background
					800: '#3b0f0f',
					900: '#2a0b0b'
				},
				gold: {
					50: '#fff9e6',
					100: '#fff2cc',
					200: '#ffe699',
					300: '#ffdb66',
					400: '#ffd142',
					500: '#e8b84a', // warm gold
					600: '#c79c39',
					700: '#a6812b',
					800: '#856621',
					900: '#6b511a'
				}
			},
			fontFamily: {
				display: ['"Playfair Display"', 'ui-serif', 'Georgia', 'serif'],
				body: ['Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'sans-serif']
			},
		}
	},
	plugins: []
};
