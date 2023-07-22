import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Berechnung from "./pages/Berechnung";
import Formeln from "./pages/Formeln";
import BasePage from "./pages/BasePage";
import { MathJaxContext } from "better-react-mathjax";
import { Helmet, HelmetProvider } from "react-helmet-async";

export default function App() {
	return (
		<HelmetProvider>
			<MathJaxContext>
				<Helmet>
					<body className="bg-white sm:bg-gray-50" />
					{window._env_.GEOMETRIERECHNER_DEPLOYMENT_ENV === "staging" && (
						<meta name="robots" content="noindex" />
					)}
				</Helmet>
				<Router basename={process.env.PUBLIC_URL}>
					<Switch>
						<Route exact path={["", "/"]}>
							<BasePage active="Berechnung">
								<Berechnung />
							</BasePage>
						</Route>
						<Route exact path="/formeln">
							<BasePage active="Formeln">
								<Formeln />
							</BasePage>
						</Route>
					</Switch>
				</Router>
			</MathJaxContext>
		</HelmetProvider>
	);
}
