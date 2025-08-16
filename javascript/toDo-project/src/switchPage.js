class menuSwitch {
  constructor(menuMap) {
    this.menuMap = menuMap;
    this.sections = Object.values(menuMap);
  }

  showSection(section) {
    this.sections.forEach((sec) => (sec.style.display = "none"));
    section.style.display = "flex";
  }

  init() {
    for (const [btnId, section] of Object.entries(this.menuMap)) {
      document.getElementById(btnId).addEventListener("click", (e) => {
        e.preventDefault();
        this.showSection(section);
      });
    }
    this.showSection(this.sections[0]);
  }
}

export default menuSwitch;