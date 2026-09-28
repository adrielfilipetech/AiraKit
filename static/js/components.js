/* ============================================================
   UI Toolkit: component functions
   ============================================================ */

/* --------------------------------------------
   Accordion
   --------------------------------------------
   Expected structure:
   .accordion (.accordion--multi allows opening multiple accordions)
     .accordion-item
       .accordion-trigger[aria-expanded]
   -------------------------------------------- */
function initAccordions() {
    var CLASS_OPEN  = 'open';
    var CLASS_MULTI = 'accordion--multi';

    function isMultiOpenAllowed(accordion) {
        return accordion.classList.contains(CLASS_MULTI);
    }

    function setItemState(item, shouldOpen) {
        var trigger = item.querySelector('.accordion-trigger');
        item.classList.toggle(CLASS_OPEN, shouldOpen);
        trigger.setAttribute('aria-expanded', String(shouldOpen));
    }

    function closeAllItems(accordion) {
        accordion.querySelectorAll('.accordion-item.' + CLASS_OPEN).forEach(function(openItem) {
            setItemState(openItem, false);
        });
    }

    function handleTriggerClick(trigger) {
        var item      = trigger.closest('.accordion-item');
        var accordion = item.closest('.accordion');
        var wasOpen   = item.classList.contains(CLASS_OPEN);

        if (!isMultiOpenAllowed(accordion)) {
            closeAllItems(accordion);
        }

        setItemState(item, !wasOpen);
    }
    document.querySelectorAll('.accordion-trigger').forEach(function(trigger) {
        var startsExpanded = trigger.getAttribute('aria-expanded') === 'true';
        if (startsExpanded) {
            trigger.closest('.accordion-item').classList.add(CLASS_OPEN);
        }

        trigger.addEventListener('click', function() {
            handleTriggerClick(trigger);
        });
    });
}


/* --------------------------------------------
   Carousel
   --------------------------------------------
   Expected structure
   #carousel-demo
     .carousel-track          ← a wide strip holding all slides side by side
       .carousel-slide (×N)   ← each slide is 100% of the visible width
     .carousel-btn--prev
     .carousel-btn--next
   #carousel-demo-dots        ← empty container; JS fills it with dots
   -------------------------------------------- */
function initCarousel() {
    var SWIPE_THRESHOLD_PX = 40;

    var carousel = document.getElementById('carousel-demo');
    if (!carousel) return;

    var track         = carousel.querySelector('.carousel-track');
    var slides        = carousel.querySelectorAll('.carousel-slide');
    var dotsContainer = document.getElementById('carousel-demo-dots');
    var prevButton    = carousel.querySelector('.carousel-btn--prev');
    var nextButton    = carousel.querySelector('.carousel-btn--next');

    var totalSlides       = slides.length;
    var currentSlideIndex = 0;

    function clampIndex(index) {
        return Math.max(0, Math.min(index, totalSlides - 1));
    }

    function moveTrackTo(index) {
        track.style.transform = 'translateX(-' + (index * 100) + '%)';
    }

    function updateDots(activeIndex) {
        carousel.querySelectorAll('.carousel-dot').forEach(function(dot, dotIndex) {
            dot.classList.toggle('active', dotIndex === activeIndex);
        });
    }

    function updateButtons(index) {
        prevButton.disabled = index === 0;
        nextButton.disabled = index === totalSlides - 1;
    }

    function goToSlide(index) {
        currentSlideIndex = clampIndex(index);
        moveTrackTo(currentSlideIndex);
        updateDots(currentSlideIndex);
        updateButtons(currentSlideIndex);
    }

    function createDots() {
        slides.forEach(function(_slide, slideIndex) {
            var dot = document.createElement('button');
            dot.className = 'carousel-dot' + (slideIndex === 0 ? ' active' : '');
            dot.setAttribute('aria-label', 'Slide ' + (slideIndex + 1));
            dot.addEventListener('click', function() {
                goToSlide(slideIndex);
            });
            dotsContainer.appendChild(dot);
        });
    }

    function enableSwipe() {
        var swipeStartX = 0;

        track.addEventListener('pointerdown', function(event) {
            swipeStartX = event.clientX;
        });

        track.addEventListener('pointerup', function(event) {
            var distance = swipeStartX - event.clientX;
            var swipedFarEnough = Math.abs(distance) > SWIPE_THRESHOLD_PX;

            if (!swipedFarEnough) return;

            var swipedLeft = distance > 0;
            goToSlide(swipedLeft ? currentSlideIndex + 1 : currentSlideIndex - 1);
        });
    }

    createDots();
    prevButton.addEventListener('click', function() { goToSlide(currentSlideIndex - 1); });
    nextButton.addEventListener('click', function() { goToSlide(currentSlideIndex + 1); });
    enableSwipe();
    goToSlide(0);
}

/* --------------------------------------------
   Checkbox
   --------------------------------------------
   Switches between two SVGs (checked / unchecked)
   depending on the input state.
   Expected structure:
   .checkbox-wrap
     input[type="checkbox"]
     .checkbox-icon > .svg-check + .svg-uncheck
   -------------------------------------------- */
function initCheckboxes() {
  function updateCheckboxIcon(checkbox) {

      //  verifies if the next element to checkbox isnt null
      //  then verifies if the same element class is "checkbox-icon"
      var icon = checkbox.nextElementSibling;
      var iconExists = icon && icon.classList.contains('checkbox-icon');
      if (!iconExists) return;

      var checkedSvg   = icon.querySelector('.svg-check');
      var uncheckedSvg = icon.querySelector('.svg-uncheck');
      //  verifies if one of the icons doesn't exist
      if (!checkedSvg || !uncheckedSvg) return;

      checkedSvg.style.display   = checkbox.checked ? ''     : 'none';
      uncheckedSvg.style.display = checkbox.checked ? 'none' : '';
  }

  document.querySelectorAll('.checkbox-wrap input[type="checkbox"]').forEach(function(checkbox) {
      //  first render of the checkbox
      updateCheckboxIcon(checkbox);
      // listener to update the checkbox after
      checkbox.addEventListener('change', function() {
          updateCheckboxIcon(checkbox);
      });
  });
}


/* --------------------------------------------
   Toggle
   --------------------------------------------
   Switches between two SVGs (on / off)
   depending on the input state.
   Expected structure:
   .toggle-wrap
     input[type="checkbox"]
     .toggle-icon > .svg-on + .svg-off
   -------------------------------------------- */
function initToggles() {
  function updateToggleIcon(toggle) {

      //  verifies if the next element to toggle isnt null
      //  then verifies if the same element class is "toggle-icon"
      var icon = toggle.nextElementSibling;
      var iconExists = icon && icon.classList.contains('toggle-icon');
      if (!iconExists) return;

      var onSvg  = icon.querySelector('.svg-on');
      var offSvg = icon.querySelector('.svg-off');
      //  verifies if one of the icons doesn't exist
      if (!onSvg || !offSvg) return;

      onSvg.style.display  = toggle.checked ? ''     : 'none';
      offSvg.style.display = toggle.checked ? 'none' : '';
  }

  document.querySelectorAll('.toggle-wrap input[type="checkbox"]').forEach(function(toggle) {
      //  first render of the toggle
      updateToggleIcon(toggle);
      // listener to update the toggle after
      toggle.addEventListener('change', function() {
          updateToggleIcon(toggle);
      });
  });
}


/* --------------------------------------------
   Initialization
   -------------------------------------------- */
initAccordions();
initCarousel();
initCheckboxes();
initToggles();
