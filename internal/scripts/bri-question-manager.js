// Firebase Setup.
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { getDatabase, ref, set, get, child, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import { getConfig } from "./firebaseConfig.js"
import { createPopup } from "./bri-popups.js"
import "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js";
const firebaseConfig = getConfig();

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase();
const dbRef = ref(getDatabase());

document.getElementById(`delete-answer-1`).addEventListener('click', function(){
    delete_question(1)
});
document.getElementById(`correct-identifier-1`).addEventListener('click', function(){
    arrayCorrectAnswerUpdate(1)
});
document.getElementById(`multiple_choice_question_input_1`).addEventListener('input', function(){
    arrayAnswerUpdate(1)
});
document.getElementById(`delete-answer-2`).addEventListener('click', function(){
    delete_question(2)
});
document.getElementById(`correct-identifier-2`).addEventListener('click', function(){
    arrayCorrectAnswerUpdate(2)
});
document.getElementById(`multiple_choice_question_input_2`).addEventListener('input', function(){
    arrayAnswerUpdate(2)
});


document.getElementById("new-answer-button").addEventListener('click', function() {
create_answer()
})

try{

    document.getElementById("inputGroupSelect01").addEventListener("change", function() {
        var type = document.getElementById("inputGroupSelect01").value;
        if (type == "multiple_choice") {

        } else if (type == "gap") {
        
        } else if (type == "generic") {
        
        }
      });
} catch(error){
    console.log(error)
}

function updateMcValues(){
    for (var i = 1; i <= mcAnswerCount; i++) {
        console.log(mcAnswerCount)
        console.log(i)
        document.getElementById(`multiple_choice_question_input_${i}`).setAttribute('value', mcAnswers[i - 1]["value"])
    }
}

export function delete_question(id){
    
if (mcAnswerCount <= 3){
    document.getElementById("delete-answer-1").classList.remove("btn-danger");
    document.getElementById("delete-answer-1").classList.add("btn-secondary");
    document.getElementById("delete-answer-2").classList.remove("btn-danger");
    document.getElementById("delete-answer-2").classList.add("btn-secondary");
}
    if(mcAnswerCount != 2){
        
        console.log(id)

        mcAnswers.splice((id-1), 1);

        document.getElementById(`multiple_choice_answer_${mcAnswerCount}`).remove()
        mcAnswerCount -= 1
        for (var i = 1; i <= mcAnswerCount; i++) {
            console.log("clear")
            document.getElementById(`multiple_choice_question_input_${i}`).value = ""
            document.getElementById(`multiple_choice_question_input_${i}`).value = mcAnswers[i - 1]["value"]
        }
        console.log(JSON.stringify(mcAnswers))
    }else{
        createPopup("error", "Multiple Choice", "You must have at least 2 answers!")
    }

}

export function create_answer() {
    if(mcAnswerCount >= 5){
        document.getElementById("new-answer-button").classList.remove("btn-success");
        document.getElementById("new-answer-button").classList.add("btn-secondary");
    }else{
        document.getElementById("new-answer-button").classList.remove("btn-secondary");
        document.getElementById("new-answer-button").classList.add("btn-success");
    }
    if (mcAnswerCount <= 5) {
        document.getElementById("delete-answer-1").classList.remove("btn-secondary");
        document.getElementById("delete-answer-1").classList.add("btn-danger");
        document.getElementById("delete-answer-2").classList.remove("btn-secondary");
        document.getElementById("delete-answer-2").classList.add("btn-danger");

      mcAnswerCount += 1;
  
      // Create new elements
      var newQuestionContainer = document.createElement("div");
      newQuestionContainer.classList.add("input-group", "mt-1");
      newQuestionContainer.id = `multiple_choice_answer_${mcAnswerCount}`
  
      var inputElement = document.createElement("input");
      inputElement.type = "text";
      inputElement.classList.add("form-control");
      inputElement.id = `multiple_choice_question_input_${mcAnswerCount}`
      inputElement.placeholder = `Answer - ${mcAnswerCount}`;
  
      var correctButton = document.createElement("button");
      correctButton.id = `correct-identifier-${mcAnswerCount}`;
      correctButton.classList.add("btn", "btn-warning");
      correctButton.type = "button";
      correctButton.innerHTML = '<i class="bi bi-x-lg"></i>';
  
      var deleteButton = document.createElement("button");
      deleteButton.id = `delete-answer-${mcAnswerCount}`;
      deleteButton.classList.add("btn", "btn-danger");
      deleteButton.type = "button";
      deleteButton.innerHTML = '<i class="bi bi-x-circle"></i>';
  
      // Append elements to the container
      newQuestionContainer.appendChild(inputElement);
      newQuestionContainer.appendChild(correctButton);
      newQuestionContainer.appendChild(deleteButton);

      // Append the container to the questions container
      document.getElementById("multiple-choice-answers-container").appendChild(newQuestionContainer);

    switch (mcAnswerCount){
        case 3:
            document.getElementById(`delete-answer-3`).addEventListener('click', function(){
                delete_question(3)
            });
            document.getElementById(`correct-identifier-3`).addEventListener('click', function(){
                arrayCorrectAnswerUpdate(3)
            });
            document.getElementById(`multiple_choice_question_input_3`).addEventListener('input', function(){
                arrayAnswerUpdate(3)
            });
            break;
        case 4:
            document.getElementById(`delete-answer-4`).addEventListener('click', function(){
                delete_question(4)
            });
            document.getElementById(`correct-identifier-4`).addEventListener('click', function(){
                arrayCorrectAnswerUpdate(4)
            });
            document.getElementById(`multiple_choice_question_input_4`).addEventListener('input', function(){
                arrayAnswerUpdate(4)
            });
            break;
        case 5:
            document.getElementById(`delete-answer-5`).addEventListener('click', function(){
                delete_question(5)
            });
            document.getElementById(`correct-identifier-5`).addEventListener('click', function(){
                arrayCorrectAnswerUpdate(5)
            });
            document.getElementById(`multiple_choice_question_input_5`).addEventListener('input', function(){
                arrayAnswerUpdate(5)
            });
            break;
        case 6:
            document.getElementById(`delete-answer-6`).addEventListener('click', function(){
                delete_question(6)
            });
            document.getElementById(`correct-identifier-6`).addEventListener('click', function(){
                arrayCorrectAnswerUpdate(6)
            });
            document.getElementById(`multiple_choice_question_input_6`).addEventListener('input', function(){
                arrayAnswerUpdate(6)
            });
            break;
    }


      // Update mcAnswers array or other necessary logic
      mcAnswers.splice((mcAnswerCount - 1), 0, { "value": "", "correct": false });
      document.getElementById("new-answer-button").focus()
      // Call createPopup or other necessary logic
    } else {
        createPopup("error", "Multiple Choice", "You can't have more than 6 answers!")

    }
  }
var mcAnswerCount = 2;

if (mcAnswerCount <= 2){
    document.getElementById("delete-answer-1").classList.remove("btn-danger");
    document.getElementById("delete-answer-1").classList.add("btn-secondary");
    document.getElementById("delete-answer-2").classList.remove("btn-danger");
    document.getElementById("delete-answer-2").classList.add("btn-secondary");
}
var mcAnswers = [{"value": "", "correct": false}, {"value": "", "correct": false}];

export function initializeMultiChoice(){
    var container = document.getElementById("multiple-choice-container")
    container.hidden = false;
    mcAnswerCount = 2
}

export function arrayAnswerUpdate(id){
    updateMcValues()

    const arrayPoint = id - 1
    console.log(id, "id")
    const updateValue = document.getElementById(`multiple_choice_question_input_${id}`).value;

    mcAnswers[arrayPoint]["value"] = updateValue
    updateMcValues()

    console.log(mcAnswers)
}
function arrayCorrectAnswerUpdate(id){
    const arrayPoint = id - 1
    if(mcAnswers[arrayPoint]["correct"] == false){
        mcAnswers[id-1]["correct"] = true
        document.getElementById(`correct-identifier-${id}`).classList.remove("btn-warning")
        document.getElementById(`correct-identifier-${id}`).classList.add("btn-success")
        document.getElementById(`correct-identifier-${id}`).innerHTML = `<i class="bi bi-check-lg"></i>`

    }else if(mcAnswers[arrayPoint]["correct"] == true){
        mcAnswers[id-1]["correct"] = false
        document.getElementById(`correct-identifier-${id}`).classList.remove("btn-success")
        document.getElementById(`correct-identifier-${id}`).classList.add("btn-warning")
        document.getElementById(`correct-identifier-${id}`).innerHTML = `<i class="bi bi-x-lg"></i>`

    }

}