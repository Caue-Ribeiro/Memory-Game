//DOM selection
const section = document.querySelector('section')
const playerChances = document.querySelector('span')
let chances = 10

//Get player name
const playerName = prompt("What's your name?")

//Linking chances
playerChances.textContent = chances

//Getting data

const getData = () => [
    { imgSrc: './images/argentina.svg', name: 'argentina' },
    { imgSrc: './images/belgium.svg', name: 'belgium' },
    { imgSrc: './images/brazil.svg', name: 'brazil' },
    { imgSrc: './images/canada.svg', name: 'canada' },
    { imgSrc: './images/croatia.svg', name: 'croatia' },
    { imgSrc: './images/france.svg', name: 'france' },
    { imgSrc: './images/germany.svg', name: 'germany' },
    { imgSrc: './images/china.svg', name: 'china' },
    { imgSrc: './images/argentina.svg', name: 'argentina' },
    { imgSrc: './images/belgium.svg', name: 'belgium' },
    { imgSrc: './images/brazil.svg', name: 'brazil' },
    { imgSrc: './images/canada.svg', name: 'canada' },
    { imgSrc: './images/croatia.svg', name: 'croatia' },
    { imgSrc: './images/france.svg', name: 'france' },
    { imgSrc: './images/germany.svg', name: 'germany' },
    { imgSrc: './images/china.svg', name: 'china' },
]

//Randomize cards

const randomize = () => {
    const cardData = getData()
    cardData.sort(() => Math.random() - 0.5)
    return cardData
}

//Generating cards

const cardGenerator = () => {
    const cardData = randomize()

    cardData.forEach(item => {
        const card = document.createElement('div')
        const face = document.createElement('img')
        const back = document.createElement('div')
        card.classList = 'card'
        face.classList = 'face'
        back.classList = 'back'
        section.appendChild(card)
        card.appendChild(face)
        card.appendChild(back)

        face.src = item.imgSrc
        card.setAttribute('name', item.name)

        card.addEventListener('click', e => {
            card.classList.toggle('toggleCard')
            checkCards(e)
        })
    })
}

//Check cards

const checkCards = e => {
    const clickedCard = e.target
    console.log(clickedCard)
    clickedCard.classList.add('flipped')
    const flippedCard = document.querySelectorAll('.flipped')
    const toggleCard = document.querySelectorAll('.toggleCard')

    if (flippedCard.length === 2) {
        if (
            flippedCard[0].getAttribute('name') ===
            flippedCard[1].getAttribute('name')
        ) {
            console.log('match')
            flippedCard.forEach(card => {
                card.classList.remove('flipped')
                card.style.pointerEvents = 'none'
            })
        } else {
            console.log('wrong')
            flippedCard.forEach(card => {
                card.classList.remove('flipped')
                setTimeout(() => card.classList.remove('toggleCard'), 1000)
            })
            setTimeout(() => {
                chances--
                playerChances.textContent = chances
                if (chances === 0) {
                    restart(`You loose, ${playerName}! 😔`)
                }
            }, 1000)
        }
    }

    setTimeout(() => {
        if (toggleCard.length === 16) {
            restart(`You won, ${playerName}! 😁`)
        }
    }, 1000)
}

// Restart the game

const restart = text => {
    const cardData = randomize()
    const face = document.querySelectorAll('.face')
    const cards = document.querySelectorAll('.card')
    section.style.pointerEvents = 'none'
    cardData.forEach((item, index) => {
        cards[index].classList.remove('toggleCard')

        setTimeout(() => {
            cards[index].style.pointerEvents = 'all'
            cards[index].setAttribute('name', item.name)
            face[index].src = item.imgSrc
            section.style.pointerEvents = 'all'
        }, 1000)
    })
    chances = 10
    playerChances.textContent = chances

    setTimeout(() => {
        alert(text)
    }, 100)
}
cardGenerator()
