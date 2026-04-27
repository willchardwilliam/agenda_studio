export default function initTabMenu() {

}

const tabMenu = document.querySelectorAll(".js-tabmenu li")
const tabContent = document.querySelectorAll(".js-tabcontent>section")

function activeTab(index) {
  tabContent.forEach((section) => {
    section.classList.remove("show")
  })
  tabContent[index].classList.add("show")
}

tabMenu.forEach((item, index) => {
  item.addEventListener("click", () => {
    activeTab(index)
  })
})