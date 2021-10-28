import { MathJax } from "better-react-mathjax";
import { kreis } from "./Kreis";
import { rechteck } from "./Rechteck";

export const querschnitte = [kreis, rechteck].map((querschnitt) => {
	querschnitt.ausgabe = querschnitt.ausgabe.map((item) => {
		item.formelTexComponent = <MathJax>{item.formelTex}</MathJax>;
		return item;
	});
	return querschnitt;
});
