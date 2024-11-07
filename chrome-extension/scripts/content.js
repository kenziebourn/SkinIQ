/** CONTENT SCRIPT TO HIGHLIGHT INGREDIENTS ON A WEBPAGE **/

console.log("Hello from content.js");

// Select the div with id 'ingredients'
const ingredientsLabel = document.querySelector("div#ingredients");
console.log("INGREDIENTS", ingredientsLabel);

// Check if the element exists
if (ingredientsLabel) {
  // Get the inner HTML (not just the textContent) to preserve line breaks and tags
  const originalHTML = ingredientsLabel.innerHTML;
  console.log("Original HTML:", originalHTML);

  // Find the last occurrence of <br> (line break) in the HTML
  const lastBreakIndex = originalHTML.lastIndexOf('<br>');
  
  // If there's no line break found, it means the ingredients might be the entire content
  if (lastBreakIndex !== -1) {
    // Split the content at the last <br> tag
    const descriptionHTML = originalHTML.substring(0, lastBreakIndex + 4); // Include the <br> in description
    const ingredientsHTML = originalHTML.substring(lastBreakIndex + 4); // Everything after the last <br>

    // Regular expression to match all non-whitespace sequences (words)
    const wordMatchRegExp = /([^\s,;]+)/g; // Match each word and separate by spaces or commas

    // Wrap each word in the ingredients list with a <span> for highlighting
    const highlightedIngredients = ingredientsHTML.replace(wordMatchRegExp, (match) => {
      return `<span style="background-color: yellow; color: black;">${match}</span>`;
    });

    // Reassemble the original content with highlighted ingredients
    ingredientsLabel.innerHTML = descriptionHTML + highlightedIngredients;

    console.log("Highlighted ingredients list.");
  } else {
    // No break found; treat everything as ingredients
    const wordMatchRegExp = /([^\s,;]+)/g;
    const highlightedIngredients = originalHTML.replace(wordMatchRegExp, (match) => {
      return `<span style="background-color: yellow; color: black;">${match}</span>`;
    });

    // Update the content with highlighted text
    ingredientsLabel.innerHTML = highlightedIngredients;

    console.log("Highlighted all content as ingredients.");
  }
} else {
  console.log("No ingredients found.");
}
