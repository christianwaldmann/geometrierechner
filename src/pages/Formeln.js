import { querschnitte } from "../Querschnitte";
import { MathJax } from "better-react-mathjax";

export default function Formeln() {
	return (
		<div className="w-full p-4 mt-4 bg-white sm:border sm:rounded-lg sm:p-10">
			<h1 className="mt-6 mb-4 text-4xl font-semibold text-center sm:mb-16 sm:text-left sm:mt-0">
				Formeln
			</h1>
			<div className="w-full overflow-auto bg-white rounded-lg sm:grid sm:grid-cols-3 gap-y-36">
				{querschnitte.map((querschnitt) => {
					return (
						<>
							<h2 className="mt-16 mb-4 text-2xl font-semibold sm:mt-0">
								{querschnitt.name}
							</h2>
							<table className="w-full sm:col-end-4 sm:col-start-2">
								<tbody>
									{querschnitt.ausgabe.map((item) => {
										return (
											<tr className="h-12 border-b">
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
						</>
					);
				})}
			</div>
		</div>
	);
}
