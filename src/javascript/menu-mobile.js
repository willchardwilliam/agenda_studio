export default function initMenuMobile() {
}

const navList = document.querySelector(".nav-list")
const checkbox = document.querySelector("#checkbox-menu")

checkbox.addEventListener("click", () => {
  navList.classList.toggle("ativo")
})

