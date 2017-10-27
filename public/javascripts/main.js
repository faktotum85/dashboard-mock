(() => {

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
  }

  document.querySelectorAll('.chart').forEach(el => fillChart(el));

})()