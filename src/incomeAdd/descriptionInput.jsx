import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';

export default function DescriptionInput(props) {
    const { setDescription, description } = props;
    const [isRecording, setIsRecording] = useState(false);
    const [recognition, setRecognition] = useState(null);
    const [showBtn, setShowBtn] = useState(true);

    useEffect(() => {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognitionInstance = new SpeechRecognition();
            recognitionInstance.lang = 'pt-BR'; // Idioma: Português do Brasil
            recognitionInstance.interimResults = false;

            recognitionInstance.onresult = (event) => {
                const lastResult = event.results[event.results.length - 1][0].transcript;
                setDescription((prev) => (prev ? prev + ' ' + lastResult : lastResult));
            };

            recognitionInstance.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
            };

            setRecognition(recognitionInstance);
        } else {
            setShowBtn(false);
            console.warn('Seu navegador não suporta a Web Speech API.');
        }
    }, [setDescription]);

    const startRecording = () => {
        setDescription('');
        if (recognition) {
            recognition.start();
            setIsRecording(true);
        }
    };

    const stopRecording = () => {
        if (recognition) {
            recognition.stop();
            setIsRecording(false);
        }
    };

    return (
        <div className="input-group">
            <input
                type="text"
                className="form-control"
                placeholder="Descrição"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            {showBtn && (
                <button
                    onMouseDown={startRecording}
                    onMouseUp={stopRecording}
                    onTouchStart={startRecording}
                    onTouchEnd={stopRecording}
                    className={`btn ${isRecording ? 'btn-danger' : 'btn-secondary'}`}
                >
                    <FontAwesomeIcon icon={faMicrophone} />
                </button>

            )}

        </div>
    );
}
