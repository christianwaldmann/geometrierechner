import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Berechnung from "./pages/Berechnung";
import Formeln from "./pages/Formeln";
import { MathJaxContext } from "better-react-mathjax";
import { Helmet, HelmetProvider } from "react-helmet-async";

export default function App() {
	return (
		<HelmetProvider>
			<MathJaxContext>
				<Helmet>
					<body className="bg-white sm:bg-gray-50" />
				</Helmet>
				<Router basename={process.env.PUBLIC_URL}>
					<Switch>
						<Route exact path={["", "/"]}>
							<Berechnung />
						</Route>
						<Route exact path="/formeln">
							<Formeln />
						</Route>
					</Switch>
				</Router>
			</MathJaxContext>
		</HelmetProvider>
	);
}
