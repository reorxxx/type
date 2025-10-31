const performanceLevels = [
    { title: "打字速度 1 级", icon: "🐌", subtitle: "万事开头难，坚持就是胜利！", className: "level-1" },
    { title: "打字速度 2 级", icon: "🌱", subtitle: "很棒的开始，手指开始熟悉键盘了。", className: "level-2" },
    { title: "打字速度 3 级", icon: "📈", subtitle: "看到了明显的进步，继续保持！", className: "level-3" },
    { title: "打字速度 4 级", icon: "👍", subtitle: "速度越来越快，错误率也在降低。", className: "level-4" },
    { title: "打字速度 5 级", icon: "🎉", subtitle: "你已经超过了平均水平，为你喝彩！", className: "level-5" },
    { title: "打字速度 6 级", icon: "💧", subtitle: "行云流水，打字对你来说变得轻松自如。", className: "level-6" },
    { title: "打字速度 7 级", icon: "😎", subtitle: "你已是一位打字高手，展现出了真正的实力。", className: "level-7" },
    { title: "打字速度 8 级", icon: "⚡️", subtitle: "快如闪电！你的手指在键盘上飞舞。", className: "level-8" },
    { title: "打字速度 9 级", icon: "🕺", subtitle: "这不仅是打字，更像是一场指尖上的舞蹈。", className: "level-9" },
    { title: "打字速度 10 级", icon: "👑", subtitle: "登峰造极！你就是当之无愧的键盘之王！", className: "level-10" }
];

function calculatePerformanceLevel(wpm, accuracy) {
    if (accuracy < 80) return 0;
    if (accuracy < 90) return wpm < 30 ? 1 : 2;
    if (wpm < 20) return 1;
    if (wpm < 30) return 2;
    if (wpm < 40) return 3;
    if (wpm < 50) return 4;
    if (wpm < 60) return 5;
    if (wpm < 70) return 6;
    if (wpm < 80) return 7;
    if (wpm < 100) return 8;
    return 9;
}

function showSummary(wpm, accuracy, time) {
    const levelIndex = calculatePerformanceLevel(wpm, accuracy);
    const levelData = performanceLevels[levelIndex];

    $('#summary-wpm').text(wpm);
    $('#summary-accuracy').text(`${accuracy}%`);
    $('#summary-time').text(time);
    $('#summary-title').html(`${levelData.icon} ${levelData.title} ${levelData.icon}`);
    $('#summary-subtitle').text(levelData.subtitle);
    
    const $summaryContent = $('#summary-content');
    $summaryContent.removeClass(performanceLevels.map(p => p.className).join(' ')).addClass(levelData.className);

    $('#summary-modal').addClass('visible');
    $('#restart-btn').addClass('v-hidden');
}

function updateNextKeyHint(currentIndex, characters) {
    $('.key.next-key-hint').removeClass('next-key-hint');
    if (currentIndex >= characters.length) return;
    const nextChar = characters[currentIndex].textContent.toLowerCase();
    const $key = $(`.key[data-key='${nextChar}']`);
    if ($key.length > 0) {
        $key.addClass('next-key-hint');
    }
}

function updateCursorPosition(currentIndex, characters) {
    $('.active-char').removeClass('active-char');
    if (currentIndex < characters.length) {
        $(characters[currentIndex]).addClass('active-char');
    }
}

function updateStats(wpm, accuracy) {
    $('#wpm').text(wpm);
    $('#accuracy').text(`${accuracy}%`);
}

function updateTime(time) {
    $('#time').text(`${time.toFixed(2)}s`);
}
