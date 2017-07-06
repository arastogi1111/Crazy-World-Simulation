var food = [];
var poison = [];
var vehicles = [] ;
var count =0;
var foodfinish=0;
function setup(){
  createCanvas(1400,700);
  background(51);
  for(var i=0; i< 150; i++)
  {
    food[i]= createVector(random(width), random(height))
    stroke(0,255,0);
    ellipse(food[i].x,food[i].y,4,4)
    poison[i]= createVector(random(width), random(height))
    
   
  }
 

  for(var i =0; i < 15; i++){
  vehicles[i]= new Vehicle(random(width), random(height),i);}

  
}

function draw(){
  background(51);
  for(var i=0; i< food.length; i++)
  { push()
    stroke(0,255,0);
    ellipse(food[i].x,food[i].y,4,4)
    pop();

  }


  
  for(var i=0; i< poison.length; i++)
  {
   push();
    fill(255,0,0)
    noStroke();
    ellipse(poison[i].x,poison[i].y,4,4)
    pop()
  }
  // v.eat(food);
  // v.repel(poison)
 // v.seek(createVector(mouseX,mouseY))

for(var i = 0; i< vehicles.length; i++){
 vehicles[i].behaviours(food,poison)
  vehicles[i].update();
  vehicles[i].show();}


if(foodfinish==1 ) {
createP("STATISTICS  : ")
  createP("Food   Poison  Id      &nbsp &nbsp &nbsp &nbsp  &nbsp &nbsp &nbsp &nbsp  GMult  &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp  &nbsp &nbsp &nbsp &nbsp BMult  &nbsp &nbsp &nbsp  &nbsp &nbsp &nbsp &nbsp &nbsp  &nbsp &nbsp &nbsp &nbsp Maxspeed  &nbsp &nbsp &nbsp &nbsp  &nbsp &nbsp &nbsp &nbsp  &nbsp &nbsp &nbsp &nbsp &nbsp MaxForce");
foodfinish=2;
  
for(var i = 0; i< vehicles.length; i++){
  createP(vehicles[i].foodcount+"        &nbsp  &nbsp &nbsp          " + vehicles[i].poisoncount + "   &nbsp &nbsp &nbsp &nbsp " + vehicles[i].id + "    &nbsp &nbsp DNA : "+ vehicles[i].dna[0] + "     " + vehicles[i].dna[1] + "    " + vehicles[i].maxSpeed + "    "+ vehicles[i].maxForce + "   &nbsp &nbsp &nbsp &nbsp Blacked : " +vehicles[i].blackcount);

 //createP(vehicles[i].foodcount+" food and " + vehicles[i].poisoncount + " poisons eaten by # " + vehicles[i].id + " vehicle; its dna : "+ vehicles[i].dna[0] + "  " + vehicles[i].dna[1])}
}
}



}

function Vehicle(x,y,i){
  this.pos=createVector(x,y);
  this.vel=createVector();
  this.acc=createVector();
  this.maxSpeed = 5.5;
  this.maxForce = 3.1;
  this.id=i;
  this.dna= [];
  this.dna[0]= random(0,5);
  this.dna[1]= random(-5,0);
  this.dna[2]= random(0.4,10);
  this.dna[3]= random(0.1,10);
  this.blackcount=0;

   this.maxSpeed = this.dna[2];
  this.maxForce = this.dna[3];

  this.poisoncount=0;
  this.foodcount=0;
  this.black= 1;

  this.blackMagic= function(){
    if(random(1)<0.005) {
      this.dna[1]*=-1;
       this.dna[0]*=-1;
    this.black*=-1;
    this.blackcount++;}
     }
  this.update = function(){
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed)
    this.pos.add(this.vel);
    this.acc.mult(0.1);
    this.blackMagic();
    

    for(var i=0; i< food.length; i++){
      var d= this.pos.dist(food[i]);
      if(d<8)
        {food.splice(i,1)
          console.log(i);
          this.foodcount++;
          if(random(1)<0.65)food.push(createVector(random(width),random(height)))
        }
        }

    for(var i=0; i< poison.length; i++){
      var d2= this.pos.dist(poison[i]); 
      if(d2<4)
        {poison.splice(i,1);
          this.poisoncount++;
          if(random(1)<0.85)poison.push(createVector(random(width),random(height)))
          }

    }



    if(this.pos.x > width || this.pos.x < 0) {this.vel.x*=-1; this.acc.mult(-1);}
    else if(this.pos.y > height || this.pos.y < 0){ this.vel.y*=-1; this.acc.mult(-1);}

    
  }
  this.show= function(){
    var head= this.vel.heading();
    push();
    translate(this.pos.x,this.pos.y);
    rotate(head);
    strokeWeight(4);
    if(this.black==-1) stroke(0)

    line(-10,0,10,0);

    //stroke(255,0,0)
    //strokeWeight(1)
    //line(10,0,this.dna[0]*30,0)
    //rotate(head);
    pop();

  }


  this.behaviours = function(good,bad){
    var steerG = this.eat(good);
    var steerB = this.eat(bad);

    steerG.mult(this.dna[0]);
    steerB.mult(this.dna[1]);

    this.applyForce(steerG);
    this.applyForce(steerB);
  }


  this.eat= function(list){
    var closest =Infinity;
    var closestI = -1;
    for(var i=0; i< list.length; i++){
      var d= this.pos.dist(list[i]);
      if(d<closest){
        closest = d;
        closestI=i;
      }
    }
    

  if(closestI>-1)
    return this.seek(list[closestI])
  
  else {  if(foodfinish==0)foodfinish=1;
    this.pos=createVector(-100,-100);
    return createVector(0,0);}
   
  }





  this.applyForce = function(force)
  {
    this.acc.add(force);
  }


  this.seek= function(target)
  {
    var desired= p5.Vector.sub(target,this.pos);
    desired.setMag(this.maxSpeed);

    var steer= p5.Vector.sub(desired, this.vel)
    steer.limit(this.maxForce)
    return steer;
  }

}