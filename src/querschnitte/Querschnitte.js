import { MathJax } from "better-react-mathjax";
import { kreis } from "./Kreis";
import { kreisHohl } from "./KreisHohl";
import { rechteck } from "./Rechteck";
import { rechteckHohl } from "./RechteckHohl";

export const querschnitte = [kreis, kreisHohl, rechteck, rechteckHohl].map(
	(querschnitt) => {
		querschnitt.ausgabe = querschnitt.ausgabe.map((item) => {
			item.formelTexComponent = <MathJax>{item.formelTex}</MathJax>;
			return item;
		});
		return querschnitt;
	}
);
