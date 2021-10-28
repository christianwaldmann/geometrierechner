import Ausgabe from "../container/Ausgabe";
import { UNIT_MM } from "../Constants";
import React, { useState } from "react";
import { getLengthUnitFactor } from "../util";
import { querschnitte } from "../querschnitte/Querschnitte";
import { lastfaelle } from "../Lastfaelle";
import { GeometrieMemoized } from "../container/Geometrie";
import { MaterialMemoized } from "../container/Material";
import { BelastungMemoized } from "../container/Belastung";

const isParamInvalid = (value) => {
	return value === 0 || isNaN(value);
};

export default function Berechnung() {
	const [currentQuerschnitt, setCurrentQuerschnitt] = useState("Kreis");
	const currentQuerschnittObject = querschnitte.find((el) => {
		return el.name === currentQuerschnitt;
	});
	const [currentLastfall, setCurrentLastfall] = useState("Balken einseitig");
	const currentLastfallObject = lastfaelle.find((el) => {
		return el.name === currentLastfall;
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

	let flaeche = 0;
	const setFlaeche = (value) => (flaeche = value);
	let axialesWiderstandsmoment = 0;
	const setAxialesWiderstandsmoment = (value) =>
		(axialesWiderstandsmoment = value);
	let polaresWiderstandsmoment = 0;
	const setPolaresWiderstandsmoment = (value) =>
		(polaresWiderstandsmoment = value);
	let axialesTraegheitsmoment = 0;
	const setAxialesTraegheitsmoment = (value) =>
		(axialesTraegheitsmoment = value);
	let polaresTraegheitsmoment = 0;
	const setPolaresTraegheitsmoment = (value) =>
		(polaresTraegheitsmoment = value);

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
					if (isParamInvalid(p1)) return false;
					break;
				case "p2":
					if (isParamInvalid(p2)) return false;
					break;
				case "p3":
					if (isParamInvalid(p3)) return false;
					break;
				case "p4":
					if (isParamInvalid(p4)) return false;
					break;
				case "p5":
					if (isParamInvalid(p5)) return false;
					break;
				case "p6":
					if (isParamInvalid(p6)) return false;
					break;
				case "dichte":
					if (isParamInvalid(dichte)) return false;
					break;
				case "emodul":
					if (isParamInvalid(emodul)) return false;
					break;
				case "gmodul":
					if (isParamInvalid(gmodul)) return false;
					break;
				case "kraftInZ":
					if (isParamInvalid(kraftInZ)) return false;
					break;
				case "kraftInY":
					if (isParamInvalid(kraftInY)) return false;
					break;
				case "drehmoment":
					if (isParamInvalid(drehmoment)) return false;
					break;
				case "flaeche":
					if (isParamInvalid(flaeche)) return false;
					break;
				case "axialesWiderstandsmoment":
					if (isParamInvalid(axialesWiderstandsmoment)) return false;
					break;
				case "polaresWiderstandsmoment":
					if (isParamInvalid(polaresWiderstandsmoment)) return false;
					break;
				case "axialesTraegheitsmoment":
					if (isParamInvalid(axialesTraegheitsmoment)) return false;
					break;
				case "polaresTraegheitsmoment":
					if (isParamInvalid(polaresTraegheitsmoment)) return false;
					break;
				default:
					console.error("Not recognized required parameter");
			}
		}
		return true;
	}

	function shouldPropertyBeEnabled(
		requiredParams,
		enableKraftInZ,
		enableKraftInY,
		enableDrehmoment
	) {
		for (var i = 0; i < requiredParams.length; i++) {
			switch (requiredParams[i]) {
				case "kraftInZ":
					if (!enableKraftInZ) return false;
					break;
				case "kraftInY":
					if (!enableKraftInY) return false;
					break;
				case "drehmoment":
					if (!enableDrehmoment) return false;
					break;
				default:
					continue;
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

	let berechneteGroessen = currentQuerschnittObject.ausgabe.map(
		(item, index) => {
			return {
				bezeichnung: item.bezeichnung,
				symbol: item.symbol,
				isComputable: item.isComputable,
				value: item.formel({
					p1: p1SI,
					p2: p2SI,
					p3: p3SI,
					p4: p4SI,
					p5: p5SI,
					p6: p6SI,
					lengthUnitFactor: lengthUnitFactorAusgabe,
					dichte: dichte,
					emodul: emodul,
					gmodul: gmodul,
					kraftInZ: kraftInZ,
					kraftInY: kraftInY,
					drehmoment: drehmoment,
					setFlaeche: setFlaeche,
					setAxialesWiderstandsmoment: setAxialesWiderstandsmoment,
					setPolaresWiderstandsmoment: setPolaresWiderstandsmoment,
					setAxialesTraegheitsmoment: setAxialesTraegheitsmoment,
					setPolaresTraegheitsmoment: setPolaresTraegheitsmoment,
				}),
				unit:
					item.isNotLengthUnit === true ? (
						<>{item.unit}</>
					) : (
						<>
							{lengthUnitAusgabe}
							{item.unitHoch}
						</>
					),
			};
		}
	);

	currentLastfallObject.ausgabe = currentLastfallObject.ausgabe.map(
		(item) => {
			item.isComputable = isComputable(item.requires);
			return item;
		}
	);

	// Add advanced properties
	currentLastfallObject.ausgabe.forEach((item, index) => {
		if (
			shouldPropertyBeEnabled(
				item.requires,
				currentQuerschnittObject.enableKraftInZ,
				currentQuerschnittObject.enableKraftInY,
				currentQuerschnittObject.enableDrehmoment
			)
		) {
			berechneteGroessen.push({
				bezeichnung: item.bezeichnung,
				symbol: item.symbol,
				isComputable: item.isComputable,
				value: item.formel({
					p1: p1SI,
					p2: p2SI,
					p3: p3SI,
					p4: p4SI,
					p5: p5SI,
					p6: p6SI,
					lengthUnitFactor: lengthUnitFactorAusgabe,
					dichte: dichte,
					emodul: emodul,
					gmodul: gmodul,
					kraftInZ: kraftInZ,
					kraftInY: kraftInY,
					drehmoment: drehmoment,
					flaeche: flaeche,
					axialesWiderstandsmoment: axialesWiderstandsmoment,
					polaresWiderstandsmoment: polaresWiderstandsmoment,
					axialesTraegheitsmoment: axialesTraegheitsmoment,
					polaresTraegheitsmoment: polaresTraegheitsmoment,
				}),
				unit:
					item.isNotLengthUnit === true ? (
						<>{item.unit}</>
					) : (
						<>
							{lengthUnitAusgabe}
							{item.unitHoch}
						</>
					),
			});
		}
	});

	const enableKraftInZ =
		currentQuerschnittObject.enableKraftInZ &&
		currentLastfallObject.enableKraftInZ;
	const enableKraftInY =
		currentQuerschnittObject.enableKraftInY &&
		currentLastfallObject.enableKraftInY;
	const enableDrehmoment =
		currentQuerschnittObject.enableDrehmoment &&
		currentLastfallObject.enableDrehmoment;
	return (
		<div className="grid grid-cols-1 gap-4 xl:grid-rows-1 xl:grid-cols-2">
			<div className="relative w-full p-0 bg-white border-b-0 sm:border sm:rounded-lg sm:mt-4">
				<div className="px-6 pb-8 -mt-8 sm:-mt-4 sm:pb-12 sm:px-10">
					<GeometrieMemoized
						querschnittSvgSrc={currentQuerschnittObject.svg_src}
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
						setFlaeche={setFlaeche}
						setAxialesWiderstandsmoment={
							setAxialesWiderstandsmoment
						}
						setPolaresWiderstandsmoment={
							setPolaresWiderstandsmoment
						}
						setAxialesTraegheitsmoment={setAxialesTraegheitsmoment}
						setPolaresTraegheitsmoment={setPolaresTraegheitsmoment}
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
						lastfallSvgSrc={currentLastfallObject.svg_src}
						setCurrentLastfall={setCurrentLastfall}
						enableKraftInZ={enableKraftInZ}
						enableKraftInY={enableKraftInY}
						enableDrehmoment={enableDrehmoment}
						kraftInZ={kraftInZ}
						setKraftInZ={setKraftInZ}
						kraftInY={kraftInY}
						setKraftInY={setKraftInY}
						drehmoment={drehmoment}
						setDrehmoment={setDrehmoment}
					/>
				</div>
			</div>
			<Ausgabe
				berechneteGroessen={berechneteGroessen}
				currentQuerschnittObject={currentQuerschnittObject}
				currentLastfallObject={currentLastfallObject}
				lengthUnitAusgabe={lengthUnitAusgabe}
				setLengthUnitAusgabe={setLengthUnitAusgabe}
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
				enableKraftInZ={enableKraftInZ}
				enableKraftInY={enableKraftInY}
				enableDrehmoment={enableDrehmoment}
			/>
		</div>
	);
}
