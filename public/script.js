document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const htmlElement = document.documentElement;

    function setTheme(isDark) {
        if (isDark) {
            htmlElement.classList.add('dark');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            htmlElement.classList.remove('dark');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
    }

    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark') {
        setTheme(true);
    } else if (savedTheme === 'light') {
        setTheme(false);
    } else {
        setTheme(systemPrefersDark);
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            themeToggleBtn.style.transform = 'scale(0.9)';
            setTimeout(() => {
                themeToggleBtn.style.transform = 'scale(1)';
            }, 150);
            
            const isDark = htmlElement.classList.contains('dark');
            setTheme(!isDark);
        });
    } else {
        console.error('Tombol theme-toggle tidak ditemukan!');
    }
});
