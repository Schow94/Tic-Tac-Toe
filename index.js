$(document).ready(function() {
  console.log('DOM has loaded');
  var moves = 0;
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

  var turn = 'X';
  var winner;

  //Better to have 1 fxn that checks for all winning scenarios
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
          console.log(winner);
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
          console.log(winner);
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

  //Selectors
  $rowsContainer = $('.rows-container');
  $cell = $('.cell');
  $message = $('.message');

  // Keep track of score separately in an array
  var boardArr = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];

  $rowsContainer.on('click', $cell, e => {
    moves++;
    console.log('turn: ', turn);
    var clickedCell = $(e.target)[0].className;
    //Converts a cell className into an arr to get coordinates
    var classNameArr = clickedCell.split('-').splice('');

    //Should return an arr w/ 2 values e.g [i, j] => [0,1]
    //i = outer arr idx; j =; inner arr idx
    var numArr = classNameArr
      .filter(x => !x.includes('cell'))
      .map(x => parseInt(x));

    console.log(numArr);
    var coordOne = numArr[0];
    var coordTwo = numArr[1];

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
      // checkHorizontally(boardArr);
      // checkVertically(boardArr);
      checkForWin(boardArr);

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
      // checkHorizontally(boardArr);
      // checkVertically(boardArr);
      checkForWin(boardArr);

      //Change msg so player knows when to go
      $message.text("Player One's Turn");
      $message.removeClass('two-turn');
      $message.addClass('one-turn');
      turn = 'X';
    }

    if (winner) {
      $message.text(`We have a winner: ${winner}!!!`);
      //Remove all classes so it doesn't affect message color
    }

    // console.log(boardArr);

    //Loop through boardArr & reflect changes to HTML
    //Need to figure out a way to loop
    // boardArr [[],[],[]]
    //$cell returns an arr w/ 9 items, not nested like boardArr
    // for (let i = 0; i < $cell.length; i++) {
    //   // $($cell[i]).text(`${boardArr[i]}`);
    //   console.log(boardArr[i], $cell[i]);
    // }

    console.log('moves: ', moves);
    // No Winner
    if (moves === 9 && !winner) {
      console.log('DRAW');
    }
    //Disable clicking once someone wins
    //Disable clicking on tiles that have been clicked on already
  });
});
