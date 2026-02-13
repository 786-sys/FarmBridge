const askAdvisoryQuestion = (question) => {
  if (!question || !question.trim()) {
    const error = new Error('Question is required')
    error.status = 400
    throw error
  }

  return {
    answer: `Insight: for "${question}", monitor moisture trend, mandi rates, and transport lead-time before action.`,
    confidence: 'medium-high',
  }
}

module.exports = {
  askAdvisoryQuestion,
}
