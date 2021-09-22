import { PI, PI_4, PI_16, PI_32, PI_64, FACTOR_RAD_TO_DEG } from "./Constants";
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
			formel: function calculate(
				p1,
				p2,
				p3,
				p4,
				p5,
				p6,
				lengthUnitAusgabe
			) {
				return (
					(PI_4 * (p1 * p1 - p2 * p2)) /
					(lengthUnitAusgabe * lengthUnitAusgabe)
				);
			},
			formelTex: "\\(A = \\frac{\\pi}{4} \\cdot (D^2 - d^2)\\)",
			unitHoch: "²",
			requires: ["p1"],
		},
		{
			bezeichnung: "Umfang",
			symbol: "U",
			formel: function calculate(
				p1,
				p2,
				p3,
				p4,
				p5,
				p6,
				lengthUnitAusgabe
			) {
				return (PI * p1) / lengthUnitAusgabe;
			},
			formelTex: "\\(U = \\pi \\cdot D\\)",
			unitHoch: "",
			requires: ["p1"],
		},
		{
			bezeichnung: "Volumen",
			symbol: "V",
			formel: function calculate(
				p1,
				p2,
				p3,
				p4,
				p5,
				p6,
				lengthUnitAusgabe
			) {
				return (
					(PI_4 * (p1 * p1 - p2 * p2) * p6) /
					Math.pow(lengthUnitAusgabe, 3)
				);
			},
			formelTex: "\\(V = \\frac{\\pi}{4} \\cdot (D^2 - d^2) \\cdot l\\)",
			unitHoch: "³",
			requires: ["p1", "p6"],
		},
		{
			bezeichnung: "Masse",
			symbol: "m",
			formel: function calculate(
				p1,
				p2,
				p3,
				p4,
				p5,
				p6,
				lengthUnitAusgabe,
				dichte,
				emodul,
				gmodul,
				kraftInZ,
				kraftInY,
				drehmoment
			) {
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
			formel: function calculate(
				p1,
				p2,
				p3,
				p4,
				p5,
				p6,
				lengthUnitAusgabe
			) {
				return (
					(PI_32 * (Math.pow(p1, 4) - Math.pow(p2, 4))) /
					p1 /
					Math.pow(lengthUnitAusgabe, 3)
				);
			},
			formelTex: "\\(Wax = \\frac{\\pi \\cdot (D^4 - d^4)}{32 D}\\)",
			unitHoch: "³",
			requires: ["p1"],
		},
		{
			bezeichnung: "Axiales Trägheits&shy;moment",
			symbol: "Iax",
			formel: function calculate(
				p1,
				p2,
				p3,
				p4,
				p5,
				p6,
				lengthUnitAusgabe
			) {
				return (
					(PI_64 * (Math.pow(p1, 4) - Math.pow(p2, 4))) /
					Math.pow(lengthUnitAusgabe, 4)
				);
			},
			formelTex: "\\(Iax = \\frac{\\pi \\cdot (D^4 - d^4)}{64}\\)",
			unitHoch: "⁴",
			requires: ["p1"],
		},
		{
			bezeichnung: "Trägheits&shy;radius",
			symbol: "i",
			formel: function calculate(
				p1,
				p2,
				p3,
				p4,
				p5,
				p6,
				lengthUnitAusgabe
			) {
				return (
					Math.sqrt(
						(PI_64 * (Math.pow(p1, 4) - Math.pow(p2, 4))) /
							(PI_4 * (p1 * p1 - p2 * p2))
					) / lengthUnitAusgabe
				);
			},
			formelTex: "\\(i = \\sqrt{\\frac{Iax}{A}}\\)",
			unitHoch: "",
			requires: ["p1"],
		},
		{
			bezeichnung: "Polares Widerstands&shy;moment",
			symbol: "Wp",
			formel: function calculate(
				p1,
				p2,
				p3,
				p4,
				p5,
				p6,
				lengthUnitAusgabe
			) {
				return (
					(PI_16 * (Math.pow(p1, 4) - Math.pow(p2, 4))) /
					p1 /
					Math.pow(lengthUnitAusgabe, 3)
				);
			},
			formelTex: "\\(Wp = \\frac{\\pi \\cdot (D^4 - d^4)}{16 D}\\)",
			unitHoch: "³",
			requires: ["p1"],
		},
		{
			bezeichnung: "Polares Trägheits&shy;moment",
			symbol: "Ip",
			formel: function calculate(
				p1,
				p2,
				p3,
				p4,
				p5,
				p6,
				lengthUnitAusgabe
			) {
				return (
					(PI_32 * (Math.pow(p1, 4) - Math.pow(p2, 4))) /
					Math.pow(lengthUnitAusgabe, 4)
				);
			},
			formelTex: "\\(Ip = \\frac{\\pi \\cdot (D^4 - d^4)}{32}\\)",
			unitHoch: "⁴",
			requires: ["p1"],
		},
		{
			bezeichnung: "Biege&shy;spannung",
			symbol: "σ Bx",
			formel: function calculate(
				p1,
				p2,
				p3,
				p4,
				p5,
				p6,
				lengthUnitAusgabe,
				dichte,
				emodul,
				gmodul,
				kraftInZ,
				kraftInY
			) {
				return (
					(kraftInY * p6) /
					((PI_32 * (Math.pow(p1, 4) - Math.pow(p2, 4))) / p1) /
					1000000
				);
			},
			formelTex: "\\(σ Bx = \\frac{Fy \\cdot l}{Wax}\\)",
			unitHoch: "",
			isNotLengthUnit: true,
			unit: "N/mm²",
			requires: ["p1", "p6", "kraftInY"],
		},
		{
			bezeichnung: "Durchbiegung",
			symbol: "fy",
			formel: function calculate(
				p1,
				p2,
				p3,
				p4,
				p5,
				p6,
				lengthUnitAusgabe,
				dichte,
				emodul,
				gmodul,
				kraftInZ,
				kraftInY
			) {
				return (
					(kraftInY * Math.pow(p6, 3)) /
					(3 *
						emodul *
						1000000 *
						(PI_64 * (Math.pow(p1, 4) - Math.pow(p2, 4)))) /
					lengthUnitAusgabe
				);
			},
			formelTex: "\\(fy = \\frac{Fy \\cdot l^2}{3E \\cdot I}\\)",
			unitHoch: "",
			requires: ["p1", "p6", "kraftInY", "emodul"],
		},
		{
			bezeichnung: "Zugspannung",
			symbol: "σ z",
			formel: function calculate(
				p1,
				p2,
				p3,
				p4,
				p5,
				p6,
				lengthUnitAusgabe,
				dichte,
				emodul,
				gmodul,
				kraftInZ,
				kraftInY
			) {
				return kraftInZ / (PI_4 * (p1 * p1 - p2 * p2)) / 1000000;
			},
			formelTex: "\\(σ z = \\frac{Fz}{A}\\)",
			unitHoch: "",
			isNotLengthUnit: true,
			unit: "N/mm²",
			requires: ["p1", "kraftInZ"],
		},
		{
			bezeichnung: "Dehnung",
			symbol: "Δ z",
			formel: function calculate(
				p1,
				p2,
				p3,
				p4,
				p5,
				p6,
				lengthUnitAusgabe,
				dichte,
				emodul,
				gmodul,
				kraftInZ,
				kraftInY
			) {
				return (
					((kraftInZ / (PI_4 * (p1 * p1 - p2 * p2))) * p6) /
					(emodul * 1000000) /
					lengthUnitAusgabe
				);
			},
			formelTex: "\\(Δ z = \\frac{σ z}{E \\cdot l}\\)",
			unitHoch: "",
			requires: ["p1", "p6", "kraftInZ", "emodul"],
		},
		{
			bezeichnung: "Torsions&shy;spannung",
			symbol: "τ",
			formel: function calculate(
				p1,
				p2,
				p3,
				p4,
				p5,
				p6,
				lengthUnitAusgabe,
				dichte,
				emodul,
				gmodul,
				kraftInZ,
				kraftInY,
				drehmoment
			) {
				return (
					drehmoment /
					((PI_16 * (Math.pow(p1, 4) - Math.pow(p2, 4))) / p1) /
					1000000
				);
			},
			formelTex: "\\(τ = \\frac{Mz}{Wp}\\)",
			unitHoch: "",
			isNotLengthUnit: true,
			unit: "N/mm²",
			requires: ["p1", "drehmoment"],
		},
		{
			bezeichnung: "Verdrehwinkel",
			symbol: "φ",
			formel: function calculate(
				p1,
				p2,
				p3,
				p4,
				p5,
				p6,
				lengthUnitAusgabe,
				dichte,
				emodul,
				gmodul,
				kraftInZ,
				kraftInY,
				drehmoment
			) {
				return (
					((drehmoment * p6) /
						(PI_32 *
							(Math.pow(p1, 4) - Math.pow(p2, 4)) *
							gmodul *
							1000000)) *
					FACTOR_RAD_TO_DEG
				);
			},
			formelTex: "\\(φ = \\frac{Mz \\cdot l}{Ip \\cdot G}\\)",
			unitHoch: "",
			isNotLengthUnit: true,
			unit: "°",
			requires: ["p1", "p6", "drehmoment", "gmodul"],
		},
	],
};

const rechteck = {
	name: "Rechteck",
	svg_src: "assets/rechteck.svg",
	png_src: "assets/rechteck.png",
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
				if (newValue < p2) {
					// alert("b > B nicht erlaubt");
					return;
				}
				onParameterChange(e, setP1);
			},
		},
		{
			intern: "p2",
			bezeichnung: "Innere Breite",
			symbol: "b",
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
					// alert("b > B nicht erlaubt");
					return;
				}
				onParameterChange(e, setP2);
			},
		},
		{
			intern: "p3",
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
				if (newValue < p4) {
					// alert("h > H nicht erlaubt");
					return;
				}
				onParameterChange(e, setP3);
			},
		},
		{
			intern: "p4",
			bezeichnung: "Innere Höhe",
			symbol: "h",
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
				if (newValue > p3) {
					// alert("h > H nicht erlaubt");
					return;
				}
				onParameterChange(e, setP4);
			},
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
				if (2 * newValue > p1 || 2 * newValue > p3) {
					return;
				}
				onParameterChange(e, setP5);
				if (e.target.checkValidity()) {
					setP2(p1 - newValue * 2);
					setP4(p3 - newValue * 2);
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
			formel: function calculate(
				p1,
				p2,
				p3,
				p4,
				p5,
				p6,
				lengthUnitAusgabe
			) {
				return (
					(p1 * p3 - p2 * p4) /
					(lengthUnitAusgabe * lengthUnitAusgabe)
				);
			},
			formelTex: "\\(A = B \\cdot H - b \\cdot h\\)",
			unitHoch: "²",
			requires: ["p1", "p3"],
		},
		{
			bezeichnung: "Umfang",
			symbol: "U",
			formel: function calculate(
				p1,
				p2,
				p3,
				p4,
				p5,
				p6,
				lengthUnitAusgabe
			) {
				return (2 * p1 + 2 * p3) / lengthUnitAusgabe;
			},
			formelTex: "\\(U = 2 B + 2 H\\)",
			unitHoch: "",
			requires: ["p1", "p3"],
		},
		{
			bezeichnung: "Volumen",
			symbol: "V",
			formel: function calculate(
				p1,
				p2,
				p3,
				p4,
				p5,
				p6,
				lengthUnitAusgabe
			) {
				return (
					((p1 * p3 - p2 * p4) * p6) / Math.pow(lengthUnitAusgabe, 3)
				);
			},
			formelTex: "\\(V = (B \\cdot H - b \\cdot h) \\cdot l\\)",
			unitHoch: "³",
			requires: ["p1", "p3", "p6"],
		},
		{
			bezeichnung: "Masse",
			symbol: "m",
			formel: function calculate(
				p1,
				p2,
				p3,
				p4,
				p5,
				p6,
				lengthUnitAusgabe,
				dichte
			) {
				return (p1 * p3 - p2 * p4) * p6 * dichte * 1000;
			},
			formelTex: "\\(m = V \\cdot ρ\\)",
			unitHoch: "",
			isNotLengthUnit: true,
			unit: "kg",
			requires: ["p1", "p3", "p6", "dichte"],
		},
		{
			bezeichnung: "Eckenmaße (Diagonale)",
			symbol: "e",
			formel: function calculate(
				p1,
				p2,
				p3,
				p4,
				p5,
				p6,
				lengthUnitAusgabe
			) {
				return (
					Math.sqrt(Math.pow(p1, 2) + Math.pow(p3, 2)) /
					lengthUnitAusgabe
				);
			},
			formelTex: "\\(e = \\sqrt{B^2 + H^2}\\)",
			unitHoch: "",
			requires: ["p1", "p3"],
		},
		{
			bezeichnung: "Axiales Widerstands&shy;moment",
			symbol: "Wx",
			formel: function calculate(
				p1,
				p2,
				p3,
				p4,
				p5,
				p6,
				lengthUnitAusgabe
			) {
				return (
					(p1 * Math.pow(p3, 3) - p2 * Math.pow(p4, 3)) /
					(6 * p3) /
					Math.pow(lengthUnitAusgabe, 3)
				);
			},
			formelTex: "\\(Wx = \\frac{B \\cdot H^3 - b \\cdot h^3}{6 H}\\)",
			unitHoch: "³",
			requires: ["p1", "p3"],
		},
		{
			bezeichnung: "Axiales Trägheits&shy;moment",
			symbol: "Ix",
			formel: function calculate(
				p1,
				p2,
				p3,
				p4,
				p5,
				p6,
				lengthUnitAusgabe
			) {
				return (
					(p1 * Math.pow(p3, 3) - p2 * Math.pow(p4, 3)) /
					12 /
					Math.pow(lengthUnitAusgabe, 4)
				);
			},
			formelTex: "\\(Ix = \\frac{B \\cdot H^3 - b \\cdot h^3}{12}\\)",
			unitHoch: "⁴",
			requires: ["p1", "p3"],
		},
		{
			bezeichnung: "Axiales Widerstands&shy;moment",
			symbol: "Wy",
			formel: function calculate(
				p1,
				p2,
				p3,
				p4,
				p5,
				p6,
				lengthUnitAusgabe
			) {
				return (
					(p3 * Math.pow(p1, 3) - p4 * Math.pow(p2, 3)) /
					(6 * p1) /
					Math.pow(lengthUnitAusgabe, 3)
				);
			},
			formelTex: "\\(Wy = \\frac{H \\cdot B^3 - h \\cdot b^3}{6 B}\\)",
			unitHoch: "³",
			requires: ["p1", "p3"],
		},
		{
			bezeichnung: "Axiales Trägheits&shy;moment",
			symbol: "Iy",
			formel: function calculate(
				p1,
				p2,
				p3,
				p4,
				p5,
				p6,
				lengthUnitAusgabe
			) {
				return (
					(p3 * Math.pow(p1, 3) - p4 * Math.pow(p2, 3)) /
					12 /
					Math.pow(lengthUnitAusgabe, 4)
				);
			},
			formelTex: "\\(Iy = \\frac{H \\cdot B^3 - h \\cdot b^3}{12}\\)",
			unitHoch: "⁴",
			requires: ["p1", "p3"],
		},
		{
			bezeichnung: "Biege&shy;spannung",
			symbol: "σ Bx",
			formel: function calculate(
				p1,
				p2,
				p3,
				p4,
				p5,
				p6,
				lengthUnitAusgabe,
				dichte,
				emodul,
				gmodul,
				kraftInZ,
				kraftInY
			) {
				return (
					(kraftInY * p6) /
					((p1 * Math.pow(p3, 3) - p2 * Math.pow(p4, 3)) / (6 * p3)) /
					1000000
				);
			},
			formelTex: "\\(σ Bx = \\frac{Fy \\cdot l}{Wx}\\)",
			unitHoch: "",
			isNotLengthUnit: true,
			unit: "N/mm²",
			requires: ["p1", "p3", "p6", "kraftInY"],
		},
		{
			bezeichnung: "Durchbiegung",
			symbol: "fy",
			formel: function calculate(
				p1,
				p2,
				p3,
				p4,
				p5,
				p6,
				lengthUnitAusgabe,
				dichte,
				emodul,
				gmodul,
				kraftInZ,
				kraftInY
			) {
				return (
					(kraftInY * Math.pow(p6, 3)) /
					(3 *
						emodul *
						1000000 *
						((p1 * Math.pow(p3, 3) - p2 * Math.pow(p4, 3)) / 12)) /
					lengthUnitAusgabe
				);
			},
			formelTex: "\\(fy = \\frac{Fy \\cdot l^2}{3E \\cdot Ix}\\)",
			unitHoch: "",
			requires: ["p1", "p3", "p6", "kraftInY", "emodul"],
		},
		{
			bezeichnung: "Zugspannung",
			symbol: "σ z",
			formel: function calculate(
				p1,
				p2,
				p3,
				p4,
				p5,
				p6,
				lengthUnitAusgabe,
				dichte,
				emodul,
				gmodul,
				kraftInZ,
				kraftInY
			) {
				return (
					(kraftInZ / (p1 * p3 - p2 * p4)) *
					Math.pow(lengthUnitAusgabe, 2)
				);
			},
			formelTex: "\\(σ z = \\frac{Fz}{A}\\)",
			unitHoch: "",
			isNotLengthUnit: true,
			unit: "N/mm²",
			requires: ["p1", "p3", "kraftInZ"],
		},
		{
			bezeichnung: "Dehnung",
			symbol: "Δ z",
			formel: function calculate(
				p1,
				p2,
				p3,
				p4,
				p5,
				p6,
				lengthUnitAusgabe,
				dichte,
				emodul,
				gmodul,
				kraftInZ,
				kraftInY
			) {
				return (
					((kraftInZ / (p1 * p3 - p2 * p4)) * p6) /
					(emodul * 1000000) /
					lengthUnitAusgabe
				);
			},
			formelTex: "\\(Δ z = \\frac{σ z}{E \\cdot l}\\)",
			unitHoch: "",
			requires: ["p1", "p3", "p6", "kraftInZ", "emodul"],
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
