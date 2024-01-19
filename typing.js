const words = "#include iostream using namespace std; int main() longlong n,b,d,a,c flag=0; cin>>n>>b>>d; while(n--) if(a<=b) c+=a; if(c>d) c=0; flag+=1; cout<<flag; return".split(' ');
const wordscount = words.length;
const gameTime = 30 *1000;
window.timer = null;
window.gameStart = null;

function addClass(el, name){
el.className += ' '+name;

}
function removeClass(el, name){
el.className = el.className.replace(name,'');
}

function randomWord(){
    const randomIndex = Math.ceil(Math.random()*wordscount)
    return words[randomIndex-1];
    }

function formatWord(word){
    return `<div class="word"><span class="letter">${word.split('').join('</span><span class="letter">')}</span></div>`;
}

function newGame(){
    document.getElementById('words').innerHTML='';
    for(let i=0 ; i<200; i++){
        document.getElementById('words').innerHTML+=formatWord(randomWord());
    
    }
    addClass(document.querySelector('.word'),'current');
    addClass(document.querySelector('.letter'), 'current');
    window.timer = null;
}

document.getElementById('game').addEventListener('keyup', ev=>{
    const key = ev.key;
    const currentWord =document.querySelector('.word.current');
    const currentLetter = document.querySelector('.letter.current');
    const expected = currentLetter?.innerHTML ||' ';
    const isLetter = key.length === 1 && key!==' ';
    const isSpace = key===' ';
    const isBackSpace = key === 'Backspace';
    const isFirstLetter = currentLetter===currentWord.firstChild;

    console.log({key,expected});

    if(!window.timer && isLetter){
        window.timer = setInterval(()=> {
            if(!window.gameStart){
                window.gameStart = (new Date()).getTime();
            }
            const currentTime = (new Date()).getTime();
            const msPassed = currentTime - window.gameStart;
            document.getElementById('info').innerHTML = msPassed='';
        },1000);
    }
    
    
    if(isLetter){
        if(currentLetter){
            addClass(currentLetter, key===expected?'correct':'incorrect');
            removeClass(currentLetter, 'current');
            if(currentLetter.nextSibling){
                addClass(currentLetter.nextSibling, 'current');
            }
        }else{
            const incorrectLetter = document.createElement('span');
            incorrectLetter.innerHTML = key;
            incorrectLetter.className= 'letter incorrect extra';
            currentWord.appendChild(incorrectLetter);
        }
    }
    
    if(isSpace){
        if(expected !== ' '){
            const lettersToInvalitade = [...document.querySelectorAll('.word.current .letter:not(.correct)')];
            lettersToInvalitade.forEach(letter =>{
                addClass(letter, 'incorrect');
            });
        }
        removeClass(currentWord, 'current');
        addClass(currentWord.nextSibling, 'current');

        if(currentLetter){
            removeClass(currentLetter, 'current');
        }
        addClass(currentWord.nextSibling.firstChild, 'current');
    }
    if(isBackSpace){
        if(currentLetter && isFirstLetter){
            removeClass(currentWord, 'current');
            addClass(currentWord.previousSibling, 'current');
            removeClass(currentLetter, 'current');
            addClass(currentWord.previousSibling.lastChild, 'current');
            removeClass(currentWord.previousSibling.lastChild, 'incorrect');
            removeClass(currentWord.previousSibling.lastChild, 'correct');
        }
        if(currentLetter && !isFirstLetter){
            removeClass(currentLetter, 'current');
            addClass(currentLetter.previousSibling, "current");
            removeClass(currentLetter.previousSibling, 'incorrect');
            removeClass(currentLetter.previousSibling, 'correct');
        }
        if(!currentLetter){
            addClass(currentWord.lastChild, 'current');
            removeClass(currentWord.previousSibling, 'incorrect');
            removeClass(currentWord.previousSibling, 'correct');
        }
    }

    if(currentWord.getBoundingClientRect().top >250){
        const words = document.getElementById('words');
        const margin = parseInt(words.style.marginTop || '0px');
        words.style.marginTop = (margin -35)+'px';
    }

    //move cursor
    const nextLetter = document.querySelector('.letter.current');
    const nextWord = document.querySelector('.word.current');
    const cursor = document.getElementById('cursor');
    cursor.style.top = (nextLetter || nextWord).getBoundingClientRect().top+ 2 + "px";
    cursor.style.left = (nextLetter || nextWord).getBoundingClientRect()[nextLetter?'left':'right']+ "px";
});


newGame();