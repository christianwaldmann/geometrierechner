import React from "react";

export default function DropdownSelection({
	id,
	value,
	onChange,
	className,
	children,
	...restProps
}) {
	return (
		<div
			className={`relative inline-block my-1 text-sm border border-gray-150 rounded focus-within:ring-1 focus-within:ring-indigo-400 focus-within:border-indigo-400 ${className}`}
		>
			<select
				id={id}
				value={value}
				className="block w-full py-2 pl-3 pr-2 text-gray-700 bg-gray-100 rounded appearance-none cursor-pointer focus:outline-none sm:py-1"
				onChange={onChange}
				{...restProps}
			>
				{children}
			</select>
			<div className="absolute inset-y-0 right-0 flex items-center pr-2 text-gray-500 bg-gray-100 pointer-events-none">
				<svg
					className="w-4 h-4"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M8 9l4-4 4 4m0 6l-4 4-4-4"
					/>
				</svg>
			</div>
		</div>
	);
}

DropdownSelection.Option = function DropdownSelectionOption({
	value,
	text,
	...restProps
}) {
	return (
		<option value={value} {...restProps}>
			{text ? text : value}
		</option>
	);
};
