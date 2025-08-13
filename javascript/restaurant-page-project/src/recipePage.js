function recipeInfo(element, name, info) {
  const coverHead = document.createElement("h1");
  const coverSub = document.createElement("p");

  coverHead.textContent = name;
  coverSub.textContent = info;

  element.append(coverHead, coverSub);
}

function recipeGrid(element, name, info) {
  const foodInfo = document.createElement("div");
  const foodImg = document.createElement("div");

  recipeInfo(foodInfo, name, info);
  element.append(foodInfo, foodImg);
}

function recipeTab() {
  const recipePage = document.getElementById("recipePage");
  const header = document.querySelector("header");
  recipePage.style.display = "flex";
  header.style.position = "inherit";
  header.style.backgroundColor = "#0D1011";
  header.style.borderBottom = "1px solid rgb(177, 151, 2)"

  const cover = document.createElement("div");
  cover.classList.add("cover-photo");
  recipeInfo(
    cover,
    "Steak",
    "Our steak is served with our house-made sides, each bite captures the rustic charm and warm hospitality that define Tavern."
  );

  const recipeContent = document.createElement("div");
  recipeContent.classList.add("recipe-content");
  const recipe1 = document.createElement("div");
  const foodInfo1 = document.createElement("div");
  const foodImg1 = document.createElement("div");
  recipeInfo(
    foodInfo1,
    "Roasted Turky",
    "Marinated with our signature herb butter and roasted until golden brown, it’s served with hearty sides and rich, house-made gravy"
  );
  recipe1.append(foodInfo1, foodImg1);

  const recipe2 = document.createElement("div");
  const foodInfo2 = document.createElement("div");
  const foodImg2 = document.createElement("div");
  recipeInfo(
    foodInfo2,
    "Chicken Wings",
    "At Tavern, our chicken wings are crispy on the outside, juicy inside, and tossed in our bold, house-made sauces for a flavor that keeps you coming back."
  );
  recipe2.append( foodImg2,foodInfo2);

  const recipe3 = document.createElement("div");
  const foodInfo3 = document.createElement("div");
  const foodImg3 = document.createElement("div");
  recipeInfo(
    foodInfo3,
    "Chicken Sandwich",
    "our signature fried chicken sandwich is an artful balance of flavor and heartiness. We start with tender, juicy chicken, hand-breaded and fried until perfectly golden and irresistibly crisp."
  );
  recipe3.append(foodInfo3, foodImg3);

  [recipe1, recipe2, recipe3].forEach((r) => r.classList.add("recipe"));

  [foodInfo1, foodInfo2, foodInfo3].forEach((r) => r.classList.add("food-info"));
  // [foodImg1, foodImg2, foodImg3].forEach((r) => r.classList.add("food-img"));

  foodImg1.classList.add('food-img-1')
  foodImg2.classList.add('food-img-2')
  foodImg3.classList.add('food-img-3')

  recipePage.append(cover, recipeContent);
  recipeContent.append(recipe1,recipe2,recipe3);
}

export default recipeTab;
