var food = [];
var poison = [];
var vehicles = [] ;
var count =0;
var foodfinish=0;
var debug;
function setup(){
  
  createCanvas(1490,700);
  background(51);
  debug= createCheckbox();
  for(var i=0; i< 220; i++)
  {
    food[i]= createVector(random(width), random(height))
    stroke(0,255,0);
    ellipse(food[i].x,food[i].y,4,4)
    poison[i]= createVector(random(width), random(height))
    
   
  }
 

  for(var i =0; i < 25; i++){
  vehicles[i]= new Vehicle(random(width), random(height),i);}

  createP("STATISTICS OF THE DEAD : ")
  createP("Food   Poison  Id      &nbsp &nbsp &nbsp &nbsp  &nbsp &nbsp &nbsp &nbsp  GMult  &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp  &nbsp &nbsp &nbsp &nbsp BMult  &nbsp &nbsp &nbsp  &nbsp &nbsp &nbsp &nbsp &nbsp  &nbsp &nbsp &nbsp &nbsp Maxspeed  &nbsp &nbsp &nbsp &nbsp  &nbsp &nbsp &nbsp &nbsp  &nbsp &nbsp &nbsp &nbsp &nbsp MaxForce  &nbsp &nbsp &nbsp &nbsp &nbsp  &nbsp &nbsp &nbsp &nbsp BlackMagic");
  
}

function draw(){
  background(51);
  for(var i=0; i< food.length; i++)
  { push()
    fill(0,255,255);
    noStroke();
    ellipse(food[i].x,food[i].y,6,6)
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
  vehicles[i].boundaries();
  vehicles[i].behaviours(food,poison)
  vehicles[i].update();
  vehicles[i].show();
  vehicles[i].clone();
  if(vehicles[i].health<-1  || random(1)<map(vehicles[i].age,1000,10000,0.01,0.5))
   { createP(vehicles[i].foodcount+"        &nbsp  &nbsp &nbsp          " + vehicles[i].poisoncount + "   &nbsp &nbsp &nbsp &nbsp " + vehicles[i].id + "    &nbsp &nbsp DNA : "+ vehicles[i].dna[0] + "     " + vehicles[i].dna[1] + "    " + vehicles[i].maxSpeed + "    "+ vehicles[i].maxForce + "   &nbsp &nbsp &nbsp &nbsp  : " +vehicles[i].blackcount + " &nbsp &nbsp &nbsp &nbsp age:  " +  vehicles[i].age);
    vehicles.splice(i,1)}

    
}


if(foodfinish==1 ) {

foodfinish=2;
  
// for(var i = 0; i< vehicles.length; i++){
//   createP(vehicles[i].foodcount+"        &nbsp  &nbsp &nbsp          " + vehicles[i].poisoncount + "   &nbsp &nbsp &nbsp &nbsp " + vehicles[i].id + "    &nbsp &nbsp DNA : "+ vehicles[i].dna[0] + "     " + vehicles[i].dna[1] + "    " + vehicles[i].maxSpeed + "    "+ vehicles[i].maxForce + "   &nbsp &nbsp &nbsp &nbsp Blacked : " +vehicles[i].blackcount);

 //createP(vehicles[i].foodcount+" food and " + vehicles[i].poisoncount + " poisons eaten by # " + vehicles[i].id + " vehicle; its dna : "+ vehicles[i].dna[0] + "  " + vehicles[i].dna[1])}

}



}

function Vehicle(x,y,i,dna){
  this.pos=createVector(x,y);
  this.vel=createVector();
  this.acc=createVector();
  this.maxSpeed = 5.5;
  this.maxForce = 3.1;
  this.id=i;
  this.health=30;
  this.age=0


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
  this.dna[2]= dna[2] + random(-0.5,0.5); //MAxSpeed
  this.dna[3]= dna[3] + random(-0.5,0.5); //MaxForce
  this.dna[4]= dna[4] + random(-0.009,0.005);//Black Magic prob.
  this.dna[5]= dna[5] + random(-10,30);//Food Perception
  this.dna[6]= dna[6] + random(-10,30);

}

  this.maxSpeed = this.dna[2];
  this.maxForce = this.dna[3];

  this.poisoncount=0;
  this.foodcount=0;
  this.blackcount=0;
  this.black= 1;
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
          console.log(i);
          this.foodcount++;
          this.health+=0.9;
          if(random(1)<0.99)
            food.push(createVector(random(width),random(height)))
        }
        }

    for(var i=0; i< poison.length; i++){
      var d2= this.pos.dist(poison[i]); 
      if(d2<4)
        {poison.splice(i,1);
          this.poisoncount++;
          this.health-=0.5;
         if(random(1)<0.99)
            poison.push(createVector(random(width),random(height)))
          }

    }



    // if(this.pos.x > width || this.pos.x < 0) {this.vel.x*=-1; this.acc.mult(-1);}
    // else if(this.pos.y > height || this.pos.y < 0){ this.vel.y*=-1; this.acc.mult(-1);}

    
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
    if(random(1)< map(this.age,400,8000,0.001,0.1) && this.health >24)
      vehicles.push(new Vehicle(this.pos.x, this.pos.y, this.id*10 +1, this.dna))

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
    var d= 25;
    if(this.pos.x < d){
      desired= createVector(this.maxSpeed, this.vel.y)
    }
    else if (this.pos.x > width -d){
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
      desired.mult(this.maxSpeed);
      var steer = p5.Vector.sub(desired,this.vel);
      steer.limit(this.maxForce);
      this.applyForce(steer);
    }
  }
}