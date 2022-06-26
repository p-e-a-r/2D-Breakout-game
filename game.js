
container = document.querySelector('.container');
const blockHeight = 20
const blockWidth = 100
const playerStart = [345, 10]
const boardWidth = 760
const ballDiamater = 20
const boardHeight = 500


let timerID

let xDir = -2
let yDir = 2

let currentPosition = playerStart

let score = 0


//sound


const ballStart = [370, 85]

let ballCurrentPosition = ballStart

//Block class
class Block {
    constructor(xAxis, yAxis){
        this.bottomLeft = [xAxis,yAxis]
        this.bottomRight = [xAxis + blockWidth, yAxis]
        this.topLeft = [xAxis, yAxis + blockHeight]
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
    }
}


//blocks

const blocks = [
    new Block(10,440),
    new Block(100,440),
    new Block(200,440),
    new Block(300,440),
    new Block(400,440),
    new Block(500,440),
    new Block(600,440),
    new Block(700,440),

    new Block(10,360),
    new Block(100,360),
    new Block(200,360),
    new Block(300,360),
    new Block(400,360),
    new Block(500,360),
    new Block(600,360),
    new Block(700,360),

    new Block(10,280),
    new Block(100,280),
    new Block(200,280),
    new Block(300,280),
    new Block(400,280),
    new Block(500,280),
    new Block(600,280),
    new Block(700,280),
   

]

//draw blocks

function addBlock(){  
    for ( let i = 0; i < blocks.length; i++){
        const block = document.createElement('div')
        block.classList.add('block')
        block.style.left = blocks[i].bottomLeft[0] + 'px'
        block.style.bottom = blocks[i].bottomRight[1] + 'px'
        container.appendChild(block)
    }


}
addBlock()



//player

const player = document.createElement('div')
player.classList.add('player')
container.appendChild(player)
player.style.left = currentPosition[0] + 'px'
player.style.bottom = currentPosition[1] + 'px'


// positions
function drawPositions(){
    player.style.left = currentPosition[0] + 'px'
    player.style.bottom = currentPosition[1] + 'px'
}

//move

function moveUser(e){
    switch(e.key){
        case 'ArrowLeft':
            if(currentPosition[0] > 5) {
                currentPosition[0] -= 10
                drawPositions()
                
            }
            break;
        case 'ArrowRight':
            if(currentPosition[0] < boardWidth - blockWidth){
                currentPosition[0] += 10
                drawPositions()
            }
            break;
    }
}

document.addEventListener('keydown', moveUser)

//draw ball 

function drawBall() {
ball.style.left = ballCurrentPosition[0] + 'px'
ball.style.bottom = ballCurrentPosition[1] + 'px'
}


const ball = document.createElement('div')
ball.classList.add('ball')
drawBall()
container.appendChild(ball)

// ball move

function ballMove() {
    ballCurrentPosition[0] += xDir
    ballCurrentPosition[1] += yDir
    drawBall()
    checkBounds()
}

timerID = setInterval(ballMove, 10)

// check bounds

function checkBounds(){

    for (let i =0; i< blocks.length; i++){
        if (
            (ballCurrentPosition[0] > blocks[i].bottomLeft[0] && ballCurrentPosition[0] < blocks[i].bottomRight[0]) &&
            ((ballCurrentPosition[1] + ballDiamater) > blocks[i].bottomLeft[1] && ballCurrentPosition[1] < blocks[i].topLeft[1])
        ){
            const allBlocks = Array.from(document.querySelectorAll('.block'))
            allBlocks[i].classList.remove('block')
            blocks.splice(i, 1)
            changeDirection()
           
            score++
            scoreDisplay.innerHTML = score
            

            //win
            if (blocks.length === 0){
                scoreDisplay.innerHTML = "Juicer no more"
                clearInterval(timerID)
                document.removeEventListener("keydown", moveUser)
            }
        }
    }


    if(ballCurrentPosition[0] >= (boardWidth - ballDiamater) || 
        ballCurrentPosition[1] >=  ( boardHeight - ballDiamater) ||
        ballCurrentPosition[0] <= 0){
        changeDirection()
    }

    //gameover
    if(ballCurrentPosition[1] <= 0){
        clearInterval(timerID)
        document.removeEventListener('keydown', moveUser)
       
    }


    //player bounds
    if(
        (ballCurrentPosition[0] > currentPosition[0] && ballCurrentPosition[0] < currentPosition[0] + blockWidth) &&
        (ballCurrentPosition[1] > currentPosition[1] && ballCurrentPosition[1] < currentPosition[1] + 70)
        ){
            changeDirection()
        }

}

function changeDirection(){
    if(xDir === 2 && yDir === 2 ) {
        yDir = -2
        return
    }
    if(xDir === 2 && yDir === -2){
        xDir = -2
        return
    }
    if(xDir === -2 && yDir === -2){
        yDir = 2
        return
    }
    if(xDir === -2 && yDir === 2){
        xDir = 2
        return
    }
}
