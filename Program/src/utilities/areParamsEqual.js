function areParamsEqual(params1 = [], params2 = []) {
  if (params1.length !== params2.length) return false

  for (let i = 0; i < params1.length; i++) {
    const p1 = params1[i]
    const p2 = params2[i]

    if (
      p1.groupNumber !== p2.groupNumber ||
      p1.groupOperator !== p2.groupOperator ||
      p1.parameter !== p2.parameter ||
      p1.parameterOperator !== p2.parameterOperator ||
      p1.parameterValue !== p2.parameterValue
    ) {
      return false
    }
  }
  return true
}

module.exports = areParamsEqual