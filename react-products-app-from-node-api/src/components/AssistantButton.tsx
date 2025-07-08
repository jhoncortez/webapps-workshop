import { useState } from 'react'
import AssistantPrompt from './AssistantPropmpt'

export default function AssistantButton() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
        className="fixed bottom-8 right-8 z-50 bg-blue-600 text-white rounded-full shadow-lg w-16 h-16 flex items-center justify-center hover:bg-blue-700 transition-all"
        onClick={() => setOpen(o => !o)}
        aria-label="Open AI Assistant"
      >
        <span className="text-3xl">🤖</span>
      </button>
      {open && <AssistantPrompt onClose={() => setOpen(false)} />}
    </>
  )
}