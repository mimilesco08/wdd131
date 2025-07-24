  document.addEventListener('DOMContentLoaded', function() {
            // Update footer with current year and last modified date
            const currentYear = new Date().getFullYear();
            const lastModified = document.lastModified;
            
            document.getElementById('currentyear').textContent = currentYear;
            document.getElementById('lastmodified').textContent = lastModified;

            // Hamburger menu functionality
            const menuButton = document.getElementById('menu-button');
            const navigation = document.getElementById('navigation');

            menuButton.addEventListener('click', function() {
                navigation.classList.toggle('show');
                menuButton.classList.toggle('active');
                
                // Update aria-expanded for accessibility
                const isExpanded = navigation.classList.contains('show');
                menuButton.setAttribute('aria-expanded', isExpanded);
            });

            // Navigation filtering functionality
            const navLinks = document.querySelectorAll('.nav-link');
            const templeCards = document.querySelectorAll('.temple-card');
            const pageTitle = document.getElementById('page-title');

            navLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // Remove active class from all links
                    navLinks.forEach(l => l.classList.remove('active'));
                    // Add active class to clicked link
                    this.classList.add('active');
                    
                    const filter = this.getAttribute('data-filter');
                    filterTemples(filter);
                    updatePageTitle(this.textContent);
                    
                    // Close mobile menu after selection
                    navigation.classList.remove('show');
                    menuButton.classList.remove('active');
                    menuButton.setAttribute('aria-expanded', 'false');
                });
            });

            function filterTemples(filter) {
                templeCards.forEach(card => {
                    const categories = card.getAttribute('data-category') || '';
                    
                    if (filter === 'all' || categories.includes(filter)) {
                        card.classList.remove('hidden');
                        // Add entrance animation
                        card.style.animation = 'fadeIn 0.5s ease-in';
                    } else {
                        card.classList.add('hidden');
                    }
                });
            }

            function updatePageTitle(filterText) {
                const titles = {
                    'Home': 'Sacred Temples Around the World',
                    'Old': 'Historic Temples',
                    'New': 'Modern Temples',
                    'Large': 'Grand Temples',
                    'Small': 'Intimate Temples'
                };
                
                pageTitle.textContent = titles[filterText] || 'Sacred Temples Around the World';
            }

            // Close mobile menu when clicking outside
            document.addEventListener('click', function(e) {
                if (!e.target.closest('header')) {
                    navigation.classList.remove('show');
                    menuButton.classList.remove('active');
                    menuButton.setAttribute('aria-expanded', 'false');
                }
            });

            // Handle window resize
            window.addEventListener('resize', function() {
                if (window.innerWidth >= 768) {
                    navigation.classList.remove('show');
                    menuButton.classList.remove('active');
                    menuButton.setAttribute('aria-expanded', 'false');
                }
            });

            // Add CSS animation keyframes
            const style = document.createElement('style');
            style.textContent = `
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `;
            document.head.appendChild(style);
        });