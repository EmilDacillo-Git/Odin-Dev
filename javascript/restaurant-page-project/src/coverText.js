function coverText() {
  const content = document.getElementById("content");

  const tagLine = document.createElement("h4");
  tagLine.textContent = "MORE FLAVOR FOR LESS";

  const heading = document.createElement("h1");
  heading.textContent = "Taste The Difference";

  const subHeading = document.createElement("p");
  subHeading.textContent =
    "Savor handcrafted dishes made with fresh ingredients, served in a warm and welcoming atmosphere";

  const menuBtn = document.createElement('button');
  menuBtn.classList.add('menu-btn');
  menuBtn.textContent = "Our Menu"
  
  content.append(tagLine);
  content.append(heading);
  content.append(subHeading);
  content.append(menuBtn);
}

export default coverText();
