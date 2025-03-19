const elements = document.querySelectorAll('.hidden');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.2 });

elements.forEach(el => observer.observe(el));

function generateCalendar() {
    let year = 2025;
    let month = 3; // Апрель (нумерация с 0)
    let highlightedDay = 26;
    
    let firstDay = new Date(year, month, 1).getDay();
    let daysInMonth = new Date(year, month + 1, 0).getDate();
    
    let calendarDays = document.getElementById("calendarDays");
    calendarDays.innerHTML = "";
    
    for (let i = 0; i < (firstDay || 7) - 1; i++) {
        calendarDays.innerHTML += '<div></div>';
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
        let div = document.createElement("div");
        div.innerText = day;
        div.classList.add("day");
        if (day === highlightedDay) {
            div.classList.add("highlight"); 
        }
        calendarDays.appendChild(div);
    }
}

generateCalendar();

document.addEventListener("DOMContentLoaded", () => {
    const audio = document.getElementById("audio");
    const button = document.getElementById("musicButton");
    const icon = document.getElementById("icon");
    let isPlaying = false;

    // Пробуем запустить аудио автоматически
    audio.play().then(() => {
        isPlaying = true;
        button.classList.add("playing");
        icon.src = "https://cdn-icons-png.flaticon.com/512/64/64595.png"; // Pause icon
    }).catch(() => {
        console.log("Автовоспроизведение заблокировано браузером.");
    });

    button.addEventListener("click", () => {
        if (isPlaying) {
            audio.pause();
            button.classList.remove("playing");
            icon.src = "https://cdn-icons-png.flaticon.com/512/27/27223.png"; // Play icon
        } else {
            audio.play();
            button.classList.add("playing");
            icon.src = "https://cdn-icons-png.flaticon.com/512/64/64595.png"; // Pause icon
        }
        isPlaying = !isPlaying;
    });
});


document.addEventListener("DOMContentLoaded", () => {
    let decorCount = 7; // Четко 7 декоров
    let step = 325; // 350px между декорами

    for (let i = 0; i < decorCount; i++) {
        let decor = document.createElement("img");
        decor.src = `media/img/2/flower.png`;
        decor.classList.add("decor");
        
        let side = i % 2 === 0 ? "left" : "right"; // Чередуем стороны
        let distance = Math.random() * 20 + 40; // 40-60px отдаление
        let offset = Math.random() * 30 + 10; // 10-40px отступ от края
        let size = Math.random() * 20 + 50; // Размер 50-70px
        let topPos = (i + 1) * step; // Расстояние между декорами
        let rotation = Math.random() * 360; // Поворот от 0° до 360°

        decor.style.position = "absolute";
        decor.style.width = `${size}px`;
        decor.style.height = "auto";
        decor.style[side] = `${offset}px`;
        decor.style.top = `${topPos}px`;
        decor.style.zIndex = "-1";
        decor.style.opacity = "0.8";
        decor.style.pointerEvents = "none";
        decor.style.transform = `translateX(${side === "left" ? `-${distance}px` : distance}px) rotate(${rotation}deg)`;
        decor.style.transformOrigin = "center"; // Делаем поворот вокруг центра
        decor.style.maxWidth = "100%";

        document.body.appendChild(decor); 
    }
});



document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".decor").forEach(decor => {
        decor.dataset.speed = (Math.random() * 0.1 + 0.3).toFixed(2); // Генерируем случайную скорость 0.3 - 0.4
    });
});

document.addEventListener("scroll", () => {
    document.querySelectorAll(".decor").forEach(decor => {
        let speed = parseFloat(decor.dataset.speed); // Берём сохранённую скорость
        decor.style.transform = `translateY(${window.scrollY * speed}px)`;
    });
});
