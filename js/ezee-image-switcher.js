'use strict';
// Production steps of ECMA-262, Edition 6, 22.1.2.1
if (!Array.from) {
    Array.from = (function () {
      var toStr = Object.prototype.toString;
      var isCallable = function (fn) {
        return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
      };
      var toInteger = function (value) {
        var number = Number(value);
        if (isNaN(number)) { return 0; }
        if (number === 0 || !isFinite(number)) { return number; }
        return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
      };
      var maxSafeInteger = Math.pow(2, 53) - 1;
      var toLength = function (value) {
        var len = toInteger(value);
        return Math.min(Math.max(len, 0), maxSafeInteger);
      };
  
      // The length property of the from method is 1.
      return function from(arrayLike/*, mapFn, thisArg */) {
        // 1. Let C be the this value.
        var C = this;
  
        // 2. Let items be ToObject(arrayLike).
        var items = Object(arrayLike);
  
        // 3. ReturnIfAbrupt(items).
        if (arrayLike == null) {
          throw new TypeError('Array.from requires an array-like object - not null or undefined');
        }
  
        // 4. If mapfn is undefined, then let mapping be false.
        var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
        var T;
        if (typeof mapFn !== 'undefined') {
          // 5. else
          // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
          if (!isCallable(mapFn)) {
            throw new TypeError('Array.from: when provided, the second argument must be a function');
          }
  
          // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
          if (arguments.length > 2) {
            T = arguments[2];
          }
        }
  
        // 10. Let lenValue be Get(items, "length").
        // 11. Let len be ToLength(lenValue).
        var len = toLength(items.length);
  
        // 13. If IsConstructor(C) is true, then
        // 13. a. Let A be the result of calling the [[Construct]] internal method 
        // of C with an argument list containing the single item len.
        // 14. a. Else, Let A be ArrayCreate(len).
        var A = isCallable(C) ? Object(new C(len)) : new Array(len);
  
        // 16. Let k be 0.
        var k = 0;
        // 17. Repeat, while k < len… (also steps a - h)
        var kValue;
        while (k < len) {
          kValue = items[k];
          if (mapFn) {
            A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
          } else {
            A[k] = kValue;
          }
          k += 1;
        }
        // 18. Let putStatus be Put(A, "length", len, true).
        A.length = len;
        // 20. Return A.
        return A;
      };
    }());
  }



function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// Shape of built elements: 
// <div class="ezee-arrow-slider">
//     <a class="switch-trigger "></a>
//     <div class="img-wrapper before">
//         <img src='../img/before.jpg'/>
//     </div>
//     <div class="img-wrapper after">
//         <img src='../img/after.jpg'/>
//     </div>
//     <div class="arrow-back trigger">
//         <span class='fas fa-share'> </span>
//     </div>
//     <div class="arrow-back revert" >
//         <span class='fas fa-reply'> </span>
//     </div>
//     <a class="revert-trigger" >
//     </a>
// </div>

// Starts automation
window.addEventListener('DOMContentLoaded', initStuff);

function initStuff() {
    var switchers = [].concat(_toConsumableArray(document.getElementsByClassName('ezee-image-switcher')));
    //Check for any switchers that need to be built
    if (switchers.length > 0) {
        for (var s = 0; s < switchers.length; s++) {
            createSwitcher(switchers[s]);
        }
    }
}

// Order of elements appended is important for the css
function createSwitcher(switchDiv) {
    switchDiv.className += '  e-i-s';

    // Trigger
    var switchTrigger = document.createElement('a');
    switchTrigger.className += ' switch-trigger';
    switchDiv.appendChild(switchTrigger);

    // Images
    var images = [].concat(_toConsumableArray(switchDiv.getElementsByTagName('img')));
    for (var imgIndex = 0; imgIndex < images.length; imgIndex++) {
        var img = images[imgIndex];
        //Wrap images in styling div's
        var newImg = document.createElement('div');
        newImg.classList.add('img-wrapper');
        if (imgIndex === 0) newImg.classList.add('before');else newImg.classList.add('after');
        // Move(not copy) image to inside wrapper
        newImg.appendChild(img);
        // Appends new wrapper to slider
        switchDiv.appendChild(newImg);
    }

    // Visible arrows
    for (var a = 0; a < 2; a++) {
        var arrowBubble = document.createElement('div');
        var faArrow = document.createElement('span');
        var bubbleClass = '';
        var arrowClass = '';
        if (a === 0) {
            bubbleClass = ' arrow-back trigger';
            arrowClass = 'fas fa-share';
        } else {
            bubbleClass = ' arrow-back revert';
            arrowClass = 'fas fa-reply';
        }
        arrowBubble.className += bubbleClass;
        faArrow.className += arrowClass;
        arrowBubble.appendChild(faArrow);
        switchDiv.appendChild(arrowBubble);
    }

    var revertTrigger = document.createElement('a');
    revertTrigger.className += 'revert-trigger';
    switchDiv.appendChild(revertTrigger);
}