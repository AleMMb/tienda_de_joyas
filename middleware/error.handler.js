

function errorLogs (err, req, next) {
  console.log ('Error Logs')
  console.log(err)
  next()
}
