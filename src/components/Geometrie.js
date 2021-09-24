import React from "react";
import { querschnitte } from "../Querschnitte";
import { UNIT_MM, UNIT_CM, UNIT_DM, UNIT_M } from "../Constants";

function Geometrie({
	p1,
	setP1,
	p2,
	setP2,
	p3,
	setP3,
	p4,
	setP4,
	p5,
	setP5,
	p6,
	setP6,
	lengthUnitEingabe,
	setLengthUnitEingabe,
	currentQuerschnittObject,
	setCurrentQuerschnitt,
}) {
	const onChangeQuerschnitt = (e) => {
		setCurrentQuerschnitt(e.target.value);
		setP1(0);
		setP2(0);
		setP3(0);
		setP4(0);
		setP5(0);
	};

	const onChangeLengthUnitEingabe = (e) => {
		setLengthUnitEingabe(e.target.value);
	};

	const onChangeInput = (item) => (e) => {
		item.onChange(
			e,
			p1,
			p2,
			p3,
			p4,
			p5,
			p6,
			setP1,
			setP2,
			setP3,
			setP4,
			setP5,
			setP6
		);
	};

	const parameters = [p1, p2, p3, p4, p5, p6];

	return (
		<>
			<h2 className="mt-8 mb-12 text-3xl font-semibold text-center sm:text-left sm:mb-2">
				Geometrie
			</h2>
			<div className="mt-4">
				<label className="inline-block w-1/2">Querschnitt</label>
				<select
					className="w-1/2 px-1 py-2 my-1 text-sm bg-gray-100 border border-gray-300 rounded sm:py-1 focus:outline-none"
					onChange={onChangeQuerschnitt}
				>
					{querschnitte.map((item, index) => {
						return (
							<option value={item.name} key={index}>
								{item.name}
							</option>
						);
					})}
				</select>
			</div>
			<div className="flex flex-col-reverse items-center w-full mt-4 sm:items-start sm:flex-row">
				<div className="w-full overflow-auto">
					<table className="w-full">
						<thead>
							<tr className="border-b border-gray-800">
								<th className="w-5/12 sm:px-1">Bezeichnung</th>
								<th
									className="w-2 sm:w-auto sm:px-1"
									lang="de"
									style={{ hyphens: "auto" }}
								>
									Symbol
								</th>
								<th className="w-1/4 sm:px-1">Wert</th>
								<th className="flex flex-col items-center w-1/4 sm:px-1 2xl:flex-row">
									Einheit
									<select
										className="px-1 py-2 my-1 text-sm bg-gray-100 border border-gray-300 rounded sm:py-1 sm:ml-2 focus:outline-none"
										onChange={onChangeLengthUnitEingabe}
									>
										<option value={UNIT_MM}>
											{UNIT_MM}
										</option>
										<option value={UNIT_CM}>
											{UNIT_CM}
										</option>
										<option value={UNIT_DM}>
											{UNIT_DM}
										</option>
										<option value={UNIT_M}>{UNIT_M}</option>
									</select>
								</th>
							</tr>
						</thead>
						<tbody>
							{currentQuerschnittObject.parameters.map(
								(item, index) => {
									if (item.skip !== true) {
										return (
											// <tr
											// 	className="h-10 sm:h-auto"
											// 	key={index}
											// >
											// 	<td>{item.bezeichnung}</td>
											// 	<td className="text-center">
											// 		{item.symbol}
											// 	</td>
											// 	<td>
											// 		<input
											// 			type="number"
											// 			min="0"
											// 			step="any"
											// 			className="w-24 text-right sm:w-auto"
											// 			value={
											// 				parameters[index]
											// 			}
											// 			onChange={onChangeInput(
											// 				item
											// 			)}
											// 		/>
											// 	</td>
											// 	<td>{lengthUnitEingabe}</td>
											// </tr>
											<Geometrie.Row
												index={index}
												bezeichnung={item.bezeichnung}
												symbol={item.symbol}
												value={parameters[index]}
												onChange={onChangeInput(item)}
												lengthUnitEingabe={
													lengthUnitEingabe
												}
											/>
										);
									}
									return <tr key={index} />;
								}
							)}
						</tbody>
					</table>
				</div>
				<div className="object-contain sm:mt-8 2xl:ml-2 w-44 h-44">
					<img
						src={currentQuerschnittObject.svg_src}
						className=""
						alt="Querschnitt Skizze"
					/>
				</div>
			</div>
		</>
	);
}

Geometrie.Row = function GeometrieRow({
	index,
	bezeichnung,
	symbol,
	value,
	onChange,
	lengthUnitEingabe,
}) {
	return (
		<tr className="h-10 sm:h-auto" key={index}>
			<td>{bezeichnung}</td>
			<td className="text-center">{symbol}</td>
			<td>
				<input
					type="number"
					min="0"
					step="any"
					className="w-24 text-right sm:w-auto"
					value={value}
					onChange={onChange}
				/>
			</td>
			<td>{lengthUnitEingabe}</td>
		</tr>
	);
};

export const GeometrieMemoized = React.memo(Geometrie);
