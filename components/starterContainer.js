
const style = `
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<style>
    .starter-container{
        margin: auto;
        width: 550px;
        background-color:#010101;
        border-radius: 20px;
        padding: 40px;
        box-sizing: border-box;
        font-family: 'JetBrains Mono', monospace;
        color: #fff;
        font-size: 14px;
    }
    .quiz-name{
        font-size: 5rem;
        text-align: center;
        margin-bottom: 10px;
    }
    .greeting{
        font-size: 1.5rem;
        text-align: center;
        margin-bottom: 30px;
    }
    .start-btn{
        color: #000;
        padding: 0 15px;
        box-sizing: border-box;
        text-align: center;
        line-height: 50px;
        width: fit-content;
        height: 50px;
        background-color: #fff;
        font-size: 18px;
        border-radius: 10px;
        margin: 30px auto 0;
    }
    .start-btn:hover{
        box-shadow: 4px 4px 0 #69C9D0,-4px -4px 0 #EE1D52;
        cursor: pointer;
    }
</style>
`

class StarterContainer extends HTMLElement {
    constructor() {
        super()
        this._shadowDom = this.attachShadow({ mode: 'open' })
    }

    async connectedCallback() {
        this._shadowDom.innerHTML = `
            ${style}
            <div class="starter-container">
                <div class="quiz-name">MindX Quiz</div>
                <div class="greeting">Are you ready?</div>       
                <div class="start-btn"> <i class="fa fa-play"></i> Start the Quiz</div>
            </div>
        `

        this._shadowDom.querySelector('.start-btn').addEventListener('click', () => {
            router.navigate('quiz-container')
            
        })
    }
}

window.customElements.define('starter-container', StarterContainer)