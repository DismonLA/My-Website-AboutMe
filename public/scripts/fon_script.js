// ДВИЖЕНИЕ ЗРАЧКОВ
document.addEventListener('mousemove', (event) => {
  const eyes = document.querySelectorAll('.eye');
  
  eyes.forEach((eye) => {
    const pupil = eye.querySelector('.pupil');
    
    // Координаты и центр глаза
    const rect = eye.getBoundingClientRect();
    const eyeCenterX = rect.left + rect.width / 2;
    const eyeCenterY = rect.top + rect.height / 2;

    // Угол от центра глаза к курсору
    const angle = Math.atan2(
      event.clientY - eyeCenterY,
      event.clientX - eyeCenterX
    );

    // Радиус движения зрачка
    const maxOffset = 3; 
    const offsetX = Math.cos(angle) * maxOffset;
    const offsetY = Math.sin(angle) * maxOffset;

    // Смещаем зрачок
    pupil.style.transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px))`;
  });
});

// ЗАПУСК МОРГАНИЯ ПАРАМИ после загрузки
document.addEventListener('DOMContentLoaded', () => {
  startBlinkingPairs();
});

/**
 * Функция периодического мигания парами:
 * - Раз в 10 секунд (точнее, при старте мигания),
 * - Закрываем выбранную пару на 4 секунды,
 * - Потом открываем.
 */
function startBlinkingPairs() {
  const pairs = document.querySelectorAll('.eye-pair');
  if (!pairs.length) return;

  // Запускаем цикл
  blinkOncePair();

  function blinkOncePair() {
    // Выбираем случайную пару
    const randomIndex = Math.floor(Math.random() * pairs.length);
    const pair = pairs[randomIndex];

    // Все глаза в этой паре (2 шт)
    const eyesInPair = pair.querySelectorAll('.eye');

    // Закрываем глаза (добавляем класс blinking)
    eyesInPair.forEach(eye => {
      eye.classList.add('blinking');
    });

    // Через 4 секунды "открываем" обратно
    setTimeout(() => {
      eyesInPair.forEach(eye => {
        eye.classList.remove('blinking');
      });
    }, 4000);

    // Следующий раз начинаем мигание 
    // ровно через 10 секунд (считая от начала этого мигания)
    setTimeout(blinkOncePair, 10000);
  }
}
