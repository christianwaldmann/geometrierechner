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
	tableCellRightAligned: {
		margin: "auto",
		paddingRight: 5,
		fontSize: 10,
		textAlign: "right",
		width: "100%",
	},
	tableContainer: {
		margin: "8px 70px 0px 70px", // top margin is responsible for spacing between tables rn
	},
	image: {
		margin: "auto",
		height: 80,
	},
	h2: {
		margin: "40px 70px 0px 70px",
		fontSize: 10,
		fontWeight: "bold",
	},
	date: {
		position: "absolute",
		bottom: "30",
		width: "100%",
		textAlign: "center",
		fontSize: 8,
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
	berechneteGroessen,
	nachkommastellen,
	currentQuerschnittObject,
	lastfallName,
	lastfallSrc,
	enableKraftInZ,
	enableKraftInY,
	enableDrehmoment,
}) {
	return (
		<Document>
			<Page size="A4" style={styles.page}>
				{/* Eingabe */}
				<Text style={styles.h2}>Eingabe</Text>
				<View style={styles.tableContainer}>
					<View style={styles.table}>
						<View style={styles.tableRow}>
							<View style={styles.tableCol1}>
								<Text style={styles.tableCellLeftAligned}>
									Querschnitt
								</Text>
							</View>
							<View style={styles.tableCol2}>
								<Text style={styles.tableCell}></Text>
							</View>
							<View style={styles.tableCol3}>
								<Text style={styles.tableCellLeftAligned}>
									{currentQuerschnittObject.name}
								</Text>
							</View>
							<View style={styles.tableCol4}>
								<Text
									style={styles.tableCellLeftAligned}
								></Text>
							</View>
						</View>
						<View style={styles.tableRow}>
							<View style={styles.tableCol1}>
								<Text
									style={styles.tableCellLeftAligned}
								></Text>
							</View>
							<View style={styles.tableCol2}>
								<Text style={styles.tableCell}></Text>
							</View>
							<View style={styles.tableCol3}>
								<Image
									src={currentQuerschnittObject.png_src}
									style={styles.image}
								/>
							</View>
							<View style={styles.tableCol4}>
								<Text
									style={styles.tableCellLeftAligned}
								></Text>
							</View>
						</View>
						{currentQuerschnittObject.parameters.map(
							(item, index) => {
								if (item.skip !== true) {
									return (
										<View
											style={styles.tableRow}
											key={index}
										>
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
												<Text
													style={
														styles.tableCellLeftAligned
													}
												>
													{item.symbol}
												</Text>
											</View>
											<View style={styles.tableCol3}>
												<Text
													style={
														styles.tableCellRightAligned
													}
												>
													{parameters[index]}
												</Text>
											</View>
											<View style={styles.tableCol4}>
												<Text
													style={
														styles.tableCellLeftAligned
													}
												>
													{lengthUnitEingabe}
												</Text>
											</View>
										</View>
									);
								}
								return <View key={index} />;
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
								<Text style={styles.tableCellLeftAligned}>
									{werkstoff}
								</Text>
							</View>
							<View style={styles.tableCol4}>
								<Text
									style={styles.tableCellLeftAligned}
								></Text>
							</View>
						</View>
						<View style={styles.tableRow}>
							<View style={styles.tableCol1}>
								<Text style={styles.tableCellLeftAligned}>
									Dichte
								</Text>
							</View>
							<View style={styles.tableCol2}>
								<Text style={styles.tableCellLeftAligned}>
									ρ
								</Text>
							</View>
							<View style={styles.tableCol3}>
								<Text style={styles.tableCellRightAligned}>
									{dichte}
								</Text>
							</View>
							<View style={styles.tableCol4}>
								<Text style={styles.tableCellLeftAligned}>
									kg/dm³
								</Text>
							</View>
						</View>
						<View style={styles.tableRow}>
							<View style={styles.tableCol1}>
								<Text style={styles.tableCellLeftAligned}>
									E-Modul
								</Text>
							</View>
							<View style={styles.tableCol2}>
								<Text style={styles.tableCellLeftAligned}>
									E
								</Text>
							</View>
							<View style={styles.tableCol3}>
								<Text style={styles.tableCellRightAligned}>
									{emodul}
								</Text>
							</View>
							<View style={styles.tableCol4}>
								<Text style={styles.tableCellLeftAligned}>
									N/mm²
								</Text>
							</View>
						</View>
						<View style={styles.tableRow}>
							<View style={styles.tableCol1}>
								<Text style={styles.tableCellLeftAligned}>
									G-Modul
								</Text>
							</View>
							<View style={styles.tableCol2}>
								<Text style={styles.tableCellLeftAligned}>
									G
								</Text>
							</View>
							<View style={styles.tableCol3}>
								<Text style={styles.tableCellRightAligned}>
									{gmodul}
								</Text>
							</View>
							<View style={styles.tableCol4}>
								<Text style={styles.tableCellLeftAligned}>
									N/mm²
								</Text>
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
									Lastfall
								</Text>
							</View>
							<View style={styles.tableCol2}>
								<Text style={styles.tableCell}></Text>
							</View>
							<View style={styles.tableCol3}>
								<Text style={styles.tableCellLeftAligned}>
									{lastfallName}
								</Text>
							</View>
							<View style={styles.tableCol4}>
								<Text
									style={styles.tableCellLeftAligned}
								></Text>
							</View>
						</View>
						<View style={styles.tableRow}>
							<View style={styles.tableCol1}>
								<Text
									style={styles.tableCellLeftAligned}
								></Text>
							</View>
							<View style={styles.tableCol2}>
								<Text style={styles.tableCell}></Text>
							</View>
							<View style={styles.tableCol3}>
								<Image src={lastfallSrc} style={styles.image} />
							</View>
							<View style={styles.tableCol4}>
								<Text
									style={styles.tableCellLeftAligned}
								></Text>
							</View>
						</View>
						{enableKraftInZ && (
							<View style={styles.tableRow}>
								<View style={styles.tableCol1}>
									<Text style={styles.tableCellLeftAligned}>
										Kraft in z-Achse
									</Text>
								</View>
								<View style={styles.tableCol2}>
									<Text style={styles.tableCellLeftAligned}>
										Fz
									</Text>
								</View>
								<View style={styles.tableCol3}>
									<Text style={styles.tableCellRightAligned}>
										{kraftInZ}
									</Text>
								</View>
								<View style={styles.tableCol4}>
									<Text style={styles.tableCellLeftAligned}>
										N
									</Text>
								</View>
							</View>
						)}
						{enableKraftInY && (
							<View style={styles.tableRow}>
								<View style={styles.tableCol1}>
									<Text style={styles.tableCellLeftAligned}>
										Kraft in y-Achse
									</Text>
								</View>
								<View style={styles.tableCol2}>
									<Text style={styles.tableCellLeftAligned}>
										Fy
									</Text>
								</View>
								<View style={styles.tableCol3}>
									<Text style={styles.tableCellRightAligned}>
										{kraftInY}
									</Text>
								</View>
								<View style={styles.tableCol4}>
									<Text style={styles.tableCellLeftAligned}>
										N
									</Text>
								</View>
							</View>
						)}
						{enableDrehmoment && (
							<View style={styles.tableRow}>
								<View style={styles.tableCol1}>
									<Text style={styles.tableCellLeftAligned}>
										Drehmoment
									</Text>
								</View>
								<View style={styles.tableCol2}>
									<Text style={styles.tableCellLeftAligned}>
										Mz
									</Text>
								</View>
								<View style={styles.tableCol3}>
									<Text style={styles.tableCellRightAligned}>
										{drehmoment}
									</Text>
								</View>
								<View style={styles.tableCol4}>
									<Text style={styles.tableCellLeftAligned}>
										Nm
									</Text>
								</View>
							</View>
						)}
					</View>
				</View>
				{/* Berechnete Eigenschaften */}
				<Text style={styles.h2}>Berechnete Eigenschaften</Text>
				<View style={styles.tableContainer}>
					<View style={styles.table}>
						{berechneteGroessen.map((item, index) => {
							if (item.isComputable) {
								return (
									<View style={styles.tableRow} key={index}>
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
											<Text
												style={
													styles.tableCellLeftAligned
												}
											>
												{item.symbol}
											</Text>
										</View>
										<View style={styles.tableCol3}>
											<Text
												style={
													styles.tableCellRightAligned
												}
											>
												{displayWithFixedDecimalPlaces(
													item.value,
													nachkommastellen
												)}
											</Text>
										</View>
										<View style={styles.tableCol4}>
											<Text
												style={
													styles.tableCellLeftAligned
												}
											>
												{item.unit}
											</Text>
										</View>
									</View>
								);
							}
							return <View key={index} />;
						})}
					</View>
				</View>
				<Text style={styles.date}>Erstellt am {currentDateString}</Text>
			</Page>
		</Document>
	);
}
