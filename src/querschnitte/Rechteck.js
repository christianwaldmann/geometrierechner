import { onParameterChange } from "./common.js";

export const rechteck = {
	name: "Rechteck",
	svg_src: "assets/rechteck.svg",
	png_src: "assets/rechteck.png",
	enableKraftInZ: true,
	enableKraftInY: true,
	enableDrehmoment: false,
	parameters: [
		{
			intern: "p1",
			bezeichnung: "Breite",
			symbol: "B",
			onChange: function updateOtherParameters(
				e,
				p1,
				p2,
				p3,
				p4,
				p5,
				p6,
				setP1,
				setP2,
				setP3,
				setP4,
				setP5,
				setP6
			) {
				const newValue = parseFloat(e.target.value);
				if (newValue < 2 * p5) {
					// alert("b > B nicht erlaubt");
					return;
				}
				onParameterChange(e, setP1);
			},
		},
		{
			intern: "p2",
			bezeichnung: "Höhe",
			symbol: "H",
			onChange: function updateOtherParameters(
				e,
				p1,
				p2,
				p3,
				p4,
				p5,
				p6,
				setP1,
				setP2,
				setP3,
				setP4,
				setP5,
				setP6
			) {
				const newValue = parseFloat(e.target.value);
				if (newValue < 2 * p5) {
					// alert("h > H nicht erlaubt");
					return;
				}
				onParameterChange(e, setP2);
			},
		},
		{
			intern: "p3",
			skip: true,
		},
		{
			intern: "p4",
			skip: true,
		},
		{
			intern: "p5",
			skip: true,
		},
		{
			intern: "p6",
			bezeichnung: "Länge",
			symbol: "l",
			onChange: function updateOtherParameters(
				e,
				p1,
				p2,
				p3,
				p4,
				p5,
				p6,
				setP1,
				setP2,
				setP3,
				setP4,
				setP5,
				setP6
			) {
				onParameterChange(e, setP6);
			},
		},
	],
	ausgabe: [
		{
			bezeichnung: "Fläche",
			symbol: "A",
			formel: function calculate({
				p1,
				p2,
				lengthUnitFactor,
				setFlaeche,
			}) {
				const flaeche = p1 * p2;
				setFlaeche(flaeche);
				return flaeche / (lengthUnitFactor * lengthUnitFactor);
			},
			formelTex: "\\(A = B \\cdot H\\)",
			unitHoch: "²",
			requires: ["p1", "p2"],
		},
		{
			bezeichnung: "Umfang",
			symbol: "U",
			formel: function calculate({ p1, p2, lengthUnitFactor }) {
				return (2 * p1 + 2 * p2) / lengthUnitFactor;
			},
			formelTex: "\\(U = 2 B + 2 H\\)",
			unitHoch: "",
			requires: ["p1", "p2"],
		},
		{
			bezeichnung: "Volumen",
			symbol: "V",
			formel: function calculate({ p1, p2, p6, lengthUnitFactor }) {
				return (p1 * p2 * p6) / Math.pow(lengthUnitFactor, 3);
			},
			formelTex: "\\(V = (B \\cdot H) \\cdot l\\)",
			unitHoch: "³",
			requires: ["p1", "p2", "p6"],
		},
		{
			bezeichnung: "Masse",
			symbol: "m",
			formel: function calculate({ p1, p2, p6, dichte }) {
				return p1 * p2 * p6 * dichte * 1000;
			},
			formelTex: "\\(m = V \\cdot ρ\\)",
			unitHoch: "",
			isNotLengthUnit: true,
			unit: "kg",
			requires: ["p1", "p2", "p6", "dichte"],
		},
		{
			bezeichnung: "Eckenmaße (Diagonale)",
			symbol: "e",
			formel: function calculate({ p1, p2, lengthUnitFactor }) {
				return (
					Math.sqrt(Math.pow(p1, 2) + Math.pow(p2, 2)) /
					lengthUnitFactor
				);
			},
			formelTex: "\\(e = \\sqrt{B^2 + H^2}\\)",
			unitHoch: "",
			requires: ["p1", "p2"],
		},
		{
			bezeichnung: "Axiales Widerstands&shy;moment",
			symbol: "Wx",
			formel: function calculate({
				p1,
				p2,
				lengthUnitFactor,
				setAxialesWiderstandsmoment,
			}) {
				const axialesWiderstandsmoment =
					(p1 * Math.pow(p2, 3)) / (6 * p2);
				setAxialesWiderstandsmoment(axialesWiderstandsmoment);
				return axialesWiderstandsmoment / Math.pow(lengthUnitFactor, 3);
			},
			formelTex: "\\(Wx = \\frac{B \\cdot H^3}{6 H}\\)",
			unitHoch: "³",
			requires: ["p1", "p2"],
		},
		{
			bezeichnung: "Axiales Trägheits&shy;moment",
			symbol: "Ix",
			formel: function calculate({
				p1,
				p2,
				lengthUnitFactor,
				setAxialesTraegheitsmoment,
			}) {
				const axialesTraegheitsmoment = (p1 * Math.pow(p2, 3)) / 12;
				setAxialesTraegheitsmoment(axialesTraegheitsmoment);
				return axialesTraegheitsmoment / Math.pow(lengthUnitFactor, 4);
			},
			formelTex: "\\(Ix = \\frac{B \\cdot H^3}{12}\\)",
			unitHoch: "⁴",
			requires: ["p1", "p2"],
		},
		{
			bezeichnung: "Axiales Widerstands&shy;moment",
			symbol: "Wy",
			formel: function calculate({ p1, p2, lengthUnitFactor }) {
				return (
					(p2 * Math.pow(p1, 3)) /
					(6 * p1) /
					Math.pow(lengthUnitFactor, 3)
				);
			},
			formelTex: "\\(Wy = \\frac{H \\cdot B^3}{6 B}\\)",
			unitHoch: "³",
			requires: ["p1", "p2"],
		},
		{
			bezeichnung: "Axiales Trägheits&shy;moment",
			symbol: "Iy",
			formel: function calculate({ p1, p2, lengthUnitFactor }) {
				return (
					(p2 * Math.pow(p1, 3)) / 12 / Math.pow(lengthUnitFactor, 4)
				);
			},
			formelTex: "\\(Iy = \\frac{H \\cdot B^3}{12}\\)",
			unitHoch: "⁴",
			requires: ["p1", "p2"],
		},
	],
};
