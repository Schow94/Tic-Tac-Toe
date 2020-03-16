$(document).ready(function() {
  console.log('DOM has loaded');

  //Selectors
  var $formContainer = $('.form-container');
  var $rowsContainer = $('.rows-container');
  var $bodyContainer = $('.body-container');
  var $boardContainer = $('.board-container');

  //Set human as default-style game play
  var $inputVal = 'human';

  $row = $('.row');
  $cell = $('.cell');
  $message = $('.message');
  $modal = $('.modal');
  $gameOver = $('.game-over');
  $btnContainer = $('.btn-container');
  $refreshBtn = $('.new-game-btn');
  $winningText = $('.winning-text');
  $startBtn = $('.start-btn');

  //Event Handler to listen for input's value to change
  $formContainer.change(e => {
    $inputVal = $(e.target).val();
    console.log('inputVal:', $inputVal);
  });

  var turn = 'X';
  var winner;
  var moves = 0;
  var randOne;
  var randTwo;

  // 1) Human vs. Human mode
  const whoIsPlaying = () => {
    //Add human v human specific logic
    if ($inputVal === 'human') {
      console.log('PLaying against your friend');
    }
    //Add computer logic
    else if ($inputVal === 'computer') {
      console.log('PLaying against the computer');
      if (turn === 'O') {
      }
    }
  };

  //WINNING SCENARIOS
  //Horizontal Winning Scenarios (3)
  var winOne = [['X', 'X', 'X'], [], []];
  var winTwo = [[], ['X', 'X', 'X'], []];
  var winThree = [[], [], ['X', 'X', 'X']];
  //Vertical Winning Scenarios (3)
  var winFour = [['X'], ['X'], ['X']];
  var winFive = [['X', 'X', 'X'], [], []];
  var winSix = [['X', 'X', 'X'], [], []];
  //Diagonal Winning Scenarios (2)
  var winSeven = [['X', 'X', 'X'], [], []];
  var winEight = [['X', 'X', 'X'], [], []];

  //1 fxn that checks for all winning scenarios - Doesn't actually assess where you should play
  const checkForWin = data => {
    //Checks if you can win horizontally
    //Accounts for 3/8 possible solutions

    const checkHorizontally = arr => {
      let arrOne = arr[0];
      let arrTwo = arr[1];
      let arrThree = arr[2];

      //Checks 1 arr
      const checkRow = nestedArr => {
        var xCount = 0;
        var oCount = 0;

        for (let i = 0; i < nestedArr.length; i++) {
          if (nestedArr[i] === 'X') xCount++;
          else if (nestedArr[i] === 'O') oCount++;
        }
        if (xCount === 3) {
          winner = 'playerOne';
        } else if (oCount === 3) {
          winner = 'playerTwo';
        }
      };
      //Run 3 times to check 3 nested arrays
      checkRow(arrOne);
      checkRow(arrTwo);
      checkRow(arrThree);
    };

    //Check for a vertical win
    //Clean up - Not DRY at all
    const checkVertically = arr => {
      var arrOne = arr[0];
      var arrTwo = arr[1];
      var arrThree = arr[2];

      const checkColumnOne = () => {
        var top = arrOne[0];
        var middle = arrTwo[0];
        var bottom = arrThree[0];

        if (top === 'X' && top === middle && bottom === middle) {
          winner = 'playerOne';
        } else if (top === 'O' && top === middle && bottom === middle) {
          winner = 'playerTwo';
        }
      };

      const checkColumnTwo = () => {
        var top = arrOne[1];
        var middle = arrTwo[1];
        var bottom = arrThree[1];

        if (top === 'X' && top === middle && bottom === middle) {
          winner = 'playerOne';
        } else if (top === 'O' && top === middle && bottom === middle) {
          winner = 'playerTwo';
        }
      };

      const checkColumnThree = () => {
        var top = arrOne[2];
        var middle = arrTwo[2];
        var bottom = arrThree[2];

        if (top === 'X' && top === middle && bottom === middle) {
          winner = 'playerOne';
        } else if (top === 'O' && top === middle && bottom === middle) {
          winner = 'playerTwo';
        }
      };
      checkColumnOne();
      checkColumnTwo();
      checkColumnThree();
    };

    const checkDiagonally = data => {
      //First Diagonal Scenario
      const leftToRight = arr => {
        let temp = [];
        //Create temp arr to store diagonals
        for (let i = 0; i < arr.length; i++) {
          temp.push(arr[i][i]);
        }

        if (temp[0] === 'X' && temp[1] === temp[0] && temp[2] === temp[0]) {
          winner = 'playerOne';
        } else if (
          temp[0] === 'O' &&
          temp[1] === temp[0] &&
          temp[2] === temp[0]
        ) {
          winner = 'playerTwo';
        }
      };

      //Second Diagonal Scenario
      const rightToLeft = arr => {
        let temp = [];
        //Create temp arr to store diagonals
        for (let i = 0; i < arr.length; i++) {
          temp.push(arr[i][arr.length - 1 - i]);
        }
        //Check temp arr to see if all values are same
        if (temp[0] === 'X' && temp[1] === temp[0] && temp[2] === temp[0]) {
          winner = 'playerOne';
        } else if (
          temp[0] === 'O' &&
          temp[1] === temp[0] &&
          temp[2] === temp[0]
        ) {
          winner = 'playerTwo';
        }
      };

      leftToRight(data);
      rightToLeft(data);
      // console.log('Checking Diagonally');
    };

    checkHorizontally(data);
    checkVertically(data);
    checkDiagonally(data);
  };

  $startBtn.on('click', e => {
    e.preventDefault();
    //Do something if inputVal is computer or human
    $($boardContainer).css('z-index', '0');
    $($bodyContainer).css('z-index', '-10');

    whoIsPlaying();
  });

  // Keep track of score in arr sep from DOM/HTML
  var boardArr = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];

  //Start New Game - Refresh Page
  $refreshBtn.on('click', e => {
    window.location.reload();
  });

  //Creates random idx for computer
  const createRandomIdx = () => {
    randOne = Math.floor(Math.random() * 3);
    randTwo = Math.floor(Math.random() * 3);
  };

  //COMPUTER VS HUMAN - Not using right now
  // const addToBoard = () => {
  //   //Alternate btwn Xs and Os
  //   while (moves < 9) {
  //     console.log('turn: ', turn);
  //     // createRandomIdx();
  //     console.log(randOne, randTwo);
  //     // Check if square is empty
  //     if (boardArr[randOne][randTwo] === null) {
  //       if (turn === 'X') {
  //         //I think I should put even handler logic here
  //         turn = 'O';
  //       }
  //       // Computer needs to wait until user has made their turn
  //       else if (turn === 'O') {
  //         var cellToEdit = $(`.cell-${randOne}-${randTwo}`);
  //         cellToEdit
  //           .children()
  //           .eq(0)
  //           .text('O');
  //         cellToEdit
  //           .children()
  //           .eq(0)
  //           .addClass('playerTwo');
  //         boardArr[randOne][randTwo] = 'O';
  //         //Check score to see if someone won
  //         checkForWin(boardArr);
  //         turn = 'X';
  //         //Code below is only firing once for some reason
  //         if (winner) {
  //           //Code
  //           console.log('winner: ', winner);
  //           //Disables click if someone wins
  //           $('article').addClass('click-disabled');
  //           $($modal).css('z-index', '1');
  //           $gameOver.after(
  //             '<h2 class="winning-text playerTwo">Winner: Player 2</h2>'
  //           );
  //           $($gameOver).css('z-index', '4');
  //           $($btnContainer).css('z-index', '3');
  //         }
  //         //Change msg so player knows when to go
  //         $message.text("Player One's Turn");
  //         $message.removeClass('two-turn');
  //         $message.addClass('one-turn');
  //         break;
  //       }
  //       moves++;
  //     }
  //   }
  // };

  const computerMove = () => {
    if (moves === 1 || moves === 3 || moves === 5 || moves === 7) {
      createRandomIdx();
      console.log(randOne, randTwo, boardArr[randOne][randTwo]);
      console.log('moves: ', moves);

      if (boardArr[randOne][randTwo] === null) {
        var cellToEdit = $(`.cell-${randOne}-${randTwo}`);
        boardArr[randOne][randTwo] = 'O';
        cellToEdit
          .children()
          .eq(0)
          .text('O');
        cellToEdit
          .children()
          .eq(0)
          .addClass('playerTwo');
        checkForWin(boardArr);

        if (winner === 'playerTwo') {
          //Code
          console.log('winner: ', winner);
          //Disables click if someone wins
          $('article').addClass('click-disabled');
          $($modal).css('z-index', '1');
          $gameOver.after(
            `<h2 class="winning-text playerTwo">Winner: ${winner}</h2>`
          );
          $($gameOver).css('z-index', '4');
          $($btnContainer).css('z-index', '3');
        }

        moves++;
      }
      //If square is filled already create randIdx again
      else {
        createRandomIdx();
        computerMove();
      }
    }
  };

  $rowsContainer.on('click', $cell, e => {
    var clickedCell = $(e.target)[0].className;

    //Converts a cell className into an arr to get coordinates
    var classNameArr = clickedCell.split('-').splice('');
    var numArr = classNameArr
      .filter(x => !x.includes('cell'))
      .map(x => parseInt(x));
    var coordOne = numArr[0];
    var coordTwo = numArr[1];

    //Human Players input
    var clickedCellText = $(e.target);

    if (moves === 0 || moves === 2 || moves === 4 || moves === 6) {
      console.log('moves: ', moves);
      clickedCellText
        .children()
        .eq(0)
        .text('X');

      clickedCellText
        .children()
        .eq(0)
        .addClass('playerOne');

      boardArr[coordOne][coordTwo] = 'X';
      checkForWin(boardArr);

      //Can turn this into it's own fxn at some point
      if (winner === 'playerOne') {
        //Code
        console.log('winner: ', winner);
        //Disables click if someone wins
        $('article').addClass('click-disabled');
        $($modal).css('z-index', '1');
        $gameOver.after(
          `<h2 class="winning-text playerOne">Winner: ${winner}</h2>`
        );
        $($gameOver).css('z-index', '4');
        $($btnContainer).css('z-index', '3');
      }

      moves++;
      computerMove();
    }
    //This code is not
    else if (moves === 8 && !winner) {
      $($modal).css('z-index', '1');
      $($gameOver).text('DRAW');
      $($gameOver).css('z-index', '4');
      $($btnContainer).css('z-index', '3');
    }
    console.log(boardArr);
  });
});
