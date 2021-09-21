import React from "react";
import {
	Document,
	Page,
	Text,
	View,
	StyleSheet,
	Font,
	Image,
} from "@react-pdf/renderer";
import { displayWithFixedDecimalPlaces } from "../util";

Font.register({
	family: "Open Sans",
	fonts: [
		{
			src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf",
		},
		{
			src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf",
			fontWeight: 600,
		},
	],
});

const styles = StyleSheet.create({
	page: {
		fontFamily: "Open Sans",
	},
	table: {
		display: "table",
		width: "auto",
		borderStyle: "solid",
		borderWidth: 1,
		borderRightWidth: 0,
		borderBottomWidth: 0,
	},
	tableRow: {
		margin: "auto",
		flexDirection: "row",
	},
	tableRowDivider: {
		margin: "auto",
		flexDirection: "row",
		height: "2px",
	},
	tableCol1: {
		width: "55%",
		borderStyle: "solid",
		borderWidth: 1,
		borderLeftWidth: 0,
		borderTopWidth: 0,
	},
	tableCol2: {
		width: "10%",
		borderStyle: "solid",
		borderWidth: 1,
		borderLeftWidth: 0,
		borderTopWidth: 0,
	},
	tableCol3: {
		width: "25%",
		borderStyle: "solid",
		borderWidth: 1,
		borderLeftWidth: 0,
		borderTopWidth: 0,
	},
	tableCol4: {
		width: "10%",
		borderStyle: "solid",
		borderWidth: 1,
		borderLeftWidth: 0,
		borderTopWidth: 0,
	},
	tableCell: {
		margin: "auto",
		fontSize: 10,
	},
	tableCellLeftAligned: {
		margin: "auto",
		paddingLeft: 5,
		fontSize: 10,
		textAlign: "left",
		width: "100%",
	},
	tableCellHeader: {
		textAlign: "center",
		paddingTop: 3,
		paddingBottom: 3,
		fontSize: 10,
		fontWeight: "bold",
		backgroundColor: "#DCDCDC",
	},
	tableCellHeaderLeftAligned: {
		paddingTop: 3,
		paddingBottom: 3,
		paddingLeft: 5,
		fontSize: 10,
		fontWeight: "bold",
		backgroundColor: "#DCDCDC",
		textAlign: "left",
		width: "100%",
	},
	tableContainer: {
		margin: "30px 70px 0px 70px", // top margin is responsible for spacing between tables rn
	},
	h1: {
		margin: "40px 70px 0px 70px",
		borderBottom: "1px solid black",
		fontSize: 32,
	},
	date: {
		position: "absolute",
		bottom: "30",
		width: "100%",
		textAlign: "center",
		fontSize: 10,
	},
	headTableCol1: {
		width: "40%",
		height: "90px",
		borderStyle: "solid",
		borderWidth: 1,
		borderLeftWidth: 0,
		borderTopWidth: 0,
	},
	headTableCol2: {
		width: "20%",
		height: "90px",
		borderStyle: "solid",
		borderWidth: 1,
		borderLeftWidth: 0,
		borderTopWidth: 0,
	},
	headTableCol3: {
		width: "40%",
		height: "90px",
		borderStyle: "solid",
		borderWidth: 1,
		borderLeftWidth: 0,
		borderTopWidth: 0,
	},
});

const currentDate = new Date();
const currentDateString = currentDate.toLocaleString();

export function Report({
	parameters,
	kraftInZ,
	kraftInY,
	drehmoment,
	werkstoff,
	dichte,
	emodul,
	gmodul,
	lengthUnitEingabe,
	lengthUnitAusgabe,
	berechneteGroessenDisplayUnit,
	nachkommastellen,
	currentQuerschnittObject,
}) {
	return (
		<Document>
			<Page size="A4" style={styles.page}>
				<Text style={styles.h1}>Geometrie</Text>
				{/* Geometrie Table */}
				<View style={styles.tableContainer}>
					<View style={styles.table}>
						<View style={styles.tableRow}>
							<View style={styles.headTableCol1}>
								<Text style={styles.tableCellLeftAligned}>
									Querschnitt
								</Text>
							</View>
							<View style={styles.headTableCol2}>
								<Text style={styles.tableCell}>
									{currentQuerschnittObject.name}
								</Text>
							</View>
							<View style={styles.headTableCol3}>
								<Image
									src={currentQuerschnittObject.png_src}
									style={styles.tableCell}
								/>
							</View>
						</View>
					</View>
				</View>
				{/* Eingabe Table */}
				<View style={styles.tableContainer}>
					<View style={styles.table}>
						<View style={styles.tableRow}>
							<View style={styles.tableCol1}>
								<Text style={styles.tableCellHeaderLeftAligned}>
									Bezeichnung
								</Text>
							</View>
							<View style={styles.tableCol2}>
								<Text style={styles.tableCellHeader}>
									Symbol
								</Text>
							</View>
							<View style={styles.tableCol3}>
								<Text style={styles.tableCellHeader}>Wert</Text>
							</View>
							<View style={styles.tableCol4}>
								<Text style={styles.tableCellHeader}>
									Einheit
								</Text>
							</View>
						</View>
						{currentQuerschnittObject.parameters.map(
							(item, index) => {
								if (item.skip !== true) {
									return (
										<View style={styles.tableRow}>
											<View style={styles.tableCol1}>
												<Text
													style={
														styles.tableCellLeftAligned
													}
												>
													{item.bezeichnung}
												</Text>
											</View>
											<View style={styles.tableCol2}>
												<Text style={styles.tableCell}>
													{item.symbol}
												</Text>
											</View>
											<View style={styles.tableCol3}>
												<Text style={styles.tableCell}>
													{parameters[index]}
												</Text>
											</View>
											<View style={styles.tableCol4}>
												<Text style={styles.tableCell}>
													{lengthUnitEingabe}
												</Text>
											</View>
										</View>
									);
								}
								return <View />;
							}
						)}
						<View style={styles.tableRowDivider}>
							<View style={styles.tableCol1}></View>
							<View style={styles.tableCol2}></View>
							<View style={styles.tableCol3}></View>
							<View style={styles.tableCol4}></View>
						</View>
						<View style={styles.tableRow}>
							<View style={styles.tableCol1}>
								<Text style={styles.tableCellLeftAligned}>
									Werkstoff
								</Text>
							</View>
							<View style={styles.tableCol2}>
								<Text style={styles.tableCell}></Text>
							</View>
							<View style={styles.tableCol3}>
								<Text style={styles.tableCell}>
									{werkstoff}
								</Text>
							</View>
							<View style={styles.tableCol4}>
								<Text style={styles.tableCell}></Text>
							</View>
						</View>
						<View style={styles.tableRow}>
							<View style={styles.tableCol1}>
								<Text style={styles.tableCellLeftAligned}>
									Dichte
								</Text>
							</View>
							<View style={styles.tableCol2}>
								<Text style={styles.tableCell}>ρ</Text>
							</View>
							<View style={styles.tableCol3}>
								<Text style={styles.tableCell}>{dichte}</Text>
							</View>
							<View style={styles.tableCol4}>
								<Text style={styles.tableCell}>kg/dm³</Text>
							</View>
						</View>
						<View style={styles.tableRow}>
							<View style={styles.tableCol1}>
								<Text style={styles.tableCellLeftAligned}>
									E-Modul
								</Text>
							</View>
							<View style={styles.tableCol2}>
								<Text style={styles.tableCell}>E</Text>
							</View>
							<View style={styles.tableCol3}>
								<Text style={styles.tableCell}>{emodul}</Text>
							</View>
							<View style={styles.tableCol4}>
								<Text style={styles.tableCell}>N/mm²</Text>
							</View>
						</View>
						<View style={styles.tableRow}>
							<View style={styles.tableCol1}>
								<Text style={styles.tableCellLeftAligned}>
									G-Modul
								</Text>
							</View>
							<View style={styles.tableCol2}>
								<Text style={styles.tableCell}>G</Text>
							</View>
							<View style={styles.tableCol3}>
								<Text style={styles.tableCell}>{gmodul}</Text>
							</View>
							<View style={styles.tableCol4}>
								<Text style={styles.tableCell}>N/mm²</Text>
							</View>
						</View>
						<View style={styles.tableRowDivider}>
							<View style={styles.tableCol1}></View>
							<View style={styles.tableCol2}></View>
							<View style={styles.tableCol3}></View>
							<View style={styles.tableCol4}></View>
						</View>
						<View style={styles.tableRow}>
							<View style={styles.tableCol1}>
								<Text style={styles.tableCellLeftAligned}>
									Kraft in z-Achse
								</Text>
							</View>
							<View style={styles.tableCol2}>
								<Text style={styles.tableCell}>Fz</Text>
							</View>
							<View style={styles.tableCol3}>
								<Text style={styles.tableCell}>{kraftInZ}</Text>
							</View>
							<View style={styles.tableCol4}>
								<Text style={styles.tableCell}>N</Text>
							</View>
						</View>
						<View style={styles.tableRow}>
							<View style={styles.tableCol1}>
								<Text style={styles.tableCellLeftAligned}>
									Kraft in y-Achse
								</Text>
							</View>
							<View style={styles.tableCol2}>
								<Text style={styles.tableCell}>Fy</Text>
							</View>
							<View style={styles.tableCol3}>
								<Text style={styles.tableCell}>{kraftInY}</Text>
							</View>
							<View style={styles.tableCol4}>
								<Text style={styles.tableCell}>N</Text>
							</View>
						</View>
						<View style={styles.tableRow}>
							<View style={styles.tableCol1}>
								<Text style={styles.tableCellLeftAligned}>
									Drehmoment
								</Text>
							</View>
							<View style={styles.tableCol2}>
								<Text style={styles.tableCell}>Mz</Text>
							</View>
							<View style={styles.tableCol3}>
								<Text style={styles.tableCell}>
									{drehmoment}
								</Text>
							</View>
							<View style={styles.tableCol4}>
								<Text style={styles.tableCell}>Nm</Text>
							</View>
						</View>
					</View>
				</View>
				{/* Ausgabe Table */}
				<View style={styles.tableContainer}>
					<View style={styles.table}>
						<View style={styles.tableRow}>
							<View style={styles.tableCol1}>
								<Text style={styles.tableCellHeaderLeftAligned}>
									Bezeichnung
								</Text>
							</View>
							<View style={styles.tableCol2}>
								<Text style={styles.tableCellHeader}>
									Symbol
								</Text>
							</View>
							<View style={styles.tableCol3}>
								<Text style={styles.tableCellHeader}>Wert</Text>
							</View>
							<View style={styles.tableCol4}>
								<Text style={styles.tableCellHeader}>
									Einheit
								</Text>
							</View>
						</View>
						{currentQuerschnittObject.ausgabe.map((item, index) => {
							if (item.isComputable) {
								return (
									<View style={styles.tableRow}>
										<View style={styles.tableCol1}>
											<Text
												style={
													styles.tableCellLeftAligned
												}
											>
												{item.bezeichnung.replace(
													"&shy;",
													""
												)}
											</Text>
										</View>
										<View style={styles.tableCol2}>
											<Text style={styles.tableCell}>
												{item.symbol}
											</Text>
										</View>
										<View style={styles.tableCol3}>
											<Text style={styles.tableCell}>
												{displayWithFixedDecimalPlaces(
													berechneteGroessenDisplayUnit[
														index
													],
													nachkommastellen
												)}
											</Text>
										</View>
										<View style={styles.tableCol4}>
											<Text style={styles.tableCell}>
												{item.isNotLengthUnit ===
												true ? (
													<>{item.unit}</>
												) : (
													<>
														{lengthUnitAusgabe}
														{item.unitHoch}
													</>
												)}
											</Text>
										</View>
									</View>
								);
							}
							return <View />;
						})}
					</View>
				</View>
				<Text style={styles.date}>{currentDateString}</Text>
			</Page>
		</Document>
	);
}
