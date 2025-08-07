// Wait for the DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {

    // --- DATA ---

    const drills = [
        { skill: 'Shooting', name: 'Form Shooting', description: 'Stand 1-2 feet from the basket and shoot one-handed, focusing on your form, follow-through, and rotation. Make 10 swishes before moving back.' },
        { skill: 'Shooting', name: 'Mikan Drill', description: 'Alternate making right-handed and left-handed layups from under the basket without letting the ball hit the floor.' },
        { skill: 'Shooting', name: 'Beat the Pro', description: 'Shoot from a spot. If you make it, you get 1 point. If you miss, the "Pro" gets 2. First to 10 wins. Encourages focus under pressure.' },
        { skill: 'Dribbling', name: 'Stationary Ball Pounds', description: 'In a low athletic stance, pound the ball as hard as you can with your right hand for 30 seconds, then switch to your left. Keep your eyes up.' },
        { skill: 'Dribbling', name: 'Zig-Zag Dribbling', description: 'Set up cones in a zig-zag pattern. Dribble through them, changing direction and hands at each cone. Focus on protecting the ball.' },
        { skill: 'Dribbling', name: 'Two-Ball Dribbling', description: 'Dribble two basketballs at the same time. Try simultaneous pounds, alternating pounds, and walking while dribbling.' },
        { skill: 'Passing', name: 'Wall Passing', description: 'Find a solid wall and practice chest passes, bounce passes, and overhead passes. Aim for a target on the wall and focus on accuracy and speed.' },
        { skill: 'Defense', name: 'Defensive Slides', description: 'Get in a low defensive stance and slide laterally for a set distance without crossing your feet. Stay low and on the balls of your feet.' },
    ];

    // --- DOM ELEMENT SELECTION ---
    
    const yearSpan = document.getElementById('current-year');
    const modifiedSpan = document.getElementById('last-modified');
    const drillDisplay = document.getElementById('drill-display');
    const drillsContainer = document.getElementById('drills-container');
    const skillFilter = document.getElementById('skill-filter');
    const logForm = document.getElementById('practice-log-form');
    const logHistoryContainer = document.getElementById('log-history-container');

    // --- FUNCTIONS ---
   


    function updateFooter() {
        if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
        }
        if (modifiedSpan) {
            modifiedSpan.textContent = document.lastModified;
        }
    }


    function displayRandomDrill() {
        // This check prevents errors on pages without this element.
        if (drillDisplay) {
            const randomIndex = Math.floor(Math.random() * drills.length);
            const randomDrill = drills[randomIndex];
            
            // Using a Template Literal to build the HTML string.
            drillDisplay.innerHTML = `
                <div class="drill-card">
                    <h3>${randomDrill.name}</h3>
                    <p><strong>Skill:</strong> ${randomDrill.skill}</p>
                    <p>${randomDrill.description}</p>
                </div>
            `;
        }
    }

    /**
     * Populates the drills container with drill cards based on a provided filter.
     * @param {Array} filteredDrills - The array of drill objects to display.
     */
    function populateDrills(filteredDrills) {
        if (drillsContainer) {
            drillsContainer.innerHTML = ''; // Clear existing content
            
            // Using an Array Method (forEach) to loop through the data.
            filteredDrills.forEach(drill => {
                const drillCard = document.createElement('div');
                drillCard.className = 'drill-card';
                
                // Using Template Literals for the inner HTML.
                drillCard.innerHTML = `
                    <h3>${drill.name}</h3>
                    <p><strong>Skill:</strong> ${drill.skill}</p>
                    <p>${drill.description}</p>
                `;
                drillsContainer.appendChild(drillCard);
            });
        }
    }

    /**
     * Handles the change event for the skill filter dropdown.
     */
    function handleFilterChange() {
        const selectedSkill = skillFilter.value;
        
        // Conditional Branching to filter the drills.
        if (selectedSkill === 'all') {
            populateDrills(drills);
        } else {
            // Using an Array Method (filter) to create a new array.
            const filtered = drills.filter(drill => drill.skill === selectedSkill);
            populateDrills(filtered);
        }
    }

    /**
     * Handles the submission of the practice log form.
     * @param {Event} event - The form submission event.
     */
    function handleLogSubmit(event) {
        event.preventDefault(); // Prevent default form submission behavior

        // Create an object from the form data
        const newLog = {
            date: logForm.date.value,
            skill: logForm.skill.value,
            duration: logForm.duration.value,
            notes: logForm.notes.value
        };

        // Using localStorage to store data.
        const logs = JSON.parse(localStorage.getItem('practiceLogs')) || [];
        logs.push(newLog);
        localStorage.setItem('practiceLogs', JSON.stringify(logs));

        logForm.reset();
        loadPracticeLogs(); // Refresh the displayed log history
    }

    /**
     * Loads and displays the practice log history from localStorage.
     */
    function loadPracticeLogs() {
        if (logHistoryContainer) {
            const logs = JSON.parse(localStorage.getItem('practiceLogs')) || [];

            if (logs.length === 0) {
                logHistoryContainer.innerHTML = '<p>No practice sessions logged yet. Fill out the form above to get started!</p>';
                return;
            }

            // Use map and join for efficient rendering
            logHistoryContainer.innerHTML = logs.map(log => `
                <div class="log-entry">
                    <p><strong>Date:</strong> ${log.date}</p>
                    <p><strong>Skill:</strong> ${log.skill}</p>
                    <p><strong>Duration:</strong> ${log.duration} minutes</p>
                    <p><strong>Notes:</strong> ${log.notes || 'N/A'}</p>
                </div>
            `).reverse().join(''); // Show most recent first
        }
    }

    // --- EVENT LISTENERS ---
    // This demonstrates listening for and reacting to events.

    if (skillFilter) {
        skillFilter.addEventListener('change', handleFilterChange);
    }

    if (logForm) {
        logForm.addEventListener('submit', handleLogSubmit);
    }
    
    // --- INITIAL FUNCTION CALLS ---
    // Functions that run as soon as the page loads.
    updateFooter();
    displayRandomDrill();
    populateDrills(drills); // Initially populate with all drills
    loadPracticeLogs();
});