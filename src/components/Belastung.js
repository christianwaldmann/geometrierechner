import React from "react";

function Belastung({
	kraftInZ,
	setKraftInZ,
	kraftInY,
	setKraftInY,
	drehmoment,
	setDrehmoment,
}) {
	const onChangeKraftInZ = (e) => {
		if (e.target.checkValidity()) {
			setKraftInZ(parseFloat(e.target.value));
		}
	};

	const onChangeKraftInY = (e) => {
		if (e.target.checkValidity()) {
			setKraftInY(parseFloat(e.target.value));
		}
	};

	const onChangeDrehmoment = (e) => {
		if (e.target.checkValidity()) {
			setDrehmoment(parseFloat(e.target.value));
		}
	};

	return (
		<>
			<h2 className="pt-4 mt-24 mb-12 text-sm font-semibold text-gray-600 border-t sm:mt-8 sm:mb-2">
				Belastung
			</h2>
			<div className="flex mt-4">
				<label className="w-1/2">Lastfall</label>
				<div className="w-1/2">
					<div className="flex">
						<div className="object-contain w-32 h-32">
							<img
								src="/assets/Belastung.svg"
								className=""
								alt="Querschnitt Skizze"
							/>
						</div>
						<select
							className="w-1/2 h-8 px-1 py-2 my-1 ml-auto text-sm bg-gray-100 border border-gray-300 rounded sm:py-1 focus:outline-none"
							// onChange={onChangeQuerschnitt}
						>
							<option value="Balken einseitig">
								Balken einseitig
							</option>
						</select>
					</div>
				</div>
			</div>
			<div className="-mt-8">
				<div className="flex my-1">
					<div className="flex items-center w-1/2">
						Kraft in z-Achse
						<div className="ml-2 font-bold">(Fz)</div>
					</div>
					<div className="flex w-1/2 px-3 py-2 text-sm bg-gray-100 border border-gray-300 rounded sm:py-1 focus:outline-none">
						<input
							type="number"
							min="0"
							step="any"
							className="flex-grow w-24 text-right bg-transparent"
							value={kraftInZ}
							onChange={onChangeKraftInZ}
						/>
						N
					</div>
				</div>
				<div className="flex my-1">
					<div className="flex items-center w-1/2">
						E-Kraft in y-Achse{" "}
						<div className="ml-2 font-bold">(Fy)</div>
					</div>
					<div className="flex w-1/2 px-3 py-2 text-sm bg-gray-100 border border-gray-300 rounded sm:py-1 focus:outline-none">
						<input
							type="number"
							min="0"
							step="any"
							className="flex-grow w-24 text-right bg-transparent"
							value={kraftInY}
							onChange={onchange}
						/>
						N
					</div>
				</div>
				<div className="flex my-1">
					<div className="flex items-center w-1/2">
						Drehmoment <div className="ml-2 font-bold">(Mz)</div>
					</div>
					<div className="flex w-1/2 px-3 py-2 text-sm bg-gray-100 border border-gray-300 rounded sm:py-1 focus:outline-none">
						<input
							type="number"
							min="0"
							step="any"
							className="flex-grow w-24 text-right bg-transparent"
							value={drehmoment}
							onChange={onChangeDrehmoment}
						/>
						Nm
					</div>
				</div>
			</div>
			{/* <div className="flex flex-col-reverse items-center w-full mt-6 sm:items-start sm:flex-row">
				<table className="flex-grow mt-8 table-fixed sm:mt-0">
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
							<td>Kraft in z-Achse</td>
							<td className="text-center">Fz</td>
							<td>
								<input
									type="number"
									step="any"
									className="w-24 text-right sm:w-auto"
									value={kraftInZ}
									onChange={onChangeKraftInZ}
								/>
							</td>
							<td>N</td>
						</tr>
						<tr className="h-10 sm:h-auto">
							<td>Kraft in y-Achse</td>
							<td className="text-center">Fy</td>
							<td>
								<input
									type="number"
									step="any"
									className="w-24 text-right sm:w-auto"
									value={kraftInY}
									onChange={onChangeKraftInY}
								/>
							</td>
							<td>N</td>
						</tr>
						<tr className="h-10 sm:h-auto">
							<td>Drehmoment</td>
							<td className="text-center">Mz</td>
							<td>
								<input
									type="number"
									step="any"
									className="w-24 text-right sm:w-auto"
									value={drehmoment}
									onChange={onChangeDrehmoment}
								/>
							</td>
							<td>Nm</td>
						</tr>
					</tbody>
				</table>
				<div className="object-contain ml-2 w-44 h-36">
					<img
						src="assets/belastung.svg"
						className=""
						alt="Belastung Skizze"
					/>
				</div>
			</div> */}
		</>
	);
}

export const BelastungMemoized = React.memo(Belastung);
