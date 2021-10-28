import { PI, PI_4, PI_16, PI_32, PI_64 } from "./Constants";
import { MathJax } from "better-react-mathjax";

function onParameterChange(event, updateFn) {
	if (event.target.checkValidity()) {
		updateFn(parseFloat(event.target.value));
	}
}

const kreis = {
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
			bezeichnung: "Innen-Ø",
			symbol: "d",
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
				if (newValue > p1) {
					// alert("d > D nicht erlaubt");
					return;
				}
				onParameterChange(e, setP2);
				if (e.target.checkValidity()) {
					setP5((p1 - newValue) / 2);
				}
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
				p2,
				lengthUnitFactor,
				setFlaeche,
			}) {
				const flaeche = PI_4 * (p1 * p1 - p2 * p2);
				setFlaeche(flaeche);
				return flaeche / (lengthUnitFactor * lengthUnitFactor);
			},
			formelTex: "\\(A = \\frac{\\pi}{4} \\cdot (D^2 - d^2)\\)",
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
			formel: function calculate({ p1, p2, p6, lengthUnitFactor }) {
				return (
					(PI_4 * (p1 * p1 - p2 * p2) * p6) /
					Math.pow(lengthUnitFactor, 3)
				);
			},
			formelTex: "\\(V = \\frac{\\pi}{4} \\cdot (D^2 - d^2) \\cdot l\\)",
			unitHoch: "³",
			requires: ["p1", "p6"],
		},
		{
			bezeichnung: "Masse",
			symbol: "m",
			formel: function calculate({ p1, p2, p6, dichte }) {
				return PI_4 * (p1 * p1 - p2 * p2) * p6 * dichte * 1000;
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
				p2,
				lengthUnitFactor,
				setAxialesWiderstandsmoment,
			}) {
				const axialesWiderstandsmoment =
					(PI_32 * (Math.pow(p1, 4) - Math.pow(p2, 4))) / p1;
				setAxialesWiderstandsmoment(axialesWiderstandsmoment);
				return axialesWiderstandsmoment / Math.pow(lengthUnitFactor, 3);
			},
			formelTex: "\\(Wax = \\frac{\\pi \\cdot (D^4 - d^4)}{32 D}\\)",
			unitHoch: "³",
			requires: ["p1"],
		},
		{
			bezeichnung: "Axiales Trägheits&shy;moment",
			symbol: "Iax",
			formel: function calculate({
				p1,
				p2,
				lengthUnitFactor,
				setAxialesTraegheitsmoment,
			}) {
				const axialesTraegheitsmoment =
					PI_64 * (Math.pow(p1, 4) - Math.pow(p2, 4));
				setAxialesTraegheitsmoment(axialesTraegheitsmoment);
				return axialesTraegheitsmoment / Math.pow(lengthUnitFactor, 4);
			},
			formelTex: "\\(Iax = \\frac{\\pi \\cdot (D^4 - d^4)}{64}\\)",
			unitHoch: "⁴",
			requires: ["p1"],
		},
		{
			bezeichnung: "Trägheits&shy;radius",
			symbol: "i",
			formel: function calculate({ p1, p2, lengthUnitFactor }) {
				return (
					Math.sqrt(
						(PI_64 * (Math.pow(p1, 4) - Math.pow(p2, 4))) /
							(PI_4 * (p1 * p1 - p2 * p2))
					) / lengthUnitFactor
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
				p2,
				lengthUnitFactor,
				setPolaresWiderstandsmoment,
			}) {
				const polaresWiderstandsmoment =
					(PI_16 * (Math.pow(p1, 4) - Math.pow(p2, 4))) / p1;
				setPolaresWiderstandsmoment(polaresWiderstandsmoment);
				return polaresWiderstandsmoment / Math.pow(lengthUnitFactor, 3);
			},
			formelTex: "\\(Wp = \\frac{\\pi \\cdot (D^4 - d^4)}{16 D}\\)",
			unitHoch: "³",
			requires: ["p1"],
		},
		{
			bezeichnung: "Polares Trägheits&shy;moment",
			symbol: "Ip",
			formel: function calculate({
				p1,
				p2,
				lengthUnitFactor,
				setPolaresTraegheitsmoment,
			}) {
				const polaresTraegheitsmoment =
					PI_32 * (Math.pow(p1, 4) - Math.pow(p2, 4));
				setPolaresTraegheitsmoment(polaresTraegheitsmoment);
				return polaresTraegheitsmoment / Math.pow(lengthUnitFactor, 4);
			},
			formelTex: "\\(Ip = \\frac{\\pi \\cdot (D^4 - d^4)}{32}\\)",
			unitHoch: "⁴",
			requires: ["p1"],
		},
	],
};

const rechteck = {
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
				if (2 * newValue > p1 || 2 * newValue > p2) {
					return;
				}
				onParameterChange(e, setP5);
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
				p2,
				p5,
				lengthUnitFactor,
				setFlaeche,
			}) {
				const b = p1 - 2 * p5;
				const h = p2 - 2 * p5;
				const flaeche = p1 * p2 - b * h;
				setFlaeche(flaeche);
				return flaeche / (lengthUnitFactor * lengthUnitFactor);
			},
			formelTex: "\\(A = B \\cdot H - b \\cdot h\\)",
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
			formel: function calculate({ p1, p2, p5, p6, lengthUnitFactor }) {
				const b = p1 - 2 * p5;
				const h = p2 - 2 * p5;
				return ((p1 * p2 - b * h) * p6) / Math.pow(lengthUnitFactor, 3);
			},
			formelTex: "\\(V = (B \\cdot H - b \\cdot h) \\cdot l\\)",
			unitHoch: "³",
			requires: ["p1", "p2", "p6"],
		},
		{
			bezeichnung: "Masse",
			symbol: "m",
			formel: function calculate({ p1, p2, p5, p6, dichte }) {
				const b = p1 - 2 * p5;
				const h = p2 - 2 * p5;
				return (p1 * p2 - b * h) * p6 * dichte * 1000;
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
				p5,
				lengthUnitFactor,
				setAxialesWiderstandsmoment,
			}) {
				const b = p1 - 2 * p5;
				const h = p2 - 2 * p5;
				const axialesWiderstandsmoment =
					(p1 * Math.pow(p2, 3) - b * Math.pow(h, 3)) / (6 * p2);
				setAxialesWiderstandsmoment(axialesWiderstandsmoment);
				return axialesWiderstandsmoment / Math.pow(lengthUnitFactor, 3);
			},
			formelTex: "\\(Wx = \\frac{B \\cdot H^3 - b \\cdot h^3}{6 H}\\)",
			unitHoch: "³",
			requires: ["p1", "p2"],
		},
		{
			bezeichnung: "Axiales Trägheits&shy;moment",
			symbol: "Ix",
			formel: function calculate({
				p1,
				p2,
				p5,
				lengthUnitFactor,
				setAxialesTraegheitsmoment,
			}) {
				const b = p1 - 2 * p5;
				const h = p2 - 2 * p5;
				const axialesTraegheitsmoment =
					(p1 * Math.pow(p2, 3) - b * Math.pow(h, 3)) / 12;
				setAxialesTraegheitsmoment(axialesTraegheitsmoment);
				return axialesTraegheitsmoment / Math.pow(lengthUnitFactor, 4);
			},
			formelTex: "\\(Ix = \\frac{B \\cdot H^3 - b \\cdot h^3}{12}\\)",
			unitHoch: "⁴",
			requires: ["p1", "p2"],
		},
		{
			bezeichnung: "Axiales Widerstands&shy;moment",
			symbol: "Wy",
			formel: function calculate({ p1, p2, p5, lengthUnitFactor }) {
				const b = p1 - 2 * p5;
				const h = p2 - 2 * p5;
				return (
					(p2 * Math.pow(p1, 3) - h * Math.pow(b, 3)) /
					(6 * p1) /
					Math.pow(lengthUnitFactor, 3)
				);
			},
			formelTex: "\\(Wy = \\frac{H \\cdot B^3 - h \\cdot b^3}{6 B}\\)",
			unitHoch: "³",
			requires: ["p1", "p2"],
		},
		{
			bezeichnung: "Axiales Trägheits&shy;moment",
			symbol: "Iy",
			formel: function calculate({ p1, p2, p5, lengthUnitFactor }) {
				const b = p1 - 2 * p5;
				const h = p2 - 2 * p5;
				return (
					(p2 * Math.pow(p1, 3) - h * Math.pow(b, 3)) /
					12 /
					Math.pow(lengthUnitFactor, 4)
				);
			},
			formelTex: "\\(Iy = \\frac{H \\cdot B^3 - h \\cdot b^3}{12}\\)",
			unitHoch: "⁴",
			requires: ["p1", "p2"],
		},
	],
};

export const querschnitte = [kreis, rechteck].map((querschnitt) => {
	querschnitt.ausgabe = querschnitt.ausgabe.map((item) => {
		item.formelTexComponent = <MathJax>{item.formelTex}</MathJax>;
		return item;
	});
	return querschnitt;
});
