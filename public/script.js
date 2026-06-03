function updateThemeManually(isDark) {
    const htmlElement = document.documentElement;
    const themeIcon = document.getElementById('theme-icon');
    
    if (isDark) {
        htmlElement.classList.add('dark');
        if (themeIcon) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
        localStorage.setItem('theme', 'dark');
        
        document.body.style.backgroundColor = '#111827';
        document.body.style.color = '#f3f4f6';
    } else {
        htmlElement.classList.remove('dark');
        if (themeIcon) {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
        localStorage.setItem('theme', 'light');
        
        document.body.style.backgroundColor = '#f9fafb';
        document.body.style.color = '#1f2937';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    let isDarkMode = false;
    if (savedTheme === 'dark') {
        isDarkMode = true;
    } else if (savedTheme === 'light') {
        isDarkMode = false;
    } else {
        isDarkMode = systemPrefersDark;
    }
    
    updateThemeManually(isDarkMode);
    
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            themeToggleBtn.style.transform = 'scale(0.9)';
            setTimeout(() => {
                themeToggleBtn.style.transform = 'scale(1)';
            }, 150);
            
            const currentIsDark = document.documentElement.classList.contains('dark');
            updateThemeManually(!currentIsDark);
        });
    }
    
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class') {
                const isDark = htmlElement.classList.contains('dark');
                if (isDark) {
                    document.body.classList.add('dark');
                } else {
                    document.body.classList.remove('dark');
                }
            }
        });
    });
    
    observer.observe(htmlElement, { attributes: true });
});
