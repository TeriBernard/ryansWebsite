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

function initStuff(){
    const switchers = [...document.getElementsByClassName('ezee-image-switcher')];
    //Check for any switchers that need to be built
    if(switchers.length > 0){
        for(let s = 0; s < switchers.length; s++){
            createSwitcher(switchers[s]);
        }
    }
}

// Order of elements appended is important for the css
function createSwitcher(switchDiv) {
    switchDiv.className += '  e-i-s';

    // Trigger
    switchTrigger = document.createElement('a');
    switchTrigger.className +=' switch-trigger';
    switchDiv.appendChild(switchTrigger);

    // Images
    let images = [...switchDiv.getElementsByTagName('img')];
    for(let imgIndex = 0; imgIndex < images.length; imgIndex++){
        let img = images[imgIndex];
        //Wrap images in styling div's
        const newImg = document.createElement('div');
        newImg.classList.add('img-wrapper');
        if(imgIndex === 0) newImg.classList.add('before');
        else newImg.classList.add('after');
        // Move(not copy) image to inside wrapper
        newImg.appendChild(img);
        // Appends new wrapper to slider
        switchDiv.appendChild(newImg);
    }

    // Visible arrows
    for(let a = 0; a < 2; a++){
        const arrowBubble = document.createElement('div');
        const faArrow = document.createElement('span');
        let bubbleClass = '';
        let arrowClass = '';
        if(a === 0) {
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

    revertTrigger = document.createElement('a');
    revertTrigger.className += 'revert-trigger';
    switchDiv.appendChild(revertTrigger);
}