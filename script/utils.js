export function changeValueFromText(keys = []) {
  for (let i = 0; i < keys.length; i++) {
    keys[i].setAttribute("keyname", keys[i].innerText);
    keys[i].setAttribute("keyUpperCase", keys[i].innerText.toUpperCase());
  }
}

export function markKey(el) {
  el.classList.add("active");
  setTimeout(() => {
    el.classList.remove("active");
  }, 100);
}

export const initLocalStorage = (keyboardRU, keys) => {
  let keyboardENG = {};
  Object.entries(keyboardRU).forEach(([key, value]) => {
    keyboardENG[key] = key;
  });
  if (localStorage.getItem("keyboardLang") === null) {
    localStorage.setItem("keyboardLang", "eng");
    return;
  }

  if (localStorage.getItem("keyboardLang") === "eng") {
    keys.forEach((key) => {
      let char = key.getAttribute("keyname");
      key.innerText = keyboardENG[char];
      changeValueFromText(keys);
    });
    return;
  }

  if (localStorage.getItem("keyboardLang") === "ru") {
    keys.forEach((key) => {
      let char = key.getAttribute("keyname");
      key.innerText = keyboardRU[char];
      changeValueFromText(keys);
    });
    return;
  }
};

export const changeShift = (initialState, keysNum, keys) => {
  initialState.shift = !initialState.shift;

  if (initialState.shift) {
    keysNum.forEach((key, index) => {
      key.innerText = key.getAttribute("second");
    });

    for (let i = 0; i < keys.length; i++) {
      keys[i].innerText = keys[i].getAttribute("keyUpperCase");
    }
  } else {
    for (let i = 0; i < keys.length; i++) {
      keys[i].innerText = keys[i].getAttribute("keyname");
    }
    keysNum.forEach((key, index) => {
      if (key.innerText === "Backspace") {
        key.innerText = "Backspace";
      } else {
        key.innerText = key.getAttribute("keyname");
      }
    });
  }
};

export const changeCase = (initialState, keys) => {
  initialState.capsLook = !initialState.capsLook;

  if (initialState.capsLook) {
    for (let i = 0; i < keys.length; i++) {
      keys[i].innerText = keys[i].getAttribute("keyname");
    }
  } else {
    for (let i = 0; i < keys.length; i++) {
      keys[i].innerText = keys[i].getAttribute("keyUpperCase");
    }
  }
};

export function switchKeyboard(func, ...codes) {
  let pressed = new Set();
  document.addEventListener("keydown", function (event) {
    pressed.add(event.code);

    for (let code of codes) {
      if (!pressed.has(code)) {
        return;
      }
    }
    pressed.clear();

    func();
  });

  document.addEventListener("keyup", function (event) {
    pressed.delete(event.code);
  });
}

