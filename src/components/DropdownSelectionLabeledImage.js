import React from "react";
import DropdownSelection from "./DropdownSelection";

export default function DropdownSelectionLabeledImage({
	id,
	label,
	src,
	alt,
	value,
	onChange,
	children,
}) {
	return (
		<>
			<div className="flex">
				<label
					className="flex items-center w-1/2 pt-2 sm:w-1/3 sm:inline-block sm:pt-1"
					htmlFor={id}
				>
					{label}
				</label>
				<div className="w-1/2 sm:w-2/3">
					<div className="flex">
						<div className="hidden object-contain w-36 h-36 sm:inline-block">
							<img src={src} alt={alt} />
						</div>
						<div className="w-full ml-auto sm:w-1/2">
							<DropdownSelection
								id={id}
								value={value}
								className="w-full"
								onChange={onChange}
							>
								{children}
							</DropdownSelection>
						</div>
					</div>
				</div>
			</div>
			<div className="flex justify-center mt-4 sm:hidden">
				<div className="object-contain w-44 h-44">
					<img src={src} alt={alt} />
				</div>
			</div>
		</>
	);
}

DropdownSelectionLabeledImage.Option =
	function DropdownSelectionLabeledImageOption({ ...restProps }) {
		return <DropdownSelection.Option {...restProps} />;
	};
