$(document).ready(function () {
    // Wow Js
    new WOW().init();

    // scroll-btn
    $('.scroll-btn').on('click', function (e) {
        e.preventDefault();
        var target = $($(this).data('scroll'));
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top
            }, 1000);
        }
    });

    // up-icon
    $(window).scroll(function () {
        if ($(this).scrollTop() > 500) {
            $('.up-icon').fadeIn();
        } else {
            $('.up-icon').fadeOut();
        }
    });
    $('.up-icon').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, 1000);
    });

    // Menu
    $('.header-menu-btn').on('click', function () {
        $('.menu').addClass('active');
    });
    $('.menu-close').on('click', function () {
        $('.menu').removeClass('active');
    });

    // Our Slider
    $('.our-slider').slick({
        slidesToShow: 4,
        prevArrow: $('.our-slider-left-arrow'),
        nextArrow: $('.our-slider-right-arrow'),
        responsive: [
            {
                breakpoint: 1100,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 850,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 550,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });

    // Customer Slider
    $('.customer-slider').slick({
        slidesToShow: 1,
        prevArrow: $('.customer-slider-left-arrow'),
        nextArrow: $('.customer-slider-right-arrow'),
        responsive: [
            {
                breakpoint: 1100,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });

    // Review Slider
    $('.review-slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow: $('.review-slider-left-arrow'),
        nextArrow: $('.review-slider-right-arrow'),
        responsive: [
            {
                breakpoint: 1100,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });


    // Quiz
    var quizPercent = 10;
    var quizSum = 250;
    var quizRange = 1;
    function calc() {
        var res = (quizSum / 100) * (quizPercent * quizRange);
        $('.quiz-slogan i').text(res);
    }
    $('.quiz-select select').on('change', function () {
        quizPercent = $(this).val();
        $('.quiz-percent span').text(quizPercent);
        calc();
    });
    $('.quiz-input input').on('input', function () {
        quizSum = $(this).val();
        calc();
    });
    var slider = new rSlider({
        target: '#sampleSlider',
        values: ['day', '3 months', '6 months', 'year'],
        onChange: function (val) {
            if (val == 'day') {
                quizRange = 1;
            } else if (val == '3 months') {
                quizRange = 90;
            } else if (val == '6 months') {
                quizRange = 180;
            } else {
                quizRange = 365;
            }
            calc();
        }
    });

    $('.quiz-btn-item.last').on('click', function () {
        var parent = $(this).parents('.quiz-item');
        parent.removeClass('active');
        parent.next().addClass('active');
    });
    $('.quiz-btn-item.first').on('click', function () {
        var parent = $(this).parents('.quiz-item');
        parent.removeClass('active');
        parent.prev().addClass('active');
    });

    $('.quiz-slogan').on('click', function () {
        $('.quiz-four').removeClass('active');
        $('.quiz-five').addClass('active');
    });
    $('.quiz-five-close').on('click', function () {
        $('.quiz-five').removeClass('active');
        $('.quiz-one').addClass('active');
    });

    // our show btn
    $('.our-show-btn').on('click', function () {
        var parent = $(this).parents('.general-text-block');
        parent.find('.general-text').slideToggle();
    });

});
