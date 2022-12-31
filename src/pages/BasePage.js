import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function BasePage({ active, children, ...restProps }) {
	return (
		<div className="flex flex-col items-center text-sm sm:text-base">
			<BasePage.Header active={active} />
			<div className="container mx-auto">{children}</div>
			<BasePage.Footer />
		</div>
	);
}

BasePage.Header = function BasePageHeader({ active }) {
	const [showDropdown, setShowDropdown] = useState(false);

	return (
		<header className="z-50 w-full bg-white shadow-sm ring-1 ring-gray-900 ring-opacity-5">
			{process.env.REACT_APP_DEPLOYMENT_ENV === "stage" && (
				<div className="text-xs font-bold text-center text-white bg-blue-500">
					<a
						className="text-xs font-bold text-center text-white bg-blue-500"
						href="https://geometrierechner.christianw.de"
					>
						This is a development version of the site. Click here to
						see the live content.
					</a>
				</div>
			)}
			<nav className="container flex flex-wrap items-center justify-between py-4 mx-auto mt-0">
				<Link
					className="flex items-center ml-6 text-xl font-bold text-gray-800 no-underline sm:ml-0 toggleColour hover:no-underline hover:text-gray-600"
					to="/"
				>
					<svg
						className="w-6 h-6"
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
				<div className="block pr-6 lg:hidden">
					<button
						className="flex items-center transition duration-300 ease-in-out transform hover:text-gray-900 focus:outline-none focus:shadow-outline"
						onClick={() => setShowDropdown(!showDropdown)}
					>
						{showDropdown ? (
							<svg
								className="w-6 h-6"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						) : (
							<svg
								className="w-6 h-6"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M4 6h16M4 12h16M4 18h16"
								/>
							</svg>
						)}
					</button>
				</div>
				<div className="z-20 flex-grow hidden w-full p-4 mt-2 text-black bg-white lg:flex lg:items-center lg:w-auto lg:mt-0 lg:bg-transparent lg:p-0">
					<ul className="items-center justify-end flex-1 text-gray-500 list-reset lg:flex">
						<li>
							<Link
								to="/"
								className={`inline-block text-sm font-medium hover:text-indigo-600 ${
									active === "Berechnung" && "text-indigo-600"
								}`}
							>
								Berechnung
							</Link>
						</li>
						<li className="mx-6">
							<Link
								to="/formeln"
								className={`inline-block text-sm font-medium hover:text-indigo-600 ${
									active === "Formeln" && "text-indigo-600"
								}`}
							>
								Formeln
							</Link>
						</li>
						<li className="">
							<a
								href="https://github.com/christianwaldmann/geometrierechner"
								className="flex items-center pl-6 text-sm font-medium border-l border-gray-200 hover:text-indigo-600"
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
			</nav>

			{showDropdown && (
				<ul className="w-full py-2">
					<li className="mx-6 border-t">
						<Link
							to="/"
							className="inline-block w-full py-2 text-base font-semibold text-gray-800 hover:text-gray-600"
						>
							Berechnung
						</Link>
					</li>
					<li className="mx-6 border-t">
						<Link
							to="/formeln"
							className="inline-block w-full py-2 text-base font-semibold text-gray-800 hover:text-gray-600"
						>
							Formeln
						</Link>
					</li>
					<li className="mx-6 border-t">
						<a
							href="https://github.com/christianwaldmann/geometrierechner"
							className="flex items-center justify-between w-full py-2 text-base font-semibold text-gray-800 hover:text-gray-600"
						>
							<span>Quellcode</span>
							<svg
								className="w-4 h-4 mr-2"
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
			)}
		</header>
	);
};

BasePage.Footer = function BasePageFooter() {
	return (
		<footer className="py-2 mt-12 text-sm text-gray-700">
			2021 Christian Waldmann
		</footer>
	);
};
