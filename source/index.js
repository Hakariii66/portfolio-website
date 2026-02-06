document.addEventListener('DOMContentLoaded', function() {
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navbarContainer = document.querySelector('.navbar-container');

    // Hamburger menu toggle
    hamburgerMenu.addEventListener('click', function() {
        hamburgerMenu.classList.toggle('active');
        navbarContainer.classList.toggle('active');
    });

    // Navbar link click handler
    const navLinks = document.querySelectorAll('.navbar-links a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Cek jika href dimulai dengan # (anchor link)
            const href = this.getAttribute('href');
            
            if (href && href.startsWith('#')) {
                e.preventDefault(); // Hentikan navigasi default
                
                const targetId = href.substring(1); // Hapus # dari href
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    // Scroll ke element target dengan smooth effect
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Adjust untuk navbar height
                        behavior: 'smooth'
                    });
                    
                    // Update active class di navbar
                    navLinks.forEach(link => link.classList.remove('activate-page'));
                    this.classList.add('activate-page');
                }
            }
            
            // Tutup hamburger menu di mobile
            hamburgerMenu.classList.remove('active');
            navbarContainer.classList.remove('active');
        });
    });

    // Update active nav link berdasarkan scroll position
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY + 100; // Offset untuk deteksi lebih awal
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('activate-page');
            const href = link.getAttribute('href');
            if (href === `#${current}`) {
                link.classList.add('activate-page');
            }
        });
    });
});