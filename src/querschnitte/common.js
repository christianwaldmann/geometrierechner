export function onParameterChange(event, updateFn) {
	if (event.target.checkValidity()) {
		updateFn(parseFloat(event.target.value));
	}
}