// inject all paper objects & functions globally
paper.install(window);

// initialize canvas ('canvas' is the id in the HTML)
paper.setup(canvas);

//audio du jeu 
const audio = new Audio('son/DifferentHeavenNekozilla.mp3');

// audio bruit tir
const audiotir = new Audio('son/Transition 5.mp3');

// audio bruit destruction
const audiodestruction = new Audio('son/Explosion.mp3')

// audio win 
const audiowin = new Audio('son/Applaudissements.mp3')

// audio loose
const audioloose = new Audio('son/Musique triste.mp3')

// audio perte de vie 
const audiotirennemi = new Audio('son/Toing.mp3') 

// random 
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
 
//zone de déplacement
const startzonedeplacement = new Point(100, 550)
const endzonedeplacement = new Point(1600, 800)
const zonedeplacement = new Path.Rectangle(startzonedeplacement, endzonedeplacement)
zonedeplacement.fillColor = "Green" 
zonedeplacement.visible = false

//player
const player = new Raster({source:"vaisseau.png "});
player.position = new Point(700, 700);
player.visible = false


//box player
const startbox = new Point(player.position.x, player.position.y);    
const radiusbox = 40;
const box = new Path.Circle(startbox, radiusbox)
box.position = (player.position.x, player.position.y)
box.strokeWidth = 1
box.visible = false
box.strokeColor = "Pink"

// debris ennemi1
const debrisennemi1_1 = new Raster ({source: "annim_mort.png"});
debrisennemi1_1.position = new Point(view.size.width/2 +10, 100);
debrisennemi1_1.visible = false

const debrisennemi1_2 = new Raster ({source: "annim_mort.png"});
debrisennemi1_2.position = new Point(view.size.width/2 -10, 100);
debrisennemi1_2.visible = false
debrisennemi1_2.rotate(90)

//debris ennemi2
const debrisennemi2_1 = new Raster ({source: "annim_mort.png"});
debrisennemi2_1.position = new Point(view.size.width/4 +10, 100);
debrisennemi2_1.visible = false

const debrisennemi2_2 = new Raster ({source: "annim_mort.png"});
debrisennemi2_2.position = new Point(view.size.width/4 -10, 100);
debrisennemi2_2.visible = false
debrisennemi2_2.rotate(90)

//debris ennemi3
const debrisennemi3_1 = new Raster ({source: "annim_mort.png"});
debrisennemi3_1.position = new Point(view.size.width/3 +10, 100);
debrisennemi3_1.visible = false

const debrisennemi3_2 = new Raster ({source: "annim_mort.png"});
debrisennemi3_2.position = new Point(view.size.width/3 -10, 100);
debrisennemi3_2.visible = false
debrisennemi3_2.rotate(90)

// varibale anilation debris1
let moveDebrisEnnemi1 = false
let moveDebrisEnnemi2 = false
let moveDebrisEnnemi3 = false

//vie 
const premiere_vie = new Raster({source: "vie.png"});
premiere_vie.position = new Point(50, 850);
premiere_vie.visible = false

const deuxieme_vie = new Raster({source: "vie.png"});
deuxieme_vie.position = new Point (90, 850);
deuxieme_vie.visible = false

const troisieme_vie = new Raster({source: "vie.png"});
troisieme_vie.position = new Point (130, 850);
troisieme_vie.visible = false

//variables missileplayer
let moveMissiliePlayer = false
let missileplayer

//missile player
missileplayer = new Raster({source: "missile_vaisseau.png"});
missileplayer.visible = false

//vie 
let vie_restante = 3

//event start
view.onClick = function() {

    audio.play()
  
    if(!isGameStart) start()
    player.visible = true
    box.visible = false
    premiere_vie.visible = true
    deuxieme_vie.visible = true
    troisieme_vie.visible = true

//ennemi1
const ennemi = new Raster({source: "ennimis.png"});
ennemi.position = new Point(view.size.width/2, 100);
ennemi.visible = true

//ennemi2
const ennemi2 = new Raster({source: "ennimis.png"});
ennemi2.position = new Point(view.size.width/4, 100);
ennemi2.visible = true

//enemi3
const ennemi3 = new Raster({source: "ennimis.png"});
ennemi3.position = new Point(view.size.width/3, 100);
ennemi3.visible = true

//box ennemi
const startboxennemi = new Point(ennemi.position.x, ennemi.position.y);    
const radiusboxennemi = 50;
const boxennemmi = new Path.Circle(startboxennemi, radiusboxennemi)
boxennemmi.strokeWidth = 1
boxennemmi.strokeColor = "Pink"
boxennemmi.visible = false

const startboxennemi2 = new Point(ennemi2.position.x, ennemi2.position.y);    
const radiusboxennemi2 = 50;
const boxennemmi2 = new Path.Circle(startboxennemi2, radiusboxennemi2)
boxennemmi2.strokeWidth = 1
boxennemmi2.strokeColor = "Pink"
boxennemmi2.visible = false

const startboxennemi3 = new Point(ennemi3.position.x, ennemi3.position.y);    
const radiusboxennemi3 = 50;
const boxennemmi3 = new Path.Circle(startboxennemi3, radiusboxennemi3)
boxennemmi3.strokeWidth = 1
boxennemmi3.strokeColor = "Pink"
boxennemmi3.visible = false

// compteur de point pour win
let cptwin = 0

// compteur de point pour lose
let cptloose = 0

// fonction onFrame
view.onFrame = function (){

    //condition de déplacement
    if(moveMissiliePlayer){
    missileplayer.position.y -= 10 
    // collision missile player
    const collisionenemy = missileplayer.contains(ennemi.position)
    const collisionenemy2 = missileplayer.contains(ennemi2.position)
    const collisionenemy3 = missileplayer.contains(ennemi3.position)
    
    if (missileplayer.contains(ennemi.position)){
        // changer la variable d'animation
        moveDebrisEnnemi1 = true 
        //supprimer le missileplayer et l'arreter
        moveMissiliePlayer = false
        missileplayer.position.y-=0
        // supprimer le missile enemmi 
        moveMissilieEnemy = false
        missileennemi.visible = false
        missileennemi.position.y -= 0
        //lancement de l'audio destruction
        audiodestruction.play();
        // les éléments "disparaisse"
        ennemi.visible = false
        boxennemmi.visible = false
        missileplayer.visible = false
        // animation mort apparait
        debrisennemi1_1.visible = true
        debrisennemi1_2.visible = true
        // ajout au cpt
        cptwin += 1
    }
    if (missileplayer.contains(ennemi2.position)){
        // changer la variable d'animation
        moveDebrisEnnemi2 = true 
        //supprimer le missileplayer et l'arreter
        moveMissiliePlayer = false
        missileplayer.position.y-=0
        // supprimer le missile enemmi 
        moveMissilieEnemy2 = false
        missileennemi2.visible = false
        //lancement de l'audio destruction
        audiodestruction.play();
        // les éléments "disparaisse"
        ennemi2.visible = false
        boxennemmi2.visible = false
        missileplayer.visible = false
        // animation mort apparait
        debrisennemi2_1.visible = true
        debrisennemi2_2.visible = true
        // ajout au cpt
        cptwin += 1
    }
    if (missileplayer.contains(ennemi3.position)){
        // changer la variable d'animation
        moveDebrisEnnemi3 = true 
        //supprimer le missileplayer et l'arreter
        moveMissiliePlayer = false
        missileplayer.position.y-=0
        // supprimer le missile enemmi 
        moveMissilieEnemy3 = false
        missileennemi3.visible = false
        //lancement de l'audio destruction
        audiodestruction.play();
        // les éléments "disparaisse"
        ennemi3.visible = false
        boxennemmi3.visible = false
        missileplayer.visible = false
        // animation mort apparait
        debrisennemi3_1.visible = true
        debrisennemi3_2.visible = true
        // ajout au cpt
        cptwin += 1
        
    }
    // condition de victoire
    if (cptwin == 3){
        missileplayer.position.y -= 0
        gameWin()
        audio.volume = 0.00;
        audiowin.play()
    }
    }
    //condition de déplacement
    if(moveMissilieEnemy) {
    missileennemi.position.y += 7
    //collision missile ennemi et condition de vie 
    const collisionmissile = missileennemi.contains(box.position)
        
    if (missileennemi.contains(box.position)){
        //supprimer et arreter le missileennemi
        moveMissilieEnemy = false
        missileennemi.position.y+=0
        vie_restante -= 1
        audiotirennemi.play()
        if (vie_restante == 2){
            cptloose +=1
            troisieme_vie.visible = false 
        }
        if (vie_restante == 1){
            cptloose +=1
            deuxieme_vie.visible = false
        }
        if (vie_restante == 0){
            cptloose +=1
            premiere_vie.visible = false
            //animation de loose
            audio.volume = 0.00;
            audioloose.play()
            gameOver()     
        }
        missileennemi.visible = false
    }
    }
    //missile 2
    if(moveMissilieEnemy2) {
    missileennemi2.position.y += 7
    const collisionmissile2 = missileennemi2.contains(box.position)
    
    if (missileennemi2.contains(box.position)){
        //supprimer et arreter le missileennemi
        moveMissilieEnemy2 = false
        missileennemi2.position.y+=0
        vie_restante -= 1
        audiotirennemi.play()
        if (vie_restante == 2){
            cptloose +=1
            troisieme_vie.visible = false 
        }
        if (vie_restante == 1){
            cptloose +=1
            deuxieme_vie.visible = false
        }
        if (vie_restante == 0){
            cptloose +=1
            premiere_vie.visible = false
            //animation de loose
            audio.volume = 0.00;
            audioloose.play()
            gameOver()     
        }
        missileennemi2.visible = false
    }
    }
    //missile 3
    if(moveMissilieEnemy3) {
    missileennemi3.position.y += 7
    const collisionmissile3 = missileennemi3.contains(box.position)
    
    if (missileennemi3.contains(box.position)){
        //supprimer et arreter le missileennemi
        moveMissilieEnemy3 = false
        missileennemi3.position.y+=0
        vie_restante -= 1
        audiotirennemi.play()
        if (vie_restante == 2){
            cptloose +=1
            troisieme_vie.visible = false 
        }
        if (vie_restante == 1){
            cptloose +=1
            deuxieme_vie.visible = false
        }
        if (vie_restante == 0){
            cptloose +=1
            premiere_vie.visible = false
            //animation de loose
            audio.volume = 0.00;
            audioloose.play()
            gameOver()     
        }
        missileennemi3.visible = false
    }
    }

    //move debris     
    if(moveDebrisEnnemi1){
        debrisennemi1_1.position.x += 5
        debrisennemi1_1.position.y += 5
        debrisennemi1_1.rotate(10)

        debrisennemi1_2.position.x -= 2
        debrisennemi1_2.position.y += 5
        debrisennemi1_2.rotate(10)
    }
    if(moveDebrisEnnemi2){
        debrisennemi2_1.position.x += 5
        debrisennemi2_1.position.y += 5
        debrisennemi2_1.rotate(10)

        debrisennemi2_2.position.x -= 2
        debrisennemi2_2.position.y += 5
        debrisennemi2_2.rotate(10)
    }
    if(moveDebrisEnnemi3){
        debrisennemi3_1.position.x += 5
        debrisennemi3_1.position.y += 5
        debrisennemi3_1.rotate(10)

        debrisennemi3_2.position.x -= 2
        debrisennemi3_2.position.y += 5
        debrisennemi3_2.rotate(10)
    }
}

//missile enemi
let missileennemi
let moveMissilieEnemy = false
let missileennemi2
let moveMissilieEnemy2 = false
let missileennemi3
let moveMissilieEnemy3 = false

//fonctions missiles
function missile_ennemi(){
    missileennemi = new Raster ({source: "missile_ennemi.png"})
    missileennemi.position = new Point(840, 140);
    missileennemi.visible = true

    moveMissilieEnemy = true
    
    if (ennemi.visible == false){
        moveMissilieEnemy = false
        missileennemi.visible = false
    }

    if (cptwin == 3){
        missileennemi.visible = false
    }
    if (cptloose == 3){
        missileennemi.visible = false
    } 
}

function missile_ennemi2(){
    missileennemi2 = new Raster ({source: "missile_ennemi.png"})
    missileennemi2.position = new Point(420, 140);
    missileennemi2.visible = true

    moveMissilieEnemy2 = true

    if (ennemi2.visible == false){
    moveMissilieEnemy2 = false
    missileennemi2.visible = false
    }
    
    if (cptwin == 3){
        missileennemi2.visible = false
    }
    if (cptloose == 3){
        missileennemi2.visible = false
    } 
}

function missile_ennemi3(){
    missileennemi3 = new Raster ({source: "missile_ennemi.png"})
    missileennemi3.position = new Point(560, 140);
    missileennemi3.visible = true

    moveMissilieEnemy3 = true

    if (ennemi3.visible == false){
    moveMissilieEnemy3 = false
    missileennemi3.visible = false
    }
    
    if (cptwin == 3){
        missileennemi3.visible = false
    }
    if (cptloose == 3){
        missileennemi3.visible = false
    } 
}

//lancement des fonctions missile_ennemi
setInterval(missile_ennemi, 2500)
setInterval(missile_ennemi2, 2000)
setInterval(missile_ennemi3, 3000)

}

//déplacement player
view.onKeyDown = function(event){
    console.log(event.key)
    if (event.key == "up"){
        if (player.position.y > 550){
            box.position.y -= 20
            player.position.y -= 20
        }
    }

    if (event.key == "down"){
        if (player.position.y < 800){
            box.position.y += 20
            player.position.y += 20
        }
    }

    if (event.key == "right"){
        if (player.position.x < 1600){
            box.position.x += 20
            player.position.x += 20
        }
    }

    if (event.key == "left"){
        if (player.position.x > 100){
            box.position.x -= 20
            player.position.x -= 20
        }
    }

    // condition de visibilité missile player
    if (event.key == "space"){
        if (missileplayer.visible == false){
        // lancement de l'audio tir
        audiotir.play();
        //mettre à jour sa position 
        missileplayer.position = new Point(player.position.x, player.position.y -50);
        //l'afficher
        missileplayer.visible = true
        moveMissiliePlayer = true
        }
        if(missileplayer.position.y <=0){
        // lancement de l'audio tir 
        audiotir.play();
        //mettre à jour sa position 
        missileplayer.position = new Point(player.position.x, player.position.y -50);
        //l'afficher
        missileplayer.visible = true
        moveMissiliePlayer = true
        } 
    }
}

//start game
const startMessage = new PointText(new Point(view.size.width/2, view.size.height/2));
startMessage.justification = 'center';
startMessage.fillColor = 'black';
startMessage.fontSize = 30
startMessage.content = 'Cliquer pour commencer';

//start
function start(){
    isGameStart = true
    startMessage.visible = false
}

//game over
const gameOverMessage = new PointText(new Point(view.size.width/2, view.size.height/2));
gameOverMessage.justification = 'center';
gameOverMessage.fillColor = 'red';
gameOverMessage.fontSize = 50
gameOverMessage.content = 'Game Over';
gameOverMessage.visible = false

//game win
const gameWinMessage = new PointText(new Point(view.size.width/2, view.size.height/2));
gameWinMessage.justification = 'center';
gameWinMessage.fillColor = 'green';
gameWinMessage.fontSize = 60
gameWinMessage.content = 'You Win';
gameWinMessage.visible = false 

//loose 
function gameOver() {
  isGameOver = true
  gameOverMessage.visible = true
}

//win 
function gameWin(){
    isGameWin = true
    gameWinMessage.visible = true
}

//variable de Game
let isGameOver = false
let isGameStart = false
let isGameWin = false

