import Ausgabe from "../container/Ausgabe";
import { UNIT_MM } from "../Constants";
import React, { useState } from "react";
import { getLengthUnitFactor } from "../util";
import { querschnitte } from "../Querschnitte";
import { GeometrieMemoized } from "../container/Geometrie";
import { MaterialMemoized } from "../container/Material";
import { BelastungMemoized } from "../container/Belastung";

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

	const p1SI = p1 * lengthUnitFactorEingabe;
	const p2SI = p2 * lengthUnitFactorEingabe;
	const p3SI = p3 * lengthUnitFactorEingabe;
	const p4SI = p4 * lengthUnitFactorEingabe;
	const p5SI = p5 * lengthUnitFactorEingabe;
	const p6SI = p6 * lengthUnitFactorEingabe;

	function isComputable(requiredParams) {
		for (var i = 0; i < requiredParams.length; i++) {
			switch (requiredParams[i]) {
				case "p1":
					if (p1 === 0) return false;
					break;
				case "p2":
					if (p2 === 0) return false;
					break;
				case "p3":
					if (p3 === 0) return false;
					break;
				case "p4":
					if (p4 === 0) return false;
					break;
				case "p5":
					if (p5 === 0) return false;
					break;
				case "p6":
					if (p6 === 0) return false;
					break;
				case "dichte":
					if (dichte === 0) return false;
					break;
				case "emodul":
					if (emodul === 0) return false;
					break;
				case "gmodul":
					if (gmodul === 0) return false;
					break;
				case "kraftInZ":
					if (kraftInZ === 0) return false;
					break;
				case "kraftInY":
					if (kraftInY === 0) return false;
					break;
				case "drehmoment":
					if (drehmoment === 0) return false;
					break;
				default:
					console.error("Not recognized required parameter");
			}
		}
		return true;
	}

	currentQuerschnittObject.ausgabe = currentQuerschnittObject.ausgabe.map(
		(item) => {
			item.isComputable = isComputable(item.requires);
			return item;
		}
	);

	const berechneteGroessenDisplayUnit = currentQuerschnittObject.ausgabe.map(
		(item, index) => {
			if (item.isComputable) {
				return item.formel(
					p1SI,
					p2SI,
					p3SI,
					p4SI,
					p5SI,
					p6SI,
					lengthUnitFactorAusgabe,
					dichte,
					emodul,
					gmodul,
					kraftInZ,
					kraftInY,
					drehmoment
				);
			} else {
				return -1;
			}
		}
	);

	return (
		<div className="grid grid-cols-1 gap-4 xl:grid-rows-1 xl:grid-cols-2">
			<div className="relative w-full p-0 bg-white border-b-0 sm:border sm:rounded-lg sm:mt-4">
				<div className="px-6 pb-8 -mt-8 sm:mt-0 sm:pb-12 sm:px-10">
					<GeometrieMemoized
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
						lengthUnitEingabe={lengthUnitEingabe}
						setLengthUnitEingabe={setLengthUnitEingabe}
						currentQuerschnittObject={currentQuerschnittObject}
						setCurrentQuerschnitt={setCurrentQuerschnitt}
					/>
					<MaterialMemoized
						werkstoff={werkstoff}
						setWerkstoff={setWerkstoff}
						dichte={dichte}
						setDichte={setDichte}
						emodul={emodul}
						setEmodul={setEmodul}
						gmodul={gmodul}
						setGmodul={setGmodul}
					/>
					<BelastungMemoized
						enableKraftInZ={currentQuerschnittObject.enableKraftInZ}
						enableKraftInY={currentQuerschnittObject.enableKraftInY}
						enableDrehmoment={currentQuerschnittObject.enableDrehmoment}
						kraftInZ={kraftInZ}
						setKraftInZ={setKraftInZ}
						kraftInY={kraftInY}
						setKraftInY={setKraftInY}
						drehmoment={drehmoment}
						setDrehmoment={setDrehmoment}
					/>
				</div>
				<h2 className="absolute bottom-0 left-0 hidden w-full py-0 text-xs font-bold text-center text-indigo-700 bg-gray-200 rounded-b sm:block">
					EINGABE
				</h2>
			</div>
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
