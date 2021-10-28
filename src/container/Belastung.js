import React from "react";
import InputLabeled from "../components/InputLabeled";
import SectionHeader from "../components/SectionHeader";
import DropdownSelectionLabeledImage from "../components/DropdownSelectionLabeledImage";
import { lastfaelle } from "../Lastfaelle";

function Belastung({
	lastfallSvgSrc,
	setCurrentLastfall,
	enableKraftInZ,
	kraftInZ,
	setKraftInZ,
	enableKraftInY,
	kraftInY,
	setKraftInY,
	enableDrehmoment,
	drehmoment,
	setDrehmoment,
}) {
	const onChangeLastfall = (e) => {
		setCurrentLastfall(e.target.value);
	};

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
		<div className="sm:h-80">
			<SectionHeader className="sm:border-t">Belastung</SectionHeader>
			<DropdownSelectionLabeledImage
				id="lastfall"
				className="mt-4"
				label="Lastfall"
				src={lastfallSvgSrc}
				alt="Lastfall Skizze"
				onChange={onChangeLastfall}
			>
				{lastfaelle.map((item, index) => {
					return (
						<DropdownSelectionLabeledImage.Option
							value={item.name}
							key={index}
						/>
					);
				})}
			</DropdownSelectionLabeledImage>
			{enableKraftInZ && (
				<InputLabeled
					id="kraftInZ"
					label="Kraft in z-Achse"
					symbol="Fz"
					value={kraftInZ}
					onChange={onChangeKraftInZ}
					className="w-1/2"
					unit="N"
				/>
			)}
			{enableKraftInY && (
				<InputLabeled
					id="kraftInY"
					label="Kraft in y-Achse"
					symbol="Fy"
					value={kraftInY}
					onChange={onChangeKraftInY}
					className="w-1/2"
					unit="N"
				/>
			)}
			{enableDrehmoment && (
				<InputLabeled
					id="drehmoment"
					label="Drehmoment"
					symbol="Mz"
					value={drehmoment}
					onChange={onChangeDrehmoment}
					className="w-1/2"
					unit="Nm"
				/>
			)}
		</div>
	);
}

export const BelastungMemoized = React.memo(Belastung);
