document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const textDisplay = document.getElementById('text-display');
    const inputArea = document.getElementById('input-area');
    const startPrompt = document.getElementById('start-prompt');
    const restartBtn = document.getElementById('restart-btn');

    // --- State Variables ---
    let characters = [];
    let currentIndex = 0;
    let startTime;
    let timer;
    let errorCount = 0;
    let correctlyTypedString = "";
    let erroredIndices = new Set();

    // --- Main Test Logic ---
    function startNewTest() {
        // 1. Reset State
        clearInterval(timer);
        currentIndex = 0;
        startTime = null;
        errorCount = 0;
        correctlyTypedString = "";
        erroredIndices.clear();
        inputArea.value = '';

        // 2. Reset UI
        $('#summary-modal').removeClass('visible');
        $('#restart-btn').removeClass('v-hidden');
        updateStats(0, 100);
        updateTime(0);

        // 3. Generate Text for the current mode
        const urlParams = new URLSearchParams(window.location.search);
        const mode = urlParams.get('mode') || 'letters_ordered';
        characters = generateText(mode, textDisplay);

        // 4. Update UI for new test
        if (characters.length > 0) {
            const firstChar = characters[0].textContent;
            const promptText = firstChar === ' ' ? '空格' : firstChar;
            startPrompt.innerHTML = `请输入字母 <span class="highlight">${promptText}</span> 开始计时`;
            startPrompt.classList.remove('hidden');
        } else {
            startPrompt.classList.add('hidden');
        }
        
        updateCursorPosition(currentIndex, characters);
        updateNextKeyHint(currentIndex, characters);
        inputArea.focus();
    }

    function handleInput() {
        if (currentIndex >= characters.length) return;

        const typedText = inputArea.value;
        const typedChar = typedText.slice(-1);
        const targetChar = characters[currentIndex].textContent;
        const $currentSpan = $(characters[currentIndex]);

        const isCorrect = (targetChar === '\u00A0' && typedChar === ' ') || (typedChar === targetChar);

        if (!startTime) {
            if (isCorrect) {
                startTime = new Date();
                timer = setInterval(() => {
                    const elapsedTime = (new Date() - startTime) / 1000;
                    updateTime(elapsedTime);
                }, 10);
                startPrompt.classList.add('hidden');
                processCorrectChar($currentSpan, typedChar);
            } else {
                inputArea.value = ''; // Clear wrong first input
            }
        } else {
            if (isCorrect) {
                processCorrectChar($currentSpan, typedChar);
            } else {
                processIncorrectChar($currentSpan);
            }
        }
    }

    function processCorrectChar($span, typedChar) {
        const wasErrored = erroredIndices.has(currentIndex);
        
        // Clean up all competing classes first
        $span.addClass('typed-char').removeClass('incorrect incorrect-shake correct');
        
        // Add animation
        $span.find('.letter').addBack($span).addClass('correct-bing');
        
        // Apply the correct final state class
        if (wasErrored) {
            $span.addClass('corrected-error');
        } else {
            $span.addClass('correct');
        }

        correctlyTypedString += typedChar;
        currentIndex++;
        
        updateUIState();

        if (currentIndex >= characters.length) {
            endTest();
        }
    }

    function processIncorrectChar($span) {
        $span.addClass('typed-char incorrect incorrect-shake');
        if (!erroredIndices.has(currentIndex)) {
            errorCount++;
            erroredIndices.add(currentIndex);
        }
        inputArea.value = correctlyTypedString;
        updateUIState();
    }

    function endTest() {
        clearInterval(timer);
        inputArea.blur();
        const elapsedTime = (new Date() - startTime) / 1000;
        const wpm = calculateWPM(elapsedTime);
        const accuracy = calculateAccuracy();
        const cps = elapsedTime > 0 ? currentIndex / elapsedTime : 0;
        showSummary(wpm, accuracy, `${elapsedTime.toFixed(2)}s`, cps);
    }

    // --- UI & State Updaters ---
    function updateUIState() {
        const elapsedTime = startTime ? (new Date() - startTime) / 1000 : 0;
        updateStats(calculateWPM(elapsedTime), calculateAccuracy());
        updateCursorPosition(currentIndex, characters);
        updateNextKeyHint(currentIndex, characters);

        // Remove animation classes after they've played
        setTimeout(() => {
            $('.correct-bing').removeClass('correct-bing');
            $('.incorrect-shake').removeClass('incorrect-shake');
        }, 200);
    }
    
    function calculateWPM(elapsedTime) {
        if (elapsedTime === 0) return 0;
        return Math.round(((currentIndex / 5) / elapsedTime) * 60);
    }

    function calculateAccuracy() {
        const totalPresses = currentIndex + errorCount;
        return totalPresses > 0 ? Math.round((currentIndex / totalPresses) * 100) : 100;
    }


    // --- Event Listeners ---
    restartBtn.addEventListener('click', startNewTest);
    $('#summary-restart-btn').on('click', startNewTest);
    inputArea.addEventListener('input', handleInput);

    $(document).on('keydown', (e) => {
        inputArea.focus();
        $(`.key[data-code='${e.code}']`).addClass('key-pressed');
    });

    $(document).on('keyup', (e) => {
        $(`.key[data-code='${e.code}']`).removeClass('key-pressed');
    });

    // --- Initial Load ---
    createKeyboard();
    startNewTest();
    
    requestAnimationFrame(() => {
        setTimeout(() => {
            document.querySelector('.container').classList.add('loaded');
        }, 100);
    });
});
