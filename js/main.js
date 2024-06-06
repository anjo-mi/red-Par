function Card(pic, location){
    this.pic = pic;
    this.location = location;
}

let attempts = 0
let matches = 0
let recordAttempt = Infinity
let recordTime = Infinity
let recordMatches = 0
let tries = document.getElementById('attempt')
let success = document.getElementById('match')
let recordAttemptDisplay = document.querySelector('.least')
let recordTimeDisplay = document.querySelector('.shortest')
let recordMatchesDisplay = document.querySelector('.incomplete')

!isFinite(recordAttempt) && recordAttemptDisplay.classList.add('correct')       //hide display of record

let backs = [
new Card('images/linkWW.webp', 1),
new Card('images/linkWW.webp', 2),
new Card('images/zeldaTP.jpg', 3),
new Card('images/zeldaTP.jpg', 4),
new Card('images/ganondorfWW.webp', 5),
new Card('images/ganondorfWW.webp', 6),
new Card('images/sidon.webp', 7),
new Card('images/sidon.webp', 8),
new Card('images/beedle.png', 9),
new Card('images/beedle.png', 10),
new Card('images/daruk.jpg', 11),
new Card('images/daruk.jpg', 12),
new Card('images/sheik.webp', 13),
new Card('images/sheik.webp', 14),
new Card('images/epona.webp', 15),
new Card('images/epona.webp', 16),
new Card('images/redlions.jpg', 17),
new Card('images/redlions.jpg', 18),
new Card('images/tulin.png', 19),
new Card('images/tulin.png', 20),
]

function startTimer(duration){                                          //declare a function to take an amount of time
    let future = Date.now() + duration                                  //add that amount of time to the current registered date in ms
    
    document.querySelector('.timer').innerText = duration / 1000        //divide out the ms to record just seconds, and display it where theres a class of timer

    const timer = setInterval(() => {                                   //call the set interval to run an anoymous function that will repeat every second (line 49)
        let time = future - Date.now()                                  //subtract the time it was (line 35) by the time it is (calls date.now every second), every second (lines 39, 49)
        let remains = Math.floor(time % (1000 * 60) / 1000)             //each time the interval is met, take that diffrence (comment 40) (first time 59000) and figure out how much remains
                                                                        //      after dividing by 60000 (in this instance 59000 and lower will always same number)
                                                                        //      divide by 1000 and set that number equal to a variable (line 39)
        document.querySelector('.timer').innerText = remains            //still each second, display that number where theres a class timer
        if (remains <= 0){       
            console.log(matches)                                       //when the interval has been met enough time to count down to zero or beyond
            clearInterval(timer)
                if (matches > recordMatches){                           //check if the record is broken and if so replace the display of the record
                    recordMatches = matches
                    console.log(recordMatches)
                    recordMatchesDisplay.innerText = recordMatches
                }                                                      //stop the intervals from recurring
            document.querySelector('.timer').innerText = 'Be Quicker!'  //display some friendly encouragement
        }else if (matches === 10){
            clearInterval(timer)
            if (attempts < recordAttempt){                              //check if the record is broken, if so set the new record and set it as the inner text then unhide display 
                recordAttempt = attempts
                recordAttemptDisplay.innerText = recordAttempt          // dont forget to subtract from 60 before checking record for time
                recordAttemptDisplay.classList.remove('correct')
            }
        }
    },1000)                                                             //delay the interval every 1000ms after the last time its been run
    
    
}

function shuffle(arr){
    let currInd = arr.length                                        //set a variable = to the array length

    while (currInd != 0){                                           // while that variable is still more than 0
        let rando = Math.floor(Math.random() * currInd)             //set another variable = to a random number less than the array length
        currInd--                                                   //subtract 1 from  the arr.length variable so it will rep an index thats inside the array
                                                                    //^^ line 55 will make sure you're not going to be running code on 0-1
        [arr[currInd], arr[rando]] = [arr[rando], arr[currInd]]     //swap the placement of the element with the random element
                                                                    //switch every element backwrds 1 by 1 with a random element
    }
    return arr                                                      //return the array after every element has been given the opportunity to be switched (line 55)
}

document.querySelector('.shuffle').addEventListener('click', () =>{
    startTimer(60000)
    const shuffled = shuffle(backs)
    const items = document.querySelectorAll('.card')
    shuffled.forEach((card,index) =>{
        const item = items[index]
        const back = item.querySelector('.back img')
        back.src = card.pic
    })
})




document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card')
    let flippedCards = []
    let noClick = false
    cards.forEach(card => {
        card.addEventListener('click', () =>{
            if (noClick || card.classList.contains('flipped')) return;
            card.classList.add('flipped')
            flippedCards.push(card)
            if (flippedCards.length === 2){
                tries.innerText = ++attempts
                noClick = true
            }
            if (flippedCards[0].querySelector('.back img').src === flippedCards[1].querySelector('.back img').src){
                console.log(flippedCards)
                setTimeout(() => {
                    success.innerText = ++matches
                    flippedCards[0].classList.add('correct')
                    flippedCards[1].classList.add('correct')
                    flippedCards = []
                    noClick = false
                }, 1000)
            }
            else {
                setTimeout(() => {
                    flippedCards[0].classList.remove('flipped')
                    flippedCards[1].classList.remove('flipped')
                    flippedCards = []
                    noClick = false
                }, 1500)
            }
        })
    })
})


// else{
//     card.classList.remove('flipped')
//     flippedCards = flippedCards.filter(c => c !== card)
// }
