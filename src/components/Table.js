import React from "react";
import { UNIT_MM, UNIT_CM, UNIT_DM, UNIT_M } from "../Constants";

export default function Table({
	enableNachkommastellen,
	nachkommastellen,
	setNachkommastellen,
	enableLengthUnit,
	lengthUnit,
	setLengthUnit,
	children,
}) {
	return (
		<div className="overflow-hidden border border-gray-300 rounded-lg">
			<table className="w-full">
				<thead>
					<tr className="text-gray-500 uppercase bg-gray-100">
						<th className="w-auto pl-2 pr-1 font-semibold sm:pr-2">
							<span className="text-sm">Bezeich&shy;nung</span>
						</th>
						<th
							className="w-2 font-semibold sm:w-auto sm:px-1"
							lang="de"
							style={{ hyphens: "auto" }}
						>
							<span className="text-sm">Symbol</span>
						</th>
						<th className="w-1/4 font-semibold sm:px-1">
							<span className="text-sm">Wert</span>
							{enableNachkommastellen && (
								<select
									className="px-1 py-2 my-1 text-sm bg-gray-100 border border-gray-300 rounded sm:py-1 sm:ml-2 focus:outline-none"
									onChange={(e) =>
										setNachkommastellen(e.target.value)
									}
									value={nachkommastellen}
								>
									<option value={0}>Y,</option>
									<option value={1}>Y,X</option>
									<option value={2}>Y,XX</option>
									<option value={3}>Y,XXX</option>
									<option value={4}>Y,XXXX</option>
									<option value={5}>Y,XXXXX</option>
								</select>
							)}
						</th>
						<th className="w-1/4 pl-1 pr-2 font-semibold sm:pl-2">
							<span className="text-sm">Ein&shy;heit</span>
							{enableLengthUnit && (
								<select
									className="px-1 py-2 my-1 text-sm bg-gray-100 border border-gray-300 rounded sm:py-1 sm:ml-2 focus:outline-none"
									onChange={(e) =>
										setLengthUnit(e.target.value)
									}
								>
									<option value={UNIT_MM}>{UNIT_MM}</option>
									<option value={UNIT_CM}>{UNIT_CM}</option>
									<option value={UNIT_DM}>{UNIT_DM}</option>
									<option value={UNIT_M}>{UNIT_M}</option>
								</select>
							)}
						</th>
					</tr>
				</thead>
				<tbody>{children}</tbody>
			</table>
		</div>
	);
}

Table.Row = function TableRow({
	grayOut,
	bezeichnung,
	symbol,
	value,
	onValueChange,
	disableInput,
	unit,
}) {
	return (
		<tr
			className={`sm:h-auto border-t border-gray-300 ${
				grayOut ? "text-gray-300" : ""
			}`}
		>
			<td
				className="py-2 pl-4"
				dangerouslySetInnerHTML={{
					__html: bezeichnung,
				}}
			></td>
			<td className="text-center">{symbol}</td>
			<td>
				<input
					type="number"
					disabled={disableInput}
					className="w-24 text-right bg-transparent sm:w-auto"
					value={value}
					onChange={onValueChange}
				/>
			</td>
			<td className="px-1">{unit}</td>
		</tr>
	);
};
