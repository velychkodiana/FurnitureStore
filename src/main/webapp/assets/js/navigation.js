document.addEventListener('DOMContentLoaded', function() {
    // Отримуємо всі навігаційні посилання
    const navLinks = document.querySelectorAll('.navbar-links a[href^="#"]');

    // Додаємо обробник кліку для кожного посилання
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetSection = document.querySelector(targetId);
            if (!targetSection) return;

            // Видаляємо активний клас у всіх посилань
            navLinks.forEach(lnk => lnk.classList.remove('active'));

            // Додаємо активний клас до поточного посилання
            this.classList.add('active');

            // Плавний скрол до секції
            window.scrollTo({
                top: targetSection.offsetTop - 80, // Враховуємо висоту header
                behavior: 'smooth'
            });

            // Анімація появи секції
            setTimeout(() => {
                // Видаляємо активний клас у всіх секцій
                document.querySelectorAll('.product-section').forEach(section => {
                    section.classList.remove('active');
                });

                // Додаємо активний клас до цільової секції
                targetSection.classList.add('active');
            }, 300);
        });
    });

    // Активуємо першу секцію при завантаженні
    const firstSection = document.querySelector('.product-section');
    if (firstSection) {
        firstSection.classList.add('active');
    }

    // Активуємо посилання при скролі
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY + 100;

        document.querySelectorAll('.product-section').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });

                section.classList.add('active');
            }
        });
    });
});