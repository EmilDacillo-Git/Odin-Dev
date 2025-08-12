import aboutUsTab from "./aboutUs";
import coverText from "./coverText";
import menuTab from "./menuPage";
import recipeTab from "./recipePage";
import "./styles.css";

const homeBtn = document.getElementById("homeBtn");
const recipeBtn = document.getElementById("recipeBtn");
const aboutUsBtn = document.getElementById("aboutUsBtn");

const homePage = document.getElementById("content");
const recipePage = document.getElementById("recipePage");
const aboutUsPage = document.getElementById("aboutUsPage");
const menuPage = document.getElementById("menuPage");

function hideAllPages() {
  homePage.innerHTML = "";
  recipePage.innerHTML = "";
  aboutUsPage.innerHTML = "";
  menuPage.innerHTML = "";
    
  homePage.style.display = "none";
  recipePage.style.display = "none";
  aboutUsPage.style.display = "none";
  menuPage.style.display = "none";
}

hideAllPages();
coverText();

homeBtn.addEventListener("click", () => {
  hideAllPages();
  coverText();
});

recipeBtn.addEventListener("click", () => {
    hideAllPages();
    recipeTab();
});

aboutUsBtn.addEventListener("click", () => {
    hideAllPages();
    aboutUsTab();
});
