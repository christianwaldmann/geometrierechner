import React from "react";

export default function SectionHeader({ children, className }) {
	return (
		<h2
			className={`pt-4 mt-20 mb-12 text-2xl sm:text-sm font-semibold text-center sm:text-left text-gray-600 sm:mt-8 sm:mb-2 ${className}`}
		>
			{children}
		</h2>
	);
}
