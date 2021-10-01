import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import React, { useState } from "react";
import { Report } from "../container/Report";

export default function ReportButton({ disabled, ...restProps }) {
	const [disableTemporarily, setDisableTemporarily] = useState(false);

	return (
		<button
			disabled={disabled || disableTemporarily}
			className={`flex items-center px-4 py-2 text-white bg-indigo-400 rounded hover:bg-indigo-300 ${
				disabled && "cursor-not-allowed"
			}`}
			onClick={async () => {
				// Disable button on click, enable again after some time
				setDisableTemporarily(true);
				setTimeout(() => setDisableTemporarily(false), 3000);
				// Solutions to download PDF according to @react-pdf/renderer docs:
				// - PDFDownloadLink -> Problem: slow performance because PDF gets always regenerated on every input change
				// - usePDF hook -> PDF doesnt get regenerated on every input change, provides function to update manually, Problem: dealing with component rerendering is a bit messy, coulnt get it to work
				// Alternative solution:
				// - button, on click generate PDF as blob, save to disk with other library file-saver
				//   Found on https://github.com/diegomura/react-pdf/issues/975
				//   This way the PDF only gets generated on button click, this fixes the performance issue on the input change
				const doc = <Report {...restProps} />;
				const asPdf = pdf([]); // may have to be changed to {}
				asPdf.updateContainer(doc);
				const blob = await asPdf.toBlob();
				saveAs(blob, "Geometrie.pdf");
			}}
		>
			Report herunterladen
			<svg
				className="w-5 h-5 ml-2"
				fill="currentColor"
				viewBox="0 0 20 20"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					fillRule="evenodd"
					d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z"
					clipRule="evenodd"
				/>
			</svg>
		</button>
	);
}
