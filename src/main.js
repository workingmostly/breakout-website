document.querySelector("#year").textContent = new Date().getFullYear()

const menu = document.querySelector("#menu")
const toggle = document.querySelector("#menu-toggle")
const overlay = document.querySelector("#menu-overlay")
const closeButton = document.querySelector("#menu-close")

function setMenu(open) {
  menu.hidden = !open
  toggle.setAttribute("aria-expanded", String(open))
  document.body.classList.toggle("overflow-hidden", open)
}

toggle.addEventListener("click", () => setMenu(menu.hidden))
overlay.addEventListener("click", () => setMenu(false))
closeButton.addEventListener("click", () => setMenu(false))
menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenu(false)))
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !menu.hidden) setMenu(false)
})

const reveals = document.querySelectorAll("[data-reveal]")
if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
  reveals.forEach((node) => {
    node.style.opacity = "0"
    node.style.transform = "translateY(20px) scale(0.98)"
  })

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        const node = entry.target
        const delay = (parseFloat(getComputedStyle(node).getPropertyValue("--reveal-delay")) || 0) * 1000
        const animation = node.animate(
          [
            { opacity: 0, transform: "translateY(20px) scale(0.98)" },
            { opacity: 1, transform: "none" },
          ],
          { duration: 800, delay, easing: "cubic-bezier(0.33, 1, 0.68, 1)", fill: "forwards" },
        )
        animation.onfinish = () => {
          node.style.opacity = ""
          node.style.transform = ""
        }
        observer.unobserve(node)
      }
    },
    { threshold: 0.01 },
  )

  reveals.forEach((node) => observer.observe(node))
}
