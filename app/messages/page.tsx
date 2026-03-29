'use client'

import { useState, useEffect, useRef } from 'react'

type Message = {
  id: string
  contenu: string
  envoyeurId: string
  destinataireId: string
  createdAt: string
  lu: boolean
  envoyeur: {
    nom: string
    prenom: string
  }
}

type Conversation = {
  userId: string
  nom: string
  prenom: string
  dernierMessage: string
  date: string
}

export default function Messages() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [selectedUser, setSelectedUser] = useState<Conversation | null>(null)
  const [contenu, setContenu] = useState('')
  const [loading, setLoading] = useState(false)
  const [moi, setMoi] = useState<{id: string, nom: string, prenom: string} | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch('/api/me')
      .then(res => res.json())
      .then(data => setMoi(data.user))
    fetchConversations()
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const fetchConversations = async () => {
    const res = await fetch('/api/messages/conversations')
    const data = await res.json()
    setConversations(data.conversations || [])
  }

  const fetchMessages = async (userId: string) => {
    const res = await fetch(`/api/messages?avecUserId=${userId}`)
    const data = await res.json()
    setMessages(data.messages || [])
  }

  const handleSelectUser = (conv: Conversation) => {
    setSelectedUser(conv)
    fetchMessages(conv.userId)
  }

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!contenu.trim() || !selectedUser) return
    setLoading(true)

    try {
      await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destinataireId: selectedUser.userId,
          contenu,
        }),
      })
      setContenu('')
      fetchMessages(selectedUser.userId)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#F5F0E8] pt-[66px]">
      <div className="max-w-5xl mx-auto h-[calc(100vh-66px)] flex border-x border-black/10">

        {/* LISTE CONVERSATIONS */}
        <div className="w-80 bg-white border-r border-black/10 flex flex-col shrink-0">
          <div className="p-5 border-b border-black/10">
            <h2 className="font-bold text-lg text-[#1A1208]">Messages</h2>
          </div>

          {conversations.length === 0 ? (
            <div className="flex-1 flex items-center justify-center p-6 text-center">
              <div>
                <div className="text-4xl mb-3">💬</div>
                <p className="text-sm text-[#8A7A65]">Aucune conversation pour l'instant</p>
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto">
              {conversations.map((conv) => (
                <div
                  key={conv.userId}
                  onClick={() => handleSelectUser(conv)}
                  className={`p-4 cursor-pointer border-b border-black/5 hover:bg-[#F5F0E8] transition-colors ${selectedUser?.userId === conv.userId ? 'bg-[#F5F0E8] border-l-2 border-l-[#C17B2E]' : ''}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#C17B2E] text-white flex items-center justify-center font-bold">
                      {conv.nom[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm text-[#1A1208]">{conv.nom} {conv.prenom}</div>
                      <div className="text-xs text-[#8A7A65] truncate">{conv.dernierMessage}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ZONE MESSAGES */}
        <div className="flex-1 flex flex-col bg-[#F5F0E8]">
          {selectedUser ? (
            <>
              {/* HEADER */}
              <div className="bg-white border-b border-black/10 px-5 py-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#C17B2E] text-white flex items-center justify-center font-bold text-sm">
                  {selectedUser.nom[0]}
                </div>
                <div>
                  <div className="font-semibold text-sm text-[#1A1208]">{selectedUser.nom} {selectedUser.prenom}</div>
                  <div className="text-xs text-[#2A7A4B]">● En ligne</div>
                </div>
              </div>

              {/* MESSAGES */}
              <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-3">
                {messages.map((msg) => {
                  const estMoi = moi && msg.envoyeurId === moi.id
                  return (
                    <div key={msg.id} className={`flex ${estMoi ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs px-4 py-2.5 rounded-2xl text-sm ${
                        estMoi
                          ? 'bg-[#C17B2E] text-white rounded-br-sm'
                          : 'bg-white text-[#1A1208] border border-black/10 rounded-bl-sm'
                      }`}>
                        {msg.contenu}
                      </div>
                    </div>
                  )
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* INPUT */}
              <form onSubmit={handleSend} className="bg-white border-t border-black/10 p-4 flex gap-3">
                <input
                  value={contenu}
                  onChange={(e) => setContenu(e.target.value)}
                  placeholder="Écris ton message..."
                  className="flex-1 px-4 py-2.5 rounded-xl bg-[#F5F0E8] border border-black/10 text-sm text-[#1A1208] outline-none focus:border-[#C17B2E] transition-all"
                />
                <button
                  type="submit"
                  disabled={loading || !contenu.trim()}
                  className="px-5 py-2.5 rounded-xl bg-[#C17B2E] text-white font-semibold text-sm disabled:opacity-50 hover:bg-[#A86520] transition-all"
                >
                  Envoyer
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="text-5xl mb-4">💬</div>
                <div className="font-bold text-lg text-[#1A1208] mb-2">Tes messages</div>
                <p className="text-sm text-[#8A7A65]">Sélectionne une conversation pour commencer</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}