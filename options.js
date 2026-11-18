for (const el of document.querySelectorAll("[data-i18n]")) {
  el.textContent = chrome.i18n.getMessage(el.dataset.i18n);
}

const input = document.getElementById("minutes");

chrome.storage.sync.get({ minutes: 10 }).then(({ minutes }) => {
  input.value = minutes;
});

input.addEventListener("change", () => {
  const minutes = Math.max(0, Math.floor(Number(input.value) || 0));
  input.value = minutes;
  chrome.storage.sync.set({ minutes });
});
