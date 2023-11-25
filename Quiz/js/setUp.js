import { Setting } from "./setting.js";
export class setUp {

    constructor() {
    this.categoryDropdown = document.getElementById("category");
    // Call the async function to fetch categories
    this.fetchCategories();
  }
  async fetchCategories() {
    try {
      // Make a GET request using fetch
      const response = await fetch('https://opentdb.com/api_category.php');
      const data = await response.json();
      const categories = data.trivia_categories;

      // Clear previous options
      this.categoryDropdown.innerHTML = "";

      // Populate the dropdown with new options
      categories.map(getCategory => {
        const option = document.createElement('option');
        option.value = getCategory.id;
        option.text = getCategory.name;
        this.categoryDropdown.appendChild(option);
  
      });
      new Setting (this.categoryDropdown)      
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }
}