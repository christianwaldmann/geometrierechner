import { FACTOR_RAD_TO_DEG } from "./Constants";

export const lastfaelle = [
	{
		name: "Balken einseitig",
		svg_src: "assets/lastfall_balken_einseitig.svg",
		png_src: "assets/lastfall_balken_einseitig.png",
		enableKraftInZ: true,
		enableKraftInY: true,
		enableDrehmoment: true,
		ausgabe: [
			{
				bezeichnung: "Biege&shy;spannung",
				symbol: "σ Bx",
				formel: function calculate({
					p6,
					kraftInY,
					axialesWiderstandsmoment,
				}) {
					return (kraftInY * p6) / axialesWiderstandsmoment / 1000000;
				},
				formelTex: "\\(σ Bx = \\frac{Fy \\cdot l}{Wx}\\)",
				unitHoch: "",
				isNotLengthUnit: true,
				unit: "N/mm²",
				requires: ["p6", "kraftInY", "axialesWiderstandsmoment"],
			},
			{
				bezeichnung: "Durchbiegung",
				symbol: "fy",
				formel: function calculate({
					p6,
					lengthUnitFactor,
					emodul,
					kraftInY,
					axialesTraegheitsmoment,
				}) {
					return (
						(kraftInY * Math.pow(p6, 3)) /
						(3 * emodul * 1000000 * axialesTraegheitsmoment) /
						lengthUnitFactor
					);
				},
				formelTex: "\\(fy = \\frac{Fy \\cdot l^3}{3E \\cdot Ix}\\)",
				unitHoch: "",
				requires: [
					"p6",
					"kraftInY",
					"emodul",
					"axialesTraegheitsmoment",
				],
			},
			{
				bezeichnung: "Zugspannung",
				symbol: "σ z",
				formel: function calculate({
					lengthUnitFactor,
					kraftInZ,
					flaeche,
				}) {
					return (kraftInZ / flaeche) * Math.pow(lengthUnitFactor, 2);
				},
				formelTex: "\\(σ z = \\frac{Fz}{A}\\)",
				unitHoch: "",
				isNotLengthUnit: true,
				unit: "N/mm²",
				requires: ["kraftInZ", "flaeche"],
			},
			{
				bezeichnung: "Längendehnung",
				symbol: "Δ z",
				formel: function calculate({
					p6,
					lengthUnitFactor,
					emodul,
					kraftInZ,
					flaeche,
				}) {
					return (
						((kraftInZ / flaeche) * p6) /
						(emodul * 1000000) /
						lengthUnitFactor
					);
				},
				formelTex: "\\(Δ z = \\frac{σ z \\cdot l}{E}\\)",
				unitHoch: "",
				requires: ["p6", "kraftInZ", "flaeche", "emodul"],
			},
			{
				bezeichnung: "Torsions&shy;spannung",
				symbol: "τ",
				formel: function calculate({
					drehmoment,
					polaresWiderstandsmoment,
				}) {
					return drehmoment / polaresWiderstandsmoment / 1000000;
				},
				formelTex: "\\(τ = \\frac{Mz}{Wp}\\)",
				unitHoch: "",
				isNotLengthUnit: true,
				unit: "N/mm²",
				requires: ["drehmoment", "polaresWiderstandsmoment"],
			},
			{
				bezeichnung: "Verdrehwinkel",
				symbol: "φ",
				formel: function calculate({
					p6,
					gmodul,
					drehmoment,
					polaresTraegheitsmoment,
				}) {
					return (
						((drehmoment * p6) /
							(polaresTraegheitsmoment * gmodul * 1000000)) *
						FACTOR_RAD_TO_DEG
					);
				},
				formelTex: "\\(φ = \\frac{Mz \\cdot l}{Ip \\cdot G}\\)",
				unitHoch: "",
				isNotLengthUnit: true,
				unit: "°",
				requires: [
					"p6",
					"drehmoment",
					"gmodul",
					"polaresTraegheitsmoment",
				],
			},
		],
	},
	{
		name: "Balken beidseitig",
		svg_src: "assets/lastfall_balken_beidseitig.svg",
		png_src: "assets/lastfall_balken_beidseitig.png",
		enableKraftInZ: false,
		enableKraftInY: true,
		enableDrehmoment: false,
		ausgabe: [
			{
				bezeichnung: "Biege&shy;spannung",
				symbol: "σ Bx",
				formel: function calculate({
					p6,
					kraftInY,
					axialesWiderstandsmoment,
				}) {
					return (
						(0.25 * kraftInY * p6) /
						axialesWiderstandsmoment /
						1000000
					);
				},
				formelTex:
					"\\(σ Bx = \\frac{\\frac{Fy}{2} \\cdot \\frac{l}{2}}{Wx}\\)",
				unitHoch: "",
				isNotLengthUnit: true,
				unit: "N/mm²",
				requires: ["p6", "kraftInY", "axialesWiderstandsmoment"],
			},
			{
				bezeichnung: "Durchbiegung",
				symbol: "fy",
				formel: function calculate({
					p6,
					lengthUnitFactor,
					emodul,
					kraftInY,
					axialesTraegheitsmoment,
				}) {
					return (
						(kraftInY * Math.pow(p6, 3)) /
						(48 * emodul * 1000000 * axialesTraegheitsmoment) /
						lengthUnitFactor
					);
				},
				formelTex: "\\(fy = \\frac{Fy \\cdot l^3}{48E \\cdot Ix}\\)",
				unitHoch: "",
				requires: [
					"p6",
					"kraftInY",
					"emodul",
					"axialesTraegheitsmoment",
				],
			},
		],
	},
];
