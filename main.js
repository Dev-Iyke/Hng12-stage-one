document.addEventListener("DOMContentLoaded", function(){
  console.log('Dom loaded')
  startGame()
})

const options = ['#867cf0', '#9189e8', '#6d699e', '#8d88c4', '#4d4882', '#8f89d1']
let score = 0
document.getElementById('score').textContent = score
let selectedOption
function startRound (){
  const randomIndex = Math.floor(Math.random() * options.length) // get a random number that will serve as our index for the options array
  const targetColor = options[randomIndex]
  console.log(randomIndex, targetColor)

  const targetBox = document.getElementById('target')
  console.log(targetBox)
  targetBox.style.backgroundColor = targetColor

  // const singleOption = document.getElementById('btn1')
  // console.log(singleOption.value)
  const allOptions = document.querySelectorAll('.opt-btn')
  // console.log(allOptions)

  allOptions.forEach((option, index) => {
    option.style.backgroundColor = options[index]
    option.addEventListener('click', function(){
      console.log(option.value)
      if (option.value === targetColor){
        score++
        console.log('Correct!')
        document.getElementById('score').textContent = score
      } else {
        console.log('Wrong!')
        score--
        document.getElementById('score').textContent = score
      }
    })
  }) 
  

}

function endGame(){
  console.log('Final score', score)
}

function startGame() {
  // let round = 0
  // while (round >= 0 && round < 3){
  //   startRound()
  // }
  startRound()
  endGame()
  // setTimeout(startRound, 3000) // call startRound after 3 seconds
}