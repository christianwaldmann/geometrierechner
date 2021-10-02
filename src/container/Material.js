import React from "react";
import { werkstoffe } from "../Werkstoffe";
import InputLabeled from "../components/InputLabeled";
import DropdownSelection from "../components/DropdownSelection";
import SectionHeader from "../components/SectionHeader";

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
		<>
			<SectionHeader className="sm:border-t">Material</SectionHeader>
			<div className="mt-4">
				<label className="inline-block w-1/2 sm:w-1/3">Werkstoff</label>
				<DropdownSelection
					className="w-1/2 sm:w-2/3"
					value={werkstoff}
					onChange={onChangeWerkstoff}
				>
					{werkstoffe.map((item, index) => {
						return (
							<DropdownSelection.Option
								key={index}
								value={item.name}
							/>
						);
					})}
				</DropdownSelection>
			</div>
			<div className="-mt-1">
				<InputLabeled
					id="dichte"
					label="Dichte"
					symbol="ρ"
					value={dichte}
					onChange={onChangeDichte}
					className="w-1/2"
					unit="kg/dm³"
				/>
				<InputLabeled
					id="emodul"
					label="E-Modul"
					symbol="E"
					value={emodul}
					onChange={onChangeEmodul}
					className="w-1/2"
					unit="N/mm²"
				/>
				<InputLabeled
					id="gmodul"
					label="G-Modul"
					symbol="G"
					value={gmodul}
					onChange={onChangeGmodul}
					className="w-1/2"
					unit="N/mm²"
				/>
			</div>
		</>
	);
}

export const MaterialMemoized = React.memo(Material);
