import Geometrie from "./Geometrie";
import Material from "./Material";
import Belastung from "./Belastung";

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
	return (
		<div className="w-full p-0 mt-4 bg-white border-b-0 sm:border sm:rounded-lg">
			<div className="px-6 pb-8 sm:pb-12 sm:px-10">
				<Geometrie
					p1={p1}
					setP1={setP1}
					p2={p2}
					setP2={setP2}
					p3={p3}
					setP3={setP3}
					p4={p4}
					setP4={setP4}
					p5={p5}
					setP5={setP5}
					p6={p6}
					setP6={setP6}
					lengthUnitEingabe={lengthUnitEingabe}
					setLengthUnitEingabe={setLengthUnitEingabe}
					currentQuerschnittObject={currentQuerschnittObject}
					setCurrentQuerschnitt={setCurrentQuerschnitt}
				/>
				<Material
					werkstoff={werkstoff}
					setWerkstoff={setWerkstoff}
					dichte={dichte}
					setDichte={setDichte}
					emodul={emodul}
					setEmodul={setEmodul}
					gmodul={gmodul}
					setGmodul={setGmodul}
				/>
				<Belastung
					kraftInZ={kraftInZ}
					setKraftInZ={setKraftInZ}
					kraftInY={kraftInY}
					setKraftInY={setKraftInY}
					drehmoment={drehmoment}
					setDrehmoment={setDrehmoment}
				/>
			</div>
			<h2 className="hidden py-0 text-xs font-bold text-center text-indigo-700 bg-gray-200 rounded-b sm:block">
				EINGABE
			</h2>
		</div>
	);
}
