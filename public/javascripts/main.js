(() => {

  const sidenav = document.querySelector('.sidenav')
  // add click listener to menu button
  document.querySelector('.responsive-menu').addEventListener('click', () => {
    sidenav.classList.add('open');
  });
  document.querySelector('.menu-close').addEventListener('click', () => {
    sidenav.classList.remove('open');
  });

  function fillChart(el) {
    // sets background-image style property based on attributes data-fill and data-max
    // make sure element color and background-color are set to neutral and white respectively as these are used below
    const elStyles = window.getComputedStyle(el, null)
    const elFill = elStyles['color'];
    const elNeutral = elStyles['background-color'];
    const percentFill = +el.getAttribute('data-fill') / +el.getAttribute('data-max');

    const linearGradient = percentFill >= 0.5 ? `
      linear-gradient(90deg, transparent 50%, ${elFill} 50%), linear-gradient(${360 * percentFill - 90}deg, transparent 50%, ${elFill} 50%)` : `
      linear-gradient(270deg, transparent 50%, ${elNeutral} 50%), linear-gradient(${360 * percentFill - 90}deg, transparent 50%, ${elFill} 50%)
      `;

    el.style.backgroundImage = linearGradient;

    let observer = new MutationObserver(function(mutation) {
      observer.disconnect(); // disconnect to avoid infinite loop of updates
      fillChart(el); // when the chart is updated this code will run again re-adding the observer
    });

    observer.observe(el, {attributes: true}); // config: also watch for attribute changes
  }

  document.querySelectorAll('.chart').forEach(el => fillChart(el));

})()
