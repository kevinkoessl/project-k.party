function delayedAlert() {
    var timeoutID = window.setTimeout(expandLogo, 800);

}

function expandLogo() {
    $('.Name').addClass('is-expanded');
    var timeoutID = window.setTimeout(fadeInBanner, 2000);
}

function fadeInBanner() {
    $('.main-banner').addClass('fadeIn');
    $('[class*="tile"]').addClass('fadeInUp');
    $('.date').addClass('fadeIn2');
    $('.location').addClass('fadeIn2');
    $('body').addClass('fadeInHalf')
}

$(document).ready(function () {
    delayedAlert();
    $('.faq--title').addClass('collapsed');
});
