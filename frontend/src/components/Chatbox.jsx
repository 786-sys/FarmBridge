import { useMemo, useState } from 'react'

export const Chatbox = () => {
  const [question, setQuestion] = useState('')
  const [history, setHistory] = useState([
    { id: 1, from: 'bot', text: 'Hi! Ask me about crops, weather risk, or market pricing.' },
  ])

  const tips = useMemo(
    () => [
      'Best crop mix for low rainfall?',
      'How to reduce pest risk this week?',
      'When to sell onions for best margin?',
    ],
    [],
  )

  const ask = () => {
    if (!question.trim()) return
    const userMessage = { id: Date.now(), from: 'user', text: question }
    const botMessage = {
      id: Date.now() + 1,
      from: 'bot',
      text: `Insight: track moisture + local mandi trend for "${question}" before final decision.`,
    }
    setHistory((prev) => [...prev, userMessage, botMessage])
    setQuestion('')
  }

  return (
    <section className="card chatbox">
      <h3>Advisory AI</h3>
      <div className="chat-history">
        {history.map((line) => (
          <p key={line.id} className={`chat-line ${line.from}`}>
            {line.text}
          </p>
        ))}
      </div>
      <div className="tip-row">
        {tips.map((tip) => (
          <button type="button" key={tip} onClick={() => setQuestion(tip)} className="tip-btn">
            {tip}
          </button>
        ))}
      </div>
      <div className="chat-input">
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask FarmBridge AI"
        />
        <button type="button" onClick={ask} className="primary-btn">
          Ask
        </button>
      </div>
    </section>
  )
}
