// Background script
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    if (message.action === 'checkIngredients') {
        console.log("Checking ingredients...");
        const ingredients = message.ingredients;
        console.log("Ingredients:", ingredients);

        try {
            // Make the request to your server
            const response = await fetch('http://localhost:3000/check-ingredient?ingredient=' + ingredients.join(','), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // Wait for the response and parse the data
            const data = await response.json(); 
            console.log('Response from server:', data);

            // Send the response back to the content script
            sendResponse({ status: "success", data: data });
            console.log('Message sent to content script');

        } catch (error) {
            console.error('Error during fetch:', error);
            sendResponse({ error: 'Failed to check ingredients' });
        }
    }

    // Return true to indicate that we will send a response asynchronously
    return true;
});
