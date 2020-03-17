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

  //Chooses a mode based on what you select on radio button
  const chooseMode = () => {
    if ($inputVal === 'human') {
      console.log('Playing against a friend');
      humanMode();
    } else if ($inputVal === 'computer') {
      console.log('Playing against the computer');
      computerMode();
    }
  };

  $startBtn.on('click', e => {
    e.preventDefault();
    //Do something if inputVal is computer or human
    $($boardContainer).css('z-index', '0');
    $($bodyContainer).css('z-index', '-10');

    chooseMode();
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

  //HUMAN MODE
  const humanMode = () => {
    $rowsContainer.on('click', $cell, e => {
      moves++;
      var clickedCell = $(e.target)[0].className;
      //Converts a cell className into an arr to get coordinates
      var classNameArr = clickedCell.split('-').splice('');

      //Should return an arr w/ 2 values e.g [i, j] => [0,1]
      //i = outer arr idx; j =; inner arr idx
      var numArr = classNameArr
        .filter(x => !x.includes('cell'))
        .map(x => parseInt(x));
      // console.log('clickedCell: ', clickedCell);
      // console.log('numArr: ', numArr);
      var coordOne = numArr[0];
      var coordTwo = numArr[1];

      //Disable clicking after user clicks on a square
      $(e.target).addClass('click-disabled');

      $('.click-disabled').on('click', e => {
        var clickedOn = e.target.className.split(' ');
        if (clickedOn.includes('click-disabled')) {
          e.stopPropagation();
          e.preventDefault();
        }
      });

      //Need to prevent clicking on children too
      // console.log(e.target);

      if (turn === 'X') {
        var clickedCellText = $(e.target);
        clickedCellText
          .children()
          .eq(0)
          .text('X');

        clickedCellText
          .children()
          .eq(0)
          .addClass('playerOne');

        boardArr[coordOne][coordTwo] = 'X';

        //Check score to see if someone won
        checkForWin(boardArr);

        if (winner) {
          $('article').addClass('click-disabled');
          $($modal).css('z-index', '1');
          $gameOver.after(
            '<h2 class="winning-text playerOne">Winner: Player 1</h2>'
          );
          $($gameOver).css('z-index', '4');
          $($btnContainer).css('z-index', '3');
        }

        //Change message so player knows when to go
        $message.text("Player Two's Turn");
        $message.removeClass('one-turn');
        $message.addClass('two-turn');

        turn = 'O';
      } else if (turn === 'O') {
        var clickedCellText = $(e.target);
        clickedCellText
          .children()
          .eq(0)
          .text('O');

        clickedCellText
          .children()
          .eq(0)
          .addClass('playerTwo');

        boardArr[coordOne][coordTwo] = 'O';

        //Check score to see if someone won
        checkForWin(boardArr);

        if (winner) {
          // console.log('winner: ', winner);
          //Disables click if someone wins
          $('article').addClass('click-disabled');
          $($modal).css('z-index', '1');
          $gameOver.after(
            '<h2 class="winning-text playerTwo">Winner: Player 2</h2>'
          );
          $($gameOver).css('z-index', '4');
          $($btnContainer).css('z-index', '3');
        }

        //Change msg so player knows when to go
        $message.text("Player One's Turn");
        $message.removeClass('two-turn');
        $message.addClass('one-turn');
        turn = 'X';
      }

      console.log(boardArr);
      //Need to figure out a way to loop
      // No Winner
      if (moves === 9 && !winner) {
        $($modal).css('z-index', '1');
        $($gameOver).text('DRAW');
        $($gameOver).css('z-index', '4');
        $($btnContainer).css('z-index', '3');
      }
    });
  };

  //Creates random idx for computer
  const createRandomIdx = () => {
    randOne = Math.floor(Math.random() * 3);
    randTwo = Math.floor(Math.random() * 3);
  };

  //COMPUTER MODE
  const computerMode = () => {
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

          $message.text('Turn: Player 1');
          $message.removeClass('two-turn');
          $message.addClass('one-turn');

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

      $(e.target).addClass('click-disabled');

      // $('.click-disabled').on('click', e => {
      //   var clickedOn = e.target.className.split(' ');
      //   if (clickedOn.includes('click-disabled')) {
      //     e.stopPropagation();
      //     e.preventDefault();
      //   }
      // });

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

        $message.text('Turn: Player 2');
        $message.removeClass('one-turn');
        $message.addClass('two-turn');

        moves++;
        computerMove();
      } else if (moves === 8) {
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
        } else if (!winner) {
          console.log('winner:', winner);
          $($modal).css('z-index', '1');
          $($gameOver).text('DRAW');
          $($gameOver).css('z-index', '4');
          $($btnContainer).css('z-index', '3');
        }
      }

      console.log(boardArr);
    });
  };
});
