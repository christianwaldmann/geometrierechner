import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Berechnung from "../../pages/Berechnung";
import { BrowserRouter } from "react-router-dom";

test("renders the Berechnung page", () => {
	const { getByText, getByTestId } = render(<Berechnung />);

	expect(getByText("Geometrie")).toBeTruthy();
	expect(getByText("Querschnitt")).toBeTruthy();
	expect(getByText("Kreis")).toBeTruthy();
	expect(getByText("Außen-Ø")).toBeTruthy();
	expect(getByText("Innen-Ø")).toBeTruthy();
	expect(getByText("Wandstärke")).toBeTruthy();
	expect(getByText("Länge")).toBeTruthy();

	expect(getByText("Material")).toBeTruthy();
	expect(getByText("Werkstoff")).toBeTruthy();
	expect(getByText("Stahl allgemein")).toBeTruthy();
	expect(getByText("Dichte")).toBeTruthy();
	expect(getByText("E-Modul")).toBeTruthy();
	expect(getByText("G-Modul")).toBeTruthy();

	expect(getByText("Belastung")).toBeTruthy();
	expect(getByText("Lastfall")).toBeTruthy();
	expect(getByText("Balken einseitig")).toBeTruthy();
	expect(getByText("Kraft in z-Achse")).toBeTruthy();
	expect(getByText("Kraft in y-Achse")).toBeTruthy();
	expect(getByText("Drehmoment")).toBeTruthy();

	expect(getByText("Berechnete Eigenschaften")).toBeTruthy();
	expect(getByText("Fläche")).toBeTruthy();
	expect(getByText("Umfang")).toBeTruthy();
	expect(getByText("Volumen")).toBeTruthy();
	expect(getByText("Masse")).toBeTruthy();
	expect(getByText("Axiales Widerstands­moment")).toBeTruthy();
	expect(getByText("Axiales Trägheits­moment")).toBeTruthy();
	expect(getByText("Trägheits­radius")).toBeTruthy();
	expect(getByText("Polares Widerstands­moment")).toBeTruthy();
	expect(getByText("Polares Trägheits­moment")).toBeTruthy();
	expect(getByText("Biege­spannung")).toBeTruthy();
	expect(getByText("Durchbiegung")).toBeTruthy();
	expect(getByText("Längendehnung")).toBeTruthy();
	expect(getByText("Torsions­spannung")).toBeTruthy();
	expect(getByText("Verdrehwinkel")).toBeTruthy();

	expect(getByText("Report herunterladen")).toBeTruthy();
});

test("calculates the correct values for Querschnitt Kreis", () => {
	const { getByText, getByTestId } = render(<Berechnung />);

	fireEvent.change(getByTestId("p1"), { target: { value: 1 } }); // TODO: hier weitermachen
});
