const {
  GetWrongSet
} = require("./answerhandler")
const {
  GetUserInfo
} = require("./userinfo")

// get everyday question log
function GetEvedayLog() {
  try {
    let id = GetUserInfo().everydayLogID
    //console.log(id)
    let value = wx.getStorageSync(id)
    if (value) {
      return value
    } else {
      SetEvedayLog({
        needQuestions: 20,
        needWrongAnswers: Math.min(5, GetWrongSet().length),
        time: new Date().getDate()
      })
      return GetEvedayLog()
    }
  } catch (e) {
    console.log("Error: Can not get everydaylog storage!\n")
    console.log(e)
  }
}

// set everyday question log
function SetEvedayLog(everydayLog) {
  console.log(everydayLog)
  try {
    let id = GetUserInfo().everydayLogID
    wx.setStorageSync(id, everydayLog)
  } catch (e) {
    console.log(e)
  }
}

// change everyday question log
function ChangeEverydayLog(needQuestions, needWrongAnswers, time) {
  var everydayLog = {
    needQuestions: needQuestions,
    needWrongAnswers: needWrongAnswers,
    time: time
  }
  SetEvedayLog(everydayLog)
}

// refresh everyday question log
function RefreshEverydayLog() {
  var everydayLog = {
    needQuestions: 0,
    needWrongAnswers: 0,
    time: 0
  }
  everydayLog = GetEvedayLog()
  //console.log(everydayLog)
  if (everydayLog.time != new Date().getDate()) {
    ChangeEverydayLog(20, Math.min(5, GetWrongSet().length), new Date().getDate())
  }
}

module.exports = {
  GetEvedayLog: GetEvedayLog,
  ChangeEverydayLog: ChangeEverydayLog,
  RefreshEverydayLog: RefreshEverydayLog
}