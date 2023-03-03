// Listen for messages from the background script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  // Check if the message is requesting to highlight the last move
  if (request.highlightLastMove) {
    // Find the last move in the chess game
    var moves = $('.moves > .list > .move');
    var lastMove = moves.last();
    var squares = lastMove.find('.move-text');
    var startSquare = squares.first().text();
    var endSquare = squares.last().text();

    // Highlight the last move on the chess board
    $('.board-b72b1').find('.square-' + startSquare).addClass('highlight-start');
    $('.board-b72b1').find('.square-' + endSquare).addClass('highlight-end');
  }
});

// Send a message to the background script to request highlighting the last move
chrome.runtime.sendMessage({highlightLastMove: true});
