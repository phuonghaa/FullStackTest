var root = null;
var useHash = true; // Defaults to: false
var hash = '#!'; // Defaults to: '#'
var router = new Navigo(root, useHash, hash);

router
  .on({
    'starter-container': function () {
      redirect('starter-container')
    },
    'quiz-container': function () {
      redirect('quiz-container')
    },
    'record-container': function () {
        redirect('record-container')
    },
    '*': function () {
      router.navigate('starter-container')
    }
  })
  .resolve();

  function redirect(screenName) {
    if (screenName === 'starter-container') {
        document.getElementById('main').innerHTML = `
        <starter-container></starter-container>
        `
    } else if (screenName === 'quiz-container') {
        document.getElementById('main').innerHTML = `
        <quiz-container></quiz-container>
        `
    } else if (screenName == 'record-container') {
        document.getElementById('main').innerHTML = `
        <record-container></record-container>
        `
    } 
}

window.router = router