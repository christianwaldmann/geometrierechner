import { PI, PI_4, PI_16, PI_32, PI_64 } from "../Constants";
import { onParameterChange } from "./common.js";

export const kreisHohl = {
	name: "Kreis (hohl)",
	svg_src: "assets/kreisHohl.svg",
	png_src: "assets/kreisHohl.png",
	enableKraftInZ: true,
	enableKraftInY: true,
	enableDrehmoment: true,
	parameters: [
		{
			intern: "p1",
			bezeichnung: "Außen-Ø",
			symbol: "D",
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
				if (newValue < p2) {
					// alert("d > D nicht erlaubt");
					return;
				}
				onParameterChange(e, setP1);
			},
		},
		{
			intern: "p2",
			skip: true,
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
			bezeichnung: "Wandstärke",
			symbol: "s",
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
				if (newValue * 2 > p1) {
					// alert("2 * s > D nicht erlaubt");
					return;
				}
				onParameterChange(e, setP5);
				if (e.target.checkValidity()) {
					setP2(p1 - newValue * 2);
				}
			},
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
				p5,
				lengthUnitFactor,
				setFlaeche,
			}) {
				const d_i = p1 - 2 * p5;
				const flaeche = PI_4 * (p1 * p1 - d_i * d_i);
				setFlaeche(flaeche);
				return flaeche / (lengthUnitFactor * lengthUnitFactor);
			},
			formelTex: "\\(A = \\frac{\\pi}{4} \\cdot (D^2 - d^2)\\)",
			unitHoch: "²",
			requires: ["p1", "p5"],
		},
		{
			bezeichnung: "Umfang",
			symbol: "U",
			formel: function calculate({ p1, lengthUnitFactor }) {
				return (PI * p1) / lengthUnitFactor;
			},
			formelTex: "\\(U = \\pi \\cdot D\\)",
			unitHoch: "",
			requires: ["p1"],
		},
		{
			bezeichnung: "Volumen",
			symbol: "V",
			formel: function calculate({ p1, p5, p6, lengthUnitFactor }) {
				const d_i = p1 - 2 * p5;
				return (
					(PI_4 * (p1 * p1 - d_i * d_i) * p6) /
					Math.pow(lengthUnitFactor, 3)
				);
			},
			formelTex: "\\(V = \\frac{\\pi}{4} \\cdot (D^2 - d^2) \\cdot l\\)",
			unitHoch: "³",
			requires: ["p1", "p5", "p6"],
		},
		{
			bezeichnung: "Masse",
			symbol: "m",
			formel: function calculate({ p1, p5, p6, dichte }) {
				const d_i = p1 - 2 * p5;
				return PI_4 * (p1 * p1 - d_i * d_i) * p6 * dichte * 1000;
			},
			formelTex: "\\(m = V \\cdot \\rho\\)",
			unitHoch: "",
			isNotLengthUnit: true,
			unit: "kg",
			requires: ["p1", "p5", "p6", "dichte"],
		},
		{
			bezeichnung: "Axiales Widerstands&shy;moment",
			symbol: "Wax",
			formel: function calculate({
				p1,
				p5,
				lengthUnitFactor,
				setAxialesWiderstandsmoment,
			}) {
				const d_i = p1 - 2 * p5;
				const axialesWiderstandsmoment =
					(PI_32 * (Math.pow(p1, 4) - Math.pow(d_i, 4))) / p1;
				setAxialesWiderstandsmoment(axialesWiderstandsmoment);
				return axialesWiderstandsmoment / Math.pow(lengthUnitFactor, 3);
			},
			formelTex: "\\(Wax = \\frac{\\pi \\cdot (D^4 - d^4)}{32 D}\\)",
			unitHoch: "³",
			requires: ["p1", "p5"],
		},
		{
			bezeichnung: "Axiales Trägheits&shy;moment",
			symbol: "Iax",
			formel: function calculate({
				p1,
				p5,
				lengthUnitFactor,
				setAxialesTraegheitsmoment,
			}) {
				const d_i = p1 - 2 * p5;
				const axialesTraegheitsmoment =
					PI_64 * (Math.pow(p1, 4) - Math.pow(d_i, 4));
				setAxialesTraegheitsmoment(axialesTraegheitsmoment);
				return axialesTraegheitsmoment / Math.pow(lengthUnitFactor, 4);
			},
			formelTex: "\\(Iax = \\frac{\\pi \\cdot (D^4 - d^4)}{64}\\)",
			unitHoch: "⁴",
			requires: ["p1", "p5"],
		},
		{
			bezeichnung: "Trägheits&shy;radius",
			symbol: "i",
			formel: function calculate({ p1, p5, lengthUnitFactor }) {
				const d_i = p1 - 2 * p5;
				return (
					Math.sqrt(
						(PI_64 * (Math.pow(p1, 4) - Math.pow(d_i, 4))) /
							(PI_4 * (p1 * p1 - d_i * d_i))
					) / lengthUnitFactor
				);
			},
			formelTex: "\\(i = \\sqrt{\\frac{Iax}{A}}\\)",
			unitHoch: "",
			requires: ["p1", "p5"],
		},
		{
			bezeichnung: "Polares Widerstands&shy;moment",
			symbol: "Wp",
			formel: function calculate({
				p1,
				p5,
				lengthUnitFactor,
				setPolaresWiderstandsmoment,
			}) {
				const d_i = p1 - 2 * p5;
				const polaresWiderstandsmoment =
					(PI_16 * (Math.pow(p1, 4) - Math.pow(d_i, 4))) / p1;
				setPolaresWiderstandsmoment(polaresWiderstandsmoment);
				return polaresWiderstandsmoment / Math.pow(lengthUnitFactor, 3);
			},
			formelTex: "\\(Wp = \\frac{\\pi \\cdot (D^4 - d^4)}{16 D}\\)",
			unitHoch: "³",
			requires: ["p1", "p5"],
		},
		{
			bezeichnung: "Polares Trägheits&shy;moment",
			symbol: "Ip",
			formel: function calculate({
				p1,
				p5,
				lengthUnitFactor,
				setPolaresTraegheitsmoment,
			}) {
				const d_i = p1 - 2 * p5;
				const polaresTraegheitsmoment =
					PI_32 * (Math.pow(p1, 4) - Math.pow(d_i, 4));
				setPolaresTraegheitsmoment(polaresTraegheitsmoment);
				return polaresTraegheitsmoment / Math.pow(lengthUnitFactor, 4);
			},
			formelTex: "\\(Ip = \\frac{\\pi \\cdot (D^4 - d^4)}{32}\\)",
			unitHoch: "⁴",
			requires: ["p1", "p5"],
		},
	],
};
