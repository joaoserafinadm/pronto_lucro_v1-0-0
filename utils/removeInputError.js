



export default function removeInputError() {

    const elements = Array.from(document.getElementsByClassName('inputError'));

    if (elements.length > 0) {

        elements.map((elem) => {
            elem.classList.remove('inputError');
        });

    }

    return

}