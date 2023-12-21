import 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js';
import 'https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js';

export function generateMenu(){
    $("#main_header").append(`<div class="dropdown mt-3"> <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"> Question Type </button> <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1"> <li><a class="dropdown-item" href="?type=multiple_choice">Multiple Choice</a></li> <li><a class="dropdown-item" href="?type=gap_fill">Gap Fill</a></li> <li><a class="dropdown-item" href="?type=generic">Generic</a></li> </ul> </div>`);
}