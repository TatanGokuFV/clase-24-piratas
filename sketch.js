const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world,ground;

var backgroundImg;
var ground; 
var tower,towerImg;
var cannon, cannonBall;
var balls=[];

function preload() {
//Precargar imagen para fondo en una variable 
backgroundImg = loadImage("assets/background.gif");

//Precargar imagen de la torre 
towerImg = loadImage("assets/tower.png");

}

function setup() {
  canvas = createCanvas(1200, 600);
  //Motor físico 
  engine = Engine.create();
  //Se crea el nuevo mundo 
  world = engine.world;

angleMode(DEGREES);
angle=15;

  //Agregar opciones del motor físico Matter para el cuerpo 
  var ground_options = {
    isStatic: true
  }
  
  //Crear un objeto en este muendo usando BODIES 
  ground = Bodies.rectangle(0,height-1,width*2,1,ground_options);
   //Agregar cuerpo al mundo 
  World.add(world,ground);
 
  //Crear un objeto en este muendo usando BODIES 
  tower = Bodies.rectangle(160,350,160,310,ground_options);
  World.add(world,tower);
  
  //Guardar clase Cannon en una variable
  angle = 20;
  cannon = new Cannon(180,110,130,100,angle);
  //Guardar clase CannonBall en una variable
  cannonBall = new CannonBall(cannon.x, cannon.y);
}

function draw() {
  image(backgroundImg,0,0,1200,600);
  //Se actualiza motor físico
  Engine.update(engine);
  
  //Asignar figura al cuerpo creado
  rect(ground.position.x, ground.position.y, width*2,1);
  
  //Asignar figura al cuerpo creado
  push();//Push captura la nueva posición 
    imageMode(CENTER);
    image(towerImg,tower.position.x, tower.position.y, 160,310);
  pop(); //Vuelve a la posición anterior 
  
  //Mostrar cañon
  for(var a=0; a<balls.length; a++){
showCannonballs(balls[a]);
  }
  //Mostrar bala de cañon
  cannon.display();


}

function keyPressed(){
  if(keyCode===32){
var cannonBall=new CannonBall(cannon.x,cannon.y);
balls.push(cannonBall);
  }
}

function showCannonballs(ball){
  if(ball){
    ball.display();
  }
  }


function keyReleased(){
  if(keyCode===32){
    balls[balls.length-1].shoot();
  }
}

