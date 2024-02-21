import html2canvas from "html2canvas";


export default async function createImages(id) {
	const image = await html2canvas(document.querySelector(`#${id}`)).then(
		(canvas) => {
			return canvas.toDataURL();
		}
	);

	return image;
}

