
var bg, backgroundImg;
var iron,ironmanImg;
var stoneImg,stoneGroup;
var diamondGroup,diamondImg;
var diamondScore = 0;
var spikesImg,spikesGroup;

function preload() {
  //background image load
  backgroundImg = loadImage("images/bg.jpg");
  //ironman image load
  ironmanImg = loadImage("images/iron.png");
  //stone image load
  stoneImg = loadImage("images/stone.png");
  //diamond image load
  diamondImg = loadImage("images/diamond.png");
  //spikes image load
  spikesImg = loadImage("images/spikes.png");
}

function setup() {
  createCanvas(1000, 600);
  //background image
  bg = createSprite(580,300);
  bg.addImage(backgroundImg);
  bg.scale = 2;
  bg.velocityY = 10;
  //iron man
  iron = createSprite(200,500);
  iron.addImage(ironmanImg);
  iron.scale = .3;
  iron.debug = true;
  iron.setCollider("rectangle",100,0,200,400)
  //platform
  platform = createSprite(200,600,2000,10)
  //a stone group
  stoneGroup = new Group();
  //diamond group
  diamondGroup = new Group();
  //spikes group
  spikesGroup = new Group();
}

function draw() {
    //gravity to ironman
  iron.velocityY = iron.velocityY + 1;
  //ironman on platform
  iron.collide(platform)
  if (keyDown("up")) {
    iron.velocityY = -10;
  }
  if (keyDown("left")) {
    iron.x = iron.x - 5
  }
  if (keyDown("right")) {
    iron.x = iron.x + 5
  }
  iron.velocityY = iron.velocityY + 0.5;
  //illusion for background
  if (bg.y >  725){
    console.log(bg.height,"height of bg")
    bg.y = bg.height / 4 ;
    
  }
  //infinite stones
  getStones()
  //interacting with stones
  for(var i  = 0;i<stoneGroup.length;i++){
    var temp = stoneGroup.get(i);
    if(temp.isTouching(iron)){
      iron.collide(temp);
    }
  }
  //infinite diamonds
  generateDiamond();
  //interacting diamonds
  for(var i = 0;i < diamondGroup.length;i++){
    var temp = diamondGroup.get(i);
    if(temp.isTouching(iron)){
      diamondScore++;
      temp.destroy();
      temp = null;
    }
  }
  //infinte spikes 
  generateSpikes();
  //interacting with spikes
  for(var i = 0;i < spikesGroup.length;i++){
    var temp = spikesGroup.get(i);
    if(temp.isTouching(iron)){
      diamondScore = diamondScore - 5;
      temp.destroy();
    }
  }
  //a bug
  if(iron.x < 200){
    iron.x = 200;
  }
  if(iron.y < 50){
    iron.y = 50;
  }
drawSprites();
textSize(20);
fill("yellow");
text("Diamonds Collected - "+diamondScore,50,200)
}

function getStones(){
  if (frameCount % 70 === 0){
    var stone = createSprite(random(100,900),250,40,40);
    stone.lifetime = 250;
    stone.addImage(stoneImg);
    stone.scale = .5;
    stone.velocityY = 5;
    stoneGroup.add(stone);
  }
}
function generateDiamond(){
  if(frameCount % 50 === 0){
    var diamond = createSprite(random(100,900),250,40,40);
    diamond.addImage(diamondImg);
    diamond.velocityY = 3;
    diamond.lifetime = 500;
    diamondGroup.add(diamond);
    diamond.scale = .3;
  }
}
function generateSpikes(){
  if (frameCount % 100 === 0){
    var spikes = createSprite(random(200,800),250,40,40);
    spikes.addImage(spikesImg);
    spikes.velocityY = 5;
    spikes.lifetime = 250;
    spikesGroup.add(spikes);
    spikes.scale = .5;
  }
}