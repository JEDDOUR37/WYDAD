"use strict";

/* =========================
   SETTINGS
========================= */
// DEMO ONLY: this check runs in the browser, so anyone can read it.
// Do not use it to protect real data. A real login needs a server.
const DEMO_USERNAME = "wydad";
const DEMO_PASSWORD = "1234";
const REDIRECT_TO = "WYDAD.html";

/* =========================
   ELEMENTS
========================= */
const scene = document.getElementById("scene");
const lamp = document.getElementById("lamp");
const switchLight = document.getElementById("switchLight");
const loginCard = document.getElementById("loginCard");
const form = document.getElementById("loginForm");
const username = document.getElementById("username");
const password = document.getElementById("password");
const message = document.getElementById("message");
const showPassword = document.getElementById("showPassword");

/* =========================
   LAMP: light ON shows the login, light OFF hides it
========================= */
function setLight(on) {
  scene.classList.toggle("is-on", on);

  loginCard.toggleAttribute("inert", !on); // form is locked while the light is off

  lamp.setAttribute("aria-pressed", String(on));
  lamp.setAttribute("aria-label", on ? "Turn the light off" : "Turn the light on");
  switchLight.setAttribute("aria-pressed", String(on));
  switchLight.textContent = on ? "CLICK TO TURN OFF" : "CLICK TO TURN ON";

  if (on) {
    window.setTimeout(() => {
      if (scene.classList.contains("is-on")) username.focus({ preventScroll: true });
    }, 700);
  } else {
    setMessage("", "");
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
  }
}

function toggleLight() {
  // little chain-pull animation
  lamp.classList.remove("pulled");
  void lamp.offsetWidth;
  lamp.classList.add("pulled");
  window.setTimeout(() => lamp.classList.remove("pulled"), 450);

  setLight(!scene.classList.contains("is-on"));
}

lamp.addEventListener("click", toggleLight);
switchLight.addEventListener("click", toggleLight);

/* =========================
   SHOW / HIDE PASSWORD
========================= */
showPassword.addEventListener("click", () => {
  const isHidden = password.type === "password";
  password.type = isHidden ? "text" : "password";
  showPassword.textContent = isHidden ? "HIDE" : "SHOW";
  showPassword.setAttribute("aria-label", isHidden ? "Hide password" : "Show password");
});

/* =========================
   LOGIN
========================= */
function setMessage(text, type) {
  message.textContent = text;
  message.className = type;
}

function fail(text) {
  setMessage(text, "error");
  loginCard.classList.remove("shake");
  void loginCard.offsetWidth;
  loginCard.classList.add("shake");
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!username.value.trim() || !password.value) {
    fail("Please enter your username and password.");
    return;
  }

  if (username.value.trim().toLowerCase() === DEMO_USERNAME && password.value === DEMO_PASSWORD) {
    try {
      sessionStorage.setItem("wydadDemoLoggedIn", "true");
    } catch (err) {
      /* storage unavailable: continue anyway */
    }
    setMessage("Welcome to the club! Redirecting…", "success");
    form.querySelector(".submit-btn").disabled = true;
    window.setTimeout(() => {
      window.location.href = REDIRECT_TO;
    }, 900);
  } else {
    fail("Incorrect username or password!");
    password.value = "";
    password.focus();
  }
});