const article = document.querySelector("article");

// `document.querySelector` may return null if the selector doesn't match anything.
if (article) {
  const text = article.textContent;
  const wordMatchRegExp = /[^\s]+/g; // Regular expression
  const words = text.matchAll(wordMatchRegExp);
  // matchAll returns an iterator, convert to array to get word count
  const wordCount = [...words].length;
  console.log(`There are ${wordCount} words in this article`);

  const badge = document.createElement("p");
  // Use the same styling as the publish information in an article's header
  badge.style.color = "green";
  badge.textContent = `There is ${wordCount} total words`;

  // Support for API reference docs
  const heading = article.querySelector("h1");

  (heading).insertAdjacentElement("afterend", badge);
}