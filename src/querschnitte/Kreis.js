import { PI, PI_4, PI_16, PI_32, PI_64 } from "../Constants";
import { onParameterChange } from "./common.js";

export const kreis = {
	name: "Kreis",
	svg_src: "assets/kreis.svg",
	png_src: "assets/kreis.png",
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
				if (e.target.checkValidity()) {
					setP5((newValue - p2) / 2);
				}
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
			formel: function calculate({ p1, lengthUnitFactor, setFlaeche }) {
				const flaeche = PI_4 * p1 * p1;
				setFlaeche(flaeche);
				return flaeche / (lengthUnitFactor * lengthUnitFactor);
			},
			formelTex: "\\(A = \\frac{\\pi}{4} \\cdot D^2\\)",
			unitHoch: "²",
			requires: ["p1"],
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
			formel: function calculate({ p1, p6, lengthUnitFactor }) {
				return (PI_4 * p1 * p1 * p6) / Math.pow(lengthUnitFactor, 3);
			},
			formelTex: "\\(V = \\frac{\\pi}{4} \\cdot D^2 \\cdot l\\)",
			unitHoch: "³",
			requires: ["p1", "p6"],
		},
		{
			bezeichnung: "Masse",
			symbol: "m",
			formel: function calculate({ p1, p6, dichte }) {
				return PI_4 * (p1 * p1) * p6 * dichte * 1000;
			},
			formelTex: "\\(m = V \\cdot \\rho\\)",
			unitHoch: "",
			isNotLengthUnit: true,
			unit: "kg",
			requires: ["p1", "p6", "dichte"],
		},
		{
			bezeichnung: "Axiales Widerstands&shy;moment",
			symbol: "Wax",
			formel: function calculate({
				p1,
				lengthUnitFactor,
				setAxialesWiderstandsmoment,
			}) {
				const axialesWiderstandsmoment = (PI_32 * Math.pow(p1, 4)) / p1;
				setAxialesWiderstandsmoment(axialesWiderstandsmoment);
				return axialesWiderstandsmoment / Math.pow(lengthUnitFactor, 3);
			},
			formelTex: "\\(Wax = \\frac{\\pi \\cdot D^4}{32 D}\\)",
			unitHoch: "³",
			requires: ["p1"],
		},
		{
			bezeichnung: "Axiales Trägheits&shy;moment",
			symbol: "Iax",
			formel: function calculate({
				p1,
				lengthUnitFactor,
				setAxialesTraegheitsmoment,
			}) {
				const axialesTraegheitsmoment = PI_64 * Math.pow(p1, 4);
				setAxialesTraegheitsmoment(axialesTraegheitsmoment);
				return axialesTraegheitsmoment / Math.pow(lengthUnitFactor, 4);
			},
			formelTex: "\\(Iax = \\frac{\\pi \\cdot D^4}{64}\\)",
			unitHoch: "⁴",
			requires: ["p1"],
		},
		{
			bezeichnung: "Trägheits&shy;radius",
			symbol: "i",
			formel: function calculate({ p1, lengthUnitFactor }) {
				return (
					Math.sqrt((PI_64 * Math.pow(p1, 4)) / (PI_4 * (p1 * p1))) /
					lengthUnitFactor
				);
			},
			formelTex: "\\(i = \\sqrt{\\frac{Iax}{A}}\\)",
			unitHoch: "",
			requires: ["p1"],
		},
		{
			bezeichnung: "Polares Widerstands&shy;moment",
			symbol: "Wp",
			formel: function calculate({
				p1,
				lengthUnitFactor,
				setPolaresWiderstandsmoment,
			}) {
				const polaresWiderstandsmoment = (PI_16 * Math.pow(p1, 4)) / p1;
				setPolaresWiderstandsmoment(polaresWiderstandsmoment);
				return polaresWiderstandsmoment / Math.pow(lengthUnitFactor, 3);
			},
			formelTex: "\\(Wp = \\frac{\\pi \\cdot D^4}{16 D}\\)",
			unitHoch: "³",
			requires: ["p1"],
		},
		{
			bezeichnung: "Polares Trägheits&shy;moment",
			symbol: "Ip",
			formel: function calculate({
				p1,
				lengthUnitFactor,
				setPolaresTraegheitsmoment,
			}) {
				const polaresTraegheitsmoment = PI_32 * Math.pow(p1, 4);
				setPolaresTraegheitsmoment(polaresTraegheitsmoment);
				return polaresTraegheitsmoment / Math.pow(lengthUnitFactor, 4);
			},
			formelTex: "\\(Ip = \\frac{\\pi \\cdot D^4}{32}\\)",
			unitHoch: "⁴",
			requires: ["p1"],
		},
	],
};
