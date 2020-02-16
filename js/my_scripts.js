const up = document.getElementById("up");
const down = document.getElementById("down");
const left = document.getElementById("left");
const right = document.getElementById("right");
const fuel = document.getElementById("fuel");
const canister = document.getElementById("canister");
const upCar = 90
const downCar = 270
const leftCar = 0
const rightCar = 180
let myCar = {
  car: document.getElementById("car"),
  tank: 30,
  y: 100,
  x: 100,
  canister: 30,
  showName: function(){
    console.log('seiko');
  },
  showTank: function(){
    fuel.innerHTML = this.tank;
  },
  hideCar: function(){
    this.car.style.display = 'none'
  },
  showThis: function(){
    console.log(this);
  }
}

// samochód ma:
// spalać benzynę ma bak 50 l
// po wjechaniu na stację ma tankować do momentu wyjechania ze stacji
// po wjechaniu na pole x od 0 - 100 i y 0 - 100

const combustion = () => {
  myCar.tank -= 0.5; // myCar.tank = myCar.tank - 0.5
}
const gasTank = () => {
  if((myCar.x < 100 && myCar.x > 0) && (myCar.y < 100 && myCar.y > 0) )
  myCar.tank = 50;
}
const fillFromCanister = () => {
  if((myCar.tank < 45) && (myCar.canister > 5)){
    myCar.tank += 5;
    myCar.canister -= 5;
  }
}


const carReposition = (positionChangeX, positionChangeY, rotation) => {
  if (myCar.tank > 0){
    myCar.y += positionChangeY;
    myCar.x += positionChangeX;
    myCar.car.style.top = `${myCar.y}px`;
    myCar.car.style.left = `${myCar.x}px`;
    myCar.car.style.transform = `rotate(${rotation}deg)`;
    combustion();
    gasTank();
    fuel.innerHTML = myCar.tank;
  }
}
carReposition(0, 0, leftCar);
// first car reposition
carReposition(0, 0, leftCar);


const keyboard = (e) => {
  console.log(e);
  if (e.code == 'ArrowRight') carReposition(3, 0, rightCar)
  else if (e.code == "ArrowLeft") carReposition(-3, 0, leftCar)
  else if (e.code == "ArrowUp") carReposition(0, -3, upCar)
  else if (e.code == "ArrowDown") carReposition(0, 3, downCar)
}


up.addEventListener("click", () => {carReposition(0, -3, upCar)});
down.addEventListener("click", () =>{carReposition(0, 3, downCar)});
left.addEventListener("click", () =>{carReposition(-3, 0, leftCar)});
right.addEventListener("click", () =>{carReposition(3, 0, rightCar)});
canister.addEventListener("click", fillFromCanister);
document.addEventListener("keydown", (e) =>{keyboard(e)});
