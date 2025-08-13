function aboutUsTab() {
  const aboutUsPage = document.getElementById("aboutUsPage");
  aboutUsPage.style.display = "flex";

  const cover = document.createElement("div");
  const aboutUs = document.createElement("div");
  cover.classList.add("about-cover");
  aboutUs.classList.add("about-content");

  cover.textContent = "About Us";
  const tagLine = document.createElement("h3");
  const heading = document.createElement("h1");
  const subHead = document.createElement("p");

  tagLine.classList.add("tag-line");
  heading.classList.add("heading");
  subHead.classList.add("subHead");

  tagLine.textContent = "Spice Odyssey";
  heading.textContent = "A Culinary Journey";
  subHead.textContent =
    "A culinary journey that transcends taste, inviting patrons to savor not just flavors, but narratives woven into each dish. From the heritage of ingredients to the passion of chefs, every element unfolds a tale, creating an immersive dining experience that delights both palate and imagination.A culinary journey that transcends taste, inviting patrons to savor not just flavors, but narratives woven into each dish.";

  aboutUsPage.append(cover, aboutUs);
  aboutUs.append(tagLine,heading,subHead);
}

export default aboutUsTab;
