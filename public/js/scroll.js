let scrollFrame = 0
let headerScrolled = false

function updateHeader() {
  scrollFrame = 0
  const header = document.getElementById("header")
  if (!header) return
  const nextScrolled = window.scrollY > 0
  if (nextScrolled === headerScrolled) return
  headerScrolled = nextScrolled
  header.classList.toggle("scrolled", headerScrolled)
}

function onScroll() {
  if (!scrollFrame) scrollFrame = window.requestAnimationFrame(updateHeader)
}

document.addEventListener("scroll", onScroll, { passive: true })
updateHeader()
