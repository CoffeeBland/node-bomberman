var crypto = require("crypto")

module.exports = function() {
  var bytes = crypto.randomBytes(16)

  bytes[6] &= 0x0f // 0000xxxx
  bytes[6] += 0x40 // 0100xxxx

  bytes[8] &= 0x3f // 00xxxxxx
  bytes[8] += 0x80 // 10xxxxxx

  return [0, 4, 6, 8, 10].map(map).join("-")

  function map(len, i, arr) {
    return bytes.slice(len, arr[i + 1]).toString("hex")
  }
}
