$(function() {
  var board = Chessboard('board', {
    draggable: true,
    dropOffBoard: 'trash',
    sparePieces: true
  })

  $('#startBtn').on('click', board.start)
  $('#clearBtn').on('click', board.clear)

  // Get the URL of the Stockfish engine
  let stockfishUrl = chrome.runtime.getURL('stockfish/stockfish-windows-2022-x86-64-avx2.exe');

  // Create a new Worker object with the Stockfish URL
  let worker = new Worker(stockfishUrl);

  // Send a message to the Stockfish worker to start the engine
  worker.postMessage('uci');

  // Listen for messages from the Stockfish worker
  worker.onmessage = function(event) {
    console.log('Received message from Stockfish:', event.data);
  };

  // Send a message to the Stockfish worker to make a move
  worker.postMessage('position startpos moves e2e4');
  worker.postMessage('go depth 12');
});
