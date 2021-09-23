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
			<h2 className="mt-24 mb-12 text-3xl font-semibold text-center sm:mt-16 sm:text-left sm:mb-2">
				Belastung
			</h2>
			<div className="flex flex-col-reverse items-center w-full mt-6 sm:items-start sm:flex-row">
				<table className="flex-grow table-fixed">
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
			</div>
		</>
	);
}

export const BelastungMemoized = React.memo(Belastung);
