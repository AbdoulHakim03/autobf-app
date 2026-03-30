'use client'

import { useState, useEffect, useRef, Suspense, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'

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

function MessagesContent() {
  const searchParams = useSearchParams()
  const avecUserId = searchParams.get('avecUserId')
  const visite = searchParams.get('visite')
  const voiture = searchParams.get('voiture')

  const [conversations, setConversations] = useState<Conversation[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [selectedUser, setSelectedUser] = useState<Conversation | null>(null)
  const [contenu, setContenu] = useState('')
  const [loading, setLoading] = useState(false)
  const [visiteSent, setVisiteSent] = useState(false)
  const [moi, setMoi] = useState<{ id: string } | null>(null)

  const messagesEndRef = useRef<HTMLDivElement>(null)

  // 🔥 Extraction lien robuste
  const extraireLienMaps = (texte: string): string => {
    const match = texte.match(/https?:\/\/[^\s]+/)
    return match ? match[0] : '#'
  }

  // 🔥 Fetch messages
  const fetchMessages = useCallback(async (userId: string) => {
    try {
      const res = await fetch(`/api/messages?avecUserId=${userId}`)
      const data = await res.json()
      setMessages(data.messages || [])
    } catch (err) {
      console.error(err)
    }
  }, [])

  // 🔥 Fetch conversations
  const fetchConversations = useCallback(async () => {
    try {
      const res = await fetch('/api/messages/conversations')
      const data = await res.json()
      setConversations(data.conversations || [])
    } catch (err) {
      console.error(err)
    }
  }, [])

  // 🔥 Initial load
  useEffect(() => {
    fetch('/api/me')
      .then(res => res.json())
      .then(data => setMoi(data.user))

    fetchConversations()
  }, [fetchConversations])

  // 🔥 Charger conversation via URL
  useEffect(() => {
    if (!avecUserId) return

    const conv = conversations.find(c => c.userId === avecUserId)

    if (conv) {
      setSelectedUser(conv)
      fetchMessages(conv.userId)
    } else {
      fetch(`/api/user/${avecUserId}`)
        .then(res => res.json())
        .then(data => {
          if (data.user) {
            const newUser = {
              userId: data.user.id,
              nom: data.user.nom,
              prenom: data.user.prenom,
              dernierMessage: '',
              date: '',
            }
            setSelectedUser(newUser)
            fetchMessages(newUser.userId)
          }
        })
    }
  }, [avecUserId, conversations, fetchMessages])

  // 🔥 Message automatique visite
  useEffect(() => {
    if (
      visite === 'true' &&
      voiture &&
      selectedUser &&
      moi &&
      !visiteSent
    ) {
      const envoyer = async () => {
        setVisiteSent(true)

        await fetch('/api/messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            destinataireId: selectedUser.userId,
            contenu: `Bonjour, je suis intéressé(e) par votre ${voiture}.`,
          }),
        })

        fetchMessages(selectedUser.userId)
        fetchConversations()
      }

      envoyer()
    }
  }, [visite, voiture, selectedUser, moi, visiteSent, fetchMessages, fetchConversations])

  // 🔥 Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // 🔥 Polling léger (simulateur temps réel)
  useEffect(() => {
    if (!selectedUser) return

    const interval = setInterval(() => {
      fetchMessages(selectedUser.userId)
    }, 5000) // toutes les 5 sec

    return () => clearInterval(interval)
  }, [selectedUser, fetchMessages])

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
      fetchConversations()
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handlePartagerPosition = () => {
    if (!navigator.geolocation || !selectedUser) return

    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords

      const lien = `https://maps.google.com/?q=${latitude},${longitude}`

      await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destinataireId: selectedUser.userId,
          contenu: `📍 ${lien}`,
        }),
      })

      fetchMessages(selectedUser.userId)
      fetchConversations()
    })
  }

  return (
    <main className="min-h-screen bg-[#F5F0E8] pt-[66px]">
      <div className="max-w-5xl mx-auto h-[calc(100vh-66px)] flex border-x border-black/10">

        {/* CONVERSATIONS */}
        <div className="w-80 bg-white border-r flex flex-col">
          <div className="p-5 border-b">
            <h2 className="font-bold">Messages</h2>
          </div>

          <div className="flex-1 overflow-y-auto">
            {conversations.map(conv => (
              <div
                key={conv.userId}
                onClick={() => handleSelectUser(conv)}
                className="p-4 cursor-pointer hover:bg-[#F5F0E8]"
              >
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#C17B2E] text-white flex items-center justify-center">
                    {conv.nom?.[0] || '?'}
                  </div>

                  <div>
                    <div>{conv.nom} {conv.prenom}</div>
                    <div className="text-xs">{conv.dernierMessage}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CHAT */}
        <div className="flex-1 flex flex-col">

          {selectedUser ? (
            <>
              {/* HEADER */}
              <div className="p-4 bg-white border-b flex justify-between">
                <div>
                  {selectedUser.nom} {selectedUser.prenom}
                </div>

                <button onClick={handlePartagerPosition}>
                  📍 Position
                </button>
              </div>

              {/* MESSAGES */}
              <div className="flex-1 overflow-y-auto p-5">
                {messages.map(msg => {
                  const estMoi = moi && msg.envoyeurId === moi.id
                  const estLien = msg.contenu.includes('maps.google.com')

                  return (
                    <div key={msg.id} className={estMoi ? 'text-right' : ''}>
                      <div className="inline-block p-2 bg-white rounded">

                        {estLien ? (
                          <a
                            href={extraireLienMaps(msg.contenu)}
                            target="_blank"
                            className="underline"
                          >
                            📍 Voir position
                          </a>
                        ) : (
                          msg.contenu
                        )}

                      </div>
                    </div>
                  )
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* INPUT */}
              <form onSubmit={handleSend} className="p-4 flex gap-2 bg-white">
                <input
                  value={contenu}
                  onChange={(e) => setContenu(e.target.value)}
                  className="flex-1 border p-2"
                />
                <button disabled={loading}>
                  Envoyer
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              Sélectionne une conversation
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

export default function Messages() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <MessagesContent />
    </Suspense>
  )
}