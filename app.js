

let elQuestionScreen    = document.getElementById("questionscreen");
let elAnswerscreen      = document.getElementById("answerscreen");
let elWelcomeScreen     = document.getElementById("welcomescreen");
let elwelcomeError      = document.getElementById("welcomeError");
let elGoodbyeScreen     = document.getElementById("goodbyescreen");
let elWelcomeBtn        = document.getElementById("welcome_btn");
let elAnswersBtn        = document.getElementById("answers_btn");
let elBackToStartBtn    = document.getElementById("backToStart_btn");
let elNumberOfQuestions = document.getElementById("numberOfQuestions");
let elUserNameView      = document.getElementById("userNameView");
let elViewUsers         = document.getElementById("viewUsers");
let elusers_btn         = document.getElementById("users_btn");
let elrestart_btn       = document.getElementById("restart_btn");
let valUserName         = "";
let arrUsers            = [];//new Object();            
let arrAnswers          = []
let g_userName          = "";
let allUsers            = [];


let question1 = new Question(
  "Cuán satisfech@ está con nuestra atención al cliente?",
  ["Muy satisfech@", "medianamente satisfech@", "nada satisfech@"]
);
let question2 = new Question(
  "Usted accedió a nuestra web desde un computador o desde un celular?",
  ["Desde un computador", "Desde un celular"]
);
let question3 = new Question(
  "Su computador muestra nuestro sitio web de una manera accesible y agradable?",
  ["Sí", "No"]
);
let question4 = new Question(
  "Su celular muestra nuestro sitio web de una manera accesible y agradable?",
  ["Sí", "No"]
);
let question5 = new Question("Usted es hombre o mujer?", ["Hombre", "Mujer"]);
let question6 = new Question(
  "El sitio web se mostró en color azul para usted?",
  ["Sí", "No"]
);
let question7 = new Question(
  "El sitio web se mostró en color rosado para usted?",
  ["Sí", "No"]
);
let question8 = new Question("Le gusta la música country o rock?", [
  "Country",
  "Rock",
]);
let question9 = new Question("El sitio reprodujo música country para usted?", [
  "Sí",
  "No",
]);
let question10 = new Question("El sitio reprodujo música rock para usted?", [
  "Sí",
  "No",
]);
let question11 = new Question("Usted tiene cuenta de correo Gmail o Yahoo?", [
  "Gmail",
  "Yahoo",
]);
let question12 = new Question(
  "Nuestro sitio web le conectó con su cuenta Gmail?",
  ["Sí", "No"]
);
let question13 = new Question(
  "Nuestro sitio web le conectó con su cuenta Yahoo?",
  ["Sí", "No"]
);
let question14 = new Question(
  "Nuestro personal estuvo presente cuando usted necesitó ayuda?",
  ["Sí", "No", "No necesité ayuda"]
);
let question15 = new Question(
  "Prefiere acceder a nuestra tienda personalmente o de manera online?",
  ["En persona", "Online"]
);
let question16 = new Question("Cuán satisfech@ está con nuestra página web?", [
  "Muy satisfech@",
  "medianamente satisfech@",
  "nada satisfech@",
]);

let question17 = new Question(
  "Usted logró realizar la transacción que deseaba desde nuestra página web?",
  ["Sí", "No"]
);

let question18 = new Question(
  "Cuánto tiempo tiene usted siendo nuestr@ cliente?",
  ["Soy cliente nuev@", "Meses", "Años"]
);

let question19 = new Question("Cuántas cuentas tiene usted con nosotros?", [
  "Una",
  "Dos",
  "Más de dos",
]);

let question20 = new Question("Le pareció demasiado larga esta encuesta?", [
  "Sí",
  "No",
]);

function Question(title, answers) {
  this.title      = title;
  this.answers    = answers;
  this.getElement = function () {
    let questionNumber = document.createElement("h2");
    questionNumber.textContent = `Pregunta ${quiz.indexCurrentQuestion + 1}/${quiz.questions.length}`;

    let questionTitle = document.createElement("h3");
    questionTitle.textContent = this.title;
    let questionAnswers = document.createElement("ul");
    questionAnswers.classList.add("question__answer");

    this.answers.forEach((answer, index) => {
      let elAnswer = document.createElement("li");
      elAnswer.classList.add("answer");
      elAnswer.textContent = answer;
      elAnswer.id = index + 1;
      elAnswer.addEventListener("click", this.enterAnswer);
      questionAnswers.append(elAnswer);
    });

    elQuestionScreen.append(questionNumber);
    elQuestionScreen.append(questionTitle);
    elQuestionScreen.append(questionAnswers);
  };

  this.enterAnswer = (event) => {
    let selectedAnswer = event.target.id;

    let lc_arrAnswers  = localStorage.getItem("arrAnswers");

    if(lc_arrAnswers == null) {
      arrAnswers[quiz.indexCurrentQuestion]=selectedAnswer;//agregamos la respuesta al array de respuestas
      localStorage.setItem("arrAnswers",JSON.stringify(arrAnswers));
      //console.log("[if] arrAnswers=> " + arrAnswers);
    }
    else{
      arrAnswers = JSON.parse(localStorage.getItem("arrAnswers"));
      arrAnswers[quiz.indexCurrentQuestion]=selectedAnswer;//agregamos la respuesta al array de respuestas
      localStorage.setItem("arrAnswers",JSON.stringify(arrAnswers));
      //console.log("localstorage => " + arrAnswers);
    }
    //ELIMINAR
    /*
    lc_arrAnswers = JSON.parse(localStorage.getItem("arrAnswers"));
    console.log("arrAnswers=> " + arrAnswers);
    console.log("localstorage => " + lc_arrAnswers);
    console.log("indexCurrentQuestion => ", localStorage.getItem("indexCurrentQuestion"));
    */
    //FIN ELIMINACION
    elQuestionScreen.textContent = "";
    /* ACTIVAR
    if (
        (
          (quiz.indexCurrentQuestion == 1 ||
           quiz.indexCurrentQuestion == 4 ||
           quiz.indexCurrentQuestion == 7 ||
           quiz.indexCurrentQuestion == 10
          ) 
          &&
          selectedAnswer == 2
        ) 
        ||
      quiz.indexCurrentQuestion == 2 ||
      quiz.indexCurrentQuestion == 5 ||
      quiz.indexCurrentQuestion == 8 ||
      quiz.indexCurrentQuestion == 11
    ) {
      quiz.indexCurrentQuestion += 2;
    } else {
      quiz.indexCurrentQuestion++;
    }
    */
    quiz.indexCurrentQuestion++; //DESACTIVAR
    quiz.showCurrentQuestion();
  };
}


function Quiz() {
  let indexCurrentQuestion = localStorage.getItem("indexCurrentQuestion");
  this.questions = [];  
  
  if(indexCurrentQuestion == null){
    this.indexCurrentQuestion = 0;
    localStorage.setItem("indexCurrentQuestion",this.indexCurrentQuestion);
  }
  else{
    this.indexCurrentQuestion = parseInt(indexCurrentQuestion);
  }
  this.addQuestions = function (questions) {
    questions.forEach((question) => {
      this.questions.push(question);
    });
  };
  this.showCurrentQuestion = function () { 
    //console.log("this.indexCurrentQuestion => " + this.indexCurrentQuestion)
    //console.log(this.indexCurrentQuestion +"<"+ this.questions.length)
    if (this.indexCurrentQuestion < this.questions.length) {
      this.questions[this.indexCurrentQuestion].getElement();
    } 
    else {//llegamos al final
      elQuestionScreen.style.display = "none";
      elGoodbyeScreen.style.display  = "block";
      elBackToStartBtn.style.display = "block";
      this.indexCurrentQuestion      = 0;          //=> FALTABA
      let lc_allUsers                = localStorage.getItem("allUsers");
      //console.log(arrAnswers)
      
      //console.log("ARRAY=> "+arrUsers);

      localStorage.removeItem("userName");//quitamos el usuario 
       

      let lc_users = localStorage.getItem("users");

      if(lc_users == null) {        
        arrUsers[valUserName]=arrAnswers; //agregamos el array de respuestas al array de usuarios 
        localStorage.setItem("users",JSON.stringify(arrUsers));
      }
      else{        
        arrUsers = JSON.parse(lc_users);
        //console.log("ACA=>"+lc_users)
        arrUsers[valUserName]=arrAnswers; //agregamos el array de respuestas al array de usuarios 
        localStorage.setItem("users",JSON.stringify(arrUsers));
      }

      if(lc_allUsers == null) {
        //console.log("en el if allUsers");
        allUsers[allUsers.length]   = valUserName;
        localStorage.setItem("allUsers",JSON.stringify(allUsers));
      }
      else{
        allUsers = JSON.parse(lc_allUsers);
        //console.log("allUsers.length => " + allUsers.length);
        //console.log("ANTES allUsers => " + allUsers);
        allUsers[allUsers.length]  = valUserName;
        //console.log("allUsers.length => " + allUsers.length);
        localStorage.setItem("allUsers",JSON.stringify(allUsers));
        //console.log("DESPUES allUsers => " + allUsers);
        //console.log("localstorage allUsers=> " + JSON.parse(localStorage.getItem("allUsers")));
      }
      arrAnswers = []//limpiamos el array de respuestas
    }
    localStorage.setItem("indexCurrentQuestion",this.indexCurrentQuestion);
  };
}



let quiz = new Quiz();
quiz.addQuestions([
  question1,question2,question3,/*question4,question5,question6,question7,question8,question9,question10,question11,question12,question13,question14,question15,question16,question17,question18,question19,question20,*/
]);

elNumberOfQuestions.textContent = quiz.questions.length;
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
const existeUsuario = (p_user) => {

  //let lc_allUsers3 = (localStorage.getItem("users"));
  //console.log("lc_allUsers3=>" + lc_allUsers3);
  //console.log("lc_allUsers3=>" + JSON.parse(lc_allUsers3));

  //console.log("<<<<=>"+JSON.parse(lc_allUsers3).Jose)

  let lc_allUsers2 = localStorage.getItem("allUsers");
  let okUser       = false;

  if(lc_allUsers2 != null){
    lc_allUsers2 = JSON.parse(lc_allUsers2);
    let okUser2  = lc_allUsers2.find(user => user == p_user);
    okUser       = (okUser2 === undefined)? false : true;    
  }
  return okUser;
}


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
const seeFirstQuestion = () => {
  
  valUserName = document.getElementById("username").value;
  let okUser  = existeUsuario(valUserName); 

  if(!okUser){
    localStorage.setItem("userName",valUserName);
    //localStorage.setItem("users",JSON.stringify(valUserName));

    elwelcomeError.style.display  = "none";
    elWelcomeScreen.style.display = "none";
    elAnswerscreen.style.display  = "none";
    elQuestionScreen.style.display= "block";
    elUserNameView.style.display  = "block";
    elrestart_btn.parentElement.style.display   = "block"; 
    //console.log(elNumberOfQuestions);
    elUserNameView.innerHTML      = "<span><strong>Usuario:</strong> " +valUserName +"</span>"
    //arrUsers.push(valUserName);//Agrego el usuario al array
    g_userName                    = valUserName;
    //arrUsers.push(g_userName);
    quiz.showCurrentQuestion();

    //console.log("indexCurrentQuestion => "+localStorage.getItem("indexCurrentQuestion"));

  }
  else{
    elwelcomeError.style.display = "block";
    elwelcomeError.innerHTML="<h4>Error: el usuario <i class='userNameAnserwers'>" +valUserName+" </i> ya existe</h4>";
  }
};


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
//Ver respuestas
const seeAnswers = (p_user="") => {
    elAnswerscreen.innerHTML="";
    //let v_userName  = (idUser=="" || idUser === undefined)? g_userName : idUser;
    let v_userName  = (p_user =="" || p_user === undefined)? localStorage.getItem("userName") : p_user;
    let lc_users    = JSON.parse(localStorage.getItem("users"));    // usuarios con sus respuestas
    //let arrUsers3   = JSON.parse(localStorage.getItem("allUsers")); // solo nombre de usuarios
    console.log("v_userName="+v_userName);
    console.log("lc_users="+lc_users);
    console.log("lc_users.v_userName="+lc_users[v_userName]);

    let arraA       = lc_users[v_userName];//DEBE SER ENTRE CORCHETES    //arrUsers[v_userName];//array de usuarios y busco uno en especifico
    elBackToStartBtn.style.display="block";
    elViewUsers.style.display     = "none";
   
    let eltitle = document.createElement("h2");
    eltitle.innerHTML="Usuario <i class='userNameAnserwers'>" + v_userName + "</i> respondio lo siguiente:";
    elAnswerscreen.append(eltitle);

    quiz.questions.forEach((q, index) => {
      let index1 = parseInt(arraA[index])
      let index2 = index1 - 1;//obtenemos el id de lo que se respondió
      
      if(!isNaN(index2)){//para NO mostrar las preguntas no respondidas
        
        //creamos el título
        let questionTitle = document.createElement("h3");
        questionTitle.classList.add("title-view");
        questionTitle.innerHTML = "<span class='numberQuestion'>"+(parseInt(index)+1)+"</span> " + q.title;
        
        //inicio preguntas
        let questionAnswers = document.createElement("ul");
        questionAnswers.classList.add("question__answer");
        
        let elAnswer = document.createElement("li");
        elAnswer.classList.add("answer-view");
        elAnswer.innerHTML = "<strong>"+index1 +" </strong> - " + q.answers[index2];
        
        questionAnswers.append(elAnswer);      
        elAnswerscreen.append(questionTitle);
        elAnswerscreen.append(questionAnswers);
      }
    });   
    //elAnswerscreen.append(btnReturn);
    elAnswerscreen.style.display  = "block";  
    elGoodbyeScreen.style.display = "none"; 
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *  Funcion de mostrar el boton de ver usuarios
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */ 
const showBtnUsers = () => {
  let arr = localStorage.getItem("users");
  if(arr !== null){
    elusers_btn.style.display = "block";
    elusers_btn.addEventListener("click",showUsers);
  }
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *       Funcion de mostrar los usuarios
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
const showUsers = () => {
  elViewUsers.style.display = "block";
  elViewUsers.innerHTML = "";
  let userTitle = document.createElement("h2");
  //userTitle.classList.add("title-view");
  userTitle.innerHTML = "Usuarios en sistema"; 
  let users           = "";
  let ulUser          = document.createElement("ul");
  let arrUsers3       = JSON.parse(localStorage.getItem("allUsers"));

  for(let index in arrUsers3){
    let liUser    = document.createElement("li");
    let userName2 = arrUsers3[index];
    liUser.classList.add("users_list");
    liUser.innerHTML = userName2;
    liUser.addEventListener("click", function(){ seeAnswers(userName2); });
    ulUser.append(liUser)
  }  

  elViewUsers.append(userTitle);
  elViewUsers.append(ulUser)
  elWelcomeScreen.style.display   = "none";
  elusers_btn.style.display       = "none";
  elBackToStartBtn.style.display  = "block";
}

elWelcomeBtn.addEventListener("click", seeFirstQuestion);
//elAnswersBtn.addEventListener("click", seeAnswers);
elAnswersBtn.addEventListener("click", function(){ seeAnswers(""); });

const returnToStart = () => {
  elWelcomeScreen.style.display   = "block";
  elQuestionScreen.style.display  = "none";
  elGoodbyeScreen.style.display   = "none";
  elUserNameView.style.display    = "none";
  elAnswerscreen.style.display    = "none";  
  elViewUsers.style.display       = "none";
  elBackToStartBtn.style.display  = "none";
  elrestart_btn.parentElement.style.display   = "none"; 
  showBtnUsers();
};

const validaInicio = () =>{
  let userName = localStorage.getItem("userName");
  
  if(userName != null && userName != ""){
    
    elwelcomeError.style.display  = "none";
    elWelcomeScreen.style.display = "none";
    elAnswerscreen.style.display  = "none";
    elQuestionScreen.style.display= "block";
    elUserNameView.style.display  = "block"; 
    elrestart_btn.parentElement.style.display   = "block"; 
    elUserNameView.innerHTML      = "<span><strong>Usuario:</strong> " +userName +"</span>"
    //quiz.indexCurrentQuestion     = parseInt(localStorage.getItem("indexCurrentQuestion"));
    console.log("INICIO indexCurrentQuestion => " + localStorage.getItem("indexCurrentQuestion"))
    quiz.showCurrentQuestion();    
  }

  showBtnUsers();

}
//funcion de reinicio del usuario 
const restart = () =>{
  console.log("reiniciando")
  localStorage.removeItem("userName");
  localStorage.setItem("indexCurrentQuestion",0);
  quiz.indexCurrentQuestion = 0;
  elQuestionScreen.textContent = "";
  returnToStart();
}

elBackToStartBtn.addEventListener("click", returnToStart);
elrestart_btn.addEventListener("click", restart);
/*
localStorage.removeItem("arrAnswers")
localStorage.removeItem("users");
localStorage.removeItem("userName");
localStorage.setItem("indexCurrentQuestion",0);
localStorage.removeItem("allUsers");
*/
validaInicio();

