function delayedAlert() {
    var timeoutID = window.setTimeout(expandLogo, 800);
    $('body').addClass('fadeInHalf');
}
function expandLogo() {
    $('.Name').addClass('is-expanded');
    var timeoutID = window.setTimeout(fadeInBanner, 2000);
}

function fadeInBanner() {
    $('.main-banner').addClass('fadeIn');
}

$(document).ready(function() {
    delayedAlert();
});
