import { UNIT_MM, UNIT_CM, UNIT_DM, UNIT_M } from "../Constants";
import { querschnitte } from "../Querschnitte";
import { werkstoffe } from "../Werkstoffe";

function onChange(event, updateFn) {
	if (event.target.checkValidity()) {
		updateFn(parseFloat(event.target.value));
	}
}

export default function Eingabe({
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
	werkstoff,
	setWerkstoff,
	dichte,
	setDichte,
	emodul,
	setEmodul,
	gmodul,
	setGmodul,
	kraftInZ,
	setKraftInZ,
	kraftInY,
	setKraftInY,
	drehmoment,
	setDrehmoment,
	lengthUnitEingabe,
	setLengthUnitEingabe,
	lengthUnitFactorEingabe,
	currentQuerschnitt,
	setCurrentQuerschnitt,
	currentQuerschnittObject,
}) {
	const parameters = [p1, p2, p3, p4, p5, p6];
	return (
		<div className="w-full p-0 mt-4 bg-white border-b-0 sm:border sm:rounded-lg">
			<div className="px-6 pb-8 sm:pb-12 sm:px-10">
				<h2 className="mt-8 mb-12 text-3xl font-semibold text-center sm:text-left sm:mb-2">
					Geometrie
				</h2>
				<div className="mt-4">
					<label className="inline-block w-1/2">Querschnitt</label>
					<select
						className="w-1/2 px-1 py-2 my-1 text-sm bg-gray-100 border border-gray-300 rounded sm:py-1 focus:outline-none"
						onChange={(e) => {
							setCurrentQuerschnitt(e.target.value);
							setP1(0);
							setP2(0);
							setP3(0);
							setP4(0);
							setP5(0);
						}}
					>
						{querschnitte.map((item) => {
							return (
								<option value={item.name}>{item.name}</option>
							);
						})}
					</select>
				</div>
				<div className="flex flex-col-reverse items-center w-full mt-4 sm:items-start sm:flex-row">
					<div className="w-full overflow-auto">
						<table className="w-full">
							<thead>
								<tr className="border-b border-gray-800">
									<th className="w-5/12 sm:px-1">
										Bezeichnung
									</th>
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
											onChange={(e) =>
												setLengthUnitEingabe(
													e.target.value
												)
											}
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
											<option value={UNIT_M}>
												{UNIT_M}
											</option>
										</select>
									</th>
								</tr>
							</thead>
							<tbody>
								{currentQuerschnittObject.parameters.map(
									(item, index) => {
										if (item.skip !== true) {
											return (
												<tr className="h-10 sm:h-auto">
													<td>{item.bezeichnung}</td>
													<td className="text-center">
														{item.symbol}
													</td>
													<td>
														<input
															type="number"
															min="0"
															step="any"
															className="w-24 text-right sm:w-auto"
															value={
																parameters[
																	index
																]
															}
															onChange={(e) => {
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
															}}
														/>
													</td>
													<td>{lengthUnitEingabe}</td>
												</tr>
											);
										}
										return <div />;
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
				<h2 className="mt-24 mb-12 text-3xl font-semibold text-center sm:mt-16 sm:text-left sm:mb-2">
					Material
				</h2>
				<div className="mt-4">
					<label className="inline-block w-1/2">Werkstoff</label>
					<select
						className="w-1/2 px-1 py-2 my-1 text-sm bg-gray-100 border border-gray-300 rounded sm:py-1 focus:outline-none"
						onChange={(e) => {
							const selectedWerkstoff = werkstoffe.find((el) => {
								return el.name === e.target.value;
							});
							setWerkstoff(e.target.value);
							setDichte(selectedWerkstoff.dichte);
							setEmodul(selectedWerkstoff.emodul);
							setGmodul(selectedWerkstoff.gmodul);
						}}
						value={werkstoff}
					>
						{werkstoffe.map((item) => {
							return (
								<option value={item.name}>{item.name}</option>
							);
						})}
					</select>
				</div>
				<div className="w-full mt-4">
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
										step="any"
										className="w-24 text-right sm:w-auto"
										value={dichte}
										onChange={(e) => {
											if (e.target.checkValidity()) {
												setWerkstoff(
													"Benutzerdefiniert"
												);
											}
											onChange(e, setDichte);
										}}
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
										step="any"
										className="w-24 text-right sm:w-auto"
										value={emodul}
										onChange={(e) => {
											if (e.target.checkValidity()) {
												setWerkstoff(
													"Benutzerdefiniert"
												);
											}
											onChange(e, setEmodul);
										}}
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
										step="any"
										className="w-24 text-right sm:w-auto"
										value={gmodul}
										onChange={(e) => {
											if (e.target.checkValidity()) {
												setWerkstoff(
													"Benutzerdefiniert"
												);
											}
											onChange(e, setGmodul);
										}}
									/>
								</td>
								<td>N/mm²</td>
							</tr>
						</tbody>
					</table>
				</div>
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
										onChange={(e) =>
											onChange(e, setKraftInZ)
										}
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
										onChange={(e) =>
											onChange(e, setKraftInY)
										}
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
										onChange={(e) =>
											onChange(e, setDrehmoment)
										}
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
			</div>
			<h2 className="hidden py-0 text-xs font-bold text-center text-indigo-700 bg-gray-200 rounded-b sm:block">
				EINGABE
			</h2>
		</div>
	);
}
