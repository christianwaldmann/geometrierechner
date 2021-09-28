import { useState } from "react";
import { displayWithFixedDecimalPlaces } from "../util";
import ReportButton from "../components/ReportButton";
import SectionHeader from "../components/SectionHeader";
import DropdownSelection from "../components/DropdownSelection";
import { UNIT_MM, UNIT_CM, UNIT_DM, UNIT_M } from "../Constants";

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
		<div className="relative flex flex-col w-full p-0 mt-20 bg-white border-b-0 sm:border sm:rounded-lg sm:mt-4">
			<div className="w-full px-6 overflow-auto sm:px-10">
				<SectionHeader>Berechnete Eigenschaften</SectionHeader>
				<div className="mt-4" />
				<div className="flex items-center justify-end w-full">
					<label className="w-1/2 text-sm text-gray-500 sm:w-auto">
						Nachkommastellen
					</label>
					<DropdownSelection
						className="w-1/2 ml-2 sm:w-20"
						onChange={(e) => setNachkommastellen(e.target.value)}
						value={nachkommastellen}
					>
						<DropdownSelection.Option value={0} />
						<DropdownSelection.Option value={1} />
						<DropdownSelection.Option value={2} />
						<DropdownSelection.Option value={3} />
						<DropdownSelection.Option value={4} />
						<DropdownSelection.Option value={5} />
					</DropdownSelection>
				</div>
				<div className="flex items-center justify-end w-full">
					<label className="w-1/2 text-sm text-gray-500 sm:w-auto">
						Längeneinheit
					</label>
					<DropdownSelection
						className="w-1/2 ml-2 sm:w-20"
						onChange={(e) => setLengthUnitAusgabe(e.target.value)}
					>
						<DropdownSelection.Option value={UNIT_MM} />
						<DropdownSelection.Option value={UNIT_CM} />
						<DropdownSelection.Option value={UNIT_DM} />
						<DropdownSelection.Option value={UNIT_M} />
					</DropdownSelection>
				</div>
				<div className="mt-8 text-base divide-y-2 divide-gray-100">
					{currentQuerschnittObject.ausgabe.map((item, index) => {
						return (
							<Ausgabe.Row
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
							/>
						);
					})}
				</div>
			</div>
			<div className="flex-grow" />
			<div className="pt-20 pb-12 mx-auto sm:pt-10">
				<ReportButton
					disabled={currentQuerschnittObject.ausgabe.every(
						(item) => !item.isComputable
					)}
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
			<h2 className="absolute bottom-0 left-0 hidden w-full py-0 text-xs font-bold text-center text-indigo-700 bg-gray-200 rounded-b sm:block">
				AUSGABE
			</h2>
		</div>
	);
}

Ausgabe.Row = function AusgabeRow({
	grayOut,
	bezeichnung,
	symbol,
	value,
	unit,
}) {
	return (
		<div className={`flex py-2 ${grayOut ? "text-gray-300" : ""}`}>
			<div
				className="flex items-center w-1/3"
				dangerouslySetInnerHTML={{
					__html: bezeichnung,
				}}
			/>
			<div
				className={`flex items-center pl-6 font-semibold ${
					grayOut ? "text-gray-200" : "text-gray-400"
				}`}
			>
				{symbol}
			</div>
			<div className="flex items-center justify-end flex-grow font-semibold">
				<span className="text-right select-all">{value}</span>
				<span
					className={`flex items-center pr-3 ml-2 w-14 ${
						grayOut ? "hidden" : "text-gray-600"
					}`}
				>
					{unit}
				</span>
			</div>
		</div>
	);
};
