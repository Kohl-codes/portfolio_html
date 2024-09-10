/**
* Template Name: MyResume
* Template URL: https://bootstrapmade.com/free-html-bootstrap-template-my-resume/
* Updated: Mar 17 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/


(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Initiate portfolio details lightbox 
   */
  const portfolioDetailsLightbox = GLightbox({
    selector: '.portfolio-details-lightbox',
    width: '90%',
    height: '90vh'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()

// Glitching effect in Text 

var wordBank = [
  "Full-Stack Developer",
  "Software Engineer",
  "UI/UX Designer",
  "Life Long Learner",
  "Front-End Developer",
  "Back-End Developer",
  "Team Player",
  "Problem Solver",
  "Web Developer",
];
var currentNum = 0,
currentIteration = 0;
var wordHighlight = document.querySelector(".word-highlight"),
  word = document.querySelector(".word"),
  maxNumIterations = 13,
  minNumIterations = 10,
  wordString = [],
  letterBank = "abcdefghijklmnopqrstuvwxyz";

function getIterations(initWord, finWord, iterationNum) {
if(wordHighlight) {
    var iterations = [],
        correctLetters = [finWord.length].fill(false),
        proportion = iterationNum / 2;
    
    for(var i = 0; i < iterationNum; i++) {
      var iteration = i > 0 ? iterations[i - 1]: initWord.split("");
      
        iteration.length -= Math.round((iteration.length - finWord.length) / (iterationNum - i));
        
        for(var j = 0; j < iteration.length; j++) {
            var changeMe = Math.random() <= 0.5 ? true : false;
            
            if(changeMe && proportion < i) {
                    // Unscramble the second half of iterations
                    iteration[j] = finWord[j];
                    correctLetters[i] = true;
            } else if((changeMe && proportion >= i)
                   || (!correctLetters[i] && proportion < i)) {
                    // Scramble the first half of iterations
                    var randLetter = letterBank.charAt( Math.floor( Math.random() * letterBank.length ) );
                    iteration[j] = randLetter;
               
            }
        }
        
        // Assure the last iteration is correct
        if(i === iterationNum - 1) {
            iteration = finWord.split("");
        }
        
        iterations.push(iteration.slice(0));
    }
    
    return iterations;
}
}



var startTime,
lastChangedTime,
singleDuration = 60,
  totalDuration = 4000,
  wordIterations = [];

function animateThings(currTime) {
if(window.pageYOffset  != 0) {
  document.body.classList.add("scrolled");
} else {
  document.body.classList.remove("scrolled");
}

if(wordHighlight) {
    // Animate the text scrambling
    if(!startTime)
      startTime = currTime;
    
    if(!lastChangedTime)
      lastChangedTime = currTime;
    
    var progress = currTime - startTime;
    if(progress > totalDuration) {
      currentNum++;
        if(currentNum >= wordBank.length) {
            currentNum = 0;
        }
    
        var numIterations = Math.ceil(Math.random() * (maxNumIterations - minNumIterations)) + minNumIterations;
        
        wordIterations = getIterations(word.innerText, wordBank[currentNum], numIterations);
        
        currentIteration = 0;
        
      startTime = currTime;
    }
    
    var progress3 = currTime - lastChangedTime;
    if(progress3 > singleDuration) {
      if(typeof wordIterations[currentIteration] != "undefined") {
          word.innerText = wordIterations[currentIteration++].join("");
            wordHighlight.style.width = word.offsetWidth + "px";
        }
        
        lastChangedTime = currTime;
    }


    window.requestAnimationFrame(animateThings);
}
}
window.requestAnimationFrame(animateThings);



