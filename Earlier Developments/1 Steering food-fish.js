var food = [];
var poison = [];
var v;
var count =0
function setup(){
  createCanvas(700,700);
  background(51);
  for(var i=0; i< 100; i++)
  {
    food[i]= createVector(random(width), random(height))
    stroke(0,255,0);
    ellipse(food[i].x,food[i].y,4,4)
    poison[i]= createVector(random(width), random(height))
    
   
  }
 


  v= new Vehicle();
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
  v.eat(food);
  v.repel(poison)
 // v.seek(createVector(mouseX,mouseY))
  v.update();
  v.show();



}

function Vehicle(){
  this.pos=createVector();
  this.vel=createVector();
  this.acc=createVector();
  this.maxSpeed = 4.5;
  this.maxForce = 3.1


  this.update = function(){
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed)
    this.pos.add(this.vel);
    this.acc.mult(0.1);
    for(var i=0; i< food.length; i++){
      var d= this.pos.dist(food[i]);
      if(d<8)
        {food.splice(i,1)
          console.log(i);
          //food.push(createVector(random(width),random(height)))
        }
        }
        for(var i=0; i< poison.length; i++){
      var d2= this.pos.dist(poison[i]); 
      if(d2<4)
        {poison.splice(i,1)
          createP("posion eaten" + count++)}

    }
    
  }
  this.show= function(){
    var head= this.vel.heading();
    push();
    translate(this.pos.x,this.pos.y);
    rotate(head);
    strokeWeight(4);
   
    line(-10,0,10,0);
    //rotate(head);
    pop();

  }

  this.eat= function(list){
    var closest =Infinity;
    var closestI = -1;
    for(var i=0; i< food.length; i++){
      var d= this.pos.dist(list[i]);
      if(d<closest){
        closest = d;
        closestI=i;
      }
    }

    v.seek(list[closestI])
    // if(this.pos.dist(list[closestI])< 5)
    //   list.splice(closestI,1)
  }

  this.dont = function(target)
  {
    var desired= p5.Vector.sub(target,this.pos);
    desired.setMag(this.maxSpeed/2);
    //desired.mult(-1)

    var steer= p5.Vector.sub(desired, this.vel)
    steer.limit(this.maxForce)
    steer.mult(-1);
    this.applyForce(steer)
  }



  this.repel= function(list){
    var closest =Infinity;
    var closestI = -1;
    for(var i=0; i< poison.length; i++){
      var d= this.pos.dist(list[i]);
      if(d<closest){
        closest = d;
        closestI=i;
      }
    }

    v.dont(list[closestI])
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
    this.applyForce(steer)
  }

}