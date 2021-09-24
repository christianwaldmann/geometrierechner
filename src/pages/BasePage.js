import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function BasePage({ children, ...restProps }) {
	return (
		<div className="flex flex-col items-center text-sm sm:text-base">
			<BasePage.Header />
			<div className="container mx-auto">{children}</div>
			<BasePage.Footer />
		</div>
	);
}

BasePage.Header = function BasePageHeader() {
	const [showDropdown, setShowDropdown] = useState(false);

	return (
		<nav className="w-full bg-white">
			{process.env.REACT_APP_DEPLOYMENT_ENV === "stage" && (
				<div className="text-xs font-bold text-center text-white bg-blue-500">
					Staging Environment
				</div>
			)}
			<div className="container flex flex-wrap items-center justify-between w-full py-3 mx-auto mt-0">
				<Link
					className="flex items-center pl-4 text-2xl font-bold text-black no-underline toggleColour hover:no-underline sm:pl-10 hover:text-gray-600"
					to="/"
				>
					<svg
						className="w-8 h-8"
						xmlns="http://www.w3.org/2000/svg"
						height="100%"
						width="100%"
						viewBox="0 0 18.420507 21.099977"
						fill="none"
						stroke="currentColor"
					>
						<g transform="translate(-33.276987,-137.1969)">
							<path
								d="m 42.487241,157.7469 v -10 l -8.660254,-5 v 10 l 8.660254,5"
								stroke="currentColor"
								fill="none"
								strokeWidth="0.5"
								strokeLinecap="butt"
								strokeLinejoin="round"
								strokeMiterlimit="4"
							/>
							<path
								d="m 42.487241,147.7469 8.660254,-5 v 10 l -8.660254,5 z"
								stroke="currentColor"
								fill="currentColor"
								strokeWidth="0.5"
								strokeLinecap="butt"
								strokeLinejoin="round"
								strokeMiterlimit="4"
							/>
							<path
								d="m 42.487241,147.7469 8.660254,-5 -8.660254,-5 -8.660254,5 z"
								stroke="currentColor"
								fill="none"
								strokeWidth="0.5"
								strokeLinecap="butt"
								strokeLinejoin="round"
								strokeMiterlimit="4"
							/>
						</g>
					</svg>
					<span className="ml-3">Geometrie Rechner</span>
				</Link>
				<div className="block pr-4 lg:hidden">
					<button
						className="flex items-center p-1 transition duration-300 ease-in-out transform hover:text-gray-900 focus:outline-none focus:shadow-outline hover:scale-105"
						onClick={() => setShowDropdown(!showDropdown)}
					>
						<svg
							className="w-6 h-6 fill-current"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<title>Menu</title>
							<path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
						</svg>
					</button>
				</div>
				<div
					className="z-20 flex-grow hidden w-full p-4 mt-2 mr-4 text-black bg-white lg:flex lg:items-center lg:w-auto lg:mt-0 lg:bg-transparent lg:p-0"
					id="nav-content"
				>
					<ul className="items-center justify-end flex-1 list-reset lg:flex">
						<li className="mr-3">
							<Link
								to="/"
								className="inline-block px-4 py-2 font-semibold text-black hover:text-gray-600"
							>
								Berechnung
							</Link>
						</li>
						<li className="mr-3">
							<Link
								to="/formeln"
								className="inline-block px-4 py-2 font-semibold text-black hover:text-gray-600"
							>
								Formeln
							</Link>
						</li>
						<li className="mr-3">
							<a
								href="https://github.com/christianwaldmann/geometrierechner"
								className="flex items-center px-4 py-2 font-semibold text-black hover:text-gray-600"
							>
								<span>Quellcode</span>
								<svg
									className="w-4 h-4 ml-1"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
									/>
								</svg>
							</a>
						</li>
					</ul>
				</div>
			</div>

			{showDropdown ? (
				<ul className="w-full py-2 border-b-2">
					<li className="mx-4 border-t">
						<Link
							to="/"
							className="inline-block w-full py-2 text-base font-semibold text-black hover:text-gray-600"
						>
							Berechnung
						</Link>
					</li>
					<li className="mx-4 border-t">
						<Link
							to="/formeln"
							className="inline-block w-full py-2 text-base font-semibold text-black hover:text-gray-600"
						>
							Formeln
						</Link>
					</li>
					<li className="mx-4 border-t">
						<a
							href="https://github.com/christianwaldmann/geometrierechner"
							className="flex items-center justify-between w-full py-2 text-base font-semibold text-black hover:text-gray-600"
						>
							<span>Quellcode</span>
							<svg
								className="w-5 h-5 mr-2"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
								/>
							</svg>
						</a>
					</li>
				</ul>
			) : (
				<hr className="border-t-0 border-b border-gray-200" />
			)}
		</nav>
	);
};

BasePage.Footer = function BasePageFooter() {
	return (
		<footer className="py-2 mt-12 text-gray-700">
			2021 Christian Waldmann
		</footer>
	);
};
