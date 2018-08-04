function sendOkResp(req, res) {
  res.json({
    status: 'ok',
    data: res.locals.events || res.locals.event || res.locals.likes
  })
}

function sendErrResp(err, req, res, next) {
  console.log(err);
  res.json({
    status: 'err',
    msg: err.message
  })
}

module.exports = {
  sendOkResp,
  sendErrResp
}
