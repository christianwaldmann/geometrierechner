import React from "react";
import Input from "./Input";

export default function InputLabeled({
	label,
	symbol,
	value,
	onChange,
	className,
	unit,
	...restProps
}) {
	return (
		<div className="flex my-1">
			<div className="relative flex items-center w-1/2 sm:w-1/3">
				{label}
				<div className="absolute right-0 text-sm font-semibold text-gray-400 w-7">
					{symbol}
				</div>
			</div>
			<Input
				value={value}
				onChange={onChange}
				className="w-1/2 sm:w-2/3"
				unit={unit}
			/>
		</div>
	);
}
