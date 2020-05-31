'use script'
const wordEl=document.getElementById("word");
const wrongLettersEl=document.getElementById("wrong-letters");
const playAgainBtn=document.getElementById("play-button");
const popup=document.getElementById("popup-container");
const notification=document.getElementById("notification-container");
const finalMessage=document.getElementById("final-message");
const finalMessgeRevealWord=document.getElementById("final-message-reveal-word");

const figureParts=document.querySelectorAll(".figure-part");
const words=["application","programming","interface","wizard"];

let selectedWord=words[Math.floor(Math.random()*words.length)];
let playable=true;
const correctLetters=[];
const wrongLetters=[];

//show hidden
//add event listener for key press
function displayWord()
{
    wordEl.innerHTML=`
    ${selectedWord.split('').map(letter=>{
        return `<span class="letter">
    ${correctLetters.includes(letter)?letter:" "}
  </span>`
    }).join('')}
`;
    
    const innerWord =wordEl.innerText.replace(/[\n]/g,'');
    if(innerWord===selectedWord)
        {
            finalMessage.innerHTML="Congratulations! You Won 😁";
            popup.style.display="flex";
        }
}
function showNotification(){
    notification.classList.add("show");
    setTimeout(function(){
        notification.classList.remove("show");
    },2000);
}
function updateWrongLetterEl()
{
    //Display wrong letters
    wrongLettersEl.innerHTML=`
   ${wrongLetters.length>0 ?`<p>Wrong Letters</p>`:''}
   ${wrongLetters.map(letter=>`<span>${letter}</span>`)}

`
  figureParts.forEach((part,index)=>{
      const errors=wrongLetters.length;
      if(index<errors){
          part.style.display="block";
      }
      else{
          part.style.display="none";
      }
  })
    if(wrongLetters.length===figureParts.length)
        {
            finalMessage.innerText="Unfortunately you Lost!😕";
            popup.style.display="flex";
            playable=false;
        }
}

window.addEventListener('keydown',e=>{
    
    if(playable)
        {
            if(e.keyCode>=65 && e.keyCode<=90)
                {
                    //key code gives code of the key pressed
                    //key gives value of key pressed
                    const letter=e.key.toLowerCase();
                    if(selectedWord.includes(letter))
                        {
                            //letter in string
                           if(!correctLetters.includes(letter)) 
                               {
                                   correctLetters.push(letter);
                                   displayWord();
                               }
                            else{
                                showNotification();
                            }
                        }
                    else{
                        if(!wrongLetters.includes(letter))
                            {
                                //letter not in string
                                wrongLetters.push(letter);
                                updateWrongLetterEl();
                            }
                        else{
                            //letter already pressed
                                showNotification();
                            }
                    }
                }
        }
})
//restart
playAgainBtn.addEventListener("click",()=>{
    playable=true;
    correctLetters.splice(0);
    wrongLetters.splice(0);
    selectedWord=words[Math.floor(Math.random()*words.length)];
    displayWord();
    updateWrongLetterEl();
    popup.style.display="none";
})
displayWord();