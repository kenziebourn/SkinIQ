console.log("This is a popup!")

document.addEventListener("DOMContentLoaded", function () {
  const scanButton = document.getElementById("scan-button");

  scanButton.addEventListener("click", function () {
    // Trigger extension functionality here
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "scanIngredients" });
    });
  });
});