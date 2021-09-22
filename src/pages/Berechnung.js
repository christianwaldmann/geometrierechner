import Eingabe from "../components/Eingabe";
import Ausgabe from "../components/Ausgabe";
import { UNIT_MM } from "../Constants";
import React, { useState } from "react";
import { getLengthUnitFactor } from "../util";
import { querschnitte } from "../Querschnitte";

export default function Berechnung() {
	const [currentQuerschnitt, setCurrentQuerschnitt] = useState("Kreis");
	const currentQuerschnittObject = querschnitte.find((el) => {
		return el.name === currentQuerschnitt;
	});

	const [p1, setP1] = useState(0);
	const [p2, setP2] = useState(0);
	const [p3, setP3] = useState(0);
	const [p4, setP4] = useState(0);
	const [p5, setP5] = useState(0);
	const [p6, setP6] = useState(0);
	const [werkstoff, setWerkstoff] = useState("Stahl allgemein");
	const [dichte, setDichte] = useState(7.85);
	const [emodul, setEmodul] = useState(210000);
	const [gmodul, setGmodul] = useState(80000);
	const [kraftInZ, setKraftInZ] = useState(0);
	const [kraftInY, setKraftInY] = useState(0);
	const [drehmoment, setDrehmoment] = useState(0);

	const parameters = [p1, p2, p3, p4, p5, p6];

	const [lengthUnitEingabe, setLengthUnitEingabe] = useState(UNIT_MM);
	const [lengthUnitAusgabe, setLengthUnitAusgabe] = useState(UNIT_MM);

	const lengthUnitFactorEingabe = getLengthUnitFactor(lengthUnitEingabe);
	const lengthUnitFactorAusgabe = getLengthUnitFactor(lengthUnitAusgabe);

	const berechneteGroessenDisplayUnit = currentQuerschnittObject.ausgabe.map(
		(item, index) =>
			item.formel(
				p1,
				p2,
				p3,
				p4,
				p5,
				p6,
				lengthUnitFactorEingabe,
				lengthUnitFactorAusgabe,
				dichte,
				emodul,
				gmodul,
				kraftInZ,
				kraftInY,
				drehmoment
			)
	);

	return (
		<div className="grid grid-cols-1 gap-4 xl:grid-rows-1 xl:grid-cols-2">
			<Eingabe
				p1={p1}
				setP1={setP1}
				p2={p2}
				setP2={setP2}
				p3={p3}
				setP3={setP3}
				p4={p4}
				setP4={setP4}
				p5={p5}
				setP5={setP5}
				p6={p6}
				setP6={setP6}
				werkstoff={werkstoff}
				setWerkstoff={setWerkstoff}
				dichte={dichte}
				setDichte={setDichte}
				emodul={emodul}
				setEmodul={setEmodul}
				gmodul={gmodul}
				setGmodul={setGmodul}
				kraftInZ={kraftInZ}
				setKraftInZ={setKraftInZ}
				kraftInY={kraftInY}
				setKraftInY={setKraftInY}
				drehmoment={drehmoment}
				setDrehmoment={setDrehmoment}
				lengthUnitEingabe={lengthUnitEingabe}
				setLengthUnitEingabe={setLengthUnitEingabe}
				lengthUnitFactorEingabe={lengthUnitFactorEingabe}
				currentQuerschnitt={currentQuerschnitt}
				setCurrentQuerschnitt={setCurrentQuerschnitt}
				currentQuerschnittObject={currentQuerschnittObject}
			/>
			<Ausgabe
				berechneteGroessenDisplayUnit={berechneteGroessenDisplayUnit}
				lengthUnitAusgabe={lengthUnitAusgabe}
				setLengthUnitAusgabe={setLengthUnitAusgabe}
				currentQuerschnittObject={currentQuerschnittObject}
				parameters={parameters}
				werkstoff={werkstoff}
				dichte={dichte}
				emodul={emodul}
				gmodul={gmodul}
				kraftInZ={kraftInZ}
				kraftInY={kraftInY}
				drehmoment={drehmoment}
				lengthUnitEingabe={lengthUnitEingabe}
				p1={p1}
				p2={p2}
				p3={p3}
				p4={p4}
				p5={p5}
				p6={p6}
			/>
		</div>
	);
}
