import React from "react";

export default function Input({
	value,
	onChange,
	className,
	unit,
	...restProps
}) {
	return (
		<div
			className={`relative flex text-sm bg-gray-100 border border-transparent rounded focus-within:ring-1 focus-within:ring-indigo-400 focus-within:border-indigo-400 ${className}`}
			{...restProps}
		>
			<input
				type="number"
				min="0"
				step="any"
				className="flex-grow w-24 py-2 pl-2 pr-16 font-semibold text-right bg-transparent sm:py-1 focus:outline-none sm:w-full sm:pr-16"
				value={value}
				onChange={onChange}
			/>
			<span className="absolute inset-y-0 right-0 flex items-center pr-3 font-semibold text-gray-600 cursor-default pointer-events-none w-14 sm:w-16 sm:pr-0">
				{unit}
			</span>
		</div>
	);
}
