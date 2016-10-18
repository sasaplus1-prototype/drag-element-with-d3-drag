(function(){

  'use strict';

  var drag = d3.drag();

  var bar = d3.select('#js-bar'),
      percentage = d3.select('#js-percentage');

  var startX = 0,
      lastX = 0;

  var lastTranslateX;

  function onStart() {
    console.log(d3.event);

    startX = d3.event.x;

    console.log('startX', startX);
  }

  function onDrag() {
    var x = d3.event.x - startX;

    console.log(d3.event);

    x += lastX;

    (x <   0) && (x =   0);
    (x > 200) && (x = 200);

    console.log('x', x);

    percentage.text(
      (x / 200 * 100) + '%'
    );

    bar
      .style('-webkit-transform', 'translateX(' + x + 'px)')
      .style('-moz-transform', 'translateX(' + x + 'px)')
      .style('transform', 'translateX(' + x + 'px)');

    lastTranslateX = x;
  }

  function onEnd() {
    console.log(d3.event);

    lastX = lastTranslateX;

    console.log('lastX', lastX);

    console.log(
      'lastX get from style',
      bar.node().style.transform.replace(/translateX\(([\d.]+)px\)/, '$1')
    );
  }

  bar.call(
    drag.on('start', onStart)
  );
  bar.call(
    drag.on('drag', onDrag)
  );
  bar.call(
    drag.on('end', onEnd)
  );

}());
