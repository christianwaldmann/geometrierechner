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

	return (
		<div className="flex flex-col w-full p-0 mt-24 bg-white border-b-0 sm:border sm:rounded-lg sm:mt-4">
			<div className="w-full px-6 pb-8 overflow-auto sm:pb-12 sm:px-10 ">
				<h2 className="mt-12 mb-16 text-3xl font-semibold text-center sm:text-left sm:mt-8 sm:mb-6">
					Berechnete Eigenschaften
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
