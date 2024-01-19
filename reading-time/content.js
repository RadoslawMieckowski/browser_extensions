alert(JSON.stringify('hello'));
const article = document.querySelector("#site > div.page.PersonSubPageBiography.personSubPageBiography > div.page__content.fa__wrapper > div > div:nth-child(3) > section > div.page__container.page__text.descriptionSection__list");
alert(JSON.stringify(article));
// `document.querySelector` may return null if the selector doesn't match anything.
if (article) {
  const text = article.textContent;
  const wordMatchRegExp = /[^\s]+/g; // Regular expression
  const words = text.matchAll(wordMatchRegExp);
  // matchAll returns an iterator, convert to array to get word count
  const wordCount = [...words].length;
  const readingTime = Math.round(wordCount / 200);
  const badge = document.createElement("p");
  alert("obliczyłem czas!");
  // Use the same styling as the publish information in an article's header
  badge.classList.add("color-secondary-text", "type--caption");
  badge.textContent = `⏱️ ${readingTime} min read`;

  // Support for API reference docs
  const heading = article.querySelector("#site > div.page.PersonSubPageBiography.personSubPageBiography > div.page__content.fa__wrapper > div > div:nth-child(3) > section > div.page__top > div > header > div");
  // Support for article docs with date
  const date = article.querySelector("time")?.parentNode;

  (date ?? heading).insertAdjacentElement("beforebegin", badge);
}
