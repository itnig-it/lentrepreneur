document.addEventListener("DOMContentLoaded", function() {
  // Mobile menu toggle
  const menuButton = document.getElementById('menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (menuButton && mobileMenu) {
    menuButton.addEventListener('click', function() {
      mobileMenu.classList.toggle('hidden');
    });
  }
  
  // Random dishes and drinks for homepage
  const displayRandomItems = () => {
    const menuData = window.menuData || [];
    
    if (!menuData.length) return;
    
    // Filter and flatten dishes
    const dishCategories = ["CARN", "PEIX", "LLEGUMS I ARRÒS"];
    const allDishes = menuData.filter(category => dishCategories.includes(category.category))
                            .flatMap(category => category.items);
    
    // Filter and flatten drinks
    const drinkCategories = ["VINS", "CÒCTELS"];
    const allDrinks = menuData.filter(category => drinkCategories.includes(category.category))
                            .flatMap(category => category.items);
    
    // Get random items
    const getRandomItems = (items, count) => {
      const shuffled = [...items].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    };
    
    const randomDishes = getRandomItems(allDishes, 3);
    const randomDrinks = getRandomItems(allDrinks, 3);
    
    // Helper function to capitalize first letter
    const capitalizeFirstLetter = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };
    
    // Display random dishes
    const dishesList = document.getElementById('random-dishes');
    if (dishesList) {
      dishesList.innerHTML = '';
      randomDishes.forEach(item => {
        const listItem = document.createElement('li');
        listItem.className = 'bg-white rounded-lg shadow-md overflow-hidden';
        listItem.innerHTML = `
          <div class="p-6">
            <div class="flex justify-between items-start mb-2">
              <h4 class="text-xl font-medium">${capitalizeFirstLetter(item.name)}</h4>
              ${item.price ? `<span class="text-brand font-medium">€${item.price}</span>` : ""}
            </div>
            <p class="text-gray-600">${item.description}</p>
          </div>`;
        dishesList.appendChild(listItem);
      });
    }
    
    // Display random drinks
    const drinksList = document.getElementById('random-drinks');
    if (drinksList) {
      drinksList.innerHTML = '';
      randomDrinks.forEach(item => {
        const listItem = document.createElement('li');
        listItem.className = 'bg-white rounded-lg shadow-md overflow-hidden';
        listItem.innerHTML = `
          <div class="p-6">
            <div class="flex justify-between items-start mb-2">
              <h4 class="text-xl font-medium">${capitalizeFirstLetter(item.name)}</h4>
              ${item.price ? `<span class="text-brand font-medium">€${item.price}</span>` : ""}
            </div>
            <p class="text-gray-600">${item.description}</p>
          </div>`;
        drinksList.appendChild(listItem);
      });
    }
  };
  
  // Call the function if we're on the homepage
  if (document.getElementById('random-dishes') || document.getElementById('random-drinks')) {
    displayRandomItems();
  }
  
  // Form submission handling
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Here you would normally send the form data to your server
      // For now, we'll just show a success message
      const formFields = contactForm.querySelectorAll('input, textarea');
      formFields.forEach(field => field.value = '');
      
      const successMessage = document.getElementById('form-success');
      if (successMessage) {
        successMessage.classList.remove('hidden');
        setTimeout(() => {
          successMessage.classList.add('hidden');
        }, 5000);
      }
    });
  }
}); 