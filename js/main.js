document.querySelector('#createNewCharButton').addEventListener('click', openCharCreator);
document.querySelector('#submitCharButton').addEventListener('click', closeCharCreator);

let inputs = document.querySelectorAll('input');

//Array.from(inputs).forEach(element => element.addEventListener('click', drawChar));

let currFrame = 0;
let currPosition = 0;

let characters = [];

function openCharCreator(){
    document.querySelector('.charList').classList.add('hidden');
    document.querySelector('.createChar').classList.remove('hidden');
    drawChar();
}

/*draw character on canvas*/
function drawChar(){
    /*let info = checkForChecked();
    
    let xCord = [0, 49, 94, 49];

    let charCanva = document.querySelector('canvas');
    let ctx = charCanva.getContext("2d");
    let img = new Image();
    img.src = `Images/Characters/${info[0]}_${info[1]}_${info[2]}.png`;*/
    

    const step = () => {

        let info = checkForChecked();
    
        let xCord = [0, 49, 94, 49];

        let charCanva = document.querySelector('canvas');
        let ctx = charCanva.getContext("2d");
        let img = new Image();
        img.src = `Images/Characters/${info[0]}_${info[1]}_${info[2]}.png`;


        //img.onload = function (e){
            ctx.clearRect(0,0,300,200);
            ctx.drawImage(img,xCord[currPosition],0,49,64,100,50,49,64);
        //}

        updateFrame();

        requestAnimationFrame(() => {
            step();
        });
    }
    step();
}

function updateFrame(){
    if(currFrame > 16){
        currFrame = 0;
        if(currPosition > 2){
            currPosition = 0;
        }else{
            currPosition += 1;
        }
    }else{
        currFrame += 1;
    }
}

function checkForChecked(){
    let checkedOptions = [];
    inputs.forEach( x => {
        if(x.checked === true){
            checkedOptions.push(x.value);
        }
    });
    return checkedOptions;
}

/*function gameLoop(){
    const step = () => {
        console.log('step');
        requestAnimationFrame(() => {
            step();
        });
    }
    step();
}*/

function closeCharCreator(){
    document.querySelector('.charList').classList.remove('hidden');
    document.querySelector('.createChar').classList.add('hidden');
}

function CreateChar(name, race, classJob, image){
    this.name = name;
    this.race = race;
    this.classJob = classJob;
    this.image = image;
}