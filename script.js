let input;
let submit = document.querySelector("#submit");
let container = document.querySelector("#container");
let more = document.querySelector("#more");
let secret = document.querySelector("#secret");

submit.addEventListener("click", () => {
  input = document.querySelector("#input").value;
  let trimmedInput = input.trim();
  if(trimmedInput === "") {
    alert("Enter some text");
    return;
  }
  container.innerHTML = " ";
  displayData();
});

let page = 1;

more.addEventListener("click", () => {
  page++;
  displayData();
});

function displayData() {
  async function getData() {
    const data = await fetch(
      `https://api.unsplash.com/search/photos?page=${page}&query=${input}&client_id=RZEIOVfPhS7vMLkFdd2TSKGFBS4o9_FmcV1Nje3FSjw`
    );
    const json = await data.json();

    if(json.results.length === 0) {
      container.innerHTML = "Looks like there are no items matching to your search. Try some other words 😴😴😴";
      more.classList.add("hidden");
      secret.classList.remove("hidden");
      return;
    }
    secret.classList.add("hidden");
    more.classList.remove("hidden");
    json.results.forEach((val) => {
      let card = document.createElement("div");
      card.setAttribute(
        "class",
        "flex flex-col items-center w-80 md:w-96 h-60 md:h-72 border-2 bg-gray-600 border-gray-700 rounded-lg shadow-lg pb-2"
      );

      let img = document.createElement("img");
      var imgAttributes = {
        src: val.links.download,
        class: "w-full h-44 md:h-52 object-cover rounded-md",
      };

      for (var key in imgAttributes) {
        img.setAttribute(key, imgAttributes[key]);
      }

      let description = document.createElement("p");
      description.innerHTML = val.alt_description;
      description.setAttribute(
        "class",
        "text-wrap text-gray-200 m-3 uppercase text-sm"
      );
      card.append(img, description);
      container.appendChild(card);
    });
  }
  getData();
}

secret.addEventListener('click', () => {
  let p = document.createElement('p');
  p.innerHTML = "You're not good with spellings.";
  container.appendChild(p)
  secret.classList.add("hidden");
})