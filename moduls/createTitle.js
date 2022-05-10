export function createTitle(name) {
  let title = document.createElement("H1");
  title.classList.add("title");

  title.textContent = name;

  return title;
}
