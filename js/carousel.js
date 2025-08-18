document.addEventListener('DOMContentLoaded', function() {
    $('.blog-grid').slick({
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,  // 3 seconds between slides
        pauseOnHover: true,
        pauseOnFocus: false,  // Continue autoplay when window loses focus
        pauseOnDotsHover: false,
        cssEase: 'cubic-bezier(0.4, 0, 0.2, 1)',  // Smoother easing
        waitForAnimate: false,  // Don't wait for animation to complete
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true,
                    centerPadding: '40px',
                    autoplaySpeed: 4000  // Slightly slower on mobile
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: false,
                    autoplaySpeed: 4000
                }
            }
        ]
    });

    // Pause autoplay when interacting with the carousel
    $('.blog-grid')
        .on('mouseenter', function() {
            $(this).slick('slickPause');
        })
        .on('mouseleave', function() {
            $(this).slick('slickPlay');
        });
});
