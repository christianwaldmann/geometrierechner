import React from "react";
import { querschnitte } from "../Querschnitte";
import { UNIT_MM, UNIT_CM, UNIT_DM, UNIT_M } from "../Constants";
import InputLabeled from "../components/InputLabeled";
import DropdownSelection from "../components/DropdownSelection";
import SectionHeader from "../components/SectionHeader";
import DropdownSelectionLabeledImage from "../components/DropdownSelectionLabeledImage";

function Geometrie({
	querschnittSvgSrc,
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
	setFlaeche,
	setAxialesWiderstandsmoment,
	setPolaresWiderstandsmoment,
	setAxialesTraegheitsmoment,
	setPolaresTraegheitsmoment,
}) {
	const onChangeQuerschnitt = (e) => {
		setCurrentQuerschnitt(e.target.value);
		setP1(0);
		setP2(0);
		setP3(0);
		setP4(0);
		setP5(0);
		setFlaeche(0);
		setAxialesWiderstandsmoment(0);
		setPolaresWiderstandsmoment(0);
		setAxialesTraegheitsmoment(0);
		setPolaresTraegheitsmoment(0);
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
		<div className="sm:h-94">
			<SectionHeader>Geometrie</SectionHeader>
			<DropdownSelectionLabeledImage
				className="mt-4"
				label="Querschnitt"
				src={querschnittSvgSrc}
				alt="Querschnitt Skizze"
				onChange={onChangeQuerschnitt}
			>
				{querschnitte.map((item, index) => {
					return (
						<DropdownSelectionLabeledImage.Option
							value={item.name}
							key={index}
						/>
					);
				})}
			</DropdownSelectionLabeledImage>
			<div className="flex items-center justify-end w-full mb-6 sm:-mt-12">
				<label className="text-sm text-gray-500">Längeneinheit</label>
				<DropdownSelection
					className="w-20 ml-2"
					onChange={onChangeLengthUnitEingabe}
				>
					<DropdownSelection.Option value={UNIT_MM} />
					<DropdownSelection.Option value={UNIT_CM} />
					<DropdownSelection.Option value={UNIT_DM} />
					<DropdownSelection.Option value={UNIT_M} />
				</DropdownSelection>
			</div>
			<div className="-mt-4">
				{currentQuerschnittObject.parameters.map((item, index) => {
					if (item.skip !== true) {
						return (
							<InputLabeled
								key={index}
								label={item.bezeichnung}
								symbol={item.symbol}
								value={parameters[index]}
								onChange={onChangeInput(item)}
								className="w-1/2"
								unit={lengthUnitEingabe}
							/>
						);
					}
					return <div key={index} />;
				})}
			</div>
		</div>
	);
}

export const GeometrieMemoized = React.memo(Geometrie);
