function parallel (tasks, callback) {
  // create array to hold results
  var resultsArr = [];
  // counter to count the loop as resultsArr.length will be misleading
  var counter = 0;
  // flag to see if any of the tasks failed
  var hasFailed = false
  //loop through each task
  tasks.forEach((task, i) => {
      task((err, result) => {
        //check if we've failed yet, if so, do not run
        if (!hasFailed) {
          // if err call the callback
          if (err) {
            hasFailed = true
            callback(err)
            return
          }
          // if no error add to the resultsArr and increase the counter
          resultsArr[i] = result
          counter++
          // when all the tasks are done, call the callback with arr
          if (counter === tasks.length){
            callback(null, resultsArr)
          }
        }
      })
    })
}

parallel([
  function(callback) {
    setTimeout(function() {
      callback(null,1);
    },2000);
  },
  function(callback) {
    setTimeout(function() {
      callback(null,2);
    },1000);
  },
  function(callback) {
    setTimeout(function() {
      callback(null,3);
    },1500);
  },
  // function(callback) {
  //   setTimeout(function() {
  //     callback('boom');
  //   },1200);
  // }
], function(err,result) {
  if (err) {
    console.log('err: ',err); // boom
  } else {
    console.log('result: ',result); // [1,2,3]
  }
});
