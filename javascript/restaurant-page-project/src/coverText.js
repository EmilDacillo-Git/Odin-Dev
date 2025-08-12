import menuTab from "./menuPage";

function hideAllPages() {
  const homePage = document.getElementById("content");
  const recipePage = document.getElementById("recipePage");
  const aboutUsPage = document.getElementById("aboutUsPage");
  const menuPage = document.getElementById("menuPage");

  homePage.innerHTML = "";
  recipePage.innerHTML = "";
  aboutUsPage.innerHTML = "";
  menuPage.innerHTML = "";

  homePage.style.display = "none";
  recipePage.style.display = "none";
  aboutUsPage.style.display = "none";
  menuPage.style.display = "none";
}

function coverText() {
  const content = document.getElementById("content");
  content.style.display = "flex";

  const tagLine = document.createElement("h4");
  tagLine.textContent = "MORE FLAVOR FOR LESS";

  const heading = document.createElement("h1");
  heading.textContent = "Taste The Difference";

  const subHeading = document.createElement("p");
  subHeading.textContent =
    "Savor handcrafted dishes made with fresh ingredients, served in a warm and welcoming atmosphere";

  const menuBtn = document.createElement("button");
  menuBtn.classList.add("menubtn");
  menuBtn.textContent = "Our Menu";
  menuBtn.setAttribute("id", "menubtn");

  menuBtn.addEventListener("click", () => {
    hideAllPages();
    menuTab();
  });

  content.append(tagLine, heading, subHeading, menuBtn);
}

export default coverText;
