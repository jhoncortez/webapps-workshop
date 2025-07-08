import { useState } from 'react'
import { AssistantProductItem } from './AssistantProductItem'
// import { useGetConversationQuery, useSaveConversationMutation } from '../rtk/services/assistantApi'


// import your ProductCard or ProductGrid component here
// import ProductCard from './ProductCard'

const backendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL


export default function AssistantPrompt({ onClose }: { onClose: () => void }) {


//   const { data: conversation = [], refetch, isLoading } = useGetConversationQuery()
//   const [saveConversation] = useSaveConversationMutation()

  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [results, setResults] = useState<any[]>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const input = prompt
    if (!input.trim()) return

    // Add user message to conversation
    // const userMsg = { role: 'user', content: input, timestamp: Date.now() }
    // const updatedConversation = [...conversation, userMsg]

    setLoading(true)
    setError(null)
    setResults([])
    try {
      const res = await fetch(`${backendBaseUrl}/ai/recommendations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      })
      
      // Check if the request was successful
      if (!res.ok) throw new Error('Failed to fetch suggestions')
      const data = await res.json()

      // Add recommendations message to conversation
    //   const aiMsg = { role: 'assistant', content: JSON.stringify(data), timestamp: Date.now() }
    //   const newConversation = [...updatedConversation, aiMsg]
    //   await saveConversation(newConversation).unwrap()
    //   refetch()
    //   setPrompt('')
      setResults(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed bottom-28 right-8 z-50 w-96 max-w-full bg-white rounded-xl shadow-2xl border border-gray-200 p-4 flex flex-col gap-3 animate-fade-in">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🤖</span>
          <span className="font-bold text-lg">AI Shop Assistant</span>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-700 text-xl">&times;</button>
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
          placeholder="What are you looking for?"
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition-all"
          disabled={loading}
        >
          {loading ? '...' : 'Ask'}
        </button>
      </form>
      {error && <div className="text-red-500">{error}</div>}
      <div className="mt-2">
        {results.length > 0 && (
          <div className="flex flex-col gap-2">
            <p className='font-semibold'>Suggestions:</p>
            {/* Replace below with your ProductCard/ProductGrid */}
            {results.map(product => (
              <div key={product._id} className="border rounded p-2">
                {/* <div className="font-semibold">{product.description}</div> */}
                <AssistantProductItem product={product} />
                {/* <Product key={product._id} data={product} onRemove={(id: string) => console.log(id)} /> */}
              </div>
            ))}
          </div>
        )}
        {loading && <div className="text-gray-500">Thinking...</div>}
      </div>
    </div>
  )
}