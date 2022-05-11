import { changeCase, changeShift, changeValueFromText, initLocalStorage, markKey, switchKeyboard } from "./utils.js";
import { funcKeysEvent, keyboardENG, keyboardNum, keyboardRU, keysEvent } from "./variables.js";

const initialState = {
  lang: '',
  capsLook: true,
  shift: false,
};
(function render() {
  document.body.innerHTML = `<div class="container"><div class="wrapper">
<form id="form"><textarea class="textarea"  rows="5" autofocus></textarea></form>
<div class="keyboard__keys">
${keyboardENG.map((row, index) => { return (
					`<div class="row" id=${index}>
						${index === 0 ? row.split(' ').map(key => `<div class="key key__num">${key}</div>`).join(''):row.split(' ').map(key => `<div class="key">${key}</div>`).join('')}
					</div>`
				)
			}).join('')}
			
		</div>
		<div class='lang'> Keyboard for Windows
		<p>To switch between keyboard languages press left Ctrl + left Alt</p>
		</div>
		
	</div>
	
	</div>`
})()


const keysBeforeRender = document.querySelectorAll('.key');
const keysNum = document.querySelectorAll('.key__num');

let countForShift = 1;
let countForCTRL = 1;
let countForAlt = 1;
keysBeforeRender.forEach(key => {
	switch(key.innerText) {
		case 'Space': {
		key.classList.add('space__key', 'borders__key');
		key.innerText=''
		break;
		}
		case 'CapsLock': {
		key.classList.add('caps__key', 'borders__key' ,'key_100');
		key.classList.remove('key');
		break;
		}
		case 'Tab': {
		key.classList.add('tab__key', 'borders__key');
		key.classList.remove('key');
		break;
		}
		case 'Backspace': {
		key.classList.add('backspace__key', 'borders__key', 'key_100');
		key.classList.remove('key');
		break;
		}
		case 'DEL': {
		key.classList.add('del__key', 'borders__key');
		key.classList.remove('key');
		break;
		}
		case 'ENTER': {
		key.classList.add('enter__key', 'borders__key');
		key.classList.remove('key');
		break;
		}
		case 'Shift': {
					if(countForShift) {
					key.classList.add('shift__left', 'borders__key', 'key_100');
					key.classList.remove('key');
					countForShift--;
				} else {
					key.classList.add('shift__right', 'borders__key');
					key.classList.remove('key');}
		break;	
		}
		case 'Ctrl': {
					if(countForCTRL) {
					key.classList.add('ctrl__key', 'ctrl__left','borders__key');
					key.classList.remove('key');
					countForCTRL--;
				} else {
					key.classList.add('ctrl__key', 'ctrl__right','borders__key');
					key.classList.remove('key');}
		break;	
		}
		case 'Alt': {
					if(countForAlt) {
					key.classList.add('alt__key', 'alt__left','borders__key');
					key.classList.remove('key');
					countForAlt--;
				} else {
					key.classList.add('alt__key', 'alt__right','borders__key');
					key.classList.remove('key');}
		break;	
		}
		case 'Win': {
			key.classList.add('win__key','borders__key');
			key.classList.remove('key');
			break;
			}
		case 'up__key': {
			key.classList.add('up__key','borders__key');
			key.innerText='';
			key.classList.remove('key');
			break;
			}
		case 'down__key': {
			key.classList.add('down__key','borders__key');
			key.innerText='';
			key.classList.remove('key');
			break;
			}
		case 'left__key': {
			key.classList.add('left__key','borders__key');
			key.innerText='';
			key.classList.remove('key');
			break;
			}
		case 'right__key': {
			key.classList.add('right__key','borders__key');
			key.innerText='';
			key.classList.remove('key');
			break;
			}

default: return
	}
})

keysNum.forEach((key,index) => {
	key.setAttribute("second", keyboardNum[index])
});

const keys = document.querySelectorAll(".key");
const form = document.querySelector("#form");
const textarea = document.querySelector(".textarea");
const spaceKey = document.querySelector(".space__key");
const tab__key = document.querySelector(".tab__key");
const del__key = document.querySelector(".del__key");
const backspace__key = document.querySelector(".backspace__key");
const win__key = document.querySelector(".win__key");
const enter__key = document.querySelector(".enter__key");
const shift__right = document.querySelector(".shift__right");
const shift__left = document.querySelector(".shift__left");
const caps__key = document.querySelector(".caps__key");
const ctrl__left = document.querySelector(".ctrl__left");
const ctrl__right = document.querySelector(".ctrl__right");
const alt__left = document.querySelector(".alt__left");
const alt__right = document.querySelector(".alt__right");
const up__key = document.querySelector(".up__key");
const down__key = document.querySelector(".down__key");
const left__key = document.querySelector(".left__key");
const right__key = document.querySelector(".right__key");

changeValueFromText(keys);

/*=====Utilites=====*/
switchKeyboard(() => {
    if (localStorage.getItem("keyboardLang") === "eng") {
      keys.forEach((key) => {
        let char = key.getAttribute("keyname");
        key.innerText = keyboardRU[char];
        changeValueFromText(keys);
        localStorage.setItem("keyboardLang", "ru");
      });
      return;
    }

    if (localStorage.getItem("keyboardLang") === "ru") {
      let keyboardENG = {};
      Object.entries(keyboardRU).forEach(([key, value]) => {
        keyboardENG[value] = key;
      });
      keys.forEach((key) => {
        let char = key.getAttribute("keyname");
        key.innerText = keyboardENG[char];
        changeValueFromText(keys);
        localStorage.setItem("keyboardLang", "eng");
      });
      return;
    }
  },
  "AltLeft",
  "ControlLeft"
);

const clearActiveKeys = () => {
		tab__key.classList.remove("active");
		alt__left.classList.remove("active");
		alt__right.classList.remove("active");
}

initLocalStorage(keyboardRU, keys);
form.addEventListener('focusin', clearActiveKeys);

/*=====KeyDown=====*/
textarea.addEventListener("keydown", (e) => {
	if(e.repeat) return;
	
  for (let i = 0; i < keys.length; i++) {
    if (e.key === keys[i].getAttribute("keyname") || e.key === keys[i].getAttribute("keyUpperCase")) {
      keys[i].classList.add("active");
    }
      }
	if (e.code === "CapsLock") {
		caps__key.classList.toggle("active");
	   	changeCase(initialState, keys);
  }
  if (e.code === "AltLeft") {
	  e.preventDefault();
	alt__left.classList.add("active");
	alt__right.classList.remove("active");

  }
  if (e.code === "AltRight") {
	e.preventDefault();
	alt__right.classList.add("active");
	alt__left.classList.remove("active");
  }
 if (e.code === "Space") {
      spaceKey.classList.add("active");
    }
    if (e.code === "ShiftLeft") {
		
		shift__left.classList.add("active");
      shift__right.classList.remove("active");
	   changeShift(initialState, keysNum, keys)
    }
    if (e.code === "ShiftRight") {
		shift__right.classList.add("active");
      	shift__left.classList.remove("active");
		  changeShift(initialState, keysNum, keys)
    }
    if (e.code === "ControlLeft") {
		e.preventDefault();
      ctrl__left.classList.add("active");
      ctrl__right.classList.remove("active");
    }
    if (e.code === "ControlRight") {
		e.preventDefault();
      ctrl__right.classList.add("active");
      ctrl__left.classList.remove("active");
    }
    if (e.code === "Tab") {
		e.preventDefault();
		tab__key.classList.add("active");
		const startPosition = textarea.selectionStart;
    			const endPosition = textarea.selectionEnd;
				textarea.focus();
				textarea.value = textarea.value.slice(0, startPosition) + '    ' + textarea.value.slice(endPosition, textarea.value.length);
				textarea.setSelectionRange(startPosition+4, startPosition+4);
      }
    if (e.code === "Delete") {
		del__key.classList.add("active");
      }
    if (e.code === "MetaLeft") {
		win__key.classList.add("active");
      }
    if (e.code === "Backspace") {
		backspace__key.classList.add("active");
      }
    if (e.code === "Enter") {
		enter__key.classList.add("active");
      }

    if (e.code === "ArrowUp") {
		up__key.classList.add("active");
      }
    if (e.code === "ArrowDown") {
		down__key.classList.add("active");
      }
    if (e.code === "ArrowLeft") {
		left__key.classList.add("active");
      }
    if (e.code === "ArrowRight") {
		right__key.classList.add("active");
      }
});

/*=====KeyUp=====*/
textarea.addEventListener("keyup", (e) => {

  for (let i = 0; i < keys.length; i++) {
    if (
      e.key === keys[i].getAttribute("keyname") ||
      e.key === keys[i].getAttribute("keyUpperCase")
    ) {
      keys[i].classList.remove("active");
    }
 }
	if (e.code === "Space") {
		spaceKey.classList.remove("active");
		spaceKey.classList.add("remove");
	  }
	  if (e.code === "ShiftLeft") {
		shift__left.classList.remove("active");
		
		changeShift(initialState, keysNum, keys);
	  }
	  if (e.code === "ShiftRight") {
		shift__right.classList.remove("active");
		changeShift(initialState, keysNum, keys);
	  }
	  if (e.code === "ControlLeft") {
		ctrl__left.classList.remove("active");
	  }
	  if (e.code === "ControlRight") {
		ctrl__right.classList.remove("active");
	  }
	  if (e.code === "AltLeft") {
		alt__left.classList.remove("active");
	  }
	  if (e.code === "AltRight") {
		alt__right.classList.remove("active");
	  }
	  if (e.code === "Tab") {
		tab__key.classList.remove("active");
	  }
	  if (e.code === "Delete") {
		del__key.classList.remove("active");
      }
	  if (e.code === "MetaLeft") {
		win__key.classList.remove("active");
      }
	  if (e.code === "Backspace") {
		backspace__key.classList.remove("active");
      }
	  if (e.code === "Enter") {
		enter__key.classList.remove("active");
      }
	  if (e.code === "ArrowUp") {
		up__key.classList.remove("active");
      }
    if (e.code === "ArrowDown") {
		down__key.classList.remove("active");
      }
    if (e.code === "ArrowLeft") {
		left__key.classList.remove("active");
      }
    if (e.code === "ArrowRight") {
		right__key.classList.remove("active");
      }
});


/*=====MouseClick=====*/
window.addEventListener('click', (e) => {

		if(keysEvent.includes(e.target.className)) {
		textarea.focus();
		textarea.value=`${textarea.value}${e.target.innerText}`;
		keys.forEach(key => {
				if(key.innerText === e.target.innerText) {
				key.classList.add('active');
				setTimeout(() => {
					key.classList.remove('active');
				},200)
			}
		})
		return
	} else if (funcKeysEvent.includes(e.target.className)) {
			switch (e.target.className) {
			case 'key__num backspace__key borders__key key_100': {
				const startPosition = textarea.selectionStart;
    			const endPosition = textarea.selectionEnd;
				if(startPosition ===0 && endPosition ===0 ) {
					textarea.focus();
					markKey(backspace__key);
					break;
				}
				textarea.value = textarea.value.slice(0, startPosition-1) +  textarea.value.slice(endPosition, textarea.value.length);
				textarea.setSelectionRange(startPosition-1, startPosition-1);
				textarea.focus();
				markKey(backspace__key)
				break;
			} 
			
			case 'key space__key borders__key': {
				const startPosition = textarea.selectionStart;
    			const endPosition = textarea.selectionEnd;
				textarea.value = textarea.value.slice(0, startPosition) + ' ' + textarea.value.slice(endPosition, textarea.value.length);
				textarea.setSelectionRange(startPosition+1, startPosition+1);
				textarea.focus();
				markKey(spaceKey);
				break;
			} 
			
			case 'up__key borders__key': {
				textarea.value += '▲';
				textarea.focus();
				markKey(up__key);
				break;
			} 
			
			case 'down__key borders__key': {
				textarea.value +='▼';
				textarea.focus();
				markKey(down__key)
				break;
			} 
			
			case 'left__key borders__key': {
				textarea.value +='◄';
				textarea.focus();
				markKey(left__key)
				break;
			} 
			
			case 'right__key borders__key': {
				textarea.value +='►';
				textarea.focus();
				markKey(right__key)
				break;
			} 
			case 'enter__key borders__key': {
				const startPosition = textarea.selectionStart;
    			const endPosition = textarea.selectionEnd;
				if(textarea.value.length === startPosition) {
					textarea.value = textarea.value + '\n';
					textarea.focus(); 
					markKey(enter__key);
					break;
				}
				textarea.value = textarea.value.slice(0, startPosition) + '\n' + textarea.value.slice(endPosition, textarea.value.length);
				textarea.setSelectionRange(startPosition, startPosition);
				textarea.focus();
			
				markKey(enter__key)
				break;
			} 
			case 'del__key borders__key': {
				const startPosition = textarea.selectionStart;
    			const endPosition = textarea.selectionEnd;
				textarea.value = textarea.value.slice(0, startPosition) + textarea.value.slice(endPosition+1, textarea.value.length);
				textarea.setSelectionRange(startPosition, startPosition);
				textarea.focus();

				markKey(del__key)
				break;
			} 
			case 'caps__key borders__key key_100': {
				textarea.focus();
				caps__key.classList.toggle("active");
				changeCase(initialState, keys);
		
				break;
			} 
			case 'caps__key borders__key key_100 active': {
				textarea.focus();
				caps__key.classList.toggle("active");
				changeCase(initialState, keys);
		
				break;
			} 
			case 'shift__left borders__key key_100': {
				textarea.focus();
				shift__left.classList.toggle("active");
				changeShift(initialState, keysNum, keys)
				break;
			} 
			case 'shift__left borders__key key_100 active': {
				textarea.focus();
				shift__left.classList.toggle("active");
				changeShift(initialState, keysNum, keys)
				break;
			} 
			case 'shift__right borders__key': {
				textarea.focus();
				shift__right.classList.toggle("active");
				changeShift(initialState, keysNum, keys)
				break;
			} 
			case 'shift__right borders__key active': {
				textarea.focus();
				shift__right.classList.toggle("active");
				changeShift(initialState, keysNum, keys)
				break;
			} 
			case 'tab__key borders__key': {
				const startPosition = textarea.selectionStart;
    			const endPosition = textarea.selectionEnd;
				textarea.focus();
				textarea.value = textarea.value.slice(0, startPosition) + '    ' + textarea.value.slice(endPosition, textarea.value.length);
				textarea.setSelectionRange(startPosition+4, startPosition+4);
					markKey(tab__key)
				break;
			} 
			case 'alt__key alt__left borders__key': {
				textarea.focus();
					markKey(alt__left)
					
				break;
			} 
			case 'alt__key alt__right borders__key': {
				textarea.focus();
					markKey(alt__right)
					
				break;
			} 
			case 'ctrl__key ctrl__left borders__key': {
				textarea.focus();
					markKey(ctrl__left)
					
				break;
			} 
			case 'ctrl__key ctrl__right borders__key': {
				textarea.focus();
					markKey(ctrl__right)
					
				break;
			} 
			case 'win__key borders__key': {
				textarea.focus();
					markKey(win__key)
					
				break;
			} 
			default: break;
		}
		
	}
return
})