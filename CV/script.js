// J'execute au chargement de ma page
$(document).ready(function() {

    // Recuperation de la hauteur de la page de l'uttilisateur
let docHeight = window.innerHeight;
//    recupere la hauteur du menu
let navbarHeight= document.getElementById("menu").offsetHeight;

// régle la hauteur du container principal a la hauteur de la page du client- la hauteur du menu
let main = document.getElementsByClassName('mainContent');
main[0].style.minHeight = docHeight- navbarHeight +'px';

// evenements click sur le menu

    $("#buttonSkill").click(function (event) {
        
        // je cache toute les div, et trigger le fade in de la div concernée, je réinitialise les compteurs
        hideContentDivs()
        $('#intro').hide();
        $('#skill').fadeToggle();
        resetDials()
    });

    
    // Ecouteurs d'événements
    $("#buttonExperience").click(function (event) {
        hideContentDivs()
        $('#intro').hide();
        $('#experience').fadeToggle();
        
    });


    $("#buttonDiploma").click(function (event) {
        hideContentDivs()
        $('#intro').hide();
        $('#diploma').fadeToggle();
        
    });


    $("#buttonHobbies").click(function (event) {
        hideContentDivs()
        $('#intro').hide();
        $('#hobbies').fadeToggle();

    });


});


function hideContentDivs() {
    $('#experience').hide();
    $('#diploma').hide();
    $('#hobbies').hide();
    $('#skill').hide();
}

