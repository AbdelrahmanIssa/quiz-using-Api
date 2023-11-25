export class Quiz {
    constructor(deliveryQApi) {
        // Initialize quiz properties
        this.deliveryQApi = deliveryQApi;
        this.current = 0;
        this.score = 0;
        this.total = deliveryQApi.length;
        this.isCorrect;

        // Get submit button and add click event listener
        this.submitBtn = document.getElementById("submit");
        this.submitBtn.addEventListener("click", () => this.submitAnswer());

        // Show the first question
        this.showQ();

        // Get tryAgain button and add click event listener
        this.tryAgainBtn = document.getElementById("tryAgainBtn")
        this.tryAgainBtn.addEventListener("click", this.tryAgain)
    }

    showQ() {
        // Display the current question
        document.getElementById('question').innerHTML = this.deliveryQApi[this.current].question;
        document.getElementById('current').innerHTML = this.current + 1;
        document.getElementById('totalAmount').innerHTML = this.total;

        // Show answer choices
        this.showAnswer();
    }

    showAnswer() {
        // Get the container for answer choices
        let answersContainer = document.getElementById("rowAnswer");

        // Shuffle the answers for better randomness
        this.answers = [this.deliveryQApi[this.current].correct_answer, ...this.deliveryQApi[this.current].incorrect_answers];
        let currentIndex = this.answers.length, randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [this.answers[currentIndex], this.answers[randomIndex]] = [this.answers[randomIndex], this.answers[currentIndex]];
        }

        // Display answer choices
        this.temp = this.answers.map((answer, i) => `
            <div class="form-check">
                <input type="radio" class="form-check-input" name="answer" id=${i} value=${answer}>
                ${answer}
            </div>
        `).join('');

        answersContainer.innerHTML = this.temp;
    }

    submitAnswer() {
        // Check the submitted answer
        this.checkAnswer();
        if (this.userAnswer != undefined) {
            this.checkAnswer();
            this.current++;
            if (this.current < this.total) {
                this.showQ();
            } else {
                this.finish();
            }
        } else {
            // Display alert for no selected answer
            this.displayMessage("alert");
        }
    }

    checkAnswer() {
        // Get the selected answer
        this.answerElement = document.getElementsByName("answer");
        this.correctAnswer = this.deliveryQApi[this.current].correct_answer;
        this.userAnswer = Array.from(this.answerElement).find(el => el.checked);

        if (this.userAnswer != undefined) {
            if (this.correctAnswer == this.userAnswer.value) {
                // Increase score and display correct message
                this.score++;
                this.isCorrect = true;
                this.displayMessage("correct");
            } else {
                // Display incorrect message
                this.isCorrect = false;
                this.displayMessage("inCorrect");
            }
        }
    }

    displayMessage(x) {
        // Display messages (correct, incorrect, alert)
        let messageElement = document.getElementById(x);
        messageElement.style.display = "inline-block";

        // Set a timeout to hide the message after 800 milliseconds
        setTimeout(() => {
            messageElement.style.display = "none";
        }, 800);
    }

    finish() {
        // Hide quiz section and show finish section with score
        document.getElementById("quiz").style.display = "none";
        document.getElementById("finish").style.display = "block";
        document.getElementById("score").innerHTML = this.score;
    }

    tryAgain() {
        // Hide finish section and show settings section
        document.getElementById("finish").style.display = "none";
        document.getElementById("setting").style.display = "block";
    }
};

