var food = [];
var poison = [];
var vehicles = [] ;
var count =0;
var foodfinish=0;
var debug;
var sexcount=0;
var fightcount=0;
var clonecount=0;
var maxhealth;
var x=0;
function setup(){
  
  createCanvas(2900,700);
  background(51);
  debug= createCheckbox();
  for(var i=0; i< 220; i++)
  {
    food[i]= createVector(random(width/2), random(height))
    stroke(0,255,0);
    ellipse(food[i].x,food[i].y,4,4)
    poison[i]= createVector(random(width/2), random(height))
    
   
  }
 

  for(var i =0; i < 25; i++){
  vehicles[i]= new Vehicle(random(width/2), random(height),i);}

  createP("STATISTICS OF THE DEAD : ")
  createP("Food   Poison  Id      &nbsp &nbsp &nbsp &nbsp  &nbsp &nbsp &nbsp &nbsp  GMult  &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp  &nbsp &nbsp &nbsp &nbsp BMult  &nbsp &nbsp &nbsp  &nbsp &nbsp &nbsp &nbsp &nbsp  &nbsp &nbsp &nbsp &nbsp Maxspeed  &nbsp &nbsp &nbsp &nbsp  &nbsp &nbsp &nbsp &nbsp  &nbsp &nbsp &nbsp &nbsp &nbsp MaxForce  &nbsp &nbsp &nbsp &nbsp &nbsp  &nbsp &nbsp &nbsp &nbsp BlackMagic");
  
}

function draw(){
 fill(51);
  rect(0,0,1550,700)
  for(var i=0; i< food.length; i++)
  { push()
    fill(0,255,255);
    noStroke();
    ellipse(food[i].x,food[i].y,6,6)
    pop();

  }
  noStroke();
  fill(255,255,0)
 text('Sex :' + sexcount, 10,10)
  text('Clones :' + clonecount, 10,22)
  text('Fights :' + fightcount, 10,34)
  text('Population :' + vehicles.length, 10,47)
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
maxhealth=0;
var totalblack=0
for(var i = 0; i< vehicles.length; i++){
  vehicles[i].boundaries();
  vehicles[i].behaviours(food,poison)
  vehicles[i].update();
  vehicles[i].show();
  vehicles[i].clone();
  var dead=false;


  totalblack+= vehicles[i].black==-1?1:0;
  if(vehicles[i].health >maxhealth)
    maxhealth=vehicles[i].health;



  if(vehicles[i].health<-1  || random(1)<map(vehicles[i].age,600,3000,0.001,0.3))
   { createP(vehicles[i].foodcount+"        &nbsp  &nbsp &nbsp          " + vehicles[i].poisoncount + "   &nbsp &nbsp &nbsp &nbsp " + vehicles[i].id + "    &nbsp &nbsp DNA : "+ vehicles[i].dna[0] + "     " + vehicles[i].dna[1] + "    " + vehicles[i].maxSpeed + "    "+ vehicles[i].maxForce + "   &nbsp &nbsp &nbsp &nbsp  : " +vehicles[i].blackcount + " &nbsp &nbsp &nbsp &nbsp age:  " +  vehicles[i].age + "   health : " +vehicles[i].health  + " gen " + vehicles[i].gen);
     dead=true;}

      if(vehicles[i].interact()) dead= true;
  if(dead){
    if(vehicles[i].age > 750 || vehicles[i].health > 45) createP("*********")
    createP(vehicles[i].foodcount+"        &nbsp  &nbsp &nbsp          " + vehicles[i].poisoncount + "   &nbsp &nbsp &nbsp &nbsp " + vehicles[i].id + "    &nbsp &nbsp DNA : "+ vehicles[i].dna[0] + "     " + vehicles[i].dna[1] + "    " + vehicles[i].maxSpeed + "    "+ vehicles[i].maxForce + "   &nbsp &nbsp &nbsp &nbsp  : " +vehicles[i].blackcount + " &nbsp &nbsp &nbsp &nbsp age:  " +  vehicles[i].age + "   health : " +vehicles[i].health + " gen " + vehicles[i].gen);
    vehicles.splice(i,1)
  }

}
// fill(51);
// rect(width/2+100,0,200,height-100)
// stroke(255);

noStroke();

fill(0,255,0)
ellipse(width/2 +100 -x + frameCount/8,height-4*maxhealth,1,1);
fill(255,255,0);
ellipse(width/2 +100 -x + frameCount/8,height-4*totalblack,1,1);
fill(255);
ellipse(width/2 +100 -x + frameCount/8,height-vehicles.length*2,1.5,1.5)


if(frameCount%10000< 4 && frameCount >10)
  {fill(51);
    rect(width/2,0, width/2,height)
    x+=width/2;}

if(foodfinish==1 ) {

foodfinish=2;
  
// for(var i = 0; i< vehicles.length; i++){
//   createP(vehicles[i].foodcount+"        &nbsp  &nbsp &nbsp          " + vehicles[i].poisoncount + "   &nbsp &nbsp &nbsp &nbsp " + vehicles[i].id + "    &nbsp &nbsp DNA : "+ vehicles[i].dna[0] + "     " + vehicles[i].dna[1] + "    " + vehicles[i].maxSpeed + "    "+ vehicles[i].maxForce + "   &nbsp &nbsp &nbsp &nbsp Blacked : " +vehicles[i].blackcount);

 //createP(vehicles[i].foodcount+" food and " + vehicles[i].poisoncount + " poisons eaten by # " + vehicles[i].id + " vehicle; its dna : "+ vehicles[i].dna[0] + "  " + vehicles[i].dna[1])}

}



}

function Vehicle(x,y,i,dna,black,gen){
  this.pos=createVector(x,y);
  this.vel=createVector();
  this.acc=createVector();
  this.maxSpeed = 5.5;
  this.maxForce = 3.1;
  this.id=i;
  this.health=30;
  this.age=0;
 if(gen== undefined) this.gen=1;
  else this.gen=gen;


  this.dna= [];
if(dna==undefined){
  this.dna[0]= random(0,4);   //GoodMult
  this.dna[1]= random(-4,0);  //BadMult
  this.dna[2]= random(0.4,5); //MAxSpeed
  this.dna[3]= random(0.1,5); //MaxForce
  this.dna[4]= random(0,0.05);//Black Magic prob.
  this.dna[5]= random(10,200);//Food Perception
  this.dna[6]= random(10,200);//Poison Perception Radius
 }
 else{
  this.dna[0]= dna[0] + random(-0.1,0.1);   //GoodMult
  this.dna[1]= dna[1] + random(-0.1,0.1);  //BadMult
  this.dna[2]= dna[2] + random(-0.1,0.1); //MAxSpeed
  this.dna[3]= dna[3] + random(-0.5,0.5); //MaxForce
  this.dna[4]= dna[4] + random(-0.005,0.005);//Black Magic prob.
  this.dna[5]= dna[5] + random(-10,10);//Food Perception
  this.dna[6]= dna[6] + random(-10,10);

}

  this.maxSpeed = this.dna[2];
  this.maxForce = this.dna[3];

  this.poisoncount=0;
  this.foodcount=0;
  this.blackcount=0;
  this.black= 1;
  if(black==-1) this.black= -1;
  this.blackprob=this.dna[4];




  this.blackMagic= function(){
    if(random(1)<this.blackprob) {
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
    this.health-=0.03;
    this.age++;
    
      
    for(var i=0; i< food.length; i++){
      var d= this.pos.dist(food[i]);
      if(d<8)
        {food.splice(i,1)
          // console.log(i);
          this.foodcount++;
          this.health+=0.9;
          if(random(1)<0.999)
            food.push(createVector(random(width/2),random(height)))
        }
        }

    for(var i=0; i< poison.length; i++){
      var d2= this.pos.dist(poison[i]); 
      if(d2<4)
        {poison.splice(i,1);
          this.poisoncount++;
          this.health-=0.5;
         if(random(1)<0.99)
            poison.push(createVector(random(width/2),random(height)))
          }

    }



    if(this.pos.x > width/2 || this.pos.x < 0) {this.vel.x*=-1; this.acc.mult(-1);}
    else if(this.pos.y > height || this.pos.y < 0){ this.vel.y*=-1; this.acc.mult(-1);}

    
  }

  this.interact = function(){
    for(var i=0; i< vehicles.length; i++){
      var d= this.pos.dist(vehicles[i].pos);
      if(d>0 && d<9)
      {if(this.fight(vehicles[i])) return true; 
       else if(random(1) < 0.25 && this.gen==vehicles[i].gen && this.id!=vehicles[i].id) {this.crossover(vehicles[i]); return false;}
        else return false
      }

    }
    return false;
  }

  this.fight = function(v) {
   if( random(1)<0.08 || random(1) < map(vehicles.length,50,400,0.02,0.2))
    {if(this.health <= v.health)
    {fightcount++;
      return true;}

  else return false;}
  else return false;


    // return random(1)<0.17    //FIGHTING AND DYING PROBABILTY 
  }

  this.crossover = function(v){
    var child = [];
   for(var i=0; i< this.dna.length; i++)
      child[i]=(random(1)<0.5?this.dna[i]:v.dna[i]);
    
    vehicles.push(new Vehicle(this.pos.x + random(-20,20), this.pos.y  + random(-20,20), this.id*v.id, child,random[-1,1],this.gen+1))

    sexcount++;
  }
  this.show= function(){
    var head= this.vel.heading();
    push();
    translate(this.pos.x,this.pos.y);
    rotate(head);
    strokeWeight(4);
    var r= color(255,50,0);
    var g= color(0,255,255);
    var col= lerpColor(r,g,this.health/30)




    if(this.black==-1) stroke(0)
      else stroke(col)
    line(-10,0,10,0);
  strokeWeight(2)
  line(13,0,5,5)
  line(13,0,5,-5)

  if(debug.checked()){
    stroke(0,255,255,70);
    strokeWeight(1)
    noFill();
    ellipse(0,0,this.dna[5]*2)
    stroke(255,0,0,90);
    ellipse(0,0,this.dna[6]*2)}
    //stroke(255,0,0)
    //strokeWeight(1)
    //line(10,0,this.dna[0]*30,0)
    //rotate(head);
    pop();

  }

  this.clone = function(){
    if(random(1)< map(this.age,300,1200,0.002,0.07) && this.health >24)
      {vehicles.push(new Vehicle(this.pos.x + random(-20,20), this.pos.y + random(-20,20), this.id, this.dna,this.black,this.gen+1))
clonecount++;}
  }


  this.behaviours = function(good,bad){
    var steerG = this.eat(good,this.dna[5]);
    var steerB = this.eat(bad,this.dna[6]);

    steerG.mult(this.dna[0]);
    steerB.mult(this.dna[1]);

    this.applyForce(steerG);
    this.applyForce(steerB);
  }


  this.eat= function(list,perception){
    var closest =Infinity;
    var closestI = -1;
    for(var i=0; i< list.length; i++){
      var d= this.pos.dist(list[i]);
      if(d<closest){
        closest = d;
        closestI=i;
      }
    }
    if(closestI>-1 ){

      if(closest<perception)
      return this.seek(list[closestI])
      else return createVector(0,0);
    }
    else {  
      if(foodfinish==0)  foodfinish=1;
      this.pos=createVector(-100,-100);
      return createVector(0,0);}
    // if(this.pos.dist(list[closestI])< 5)
    //   list.splice(closestI,1)
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

  this.boundaries = function(){
    var desired= null;
    var d= 0;
    if(this.pos.x < d){
      desired= createVector(this.maxSpeed, this.vel.y)
    }
    else if (this.pos.x > width/2 -d){
       desired= createVector(-this.maxSpeed, this.vel.y);
    }

    else if(this.pos.y <d){
      desired= createVector(this.vel.x,this.maxSpeed);
    }
    else if(this.pos.y >height-d){
      desired= createVector(this.vel.x,-this.maxSpeeed);
    }
    
    if(desired!= null){
      desired.normalize();
      desired.mult(1);
      var steer = p5.Vector.sub(desired,this.vel);
      steer.limit(10);
      this.applyForce(steer);
    }
  }
}