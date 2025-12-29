const form = document.getElementById("comicForm")
const list = document.getElementById("list")
const themeBtn = document.getElementById("themeBtn")

let comics = JSON.parse(localStorage.getItem("comics")) || []

function save() {
  localStorage.setItem("comics", JSON.stringify(comics))
}

function render() {
  list.innerHTML = ""

  comics.forEach((c, i) => {
    const li = document.createElement("li")
    li.className =
      "border p-2 rounded flex justify-between " +
      "bg-white dark:bg-gray-700 dark:border-gray-600"

    li.innerHTML = `
      <div>
        <b>${c.title}</b><br>
        <small class="text-gray-600 dark:text-gray-300">
          Terakhir dibaca/nonton: ${c.lastRead || "-"}
        </small><br>
        <a href="${c.url}" target="_blank"
           class="text-blue-600 dark:text-blue-400 text-sm">
          Buka
        </a>
      </div>

      <div class="text-right space-y-1">
        <button onclick="editComic(${i})"
          class="text-xs bg-blue-600 text-white px-2 rounded">
          Edit
        </button><br>
        <button onclick="del(${i})"
          class="text-xs text-red-500">
          Hapus
        </button>
      </div>
    `
    list.appendChild(li)
  })
}

form.onsubmit = e => {
  e.preventDefault()

  comics.push({
    title: title.value,
    url: url.value,
    lastRead: lastRead.value
  })

  save()
  render()
  form.reset()
}

function del(i) {
  comics.splice(i, 1)
  save()
  render()
}

function editComic(i) {
  const value = prompt(
    "Edit terakhir dibaca:",
    comics[i].lastRead || ""
  )

  if (value !== null) {
    comics[i].lastRead = value
    save()
    render()
  }
}


if (localStorage.getItem("theme") === "dark") {
  document.documentElement.classList.add("dark")
}

themeBtn.onclick = () => {
  document.documentElement.classList.toggle("dark")
  localStorage.setItem(
    "theme",
    document.documentElement.classList.contains("dark")
      ? "dark"
      : "light"
  )
}

render()
