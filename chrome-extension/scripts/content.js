/** CONTENT SCRIPT TO HIGHLIGHT INGREDIENTS ON A WEBPAGE **/

console.log("Hello from content.js");

// contentScript.js
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "scanIngredients") {
    // Call function to scan for ingredients
    scanForIngredients();
  }
      // console.log("REQUEST STATUS:",request.status)
      // if (request.status === 'success') {
      //   console.log('Data received:', request.data);
      // }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log("REQUEST STATUS:",request.status)
  if (request.status === 'success') {
    console.log('Data received:', request.data);
  }
});

function scanForIngredients() {
  // Your ingredient scanning logic here
  console.log("Scanning for ingredients...");
  const fullHtml = document.documentElement.outerHTML;
  //console.log(fullHtml);

  // Create a new DOM from the HTML string
  const parser = new DOMParser();
  const doc = parser.parseFromString(fullHtml, 'text/html');

  // Search for ingredients in the document
  const ingredientKeyword = /^Ingredients/;
  const ingredientElements = doc.querySelectorAll('div');
  const ingredients = [];

  // console.log("Ingredient Elements:", ingredientElements);
  // Loop through each div element and check if it contains ingredients
  ingredientElements.forEach(el => {
    const text = el.innerText.trim();

     // Check if the element starts with "Ingredients" and contains a valid list
    if (ingredientKeyword.test(text) && text.includes(',')) {
      // Split the ingredients by commas and trim whitespace from each part
      const ingredientList = text.replace(/^Ingredients?:\s*/, '')  // Remove the "Ingredients:" part
          .split(',')  // Split by commas
          .map(ingredient => ingredient.trim()); 
        
      // Check if ingredient already exists in the arrayy
      ingredientList.forEach(ingredient => {
          if (!ingredients.includes(ingredient)) {
              ingredients.push(ingredient);
          }
        });
      }
  });

  if (ingredients.length === 0) {
    console.log("No ingredients found.");
  }
  else { // Send ingredients to background script
    console.log("Ingredients:", ingredients);
    chrome.runtime.sendMessage({ action: 'checkIngredients', ingredients: ingredients });
    console.log("Sent ingredients to background");
  }
}

// // Select the div with id 'ingredients'
// const ingredientsLabel = document.querySelector("div#ingredients");
// console.log("INGREDIENTS", ingredientsLabel);

// // Check if the element exists
// if (ingredientsLabel) {
//   // Get the inner HTML (not just the textContent) to preserve line breaks and tags
//   const originalHTML = ingredientsLabel.innerHTML;
//   console.log("Original HTML:", originalHTML);

//   // Find the last occurrence of <br> (line break) in the HTML
//   const lastBreakIndex = originalHTML.lastIndexOf('<br>');
  
//   // If there's no line break found, it means the ingredients might be the entire content
//   if (lastBreakIndex !== -1) {
//     // Split the content at the last <br> tag
//     const descriptionHTML = originalHTML.substring(0, lastBreakIndex + 4); // Include the <br> in description
//     const ingredientsHTML = originalHTML.substring(lastBreakIndex + 4); // Everything after the last <br>

//     // Regular expression to match all non-whitespace sequences (words)
//     const wordMatchRegExp = /([^\s,;]+)/g; // Match each word and separate by spaces or commas

//     // Wrap each word in the ingredients list with a <span> for highlighting
//     const highlightedIngredients = ingredientsHTML.replace(wordMatchRegExp, (match) => {
//       return `<span style="background-color: yellow; color: black;">${match}</span>`;
//     });

//     // Reassemble the original content with highlighted ingredients
//     ingredientsLabel.innerHTML = descriptionHTML + highlightedIngredients;

//     console.log("Highlighted ingredients list.");
//   } else {
//     // No break found; treat everything as ingredients
//     const wordMatchRegExp = /([^\s,;]+)/g;
//     const highlightedIngredients = originalHTML.replace(wordMatchRegExp, (match) => {
//       return `<span style="background-color: yellow; color: black;">${match}</span>`;
//     });

//     // Update the content with highlighted text
//     ingredientsLabel.innerHTML = highlightedIngredients;

//     console.log("Highlighted all content as ingredients.");
//   }
// } else {
//   console.log("No ingredients found.");
// }
