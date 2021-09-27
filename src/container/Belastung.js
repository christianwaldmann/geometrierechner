import React from "react";
import InputLabeled from "../components/InputLabeled";
import SectionHeader from "../components/SectionHeader";
import DropdownSelectionLabeledImage from "../components/DropdownSelectionLabeledImage";

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
			<SectionHeader className="sm:border-t">Belastung</SectionHeader>
			<DropdownSelectionLabeledImage
				className="mt-4"
				label="Lastfall"
				src="/assets/belastung.svg"
				alt="Lastfall Skizze"
				// onChange={onChangeQuerschnitt}
			>
				<DropdownSelectionLabeledImage.Option value="Balken einseitig" />
			</DropdownSelectionLabeledImage>
			<div className="-mt-8">
				<InputLabeled
					label="Kraft in z-Achse"
					symbol="Fz"
					value={kraftInZ}
					onChange={onChangeKraftInZ}
					className="w-1/2"
					unit="N"
				/>
				<InputLabeled
					label="Kraft in y-Achse"
					symbol="Fy"
					value={kraftInY}
					onChange={onChangeKraftInY}
					className="w-1/2"
					unit="N"
				/>
				<InputLabeled
					label="Drehmoment"
					symbol="Mz"
					value={drehmoment}
					onChange={onChangeDrehmoment}
					className="w-1/2"
					unit="Nm"
				/>
			</div>
		</>
	);
}

export const BelastungMemoized = React.memo(Belastung);
