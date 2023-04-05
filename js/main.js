document.querySelector('#createNewCharButton').addEventListener('click', openCharCreator);
document.querySelector('#submitCharButton').addEventListener('click', closeCharCreator);
document.querySelector('#playStopSong').addEventListener('click', playStopSong);

let songToggle = false;
let cSound = document.querySelector('#clickSound');

function playStopSong(){
    if(!songToggle){
        document.querySelector('#backgroundSong').play();
        document.querySelector('#playStopSong').innerHTML = 'Music off';
        songToggle = true;
    }else{
        document.querySelector('#backgroundSong').pause();
        document.querySelector('#playStopSong').innerHTML = 'Music on';
        songToggle = false;
    }
}


/*Character properties array*/ 
let inputs = document.querySelectorAll('input');
Array.from(inputs).forEach(element => element.addEventListener('click', playClickSound))

function playClickSound(click){
    cSound.play();
}

/*variables for frame counting for sprite movement */
let currFrame = 0;
let currPosition = 0;

let characters = [];

let runCheck = false;
/*function to change screen from list to creator and initiate the drawing of the char loop */
function openCharCreator(){
    cSound.play();
    document.querySelector('.charList').classList.add('hidden');
    document.querySelector('.createChar').classList.remove('hidden');
    /*check if drawChar loop has initiated */
    if(!runCheck){
        drawChar();
        console.log(runCheck);
    }    
}

/*Changes screen from creator to list */
function closeCharCreator(){
    cSound.play();
    let info = checkForChecked();
    let charName = document.querySelector('#name').value;
    let nameValidator = true;

    if(charName.length){
        for(let i = 0; i < characters.length; i++){
            console.log('insidee');
            if (Object.values(characters[i]).indexOf(charName) > -1) {
                nameValidator = false;
                alert('Name already taken.')
            }
        }       
    }else{
        nameValidator = false;
        alert('Please have the decency to give the character a name!');
    }
    if(nameValidator){
        let newChar = new CharCreator(charName, info[0], info[1], info[2],statsSelector(info[1]));
        characters.push(newChar);
        putCharsInDom(newChar);

        document.querySelector('.charList').classList.remove('hidden');
        document.querySelector('.createChar').classList.add('hidden');
    }    
}

/*draw character on canvas and game loop*/
function drawChar(){
    runCheck = true;

    /*game loop */
    const step = () => {
        /*saves selected char properties */
        let info = checkForChecked();

        /*hardcoded img pixel cuts */
        let xCord = [0, 49, 94, 49];

        /*getting img on canva */
        let charCanva = document.querySelector('canvas');
        let ctx = charCanva.getContext("2d");
        let img = new Image();
        img.src = `Images/Characters/${info[0]}_${info[1]}_${info[2]}.png`;

        ctx.clearRect(0,0,300,200);
        ctx.drawImage(img,xCord[currPosition],0,49,64,100,50,49,64);
        
        /*check stats given the class */
        let stats = statsSelector(info[1]);
        let passiveBenefits = racePassiveSelector(info[0]);
        displayCreatorInfo(stats, passiveBenefits);

        updateFrame();

        /*makes step call itself again each new animation frame(makes game loop) */
        requestAnimationFrame(() => {
            step();
        });
    }
    step();
}

/*Frame counting for animation/sprite movement*/
function updateFrame(){
    if(currFrame > 6){
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

/*push selected inputs of char properties into array*/
function checkForChecked(){
    let checkedOptions = [];
    inputs.forEach( x => {
        if(x.checked === true){
            checkedOptions.push(x.value);
        }
    });
    return checkedOptions;
}

function racePassiveSelector(race){
    if(race === 'human'){
        return ['hardship', 'The simple man, having gone through many hardships, deals a little bit more damage than the other races.'];
    }else if(race === 'noble'){
        return ['divineLuck', 'Having had the divine luck of being born in the noble class, the noblemen have an increased critical hit chance.'];
    }else if(race === 'elf'){
        return ['earthBalance', 'The elves are known watch over the balance of nature, and so nature has gift them with a faster mp recovery.'];
    }else if(race === 'orc'){
        return ['roughSkin', 'Orcs are though beings. Given their rough skin, they have a natural health recovery ability.'];
    }   
}

function statsSelector(classJ){
    if(classJ === 'warrior'){
        return [24, 18, 12, 15, 'Strong and resilient fighters that use two handed weapons to fight their foes.'];
    }else if(classJ === 'rogue'){
        return [12, 18, 15, 24, 'Stealth and surprise attack artisans that have luck on their side.'];
    }else if(classJ === 'mage'){
        return [12, 15, 24, 18, 'Wise beings that have learned the intrinsic ways of complex magic.'];
    }else if(classJ === 'hunter'){
        return [18, 24, 15, 12, 'Nimble and quick on foot, fast with the bows and arrows, and so they hunt their prey.'];
    }
}

function displayCreatorInfo(stats, benefits){
    document.querySelector('#str').innerHTML = `str: ${stats[0]}`;
    document.querySelector('#agi').innerHTML = `agi: ${stats[1]}`;
    document.querySelector('#wis').innerHTML = `wis: ${stats[2]}`;
    document.querySelector('#lck').innerHTML = `lck: ${stats[3]}`;
    document.querySelector('#classBriefing').innerHTML = stats[4];

    document.querySelector('#raceBriefing').innerHTML = benefits[1];
}

function CharCreator(name, race, classJob, gender, stats){
    this.name = name;
    this.race = race;
    this.classJob = classJob;
    this.gender = gender;
    this.image = `Images/Characters/${this.race}_${this.classJob}_${this.gender}.png`;
    this.racePassive = racePassiveSelector(this.race)[0];

    this.str = stats[0];
    this.agi = stats[1];
    this.wis = stats[2];
    this.lck = stats[3];
}

function putCharsInDom(char){
    const newLi = document.createElement("li");
    const newDiv = document.createElement('div');
    const cname = document.createElement("p");
    const raceClass = document.createElement("p");
    const cImage = document.createElement('img');
    newDiv.classList.add('cropped-image');
    newLi.classList.add('char');

    cImage.src = char.image;
    const cnameNode = document.createTextNode(char.name);
    const raceClassNode = document.createTextNode(`${char.race} ${char.classJob}`);
    
    newDiv.appendChild(cImage);
    cname.appendChild(cnameNode);
    raceClass.appendChild(raceClassNode);

    newLi.appendChild(newDiv);
    newLi.appendChild(cname);    
    newLi.appendChild(raceClass);
    document.querySelector('#charactersUl').appendChild(newLi);
}