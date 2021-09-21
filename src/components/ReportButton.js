import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Report } from "./Report";

export default function ReportButton({ ...restProps }) {
	return (
		<PDFDownloadLink
			document={<Report {...restProps} />}
			fileName="Geometrie.pdf"
		>
			{({ blob, url, loading, error }) =>
				loading ? (
					<button className="flex items-center px-4 py-2 text-white bg-indigo-400 rounded cursor-wait hover:bg-indigo-300">
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
				) : (
					<button className="flex items-center px-4 py-2 text-white bg-indigo-400 rounded hover:bg-indigo-300">
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
				)
			}
		</PDFDownloadLink>
	);
}
