function parseValue(v) {
  if (v === "true") return true
  if (v === "false") return false
  const n = Number(v)
  return isNaN(n) ? v : n
}

module.exports = parseValue