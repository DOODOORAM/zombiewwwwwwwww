var backgroundImg
var hunterImg
var bgko
var shooter
var shootertheone
var gombie,gombieImg
var heart1Img
var heart2Img,heart3Img
var heart1,heart2,heart3
var bullats
var zombieGroup, bulletGroup
var score=0;
var life=3;
var bullets=30;
var gameState='fight'



function preload(){
backgroundImg= loadImage('assets/bg.jpeg')
hunterImg= loadImage('assets/shooter_2.png')
shootertheone=loadImage('assets/shooter_3.png')
gombieImg=loadImage('assets/zombie.png')
heart1Img=loadImage('assets/heart_1.png')
heart2Img=loadImage('assets/heart_2.png')
heart3Img=loadImage('assets/heart_3.png')
}

function setup(){
createCanvas(windowWidth,windowHeight)
bgko=createSprite(windowWidth/2,windowHeight/2)
bgko.addImage(backgroundImg)

shooter=createSprite(windowWidth-1000,windowHeight-100)
shooter.addImage(hunterImg);
shooter.scale=0.6

heart1=createSprite(windowWidth-100,45)
heart1.addImage(heart1Img)
heart1.scale=0.2

heart2=createSprite(windowWidth-100,45)
heart2.addImage(heart2Img)
heart2.scale=0.2

heart3=createSprite(windowWidth-100,45)
heart3.addImage(heart3Img)
heart3.scale=0.2

bulletGroup=new Group();
zombieGroup=new Group();





}

function draw(){
  background(0)

if (gameState==='fight') {
  if (life===1) {
    heart1.visible=true
    heart3.visible=false
    heart2.visible=false
  }
  if (life===2) {
    heart1.visible=false
    heart3.visible=false
    heart2.visible=true
  }
  if (life===3) {
    heart1.visible=false
    heart3.visible=true
    heart2.visible=false
  }
  if (life===0) {
    heart1.visible=false
    heart3.visible=false
    heart2.visible=false
    gameState='end'
  }

if (score===200) {
  gameState='won'
}


if (bullets===0) {
  gameState='bullets'
  
}

if (keyDown('UP_ARROW')) {
  shooter.y-=20
}
if (keyDown('DOWN_ARROW')) {
  shooter.y+=20
}
if (keyWentDown('SPACE')) {
  shooter.addImage(shootertheone)
  bullats=createSprite(windowWidth-1000,shooter.y-34,30,12)
  bullats.velocityX=20
bulletGroup.add(bullats)
bullets=bullets-1;

}
else if (keyWentUp('SPACE')) {
  shooter.addImage(hunterImg)
}

if (bulletGroup.isTouching(zombieGroup)) {
  for(var i=0;i<zombieGroup.length;i++){
    if(zombieGroup[i].isTouching(bulletGroup)){
    zombieGroup[i].destroy()
    bulletGroup.destroyEach()
    score=score+25;
    }
  }
}
if (shooter.isTouching(zombieGroup)) {
  for(var i=0;i<zombieGroup.length;i++){
    if(zombieGroup[i].isTouching(shooter)){
    zombieGroup[i].destroy()
    life=life-1;
    }
  }
}




enemy();
}
  drawSprites()
  fill('blue')
  textSize(20)
  text('bullets='+bullets,windowWidth-150,100)
  fill('red')
  text('score='+score,windowWidth-150,120)


 if (gameState==='end') {
  textSize(20)
  text('you lost',windowWidth/2,windowHeight/2)
  shooter.destroy()
                       zombieGroup.destroyEach()
 }
 if (gameState==='won') {
  textSize(20)
  text('you won',windowWidth/2,windowHeight/2)
  shooter.destroy()
                       zombieGroup.destroyEach()
}
if (gameState==='bullets') {
  textSize(40)
  text('YOU RAN OUT OF BULLETS',windowWidth/2,windowHeight/2)
  shooter.destroy()
                       zombieGroup.destroyEach()
                       bulletGroup.destroyEach()
}
}
function enemy(){
  if (frameCount%50===0) {
    gombie = createSprite(random(1000,1500),random(100,500))
gombie.addImage(gombieImg)
gombie.velocityX=-4
gombie.scale=0.3
zombieGroup.add(gombie)
  }

}