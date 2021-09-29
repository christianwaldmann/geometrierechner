module.exports = {
	purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			height: {
				66: "264px",
				94: "376px",
				192: "768px",
				200: "800px",
				220: "880px",
				230: "920px",
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
