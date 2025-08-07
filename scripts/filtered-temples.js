
const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    
    {
        templeName: "Salt Lake Temple",
        location: "Salt Lake City, Utah, United States",
        dedicated: "1893, April, 6",
        area: 253015,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/salt-lake/400x250/salt-lake-temple-15669-wallpaper.jpg"
    },
    {
        templeName: "Tokyo Japan",
        location: "Tokyo, Japan",
        dedicated: "1980, October, 27",
        area: 53997,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/tokyo-japan/400x250/tokyo_japan_temple-exterior-1.jpeg"
    },
    {
        templeName: "Provo City Center",
        location: "Provo, Utah, United States",
        dedicated: "2016, March, 20",
        area: 85084,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/provo-city-center/400x250/provo-city-center-temple-1572517-wallpaper.jpg"
    }
];

document.addEventListener('DOMContentLoaded', function() {
    
    const currentYear = new Date().getFullYear();
    const lastModified = document.lastModified;
    
    document.getElementById('currentyear').textContent = currentYear;
    document.getElementById('lastmodified').textContent = lastModified;

    
    generateTempleCards(temples);


    const menuButton = document.getElementById('menu-button');
    const navigation = document.getElementById('navigation');

    menuButton.addEventListener('click', function() {
        navigation.classList.toggle('show');
        menuButton.classList.toggle('active');
        
        
        const isExpanded = navigation.classList.contains('show');
        menuButton.setAttribute('aria-expanded', isExpanded);
    });

    
    const navLinks = document.querySelectorAll('.nav-link');
    const pageTitle = document.getElementById('page-title');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            
            navLinks.forEach(l => l.classList.remove('active'));
            
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            filterTemples(filter);
            updatePageTitle(this.textContent);
            
            
            navigation.classList.remove('show');
            menuButton.classList.remove('active');
            menuButton.setAttribute('aria-expanded', 'false');
        });
    });

    
    document.addEventListener('click', function(e) {
        if (!e.target.closest('header')) {
            navigation.classList.remove('show');
            menuButton.classList.remove('active');
            menuButton.setAttribute('aria-expanded', 'false');
        }
    });

  
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768) {
            navigation.classList.remove('show');
            menuButton.classList.remove('active');
            menuButton.setAttribute('aria-expanded', 'false');
        }
    });
});

function generateTempleCards(templeArray) {
    const templeGrid = document.getElementById('temple-grid');
    templeGrid.innerHTML = ''; 

    templeArray.forEach((temple, index) => {
        const card = document.createElement('figure');
        card.className = 'temple-card';
        
        
        const dedicatedYear = parseInt(temple.dedicated.split(',')[0]);
        const area = temple.area;
        let categories = [];
        
        if (dedicatedYear < 1900) categories.push('old');
        if (dedicatedYear > 2000) categories.push('new');
        if (area > 90000) categories.push('large');
        if (area < 10000) categories.push('small');
        
        card.setAttribute('data-categories', categories.join(' '));
        
       
        card.style.animationDelay = `${index * 0.1}s`;

        card.innerHTML = `
            <img src="${temple.imageUrl}" 
                 alt="${temple.templeName}" 
                 loading="lazy">
            <div class="temple-info">
                <h3 class="temple-name">${temple.templeName}</h3>
                <p class="temple-location">📍 ${temple.location}</p>
                <p class="temple-dedicated">🗓️ Dedicated: ${temple.dedicated}</p>
                <p class="temple-area">📏 Area: ${temple.area.toLocaleString()} sq ft</p>
            </div>
        `;

        templeGrid.appendChild(card);
    });
}

function filterTemples(filter) {
    const templeCards = document.querySelectorAll('.temple-card');
    
    templeCards.forEach((card, index) => {
        const categories = card.getAttribute('data-categories') || '';
        
        if (filter === 'all' || categories.includes(filter)) {
            card.classList.remove('hidden');
           
            card.style.animation = 'none';
            card.offsetHeight; 
            card.style.animation = `fadeIn 0.5s ease-in forwards`;
            card.style.animationDelay = `${index * 0.1}s`;
        } else {
            card.classList.add('hidden');
        }
    });
}

function updatePageTitle(filterText) {
    const titles = {
        'Home': 'Sacred Temples Around the World',
        'Old': 'Historic Temples (Built Before 1900)',
        'New': 'Modern Temples (Built After 2000)',
        'Large': 'Grand Temples (Over 90,000 sq ft)',
        'Small': 'Intimate Temples (Under 10,000 sq ft)'
    };
    
    document.getElementById('page-title').textContent = titles[filterText] || 'Sacred Temples Around the World';
}