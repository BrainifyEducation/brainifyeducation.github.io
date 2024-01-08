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



// --------------------------------Multiple Choice Question Editor--------------------------------

var mcAnswerCount = 2;
var mcAnswers = [{"value": "", "correct": false}, {"value": "", "correct": false}];
var mcQuestion = {
    "question_type": "multiple_choice",
    "question": {
        "multiple_choice": {
            "body": "",
            "type": "",
            "options": [],
            "correct_options": [],
        },
        "media": {
            "required": false,
            "media_type": "i",
            "formatting": "",
            "src": {
                "type": "",
                "src": ""
            }
        },
        "total_marks": 0
    }
}


//- Event Listeners for buttons and inputs
document.getElementById(`delete-answer-1`).addEventListener('click', function(){
    delete_answer(1)
});
document.getElementById(`correct-identifier-1`).addEventListener('click', function(){
    arrayCorrectAnswerUpdate(1)
});
document.getElementById(`multiple_choice_question_input_1`).addEventListener('input', function(){
    arrayAnswerUpdate(1)
});
document.getElementById(`delete-answer-2`).addEventListener('click', function(){
    delete_answer(2)
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

document.getElementById("add-video-multiple-choice-button").addEventListener('click', function(){
    addYoutubeVideo("multiple_choice")
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


//- Updates all the input boxes with their array values.
function updateMcValues(){
    document.getElementById("array-box").innerHTML = JSON.stringify(mcAnswers)
    // Loops for the total number of answers.
    for (var i = 1; i <= mcAnswerCount; i++) {
        // Sets the input to the array.
        document.getElementById(`multiple_choice_question_input_${i}`).setAttribute('value', mcAnswers[i - 1]["value"])
    }
}

//- Deletes answer from the interface and array.
export function delete_answer(id){
    
    //-- Resets the buttons to prevent incorrect grayed out buttons.
    document.getElementById("new-answer-button").classList.remove("btn-secondary");
    document.getElementById("new-answer-button").classList.add("btn-success");

    //-- If there is 2 or less answers gray out the buttons.
    if (mcAnswerCount <= 3){
        document.getElementById("delete-answer-1").classList.remove("btn-danger");
        document.getElementById("delete-answer-1").classList.add("btn-secondary");
        document.getElementById("delete-answer-2").classList.remove("btn-danger");
        document.getElementById("delete-answer-2").classList.add("btn-secondary");
    }

    //. If there is more than two answers.
    //-- Removes answer from array and interface and update values
    if(mcAnswerCount != 2){
        mcAnswers.splice((id-1), 1);
        document.getElementById(`multiple_choice_answer_${mcAnswerCount}`).remove()
        mcAnswerCount -= 1
        for (var i = 1; i <= mcAnswerCount; i++) {
            document.getElementById(`multiple_choice_question_input_${i}`).value = ""
            document.getElementById(`multiple_choice_question_input_${i}`).value = mcAnswers[i - 1]["value"]
        }
    }else{
        //. If there is less than two answers and the button is clicked.
        createPopup("error", "Multiple Choice", "You must have at least 2 answers!")
    }

}

//- Creates an answer in the array and interface.
export function create_answer() {
    //-- Resets buttons to prevent stray grayed buttons.
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
  
    //-- Creates elements for the interface.
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

    //-- Append elements to the container
    newQuestionContainer.appendChild(inputElement);
    newQuestionContainer.appendChild(correctButton);
    newQuestionContainer.appendChild(deleteButton);

    //-- Append the container to the questions container
    document.getElementById("multiple-choice-answers-container").appendChild(newQuestionContainer);

    switch (mcAnswerCount){
        case 3:
            document.getElementById(`delete-answer-3`).addEventListener('click', function(){
                delete_answer(3)
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
                delete_answer(4)
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
                delete_answer(5)
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
                delete_answer(6)
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

if (mcAnswerCount <= 2){
    document.getElementById("delete-answer-1").classList.remove("btn-danger");
    document.getElementById("delete-answer-1").classList.add("btn-secondary");
    document.getElementById("delete-answer-2").classList.remove("btn-danger");
    document.getElementById("delete-answer-2").classList.add("btn-secondary");
}

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

// -------------------------------------------------------------------------



function addYoutubeVideo(type) {
    if(type == "multiple_choice"){
        var youtubeCode;
        var embedUrl;
        var totalFromTime;

        createPopup("req", "Add Youtube Video", `
        <label class="form-label"><strong>Youtube URL or Code</strong></label>
        <div class="input-group mb-3">
            <input type="text" id="youtube-input" class="form-control" placeholder="https://youtube.com/... or f15jV8yGx" aria-label="Youtube URL or Code" aria-describedby="basic-addon1">
        </div>


        <label class="form-label"><strong>Start from</strong></label>
        <div class="input-group mb-3">
          <div class="input-group-text">
            <input class="form-check-input mt-0" type="checkbox" id="youtube-enable-from-check" value="" aria-label="Start at beginning.">
          </div>
          <input type="number" aria-label="Minutes" placeholder="Minutes" id="youtube-from-minutes" class="form-control" disabled>
          <input type="number" aria-label="Seconds" placeholder="Seconds" id="youtube-from-seconds" class="form-control" disabled>
        </div>
        <iframe id="youtube-embed-preview" width="100%" height="260px" src="" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        <div class="input-group mt-3">
            <select class="form-select" id="youtube-dropdown-positioning" aria-label="Where the video will be positioned in the question.">
                <option selected>Video Position</option>
                <option value="1">Before question body.</option>
                <option value="2">After question body.</option>
                <option value="3">End.</option>
            </select>
        </div>
        <hr>
        <div class="d-flex justify-content-end">
            <button id="new-answer-button" type="button" class="btn btn-success mt-2"><i class="bi bi-floppy"></i></button>
        </div>
        `)
        document.getElementById("youtube-input").addEventListener('input', function(){
            document.getElementById("youtube-input").classList.remove("is-invalid")
            var url = document.getElementById("youtube-input").value;
            if (url.startsWith("https://")){
                url = url.substring(8)
                if(url.startsWith("www.")){
                    console.log("www.")

                    url = url.substring(4)
                }
            } else if(url.startsWith("http://")){
                console.log("http://")
                url = url.substring(7)
                if(url.startsWith("www.")){
                    console.log("www.")
                    url = url.substring(4)
                }
            }

            if (url.startsWith("m.")){
                url = url.substring(2)
            }
            console.log(url.slice(0, 8))
            if (url.slice(0, 11) == "youtube.com"){
                    url = url.substring(20)
                    url = url.slice(0, -4);
                    youtubeCode = url.slice(0, 11);
                    console.log(youtubeCode)
            }else if (url.slice(0, 8) == "youtu.be"){
                url = url.substring(17)
                url = url.slice(0, -4);
                youtubeCode = url.slice(0, 11);

                console.log(youtubeCode)
            }else if(url.length == 9){
                youtubeCode = url
                console.log(embedUrl, "9")
            }else{
                document.getElementById("youtube-input").classList.add("is-invalid")
            }
            
            if(youtubeCode && totalFromTime){
                embedUrl = `https://youtube.com/embed/${youtubeCode}?controls=1&amp;start=${totalFromTime}`
                document.getElementById("youtube-embed-preview").setAttribute("src", embedUrl)
            }else if(youtubeCode){
                embedUrl = `https://youtube.com/embed/${youtubeCode}?controls=1`
                document.getElementById("youtube-embed-preview").setAttribute("src", embedUrl)
            }

            // https://www.youtube.com/embed/VxxPCxXkDQc?controls=1&amp;start=
        })
        document.getElementById("youtube-enable-from-check").addEventListener('change', function() {
            console.log("test");
            var checkbox = document.getElementById("youtube-enable-from-check");
            var secondsInput = document.getElementById("youtube-from-seconds");
            var minutesInput = document.getElementById("youtube-from-minutes");
        
            if (checkbox) {
                if (checkbox.checked) {
                    secondsInput.disabled = false;
                    minutesInput.disabled = false;
                } else {
                    secondsInput.disabled = true;
                    minutesInput.disabled = true;
                }
            } else {
                console.error("Checkbox not found.");
            }
        });

        document.getElementById("youtube-from-seconds").addEventListener('input', function(){
            document.getElementById("youtube-from-seconds").classList.remove("is-invalid");
            document.getElementById("youtube-from-minutes").classList.remove("is-invalid");
            if(this.value && document.getElementById("youtube-from-minutes").value){
                totalFromTime = parseInt(this.value) + (parseInt(document.getElementById("youtube-from-minutes").value) * 60)
                console.log(totalFromTime)
                if(youtubeCode && totalFromTime){
                    console.log("testtest")

                    embedUrl = `https://youtube.com/embed/${youtubeCode}?controls=1&amp;start=${totalFromTime}`
                    document.getElementById("youtube-embed-preview").setAttribute("src", embedUrl)
                }else if(youtubeCode){
                    embedUrl = `https://youtube.com/embed/${youtubeCode}?controls=1`
                    document.getElementById("youtube-embed-preview").setAttribute("src", embedUrl)
                }else if(totalFromTime){
                    document.getElementById("youtube-input").classList.add("is-invalid")
                }
            }else if (this.value && !document.getElementById("youtube-from-minutes").value){
                document.getElementById("youtube-from-minutes").classList.add("is-invalid");

            }else if (!this.value && document.getElementById("youtube-from-minutes").value){
                document.getElementById("youtube-from-seconds").classList.add("is-invalid");
            }else{
                document.getElementById("youtube-from-seconds").classList.add("is-invalid");
                document.getElementById("youtube-from-minutes").classList.add("is-invalid");
            }
        })
        document.getElementById("youtube-from-minutes").addEventListener('input', function(){
            document.getElementById("youtube-from-seconds").classList.remove("is-invalid");
            document.getElementById("youtube-from-minutes").classList.remove("is-invalid");
            var totalFromTime;
            if(this.value && document.getElementById("youtube-from-seconds").value){
                totalFromTime = parseInt(this.value) + (parseInt(document.getElementById("youtube-from-minutes").value) * 60)
                if(youtubeCode && totalFromTime){
                    console.log("testtest")
                    embedUrl = `https://youtube.com/embed/${youtubeCode}?controls=1&amp;start=${totalFromTime}`
                    document.getElementById("youtube-embed-preview").setAttribute("src", embedUrl)
                }else if(youtubeCode){
                    embedUrl = `https://youtube.com/embed/${youtubeCode}?controls=1`
                    document.getElementById("youtube-embed-preview").setAttribute("src", embedUrl)
                }else if(totalFromTime){
                    document.getElementById("youtube-input").classList.add("is-invalid")
                }

            }else if(this.value && !document.getElementById("youtube-from-seconds").value){
                document.getElementById("youtube-from-seconds").classList.add("is-invalid");
            }else if (!this.value && document.getElementById("youtube-from-seconds").value){
                document.getElementById("youtube-from-seconds").classList.add("is-invalid");
            }else{
                document.getElementById("youtube-from-seconds").classList.add("is-invalid");
                document.getElementById("youtube-from-minutes").classList.add("is-invalid");
            }
        })
    }
}