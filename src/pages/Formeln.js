import { querschnitte } from "../querschnitte/Querschnitte";
import { MathJax } from "better-react-mathjax";
import { lastfaelle } from "../Lastfaelle";

export default function Formeln() {
	return (
		<div className="w-full p-4 mt-4 bg-white sm:border sm:rounded-lg sm:p-10">
			<h2 className="mt-6 mb-4 text-3xl font-semibold text-center sm:mb-12 sm:text-left sm:mt-0">
				Querschnitte
			</h2>
			<div className="w-full overflow-auto bg-white rounded-lg sm:grid sm:grid-cols-3 gap-y-36">
				{querschnitte.map((querschnitt, index) => {
					return (
						<div key={index}>
							<h2 className="mt-16 mb-4 text-2xl font-semibold sm:mt-0">
								{querschnitt.name}
							</h2>
							<table className="w-full sm:col-end-4 sm:col-start-2">
								<tbody className="divide-y">
									{querschnitt.ausgabe.map((item, index) => {
										return (
											<tr className="h-12" key={index}>
												<td
													className="w-40 sm:w-auto sm:px-4"
													dangerouslySetInnerHTML={{
														__html: item.bezeichnung,
													}}
												></td>
												<td className="sm:px-4">
													<MathJax>
														{item.formelTex}
													</MathJax>
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
					);
				})}
			</div>
			<h2 className="mb-4 text-3xl font-semibold text-center mt-28 sm:mb-12 sm:text-left">
				Lastfälle
			</h2>
			<div className="w-full overflow-auto bg-white rounded-lg sm:grid sm:grid-cols-3 gap-y-36">
				{lastfaelle.map((lastfall, index) => {
					return (
						<div key={index}>
							<h2 className="mt-16 mb-4 text-2xl font-semibold sm:mt-0">
								{lastfall.name}
							</h2>
							<table className="w-full sm:col-end-4 sm:col-start-2">
								<tbody className="divide-y">
									{lastfall.ausgabe.map((item, index) => {
										return (
											<tr className="h-12" key={index}>
												<td
													className="w-40 sm:w-auto sm:px-4"
													dangerouslySetInnerHTML={{
														__html: item.bezeichnung,
													}}
												></td>
												<td className="sm:px-4">
													<MathJax>
														{item.formelTex}
													</MathJax>
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
					);
				})}
			</div>
		</div>
	);
}
