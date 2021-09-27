import React from "react";
import { werkstoffe } from "../Werkstoffe";

function Material({
	werkstoff,
	setWerkstoff,
	dichte,
	setDichte,
	emodul,
	setEmodul,
	gmodul,
	setGmodul,
}) {
	const onChangeWerkstoff = (e) => {
		const selectedWerkstoff = werkstoffe.find((el) => {
			return el.name === e.target.value;
		});
		setWerkstoff(e.target.value);
		setDichte(selectedWerkstoff.dichte);
		setEmodul(selectedWerkstoff.emodul);
		setGmodul(selectedWerkstoff.gmodul);
	};

	const onChangeDichte = (e) => {
		if (e.target.checkValidity()) {
			setWerkstoff("Benutzerdefiniert");
			setDichte(parseFloat(e.target.value));
		}
	};

	const onChangeEmodul = (e) => {
		if (e.target.checkValidity()) {
			setWerkstoff("Benutzerdefiniert");
			setEmodul(parseFloat(e.target.value));
		}
	};

	const onChangeGmodul = (e) => {
		if (e.target.checkValidity()) {
			setWerkstoff("Benutzerdefiniert");
			setGmodul(parseFloat(e.target.value));
		}
	};

	return (
		<div>
			<h2 className="pt-4 mt-24 mb-12 text-sm font-semibold text-gray-600 border-t sm:mt-8 sm:mb-2">
				Material
			</h2>
			<div className="mt-4">
				<label className="inline-block w-1/2">Werkstoff</label>
				<select
					className="w-1/2 px-1 py-2 my-1 text-sm bg-gray-100 border border-gray-300 rounded sm:py-1 focus:outline-none"
					onChange={onChangeWerkstoff}
					value={werkstoff}
				>
					{werkstoffe.map((item, index) => {
						return (
							<option value={item.name} key={index}>
								{item.name}
							</option>
						);
					})}
				</select>
			</div>
			<div className="-mt-1">
				<div className="flex my-1">
					<div className="flex items-center w-1/2">
						Dichte
						<div className="ml-2 font-bold">(ρ)</div>
					</div>
					<div className="flex w-1/2 px-3 py-2 text-sm bg-gray-100 border border-gray-300 rounded sm:py-1 focus:outline-none">
						<input
							type="number"
							min="0"
							step="any"
							className="flex-grow w-24 text-right bg-transparent"
							value={dichte}
							onChange={onChangeDichte}
						/>
						kg/dm³
					</div>
				</div>
				<div className="flex my-1">
					<div className="flex items-center w-1/2">
						E-Modul <div className="ml-2 font-bold">(E)</div>
					</div>
					<div className="flex w-1/2 px-3 py-2 text-sm bg-gray-100 border border-gray-300 rounded sm:py-1 focus:outline-none">
						<input
							type="number"
							min="0"
							step="any"
							className="flex-grow w-24 text-right bg-transparent"
							value={emodul}
							onChange={onChangeEmodul}
						/>
						N/mm²
					</div>
				</div>
				<div className="flex my-1">
					<div className="flex items-center w-1/2">
						G-Modul <div className="ml-2 font-bold">(G)</div>
					</div>
					<div className="flex w-1/2 px-3 py-2 text-sm bg-gray-100 border border-gray-300 rounded sm:py-1 focus:outline-none">
						<input
							type="number"
							min="0"
							step="any"
							className="flex-grow w-24 text-right bg-transparent"
							value={gmodul}
							onChange={onChangeGmodul}
						/>
						N/mm²
					</div>
				</div>
			</div>
			{/* <div className="w-full mt-4">
				<table className="w-full overflow-auto">
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
							<th className="w-1/4 sm:px-1">Einheit</th>
						</tr>
					</thead>
					<tbody>
						<tr className="h-10 sm:h-auto">
							<td>Dichte</td>
							<td className="text-center">ρ</td>
							<td>
								<input
									type="number"
									min="0"
									step="any"
									className="w-24 text-right sm:w-auto"
									value={dichte}
									onChange={onChangeDichte}
								/>
							</td>
							<td>kg/dm³</td>
						</tr>
						<tr className="h-10 sm:h-auto">
							<td>E-Modul</td>
							<td className="text-center">E</td>
							<td>
								<input
									type="number"
									min="0"
									step="any"
									className="w-24 text-right sm:w-auto"
									value={emodul}
									onChange={onChangeEmodul}
								/>
							</td>
							<td>N/mm²</td>
						</tr>
						<tr className="h-10 sm:h-auto">
							<td>G-Modul</td>
							<td className="text-center">G</td>
							<td>
								<input
									type="number"
									min="0"
									step="any"
									className="w-24 text-right sm:w-auto"
									value={gmodul}
									onChange={onChangeGmodul}
								/>
							</td>
							<td>N/mm²</td>
						</tr>
					</tbody>
				</table>
			</div> */}
		</div>
	);
}

export const MaterialMemoized = React.memo(Material);
