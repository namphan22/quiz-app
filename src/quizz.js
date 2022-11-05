import {question} from './data.js';

let currentQuestion = 0;
let correctAnswer_num = 0;
let nextQuestion = false;
let finished = false;
const questionNum = document.querySelector('.question-num');
const questionContent = document.querySelector('.question-content');

const answerA = document.getElementById('answerLabelA');
const answerB = document.getElementById('answerLabelB');
const answerC = document.getElementById('answerLabelC');
const answerD = document.getElementById('answerLabelD');

const answers_text = [answerA,answerB,answerC,answerD];
const answers_radio = document.querySelectorAll('.answer-input');

const correctAns = document.querySelector('.answer--correct');
const wrongAns   = document.querySelector(' .answer--wrong');

const notification = document.querySelector('.notification');
const btnSubmit = document.querySelector('.submit-button');
const resultText = document.querySelector('.result-text');
const resultElement = document.querySelector('.result');


const countdownTimer = document.querySelector('.countdown');
function loadQuestion({title,answer,correctAnswer}){
    questionNum.textContent = `Question ${currentQuestion+1}`;
    questionContent.textContent = title;
    answerA.textContent = answer.a;
    answerB.textContent = answer.b;
    answerC.textContent = answer.c;
    answerD.textContent = answer.d;
  
}
function resetResultAnswer(){
    answers_radio.forEach((e)=>{e.checked =false});
    answers_text.forEach((e)=>{e.classList.remove('answer--correct','answer--wrong')});

}
function getCurrentSelectedAnswer(){
    let selected=null;
    answers_radio.forEach((element)=>{
        if(element.checked===true){
            // console.log('Selected Element is',element.id);
            selected = element.id;
        }
    });
    return selected;
}
function showNotification(){
    notification.classList.remove('notification--hidden');
    notification.classList.add('notification--show');
}
function hiddenNotification(){
    notification.classList.remove('notification--show');
    notification.classList.add('notification--hidden');
}
function disabledSelectedAnswer(disabled){
    answers_radio.forEach((item)=>{item.disabled=disabled});
}
function checkAnswer(){
    const answer = getCurrentSelectedAnswer();
    if(answer ==null){
        // console.log('chua chon dap ap nao',answer);
        // set notification
        setNotification('Bạn chưa chọn đáp án nào nhá!');
        return false;
    }
    disabledSelectedAnswer(true);
    
    if(answer == question[currentQuestion].correctAnswer){
        correctAnswer_num++;
        document.getElementById(answer).labels[0].classList.add('answer--correct');
        // set notification for success answer
        // console.log(answer);
        console.log('Bạn đã trả lời chính xác rồi nha !');
        setNotification('Bạn đã trả lời chính xác rồi nha !');
    }
    else{
        document.getElementById(answer).labels[0].classList.add('answer--wrong');
        document.getElementById(question[currentQuestion].correctAnswer).labels[0].classList.add('answer--correct');
        // set notification for failure answer
        // console.log('Bạn đã trả lời sai rồi hỉ!');
        setNotification('Bạn đã trả lời sai rồi hỉ!');
    }
    if(countdownTimer.innerText =="Finished"){
        correctAnswer_num--;   
    }  

    
    return true;
    
}

let idTimeOut;
function changeButtonText(text){
    btnSubmit.textContent = text;
}
function setNotification(message){
    if(idTimeOut){
        clearTimeout();
    }
    notification.textContent = message;
    showNotification();
    setTimeout(()=>{
        hiddenNotification();

    },1500);

}
let downloadTimer=null;
function countdownGenerate(){
let timeleft = 10;
 downloadTimer = setInterval(()=>{
    if(timeleft<=0){
        clearInterval(downloadTimer);
        countdownTimer.innerHTML = `Finished`;
    }
    else{
        countdownTimer.innerHTML = `${timeleft} seconds remaining`;
    }
    timeleft--;
},1000);

}

function handleClickSubmitButton(){
    if(finished){
        showFinalResult();
    }

    if(!nextQuestion){
        if(checkAnswer()){
            if(currentQuestion === question.length -1){
                finished =true;
                nextQuestion = false;
                changeButtonText('Go to result🏆');
            }
            else{
            currentQuestion++;
            nextQuestion =true;
            changeButtonText('Next question⏭️');
            // console.log(currentQuestion);
            clearInterval(downloadTimer);
            // if(countdownTimer.innerText =="Finished"){
            //     correctAnswer_num--;   
            // }    
            }
        }
    }
    else{
        nextQuestion=false;
        resetResultAnswer();
        changeButtonText('Submit');
        disabledSelectedAnswer(false);
        loadQuestion(question[currentQuestion]);
        countdownGenerate();

    }

}
function showFinalResult(){
    resultText.textContent = `${correctAnswer_num}/${question.length}`;
    resultElement.classList.add('result--show');

}


loadQuestion(question[0]);
// countdownGenerate();
setTimeout(countdownGenerate,5000);


btnSubmit.addEventListener('click',handleClickSubmitButton);







