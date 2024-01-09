import "https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js";
import "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js";
import "https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js";
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))


  
    // const getStoredTheme = () => localStorage.getItem('theme')
    // const setStoredTheme = theme => localStorage.setItem('theme', theme)
  
    // const getPreferredTheme = () => {
    //   const storedTheme = getStoredTheme()
    //   if (storedTheme) {
    //     return storedTheme
    //   }else{
    //     return "light"
    //   }  
    // }
  
    // const setTheme = theme => {
    //   if (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    //     document.documentElement.setAttribute('data-bs-theme', 'dark')
    //   } else {
    //     document.documentElement.setAttribute('data-bs-theme', theme)
    //   }
    // }
  
    // setTheme(getPreferredTheme())
  
    // const showActiveTheme = (theme, focus = false) => {
    //   const themeSwitcher = document.querySelector('#bd-theme')
  
    //   if (!themeSwitcher) {
    //     return
    //   }
  
    //   const themeSwitcherText = document.querySelector('#bd-theme-text')
    //   const activeThemeIcon = document.querySelector('.theme-icon-active use')
    //   const btnToActive = document.querySelector(`[data-bs-theme-value="${theme}"]`)
    //   const svgOfActiveBtn = btnToActive.querySelector('svg use').getAttribute('href')
  
    //   document.querySelectorAll('[data-bs-theme-value]').forEach(element => {
    //     element.classList.remove('active')
    //     element.setAttribute('aria-pressed', 'false')
    //   })
  
    //   btnToActive.classList.add('active')
    //   btnToActive.setAttribute('aria-pressed', 'true')
    //   activeThemeIcon.setAttribute('href', svgOfActiveBtn)
    //   const themeSwitcherLabel = `${themeSwitcherText.textContent} (${btnToActive.dataset.bsThemeValue})`
    //   themeSwitcher.setAttribute('aria-label', themeSwitcherLabel)
  
    //   if (focus) {
    //     themeSwitcher.focus()
    //   }
    // }
  
    // window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    //   const storedTheme = getStoredTheme()
    //   if (storedTheme !== 'light' && storedTheme !== 'dark') {
    //     setTheme(getPreferredTheme())
    //   }
    // })
  
    // window.addEventListener('DOMContentLoaded', () => {
    //   showActiveTheme(getPreferredTheme())
  
    //   document.querySelectorAll('[data-bs-theme-value]')
    //     .forEach(toggle => {
    //       toggle.addEventListener('click', () => {
    //         const theme = toggle.getAttribute('data-bs-theme-value')
    //         setStoredTheme(theme)
    //         setTheme(theme)
    //         showActiveTheme(theme, true)
    //       })
    //     })
    // })