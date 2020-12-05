var translateBtn = document.querySelector("#bt-translate");

//reset button
var resetBtn= document.querySelector("#btn-reset");

// to read input
var translateIn = document.querySelector("#text-space");

// output shown
var translateOut = document.querySelector("#output");

//url taken from funtranslation.com
var url = "https://api.funtranslations.com/translate/mandalorian.json";

function getTranslationURL(input) {
    return url + "?" + "text=" + input;
}

function errorHandler(error) {
    alert("More than 5 requests on server, please try after sometime");
}

/* making clickHandler() fncn as soon
 the click event triggers */
    translateBtn.addEventListener("click", btnClickHandler);

    function btnClickHandler(e) {

        /* ripple effect for button */
        //create span element
        let ripple = document.createElement("span");

        //add ripple class to span
        ripple.classList.add("ripple");

        //add span to button
        this.appendChild(ripple);

        // get position of X
        let x = e.clientX - e.target.offsetLeft;
        
        // get position of Y
        let y= e.clientY - e.target.offsetTop;

        // Positioning the span element
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        // removing span after n seconds
        setTimeout(() => {
            ripple.remove();
        },3000);
                

        // taking input
        var input = translateIn.value;

    //caling server for processing
            fetch(getTranslationURL(input))
                .then(response => response.json())
                .then(json=> {
                    var translatedText= json.contents.translated;

                    //instead of showing on console, we show in outputDIV
                    translateOut.innerText= translatedText;
                })
                .catch(errorHandler);
    };

    function resetClickHandler() {
        translateIn.value= "";
        translateOut.innerText = "";
    }

    resetBtn.addEventListener("click", resetClickHandler);