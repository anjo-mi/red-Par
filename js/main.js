function Card(pic, location){
    this.pic = pic;
    this.location = location;
}

let attempts = 0
let matches = 0
let tries = document.getElementById('attempt')
let success = document.getElementById('match')

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

function startTimer(duration){
    let future = Date.now() + duration
    
    document.querySelector('.timer').innerText = duration / 1000

    const timer = setInterval(() => {
        let time = future - Date.now()
        let remains = Math.floor(time % (1000 * 60) / 1000)
        document.querySelector('.timer').innerText = remains
        if (remains <= 0){
            clearInterval(timer)
            document.querySelector('.timer').innerText = 'Be Quicker!'
        }
    },1000)
    
    
}

function shuffle(arr){
    let currInd = arr.length

    while (currInd != 0){
        let rando = Math.floor(Math.random() * currInd)
        currInd--

        [arr[currInd], arr[rando]] = [arr[rando], arr[currInd]]
    }
    return arr
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
