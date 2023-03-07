class CardNew extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = "<h1>Pokedex</h1>"; 
  }
}

customElements.define("card-news", CardNew)