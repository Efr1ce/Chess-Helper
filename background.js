// Initialize the Stockfish engine
const stockfishUrl = chrome.runtime.getURL('stockfish/stockfish-windows-2022-x86-64-avx2.exe');
chrome.storage.local.set({stockfishUrl: stockfishUrl});

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
    chrome.scripting.executeScript({
      target: {tabId: sender.tab.id},
      function: function(startSquare, endSquare) {
        document.querySelector('.board-b72b1').querySelector('.square-' + startSquare).classList.add('highlight-start');
        document.querySelector('.board-b72b1').querySelector('.square-' + endSquare).classList.add('highlight-end');
      },
      args: [startSquare, endSquare]
    });

    // Get the suggested move from the Stockfish engine
    chrome
