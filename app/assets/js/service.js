if('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js',)
    .then(() => {
      console.log('register servicer worker')
    })
}

// serviceWorker just work https://
// because servicer worker is powerful
// servicerWorker doesn't have access to the dom
// we can take