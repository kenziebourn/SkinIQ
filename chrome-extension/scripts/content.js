/** CONTENT SCRIPT TO HIGHLIGHT INGREDIENTS ON A WEBPAGE **/
console.log("Hello from content.js");

const ingredientDatabase = [
  {
      "name": "Mica",
      "irritancy": 1,
      "comodogenicity": 1,
      "description": "Mica is a type of highly brittle silicate minerals with diverse chemical composition; typically used as a colorant.",
      "safety": "Fair",
      "alc_free": true,
      "silicone_free": true,
      "fragrance_free": true,
      "sulfate_free": true,
      "paraben_free": true,
      "oil_free": true,
      "eu_allergen": true,
      "reef_safe": true,
      "vegan": true,
      "fungal_acne_safe": true
  },
  {
    "name": "Titanium Dioxide",
    "irritancy": 1,
    "comodogenicity": 1,
    "description": "Titanium dioxide is an inorganic compound used in a range of  body care products such as sunscreens and makeup. It appears to have low skin penetration but inhalation is a concern.",
    "safety": "Fair",
    "alc_free": true,
    "silicone_free": true,
    "fragrance_free": true,
    "sulfate_free": true,
    "paraben_free": true,
    "oil_free": true,
    "eu_allergen": true,
    "reef_safe": true,
    "vegan": true,
    "fungal_acne_safe": true
  },
  {
  "name": "Sillica",
  "irritancy": 2,
  "comodogenicity": 2,
  "description": "Silica is the most common constituent of sand. It is used in cosmetics for its absorbent properties.",
  "safety": "Fair",
  "alc_free": true,
  "silicone_free": true,
  "fragrance_free": true,
  "sulfate_free": true,
  "paraben_free": true,
  "oil_free": true,
  "eu_allergen": true,
  "reef_safe": true,
  "vegan": true,
  "fungal_acne_safe": true
  },
  {
    "name": "Zinc Stearate",
    "irritancy": 0,
    "comodogenicity": 0,
    "description": "Zinc Stearate is a zinc salt of stearic acid, a naturally occurring fatty acid.",
    "safety": "Fair",
    "alc_free": true,
    "silicone_free": true,
    "fragrance_free": true,
    "sulfate_free": true,
    "paraben_free": true,
    "oil_free": true,
    "eu_allergen": true,
    "reef_safe": true,
    "vegan": true,
    "fungal_acne_safe": true
  },
  {
    "name": "Dimethicone",
    "irritancy": 0,
    "comodogenicity": 1,
    "description": "Dimethicone (also called polymethylsiloxane) is a silicon-based polymer used as a lubricant and conditioning agent.",
    "safety": "Fair",
    "alc_free": true,
    "silicone_free": false,
    "fragrance_free": true,
    "sulfate_free": true,
    "paraben_free": true,
    "oil_free": true,
    "eu_allergen": true,
    "reef_safe": true,
    "vegan": true,
    "fungal_acne_safe": true
  },
  {
    "name": "Magnesium Myristate",
    "irritancy": null,
    "comodogenicity": null,
    "description": "Magnesium Myristate is a magnesium salt of myristic acid.",
    "safety": "Limited",
    "alc_free": true,
    "silicone_free": true,
    "fragrance_free": true,
    "sulfate_free": true,
    "paraben_free": true,
    "oil_free": true,
    "eu_allergen": true,
    "reef_safe": true,
    "vegan": true,
    "fungal_acne_safe": true
  },
  {
    "name": "Methicone",
    "irritancy": 2,
    "comodogenicity": 4,
    "description": "Methicone is a linear silicone-based polymer.",
    "safety": "Fair",
    "alc_free": true,
    "silicone_free": false,
    "fragrance_free": true,
    "sulfate_free": true,
    "paraben_free": true,
    "oil_free": true,
    "eu_allergen": true,
    "reef_safe": true,
    "vegan": true,
    "fungal_acne_safe": true
  },
  {
    "name": "Panthenol",
    "irritancy": 0,
    "comodogenicity": 0,
    "description": "Panthenol is a form of vitamin B5, used as a moisturizer and lubricating compound. This ingredient is listed in the PETA's Caring Consumer guide as a substance that can be of either animal or plant origin.",
    "safety": "Limited",
    "alc_free": true,
    "silicone_free": true,
    "fragrance_free": true,
    "sulfate_free": true,
    "paraben_free": true,
    "oil_free": true,
    "eu_allergen": true,
    "reef_safe": true,
    "vegan": true,
    "fungal_acne_safe": true
  },
  {
    "name": "Propylparaben",
    "irritancy": 0,
    "comodogenicity": 0,
    "description": "Propylparaben is in the paraben family of preservatives used by the food, pharmaceutical, and personal care product industries. Parabens mimic estrogen and can act as potential hormone (endocrine) system disruptors.",
    "safety": "Robust",
    "alc_free": true,
    "silicone_free": true,
    "fragrance_free": true,
    "sulfate_free": true,
    "paraben_free": false,
    "oil_free": true,
    "eu_allergen": true,
    "reef_safe": true,
    "vegan": true,
    "fungal_acne_safe": true
  },
  {
    "name": "Tocopheryl Acetate",
    "irritancy": 0,
    "comodogenicity": 0,
    "description": "Tocopheryl acetate is a chemical compound that consists of acetic acid and tocopherol (vitamin E)",
    "safety": "Limited",
    "alc_free": true,
    "silicone_free": true,
    "fragrance_free": true,
    "sulfate_free": false,
    "paraben_free": true,
    "oil_free": true,
    "eu_allergen": true,
    "reef_safe": true,
    "vegan": true,
    "fungal_acne_safe": true
  },
  {
    "name": "Ascorbic Acid",
    "irritancy": null,
    "comodogenicity": 1,
    "description": "Ascorbic acid (Vitamin C) is a naturally occurring antioxidant.",
    "safety": "Limtied",
    "alc_free": true,
    "silicone_free": true,
    "fragrance_free": true,
    "sulfate_free": true,
    "paraben_free": true,
    "oil_free": true,
    "eu_allergen": true,
    "reef_safe": true,
    "vegan": true,
    "fungal_acne_safe": true
  },
  {
    "name": "Retinyl Palmitate",
    "irritancy": 2,
    "comodogenicity": 3,
    "description": "Retinyl palmitate is an ingredient composed of palmitic acid and retinol (Vitamin A). When exposed to UV light, retinol compounds break down and produce toxic free radicals that can damage DNA and cause gene mutations, a precursor to cancer. Recently available data from an FDA study indicate that retinyl palmitate, when applied to the skin in the presence of sunlight, may speed the development of skin tumors and lesions. FDA also raised a concern that extensive, daily skin application of vitamin A creams may build up in the womanäó»s body a high enough level of Vitamin A that may be toxic to the developing fetus.",
    "safety": "Fair",
    "alc_free": true,
    "silicone_free": true,
    "fragrance_free": true,
    "sulfate_free": false,
    "paraben_free": true,
    "oil_free": true,
    "eu_allergen": true,
    "reef_safe": true,
    "vegan": true,
    "fungal_acne_safe": true
  },
  {
    "name": "Silk Powder",
    "irritancy": 1,
    "comodogenicity": 1,
    "description": "Silk Powder is a finely pulverized silk commonly used to prevent moisture loss from the skin. It forms a protective film.",
    "safety": "Limited",
    "alc_free": true,
    "silicone_free": true,
    "fragrance_free": true,
    "sulfate_free": true,
    "paraben_free": true,
    "oil_free": true,
    "eu_allergen": true,
    "reef_safe": true,
    "vegan": true,
    "fungal_acne_safe": true
  },
];

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // Handle 'scanIngredients' action
  if (request.action === "scanIngredients") {
    scanForIngredients();
  }

  // Handle response from background script (checkIngredients action)
  if (request.status === 'success') {
    console.log('Data received from background:', request.data);
    // Handle the successful data here (highlight the ingredients & provide more information on hover)
  }

  if (request.status === 'error') {
    console.error('Error received from background:', request.error);
  }
});

function scanForIngredients() {
  /* Scans the webpage for ingredients and highlight them */

  // console.log("Scanning for ingredients..."); // debug
  const fullHtml = document.documentElement.outerHTML;

  // Create a new DOM from the HTML string
  const parser = new DOMParser();
  const doc = parser.parseFromString(fullHtml, 'text/html');

  // Search for ingredients in the document
  const ingredientKeyword = /^Ingredients/;
  const ingredientElements = doc.querySelectorAll('div');
  const ingredientsArr = [];

  // Loop through each div element and check if it contains ingredients
  ingredientElements.forEach(el => {
    const text = el.innerText.trim();

    // Check if the element starts with "Ingredients" and contains a valid list
    if (ingredientKeyword.test(text) && text.includes(',')) {
      // Split the ingredients by commas and trim whitespace from each part
      const ingredientList = text.replace(/^Ingredients?:\s*/, '')  // Remove the "Ingredients:" part
          .split(',')  // Split by commas
          .map(ingredient => ingredient.trim());

      // Check if ingredient already exists in the array
      ingredientList.forEach(ingredient => {
          if (!ingredientsArr.includes(ingredient)) {
              ingredientsArr.push(ingredient);
          }
        });
    }
  });

  if (ingredientsArr.length === 0) {
    console.log("No ingredients found.");
  } else {
    // Send ingredients to background script FOR MONGODB USAGE
    // console.log("Ingredients found:", ingredients);
    // chrome.runtime.sendMessage({ action: 'checkIngredients', ingredients: ingredients }, function(response) {
    //   if (chrome.runtime.lastError) {
    //     console.error("Error: ", chrome.runtime.lastError);
    //   } else {
    //     console.log('Response from background:', response);
    //   }
    // });
    // console.log("Sent ingredients to background");

    // MANUAL USAGE
    console.log("Ingredients found:", ingredientsArr);
    ingredientsArr.forEach(ingredient => {
      const ingredientData = ingredientDatabase.find(data => data.name.toLowerCase() === ingredient.toLowerCase());
      if (ingredientData) {
        console.log("Ingredient data:", ingredientData);
        highlightIngredient(ingredient, ingredientData, ingredientsArr);
      } else {
        console.log("Ingredient not found in the database:", ingredient);
      }
    });
  }
}

function highlightIngredient(ingredient, ingredientData, ingredientsArr) {
  /*********
   *  Highlight the ingredient in the document 
  Parameters:
  - ingredient: The ingredient name to highlight
  - ingredientData: The data object for the ingredient containing its details
  - ingredientsArr: The array of all ingredients found in the document
  ************/

  // console.log("Highlighting ingredient:", ingredient); // debug
  const highlightClass = 'highlighted-ingredient1';
  const ingredientElements = document.querySelectorAll('div.h-text-transform-caps');

  ingredientElements.forEach(element => {
    let text = element.innerHTML; // Use innerHTML to preserve existing HTML structure
    ingredientsArr.forEach(ingredient => {
      const regex = new RegExp(ingredient, 'gi');
      text = text.replace(regex, `<span class="${highlightClass}">${ingredient}</span>`);
    });
    element.innerHTML = text; // Update the element with highlighted ingredients
  });

  // Add click event listener to the highlighted ingredients
  document.querySelectorAll(`.${highlightClass}`).forEach(span => {
    span.addEventListener('click', function() {
      console.log('Clicked on ingredient:', this.textContent); // debug
      const ingredientName = this.textContent;
      const ingredientInfo = ingredientDatabase.find(data => data.name.toLowerCase() === ingredientName.toLowerCase());
      
      if (ingredientInfo) {
        showIngredientInfo(ingredientInfo);
      }
    });
  });
}

function showIngredientInfo(ingredientInfo) {
  /* Shows the side panel and populates it with the ingredient details */
  document.getElementById('ingredient-name').textContent = ingredientInfo.name;
  document.getElementById('ingredient-description').textContent = ingredientInfo.description;
  document.getElementById('ingredient-irritancy').textContent = ingredientInfo.irritancy || 'N/A';
  document.getElementById('ingredient-comodogenicity').textContent = ingredientInfo.comodogenicity || 'N/A';
  document.getElementById('ingredient-safety').textContent = ingredientInfo.safety || 'N/A';
  
  // Show the side panel
  document.getElementById('ingredient-side-panel').style.display = 'block';
}

function closeSidePanel() {
  /* Hides the side panel when the "Close" button is clicked */
  document.getElementById('ingredient-side-panel').style.display = 'none';
}

function injectSidePanel() {
  // Create the side panel container
  const sidePanel = document.createElement('div');
  sidePanel.id = 'ingredient-side-panel';
  sidePanel.style.display = 'none';  // Initially hide the panel
  sidePanel.style.position = 'fixed';
  sidePanel.style.right = '0';
  sidePanel.style.top = '0';
  sidePanel.style.width = '300px';
  sidePanel.style.height = '100%';
  sidePanel.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  sidePanel.style.color = 'white';
  sidePanel.style.padding = '20px';
  sidePanel.style.overflowY = 'auto';

  // Add HTML content to the side panel
  sidePanel.innerHTML = `
    <h3 id="ingredient-name"></h3>
    <p id="ingredient-description"></p>
    <p><strong>Irritancy:</strong> <span id="ingredient-irritancy"></span></p>
    <p><strong>Comedogenicity:</strong> <span id="ingredient-comodogenicity"></span></p>
    <p><strong>Safety:</strong> <span id="ingredient-safety"></span></p>
    <button onclick="closeSidePanel()">Close</button>
  `;

  // Append the side panel to the body of the page
  document.body.appendChild(sidePanel);
}

function injectStyles() {
  const styles = `
    .highlighted-ingredient1 {
      background-color: green;
    }

    .highlighted-ingredient2 {
      background-color: yellow;
    }

    .highlighted-ingredient3 {
      background-color: orange;
    }

    .highlighted-ingredient4 {
      background-color: red;
    }

    .highlighted-ingredient5 {
      background-color: gray;
    }
  `;

  const styleElement = document.createElement('style');
  styleElement.textContent = styles;
  document.head.appendChild(styleElement);
}

// Call functions to inject the styles and side panel
injectStyles();
injectSidePanel();