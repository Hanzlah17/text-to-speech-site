const synth = window.speechSynthesis;
const form = document.querySelector('form');
const input = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');
const icon = document.querySelector('#icon');
let voices = [];
const getVoices = () => {
    voices = synth.getVoices();
    voices.forEach(voice => {
        const option = document.createElement('option');
        option.textContent = `${voice.name} (${voice.lang}) `;
        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        voiceSelect.appendChild(option);

    });
}
if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = getVoices;
}
const speak = () => {
    if (synth.speaking) {
        return;
    }
    if (input.value !== '') {
        const speakText = new SpeechSynthesisUtterance(input.value);
        icon.classList='fa-solid fa-volume-high fa-beat-fade';
        speakText.onend = e => {
            icon.classList='fa-solid fa-microphone';
        }
        const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');
        voices.forEach(voice => {
            if (voice.name === selectedVoice) {
                speakText.voice = voice;
            }
        });
        speakText.rate = rate.value;
        speakText.pitch = pitch.value;
        synth.speak(speakText);
    }
}
form.addEventListener('submit', (e) => {
    e.preventDefault();
    speak();
    input.blur();
})
rate.addEventListener('change', () => rateValue.textContent = rate.value);
pitch.addEventListener('change', () => pitchValue.textContent = pitch.value);
voiceSelect.addEventListener('change', speak);