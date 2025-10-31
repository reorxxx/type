const performanceLevels = [
    { minSpeed: 0,    maxSpeed: 1,    title: "1级", message: "加油哦！你太棒了，继续！" },
    { minSpeed: 1,    maxSpeed: 1.2,  title: "2级", message: "进步了！保持练习！" },
    { minSpeed: 1.2,  maxSpeed: 1.8,  title: "3级", message: "加油哦！你太棒了，继续!！" },
    { minSpeed: 1.8,  maxSpeed: 2,    title: "4级", message: "很好！速度在提升，继续！" },
    { minSpeed: 2,    maxSpeed: 2.2,  title: "5级", message: "厉害了！你已经很熟练了！！" },
    { minSpeed: 2.2,  maxSpeed: 2.6,  title: "6级", message: "优秀！你的速度很快！继续！" },
    { minSpeed: 2.6,  maxSpeed: 3,    title: "7级", message: "太棒了！你是打字高手" },
    { minSpeed: 3,    maxSpeed: 4,    title: "8级", message: "你的速度超过90%的人类了！" },
    { minSpeed: 4,    maxSpeed: 4.2,  title: "9级", message: "超神！你是打字之王！" },
    { minSpeed: 4.2,  maxSpeed: Infinity, title: "10级", message: "你已经超越人类极限了!!！" }
];

function calculatePerformanceLevel(cps) {
    // The new level calculation is based on Characters Per Second (CPS)
    // and does not consider accuracy for rating.
    for (let i = performanceLevels.length - 1; i >= 0; i--) {
        if (cps >= performanceLevels[i].minSpeed) {
            // Add a class name for styling, similar to the old system
            return { ...performanceLevels[i], className: `level-${i + 1}` };
        }
    }
    return { ...performanceLevels[0], className: "level-1" };
}

function showSummary(wpm, accuracy, time, cps) {
    const levelData = calculatePerformanceLevel(cps);

    $('#summary-wpm').text(wpm);
    $('#summary-accuracy').text(`${accuracy}%`);
    $('#summary-time').text(time);
    $('#summary-title').html(`${levelData.title}`);
    $('#summary-subtitle').text(levelData.message);
    
    const $summaryContent = $('#summary-content');
    // Generate a list of all possible level classes to remove them all
    const allLevelClasses = performanceLevels.map((p, i) => `level-${i + 1}`).join(' ');
    $summaryContent.removeClass(allLevelClasses).addClass(levelData.className);

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
