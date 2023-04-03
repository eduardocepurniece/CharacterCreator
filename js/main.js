document.querySelector('#createNewCharButton').addEventListener('click', openCharCreator);
document.querySelector('#submitCharButton').addEventListener('click', closeCharCreator);

let characters = [];

function openCharCreator(){
    document.querySelector('.charList').classList.add('hidden');
    document.querySelector('.createChar').classList.remove('hidden');
}

/*function submitNewChar(){
    
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