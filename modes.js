const wordSamples = [
    "the quick brown fox jumps over the lazy dog",
    "a journey of a thousand miles begins with a single step",
    "all that glitters is not gold",
    "curiosity killed the cat",
    "every cloud has a silver lining",
    "fortune favors the bold",
    "good things come to those who wait",
    "honesty is the best policy",
    "if it is not broke do not fix it",
    "knowledge is power",
    "laughter is the best medicine",
    "actions speak louder than words",
    "practice makes perfect",
    "the early bird catches the worm",
    "where there is a will there is a way",
    "you cannot judge a book by its cover",
    "the pen is mightier than the sword",
    "when in rome do as the romans do",
    "two heads are better than one",
    "when the going gets tough the tough get going"
];

function generateText(mode, textDisplay) {
    let characters = [];
    textDisplay.innerHTML = ''; // Clear previous text

    if (mode === 'letters_ordered') {
        textDisplay.classList.add('letters-mode');
        const letterRows = ["abcdefghijklm", "nopqrstuvwxyz"];
        letterRows.forEach(row => {
            const rowDiv = document.createElement('div');
            rowDiv.classList.add('letters-row');
            row.split('').forEach(char => {
                const span = document.createElement('span');
                span.textContent = char;
                rowDiv.appendChild(span);
                characters.push(span);
            });
            textDisplay.appendChild(rowDiv);
        });
    } else if (mode === 'letters_random') {
        textDisplay.classList.add('letters-mode');
        const alphabet = "abcdefghijklmnopqrstuvwxyz";
        const shuffled = alphabet.split('').sort(() => 0.5 - Math.random());
        const row1 = shuffled.slice(0, 13);
        const row2 = shuffled.slice(13);
        [row1, row2].forEach(row => {
            const rowDiv = document.createElement('div');
            rowDiv.classList.add('letters-row');
            row.forEach(char => {
                const span = document.createElement('span');
                span.textContent = char;
                rowDiv.appendChild(span);
                characters.push(span);
            });
            textDisplay.appendChild(rowDiv);
        });
    } else if (mode === 'words') {
        textDisplay.classList.remove('letters-mode');
        const text = wordSamples[Math.floor(Math.random() * wordSamples.length)];
        const words = text.split(' ');

        words.forEach((word, index) => {
            const wordEl = document.createElement('span');
            wordEl.classList.add('word');

            word.split('').forEach(char => {
                const span = document.createElement('span');
                const letterSpan = document.createElement('span');
                letterSpan.classList.add('letter');
                letterSpan.textContent = char;
                span.appendChild(letterSpan);
                wordEl.appendChild(span);
                characters.push(span);
            });

            if (index < words.length - 1) {
                const spaceSpan = document.createElement('span');
                spaceSpan.classList.add('space');
                const letterSpan = document.createElement('span');
                letterSpan.classList.add('letter');
                letterSpan.innerHTML = '&nbsp;';
                spaceSpan.appendChild(letterSpan);
                wordEl.appendChild(spaceSpan);
                characters.push(spaceSpan);
            }
            textDisplay.appendChild(wordEl);
        });
    }
    return characters;
}
