import { useState } from "react";
import { displayWithFixedDecimalPlaces } from "../util";
import ReportButton from "./ReportButton";
import Table from "./Table";

export default function Ausgabe({
	berechneteGroessenDisplayUnit,
	lengthUnitAusgabe,
	setLengthUnitAusgabe,
	currentQuerschnittObject,
	parameters,
	werkstoff,
	dichte,
	emodul,
	gmodul,
	kraftInZ,
	kraftInY,
	drehmoment,
	lengthUnitEingabe,
	p1,
	p2,
	p3,
	p4,
	p5,
	p6,
}) {
	const [nachkommastellen, setNachkommastellen] = useState(2);

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

	return (
		<div className="flex flex-col w-full p-0 mt-24 bg-white border-b-0 sm:border sm:rounded-lg sm:mt-4">
			<div className="w-full px-6 pb-8 overflow-auto sm:pb-12 sm:px-10 ">
				<h2 className="mt-12 mb-12 text-3xl font-semibold text-center sm:text-left sm:mt-8 sm:mb-6">
					Berechnete Werte
				</h2>
				<Table
					enableNachkommastellen={true}
					nachkommastellen={nachkommastellen}
					setNachkommastellen={setNachkommastellen}
					enableLengthUnit={true}
					lengthUnit={lengthUnitAusgabe}
					setLengthUnit={setLengthUnitAusgabe}
				>
					{currentQuerschnittObject.ausgabe.map((item, index) => {
						return (
							<Table.Row
								key={index}
								grayOut={!item.isComputable}
								bezeichnung={item.bezeichnung}
								symbol={item.symbol}
								value={
									item.isComputable
										? displayWithFixedDecimalPlaces(
												berechneteGroessenDisplayUnit[
													index
												],
												nachkommastellen
										  )
										: ""
								}
								disableInput={true}
								unit={
									item.isNotLengthUnit === true ? (
										<>{item.unit}</>
									) : (
										<>
											{lengthUnitAusgabe}
											{item.unitHoch}
										</>
									)
								}
								className={`sm:h-auto border-t border-gray-300 ${
									item.isComputable ? "" : "text-gray-300"
								}`}
							/>
						);
					})}
				</Table>
			</div>
			<div className="flex-grow" />
			<div className="pt-20 pb-12 mx-auto sm:pt-0">
				<ReportButton
					parameters={parameters}
					kraftInZ={kraftInZ}
					kraftInY={kraftInY}
					drehmoment={drehmoment}
					werkstoff={werkstoff}
					dichte={dichte}
					emodul={emodul}
					gmodul={gmodul}
					lengthUnitEingabe={lengthUnitEingabe}
					lengthUnitAusgabe={lengthUnitAusgabe}
					berechneteGroessenDisplayUnit={
						berechneteGroessenDisplayUnit
					}
					nachkommastellen={nachkommastellen}
					currentQuerschnittObject={currentQuerschnittObject}
				/>
			</div>
			<h2 className="hidden py-0 text-xs font-bold text-center text-indigo-700 bg-gray-200 rounded-b sm:block">
				AUSGABE
			</h2>
		</div>
	);
}
