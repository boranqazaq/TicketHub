const events = [
    {
        id: 1,
        title: "Конференция по AI",
        category: "conference",
        date: "15 ноября",
        time: "10:00",
        location: "Blue Hall",
        description: "Узнайте о последних достижениях в области искусственного интеллекта",
        price: "Бесплатно",
        emoji: "🤖"
    },
    {
        id: 2,
        title: "Мастер-класс по веб-дизайну",
        category: "workshop",
        date: "16 ноября",
        time: "14:00",
        location: "H02",
        description: "Практический мастер-класс по современному веб-дизайну",
        price: "2000 тг",
        emoji: "🎨"
    },
    {
        id: 3,
        title: "Семинар по бизнесу",
        category: "seminar",
        date: "17 ноября",
        time: "11:00",
        location: "Red Hall",
        description: "Как начать собственный бизнес: советы от экспертов",
        price: "1500 тг",
        emoji: "💼"
    },
    {
        id: 4,
        title: "Музыкальный фестиваль",
        category: "festival",
        date: "18 ноября",
        time: "18:00",
        location: "Mini Red Hall",
        description: "Музыка, танцы и атмосфера настоящего праздника",
        price: "690 тг",
        emoji: "🎵"
    }
];

// ПОКАЗ СТРАНИЦ
function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(p => p.classList.remove('active'));

    document.getElementById(pageId).classList.add('active');
    window.scrollTo(0, 0);
}

const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');
const links = document.querySelectorAll('#nav-links a');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

links.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    })
});

// РЕНДЕР КАРТОЧЕК
function renderEvents(filteredEvents = events) {
    const grid = document.getElementById("eventsGrid");

    grid.innerHTML = "";

    if (filteredEvents.length === 0) {
        grid.innerHTML = "<p style='text-align:center; color:#666;'>Ничего не найдено</p>";
        return;
    }

    filteredEvents.forEach(ev => {
        grid.innerHTML += `
        <div class="event-card">
            <div class="event-image">${ev.emoji}</div>
            <div class="event-content">
                <h3 class="event-title">${ev.title}</h3>
    
                <div class="event-meta">
                    <div class="event-meta-item"><img src="img/date-img.svg" alt="date" width="16" height="16"> ${ev.date}</div>
                    <div class="event-meta-item"><img src="img/alarm-img.svg" alt="date" width="16" height="16"> ${ev.time}</div>
                    <div class="event-meta-item"><img src="img/location-black-img.svg" alt="date" width="16" height="16"> ${ev.location}</div>
                </div>

                <p class="event-description">${ev.description}</p>

                <div class="event-footer">
                    <span class="event-price">${ev.price}</span>
                    <button class="btn btn-primary" onclick="openModal('${ev.title}')">Бронировать</button>
                </div>
            </div>
        </div>
        `;
    });
}

renderEvents();

// ПОИСК
function searchEvents() {
    const text = document.getElementById("searchInput").value.toLowerCase();
    const category = document.getElementById("categorySelect").value;

    const filtered = events.filter(ev =>
        (ev.title.toLowerCase().includes(text)) &&
        (category === "" || ev.category === category)
    );

    renderEvents(filtered);
}

// МОДАЛЬНОЕ ОКНО
function openModal(eventName) {
    document.getElementById("eventName").value = eventName;
    document.getElementById("textForm").addEventListener("click", function () {
        window.open("https://docs.google.com/forms/d/e/1FAIpQLSf2rgzleyEkV-wh1KMRVqqWsDiN3JKAvVjcW5US79STYf3R5w/viewform?usp=publish-editor", "_blank");
    });
    document.getElementById("bookingModal").style.display = "block";
}

function closeModal() {
    document.getElementById("bookingModal").style.display = "none";
}

// БРОНИРОВАНИЕ
document.getElementById("bookingForm").addEventListener("submit", e => {
    e.preventDefault();

    closeModal();

    const msg = document.getElementById("successMessage");
    msg.style.display = "block";

    setTimeout(() => {
        msg.style.display = "none";
    }, 3000);
});

// ОБРАБОТКА ФОРМЫ КОНТАКТОВ
document.getElementById("contactForm").addEventListener("submit", e => {
    e.preventDefault();
    alert("Ваше сообщение отправлено. Мы свяжемся с вами!");
    e.target.reset();
});
