import { Quiz } from "./quiz.js";

export class Setting {
    constructor() {
        //we use this because it backs to the class setting  because it's the only connection to the main js
        this.category = document.getElementById("category");
        this.numOfQ = document.getElementById("numOfQ");
        this.difficulty = document.getElementsByName("difficulty");
        this.startBtnInp = document.getElementById("startBtn");
        //we usze bind to take a copy of it after it reloads 
        this.startBtnInp.addEventListener("click", this.startQuiz.bind(this))
    }
    z
    async startQuiz() {
        let category = this.category.value;
        let numberOfQ = this.numOfQ.value;
        let difficulty = Array.from(this.difficulty).filter(el => el.checked)[0].value;
        let api = `https://opentdb.com/api.php?amount=${numberOfQ}&category=${category}&difficulty=${difficulty}`

        let deliveryQApi = await this.fetchUrl(api)
        if (deliveryQApi.length > 0) {
            document.getElementById("setting").style.display = "none";
            document.getElementById("quiz").style.display = "block";
        }
        new Quiz(deliveryQApi);
    }

    async fetchUrl(API) {
        let api = await fetch(API)
        let response = await api.json()
        return response.results;
    }
}
