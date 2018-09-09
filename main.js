/*eslint-disable*/
(function () {
  'use strict';
  $.div = function (klass) {
    return $('<div></div>', { class: klass });
  };

  var $app = $('#App');
  var configBoard = {
    cellSize: 40,
    numsTitle: [8, 7, 6, 5, 4, 3, 2, 1],
    lettersTitle: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
    map: [
      [20, 22, 21, 19, 18, 21, 22, 20],
      [23, 23, 23, 23, 23, 23, 23, 23],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [17, 17, 17, 17, 17, 17, 17, 17],
      [14, 16, 15, 13, 12, 15, 16, 14],
    ]
 };
  

  var cellSize = configBoard.cellSize;
  var rows = configBoard.numsTitle.length
  var columns = configBoard.lettersTitle.length
  var boardWidth = cellSize * columns;
  var boardHeight = cellSize * rows;

  var numsTitle = configBoard.numsTitle;
  var lettersTitle = configBoard.lettersTitle;

  var drawTitle = function (arrOfTitles, side) {
    for (var i = 0; i < arrOfTitles.length; i++) {
      var text = arrOfTitles[i];
      var $title = $.div('title title-' + side)
        .html(text)
        .css({
          width: cellSize,
          height: cellSize,
          lineHeight: cellSize + 'px'
         })
         .appendTo($board);
      switch (side) {
        case 'left':
          $title.css({
            left: -cellSize,
            top: i * cellSize,
          })
          break;
        case 'right':
          $title.css({
            left: boardWidth,
            top: i * cellSize,
          })
          break;
        case 'top':
          $title.css({
            left: i * cellSize,
            top: -cellSize,
          })
          break;
        case 'bottom':
          $title.css({
            left: i * cellSize,
            top: boardWidth,
          })
          break;
      
        default:
          break;
      }
    }
  }

  // draw board
  var $board = $.div('board')
    .css({ 
      width: boardWidth,
      height: boardHeight
     })
    .appendTo($app);
  for (var i = 0; i < columns; i++) {
    for (var j = 0; j < rows; j++) {
      var $cell = $.div('cell')
        .css({
          width: cellSize,
          height: cellSize,
        })
        .appendTo($board);
      if ((i + j) % 2 !== 0) {
        $cell.addClass('cell-dark')
      } else {
        $cell.addClass('cell-light')
      }
    }
  }

  // draw titles
  drawTitle(numsTitle, 'left');
  drawTitle(numsTitle, 'right');
  drawTitle(lettersTitle, 'top');
  drawTitle(lettersTitle, 'bottom');

  //creating figures
  var map = configBoard.map;
  var whiteFigures = [];
  var blackFigures = [];
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < columns; j++) {
      if (map[i][j]) {
        var $figure = $.div('figure')
          .html('&#98' + map[i][j] + ';')
          .data('isPlaced', false)
          .data('positionOnBoard', {
            top: cellSize * i,
            left: cellSize * j,
          })
          .css({
            width: cellSize,
            height: cellSize,
            lineHeight: cellSize + 'px',
            fontSize: cellSize + 'px',
          })
          .appendTo($board)
        i < 3 ? blackFigures.push($figure) : whiteFigures.push($figure);
      }
    }
  }

  //positioning figures on screen
  for (var i = 0; i < blackFigures.length; i++) {
    blackFigures[i]
      .css({
        top: -cellSize * 2,
        left: i * cellSize,
      })
  }

  for (var i = 0; i < whiteFigures.length; i++) {
    whiteFigures[i]
      .css({
        top: boardHeight + cellSize,
        left: i * cellSize,
      })
  }

  $('.board').on('click', '.figure', function(e) {
    var $figure = $(this);
    if (!$figure.data().isPlaced) {
      $figure.data().isPlaced = true;
      $figure.animate($figure.data().positionOnBoard);
    } else {
      return;
    }
  })
})();
