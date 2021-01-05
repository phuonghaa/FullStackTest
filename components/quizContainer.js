

const quizList = [
    {
        "category": "Sports",
        "type": "multiple",
        "difficulty": "easy",
        "question": "Which country will host the 2020 Summer Olympics?",
        "correct_answer": "Japan",
        "incorrect_answers": ["China", "Australia", "Germany"]
    },
    {
        "category": "Sports",
        "type": "multiple",
        "difficulty": "easy",
        "question": "Who won the 2016 Formula 1 World Driver&#039;s Championship?",
        "correct_answer": "Nico Rosberg",
        "incorrect_answers": ["Lewis Hamilton", "Max Verstappen", "Kimi Raikkonen"]
    },
    {
        "category": "Sports",
        "type": "multiple",
        "difficulty": "easy",
        "question": "What is the most common type of pitch thrown by pitchers in baseball?",
        "correct_answer": "Fastball",
        "incorrect_answers": ["Slowball", "Screwball", "Palmball"]
    },
    {
        "category": "Sports",
        "type": "multiple",
        "difficulty": "easy",
        "question": "Who is often called &quot;the Maestro&quot; in the men&#039;s tennis circuit?",
        "correct_answer": "Roger Federer",
        "incorrect_answers": ["Bill Tilden", "Boris Becker", "Pete Sampras"]
    },
    {
        "category": "Sports",
        "type": "multiple",
        "difficulty": "easy",
        "question": "&quot;Stadium of Light&quot; is the home stadium for which soccer team?",
        "correct_answer": "Sunderland FC",
        "incorrect_answers": ["Barcelona FC", "Paris Saints-Germain", "Manchester United"]
    }
]

const style = `
 .quiz-container{
     margin: auto;
     width: 600px;
     background-color: #252525;
     border-radius: 30px;
     padding: 30px;
     box-sizing: border-box;
     font-family: 'JetBrains Mono', monospace;
     color: #fff;
 }
 .question-no{
     font-size: 15px;
 }
 .quiz-content{
     border-top: 1px solid #fff;
     border-bottom: 1px solid #fff;
     margin-top: 15px;
 }
 .question{
     margin: 15px 0 30px;
     font-size: 20px;
 }
 .answer-option{
     height: 200px;
     width: 100%;
     
 }
 .answer{
     padding: 0 20px;
     box-sizing: border-box;
     height: 50px;
     margin: 10px 0;
     background-color: #333;
     border-radius: 10px;
     line-height: 50px;
 }
 .answer:hover{
     background-color: #434343;
     cursor: pointer;
 }
 .next-btn{
     margin: 50px 0 20px;
     width: 80px;
     padding: 10px;
     background-color: #fff;
     color: #000;
     border-radius: 10px;
     text-align: center;
     
 }
 .next-btn:hover{
     cursor: pointer;
     box-shadow: 4px 4px 0 #69C9D0,-4px -4px 0 #EE1D52;
 }
 .status-bar{
     display: flex;
     align-items: center;
     margin: 15px 0 0;
 }
 .status-circle{
     margin-right: 10px;
     width: 40px;
     height: 40px;
     border-radius: 100px;
     background-color: yellowgreen;
     text-align: center;
     background-color: #333;
     line-height: 40px;
     font-size: 20px;
 }
 .right-ans{
     background-color: #69C9D0;
 }
 .wrong-ans{
     background-color: #EE1D52;
 }

 @media only screen and (max-width: 768px){
     .quiz-container{
         width: 400px;
     }
 }

 @media only screen and (max-width: 400px){
     .quiz-container{
         width: 90vw;
         font-size: 15px;
     }
     .question{
         font-size: 18px;
     }
 }
 `

 class QuizContainer extends HTMLElement{
     constructor(){
         super()
         this._shadowDom = this.attachShadow({mode: 'open'})
     }
     connectedCallback() {
        this.questionCounter = 0;
        window.correctCount = 0;
        this._shadowDom.innerHTML = `
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
            <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap" rel="stylesheet">
            <style>
                ${style}
            </style>
            <div class="quiz-container" id="quiz-container">
            <div class="question-no"></div>
                <div class="quiz-content">
                    <div class="question"></div>
                    <div class="answer-option">
                        <div class="answer" id="0" style="animation-delay: 0.15s"></div>
                        <div class="answer" id="1" style="animation-delay: 0.3s"></div>
                        <div class="answer" id="2" style="animation-delay: 0.45s"></div>
                        <div class="answer" id="3" style="animation-delay: 0.6s"></div>
                    </div> 
                </div>
                <div class="next-btn">Next</div>
                
            </div>
        `

        const questionNumber = this._shadowDom.querySelector('.question-no')
        const question = this._shadowDom.querySelector('.question')
        const answer = this._shadowDom.querySelectorAll('.answer')

        const ans1 = this._shadowDom.getElementById('0')
        const ans2 = this._shadowDom.getElementById('1')
        const ans3 = this._shadowDom.getElementById('2')
        const ans4 = this._shadowDom.getElementById('3')

        const nextBtn = this._shadowDom.querySelector('.next-btn')

        getNewQuestion(this.questionCounter++)

        //listen to the "click" event of the next-btn
        nextBtn.addEventListener('click', () => {
            if (this.questionCounter + 1 <= quizList.length) {
                getNewQuestion(this.questionCounter);
                this.questionCounter += 1;
            } else {
                router.navigate('record-container')
            }
        })

        //print out the quiz
        function getNewQuestion(counter) {
            let quiz = quizList[counter]

            let answerList = shuffleArray(quiz.incorrect_answers.concat(quiz.correct_answer))

            for (let i = 0; i < answer.length; i++) {
                answer[i].classList.remove('already-answered');
                answer[i].style.backgroundColor = '#333';
            }

            questionNumber.innerHTML = `Question ${counter + 1} of ${quizList.length}`
            question.innerHTML = `${quiz.question}`
            ans1.innerHTML = `${answerList[0]}`
            ans2.innerHTML = `${answerList[1]}`
            ans3.innerHTML = `${answerList[2]}`
            ans4.innerHTML = `${answerList[3]}`

            ans1.addEventListener('click', () => {
                getResult(ans1)
            })
            ans2.addEventListener('click', () => {
                getResult(ans2)
            })
            ans3.addEventListener('click', () => {
                getResult(ans3)
            })
            ans4.addEventListener('click', () => {
                getResult(ans4)
            })

            function getResult(ans) {
                if (ans.innerHTML === quiz.correct_answer) {
                    ans.style.backgroundColor = '#69C9D0'
                    correctCount += 1;
                } else {
                    ans.style.backgroundColor = '#EE1D52'
                    //color blue the correct answer
                    for (let i = 0; i < answer.length; i++) {
                        if (answerList[i] === quiz.correct_answer && answerList[i] === answer[i].innerHTML) {
                            answer[i].style.backgroundColor = '#69C9D0'
                        }
                    }
                }

                //make other options unclickable
                for (let i = 0; i < answer.length; i++) {
                    answer[i].classList.add('already-answered')

                }
            }

        }


    }
 }

 window.customElements.define('quiz-container', QuizContainer) 





 function shuffleArray(array) {
    let randomIndex;
    let dummy;
    
    for (let i = array.length - 1; i >= 0; i--) {
        randomIndex = Math.floor(Math.random() * (i + 1));
        dummy = array[i];
        array[i] = array[randomIndex];
        array[randomIndex] = dummy;
    }
    return array;
}