'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

interface ChatMessage {
  id: string
  type: 'user' | 'ai'
  content: string
  timestamp: Date
  products?: ProductRecommendation[]
}

interface QuickQuestion {
  id: string
  text: string
  category: 'reason' | 'advice' | 'styling'
}

const ProductIcon = ({ type }: { type: string }) => {
  const baseClasses = "w-8 h-8 text-gray-700"
  
  switch (type) {
    case 'blouse':
      return (
        <div className={baseClasses}>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 4v2h8V4l-2-2h-4L8 4zM6 8v14h12V8l-2-2H8L6 8z"/>
            <circle cx="10" cy="12" r="1"/>
            <circle cx="14" cy="12" r="1"/>
          </svg>
        </div>
      )
    case 'skirt':
      return (
        <div className={baseClasses}>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 6h8v2l2 12H6l2-12V6z"/>
            <rect x="9" y="4" width="6" height="3" rx="1"/>
          </svg>
        </div>
      )
    case 'jacket':
      return (
        <div className={baseClasses}>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 6v16h12V6l-2-2v-2h-8v2L6 6z"/>
            <rect x="8" y="8" width="8" height="10" rx="1" fillOpacity="0.3"/>
            <line x1="12" y1="10" x2="12" y2="16" stroke="currentColor" strokeWidth="1"/>
          </svg>
        </div>
      )
    case 'pants':
      return (
        <div className={baseClasses}>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 2h8v8l-1 12h-2l-1-12h-2l-1 12h-2L8 10V2z"/>
            <rect x="9" y="4" width="6" height="4" rx="1" fillOpacity="0.3"/>
          </svg>
        </div>
      )
    default:
      return (
        <div className={baseClasses}>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="6" width="12" height="12" rx="2"/>
          </svg>
        </div>
      )
  }
}

const DiagnosisIcon = ({ type, iconType }: { type: string; iconType: 'body' | 'color' | 'style' }) => {
  const baseClasses = "w-6 h-6 text-white"
  
  if (iconType === 'body') {
    switch (type) {
      case 'straight':
        return (
          <div className={baseClasses}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <rect x="9" y="4" width="6" height="16" rx="1"/>
              <rect x="7" y="8" width="10" height="8" rx="1" fillOpacity="0.3"/>
            </svg>
          </div>
        )
      case 'wave':
        return (
          <div className={baseClasses}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M5 12c0-2 2-4 4-4s4 2 4 4-2 4-4 4-4-2-4-4z" fillOpacity="0.3"/>
              <path d="M10 6c2 0 4 1 4 3v6c0 2-2 3-4 3s-4-1-4-3V9c0-2 2-3 4-3z"/>
            </svg>
          </div>
        )
      case 'natural':
        return (
          <div className={baseClasses}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <rect x="8" y="4" width="8" height="16" rx="2"/>
              <rect x="6" y="6" width="12" height="12" rx="2" fillOpacity="0.3"/>
            </svg>
          </div>
        )
    }
  } else if (iconType === 'color') {
    switch (type) {
      case 'spring':
        return (
          <div className={baseClasses}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="3"/>
              <path d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M1 12h6M17 12h6M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24"/>
            </svg>
          </div>
        )
      case 'summer':
        return (
          <div className={baseClasses}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 6h18l-2 12H5L3 6zM7 8v8M12 8v8M17 8v8"/>
            </svg>
          </div>
        )
      case 'autumn':
        return (
          <div className={baseClasses}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L8 8h8l-4-6zM8 8v8c0 2 2 4 4 4s4-2 4-4V8"/>
            </svg>
          </div>
        )
      case 'winter':
        return (
          <div className={baseClasses}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2v20M2 12h20M6.34 6.34l11.32 11.32M17.66 6.34L6.34 17.66M8 4l8 8M16 4l-8 8M4 8l8 8M4 16l8-8"/>
            </svg>
          </div>
        )
    }
  } else if (iconType === 'style') {
    switch (type) {
      case 'elegant':
        return (
          <div className={baseClasses}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L8 6v16h8V6l-4-4zM10 18v-4h4v4"/>
            </svg>
          </div>
        )
      case 'casual':
        return (
          <div className={baseClasses}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="6" width="12" height="12" rx="2"/>
              <circle cx="9" cy="9" r="1"/>
              <circle cx="15" cy="9" r="1"/>
            </svg>
          </div>
        )
      case 'mode':
        return (
          <div className={baseClasses}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <polygon points="12,2 22,20 2,20"/>
              <circle cx="12" cy="14" r="2"/>
            </svg>
          </div>
        )
    }
  }
  
  return <div className={baseClasses}></div>
}

const AIAdviceSection = ({ bodyType, colorSeason, stylePreference }: {
  bodyType: string
  colorSeason: string
  stylePreference: string
}) => {
  // Sample products based on different combinations
  const productDatabase: ProductRecommendation[] = [
    { id: 1, name: 'エレガントブラウス', price: '¥12,800', image: 'blouse', description: 'あなたのスタイルにぴったりの上品なブラウス' },
    { id: 2, name: 'シルエットスカート', price: '¥15,600', image: 'skirt', description: '体型を美しく見せるデザイン' },
    { id: 3, name: 'カラーコーディネートジャケット', price: '¥22,900', image: 'jacket', description: 'あなたのカラーにマッチするジャケット' },
    { id: 4, name: 'パーフェクトフィットパンツ', price: '¥18,400', image: 'pants', description: '快適さとスタイルを両立' },
    { id: 5, name: 'ベーシックニット', price: '¥9,800', image: 'blouse', description: 'どんなスタイルにも合わせやすい定番アイテム' },
    { id: 6, name: 'フレアワンピース', price: '¥18,500', image: 'skirt', description: '女性らしいシルエットのワンピース' },
    { id: 7, name: 'トレンチコート', price: '¥35,000', image: 'jacket', description: 'オールシーズン活躍するアウター' },
    { id: 8, name: 'デニムパンツ', price: '¥13,200', image: 'pants', description: 'カジュアルスタイルの必需品' }
  ]
  const [isExpanded, setIsExpanded] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const quickQuestions: QuickQuestion[] = [
    { id: '1', text: 'なぜこの診断結果になったの？', category: 'reason' },
    { id: '2', text: 'どんなアイテムを買うべき？', category: 'advice' },
    { id: '3', text: '今のワードローブとの合わせ方は？', category: 'styling' },
    { id: '4', text: 'おすすめの商品を教えて', category: 'advice' },
    { id: '5', text: 'メイクで気をつけることは？', category: 'advice' },
    { id: '6', text: '避けた方がいい色やデザインは？', category: 'advice' }
  ]

  const getRecommendedProducts = (category: string, count: number = 2): ProductRecommendation[] => {
    let recommendedProducts: ProductRecommendation[] = []
    
    // Different product recommendations based on style preference and category
    if (category === 'advice' || category === 'styling') {
      if (stylePreference === 'elegant') {
        recommendedProducts = [productDatabase[0], productDatabase[2], productDatabase[5]] // elegant items
      } else if (stylePreference === 'casual') {
        recommendedProducts = [productDatabase[4], productDatabase[7], productDatabase[1]] // casual items
      } else if (stylePreference === 'mode') {
        recommendedProducts = [productDatabase[2], productDatabase[6], productDatabase[3]] // mode items
      }
    }
    
    // Shuffle and return requested count
    const shuffled = recommendedProducts.sort(() => 0.5 - Math.random())
    return shuffled.slice(0, count)
  }

  const getAIResponse = (question: string, category: string): { content: string; products: ProductRecommendation[] } => {
    const responses: Record<string, string[]> = {
      reason: [
        `あなたの診断結果は、選択された体型（${bodyType}）、パーソナルカラー（${colorSeason}）、好みのスタイル（${stylePreference}）の組み合わせによって決まりました。この組み合わせは、あなたの持つ自然な魅力を最大限に引き出すスタイルを提案しています。`,
        `骨格診断では、あなたの体のラインや骨格の特徴から最も似合うシルエットを分析しました。パーソナルカラー診断では、肌・髪・瞳の色素から調和する色彩を導き出し、スタイル診断ではライフスタイルや好みに合うファッションテイストを特定しています。`
      ],
      advice: [
        `${bodyType}タイプの方には、体のラインを活かすアイテムがおすすめです。${colorSeason}カラーを基調とした色選びで、より洗練された印象を演出できます。以下のようなアイテムから始めてみてはいかがでしょうか。`,
        `まずは基本となるベーシックアイテムから揃えることをおすすめします。あなたの${stylePreference}スタイルに合うアイテムをご紹介しますので、参考にしてみてください。`,
        `アクセサリー選びも重要ですが、まずは基本のワードローブを整えましょう。${colorSeason}タイプに似合うアイテムをピックアップしました。`
      ],
      styling: [
        `現在お持ちのアイテムに、診断結果に合う小物を1つ加えるだけでも印象が変わります。こちらのアイテムを参考に、${colorSeason}カラーを取り入れてみてください。`,
        `ヘアスタイルは全体のバランスを決める重要な要素です。${stylePreference}スタイルに合わせたコーディネートアイテムもご提案します。`,
        `メイクでは、${colorSeason}タイプの特徴を活かしたカラー選びが重要。ファッションとの調和も考えて、こんなアイテムはいかがでしょうか。`
      ]
    }

    const categoryResponses = responses[category] || responses.advice
    const content = categoryResponses[Math.floor(Math.random() * categoryResponses.length)]
    
    // Add products for advice and styling categories
    const shouldIncludeProducts = category === 'advice' || category === 'styling' || question.includes('商品') || question.includes('アイテム')
    const products = shouldIncludeProducts ? getRecommendedProducts(category, 2) : []
    
    return { content, products }
  }

  const handleQuickQuestion = (question: QuickQuestion) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: question.text,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)

    // Simulate AI response delay
    setTimeout(() => {
      const response = getAIResponse(question.text, question.category)
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: response.content,
        products: response.products,
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, aiResponse])
      setIsLoading(false)
    }, 1500)
  }

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    const currentInput = inputMessage
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: currentInput,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      // Determine if this is a product-related question
      const isProductQuery = currentInput.includes('商品') || currentInput.includes('アイテム') || 
                           currentInput.includes('おすすめ') || currentInput.includes('買う') ||
                           currentInput.includes('購入') || currentInput.includes('服')
      
      const response = isProductQuery 
        ? getAIResponse(currentInput, 'advice')
        : { 
            content: `ご質問ありがとうございます。「${currentInput}」について、あなたの診断結果（${bodyType} × ${colorSeason} × ${stylePreference}）を踏まえてお答えします。具体的なスタイリングのご相談でしたら、より詳しい情報をお聞かせいただければ、パーソナライズされたアドバイスをご提供できます。`,
            products: []
          }

      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: response.content,
        products: response.products,
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, aiResponse])
      setIsLoading(false)
    }, 2000)
  }

  return (
    <div className="mb-8">
      <div className={`bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200 overflow-hidden transition-all duration-300 ${isExpanded ? 'pb-0' : 'pb-6'}`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mr-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">AIスタイリスト</h3>
                <p className="text-sm text-gray-600">診断結果について詳しく聞いてみましょう</p>
              </div>
            </div>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              {isExpanded ? '閉じる' : 'AIに相談する'}
            </button>
          </div>

          {!isExpanded && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {quickQuestions.slice(0, 4).map((question) => (
                <button
                  key={question.id}
                  onClick={() => {
                    setIsExpanded(true)
                    setTimeout(() => handleQuickQuestion(question), 300)
                  }}
                  className="bg-white border border-purple-200 rounded-lg p-3 text-left text-sm text-gray-700 hover:bg-purple-50 hover:border-purple-300 transition-colors"
                >
                  {question.text}
                </button>
              ))}
            </div>
          )}
        </div>

        {isExpanded && (
          <div className="border-t border-purple-200 bg-white">
            {/* Chat Messages */}
            <div className="p-4 max-h-96 overflow-y-auto">
              {messages.length === 0 && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">AIスタイリストがあなたの診断結果について詳しくお答えします</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {quickQuestions.map((question) => (
                      <button
                        key={question.id}
                        onClick={() => handleQuickQuestion(question)}
                        className="bg-purple-50 border border-purple-200 rounded-lg p-2 text-left text-xs text-gray-700 hover:bg-purple-100 transition-colors"
                      >
                        {question.text}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((message) => (
                <div key={message.id} className={`mb-4 ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
                  <div className={`inline-block max-w-[80%] p-3 rounded-lg ${
                    message.type === 'user' 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                  
                  {/* Product recommendations */}
                  {message.products && message.products.length > 0 && (
                    <div className="mt-3 max-w-[80%] inline-block">
                      <div className="grid grid-cols-1 gap-2">
                        {message.products.map((product) => (
                          <Link
                            key={product.id}
                            href={`/product/${product.id}`}
                            className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow flex items-center space-x-3"
                          >
                            <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                              <ProductIcon type={product.image} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-gray-900 text-sm truncate">{product.name}</h4>
                              <p className="text-xs text-gray-600 mb-1">{product.description}</p>
                              <p className="text-sm font-bold text-purple-600">{product.price}</p>
                            </div>
                            <div className="flex-shrink-0">
                              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="text-left mb-4">
                  <div className="inline-block bg-gray-100 p-3 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span className="text-xs text-gray-500">AIが回答を考えています...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-200 p-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="スタイリングについて質問してみてください..."
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  送信
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

interface StyleResult {
  bodyType: string
  colorSeason: string
  stylePreference: string
}

interface ProductRecommendation {
  id: number
  name: string
  price: string
  image: string
  description: string
}

function ResultContent() {
  const searchParams = useSearchParams()
  const [result, setResult] = useState<StyleResult | null>(null)
  const [recommendations, setRecommendations] = useState<ProductRecommendation[]>([])

  useEffect(() => {
    const bodyType = searchParams.get('bodyType') || ''
    const colorSeason = searchParams.get('colorSeason') || ''
    const stylePreference = searchParams.get('stylePreference') || ''

    setResult({ bodyType, colorSeason, stylePreference })

    const mockRecommendations: ProductRecommendation[] = [
      {
        id: 1,
        name: 'エレガントブラウス',
        price: '¥12,800',
        image: 'blouse',
        description: 'あなたのスタイルにぴったりの上品なブラウス'
      },
      {
        id: 2,
        name: 'シルエットスカート',
        price: '¥15,600',
        image: 'skirt',
        description: '体型を美しく見せるデザイン'
      },
      {
        id: 3,
        name: 'カラーコーディネートジャケット',
        price: '¥22,900',
        image: 'jacket',
        description: 'あなたのカラーにマッチするジャケット'
      },
      {
        id: 4,
        name: 'パーフェクトフィットパンツ',
        price: '¥18,400',
        image: 'pants',
        description: '快適さとスタイルを両立'
      }
    ]

    setRecommendations(mockRecommendations)
  }, [searchParams])

  const getBodyTypeInfo = (bodyType: string) => {
    const bodyTypes: Record<string, { name: string; description: string; tips: string; icon: string }> = {
      straight: {
        name: 'ストレート',
        description: '身体に厚みがあり、メリハリのあるボディライン',
        tips: 'シンプルでベーシックなアイテムが得意。ジャストサイズでIラインシルエットを作ると美しく見えます。',
        icon: 'straight'
      },
      wave: {
        name: 'ウェーブ',
        description: '身体が薄く、曲線的で華奢なボディライン',
        tips: 'ソフトな素材や装飾のあるアイテムがおすすめ。ウエストマークでXラインを作ると素敵に仕上がります。',
        icon: 'wave'
      },
      natural: {
        name: 'ナチュラル',
        description: '骨格がしっかりしていて、フレーム感のあるボディライン',
        tips: 'ラフな質感のアイテムが似合います。ゆったりとしたシルエットでYラインを意識すると格好良く決まります。',
        icon: 'natural'
      }
    }
    return bodyTypes[bodyType] || bodyTypes.straight
  }

  const getColorSeasonInfo = (colorSeason: string) => {
    const seasons: Record<string, { name: string; description: string; colors: string[]; tips: string; icon: string }> = {
      spring: {
        name: 'スプリング',
        description: '明るく温かみのある色が似合います',
        colors: ['#FFB6C1', '#FFEB9C', '#98FB98', '#87CEEB'],
        tips: 'イエローベースの明るい色を選びましょう。コーラルピンク、アイボリー、ライトカーキなどがおすすめです。',
        icon: 'spring'
      },
      summer: {
        name: 'サマー',
        description: '涼しげで上品な色が似合います',
        colors: ['#E6E6FA', '#B0E0E6', '#F0F8FF', '#FFFAF0'],
        tips: 'ブルーベースのソフトな色がお似合いです。パステルカラーやシルバーアクセサリーを取り入れましょう。',
        icon: 'summer'
      },
      autumn: {
        name: 'オータム',
        description: '深みのある温かい色が似合います',
        colors: ['#D2691E', '#8B4513', '#CD853F', '#DEB887'],
        tips: 'イエローベースの深い色がおすすめ。テラコッタ、オリーブグリーン、ゴールドアクセサリーが似合います。',
        icon: 'autumn'
      },
      winter: {
        name: 'ウィンター',
        description: 'クリアで鮮やかな色が似合います',
        colors: ['#000080', '#DC143C', '#FFFFFF', '#C0C0C0'],
        tips: 'ブルーベースのはっきりした色を選びましょう。黒、白、ロイヤルブルー、シルバーアクセサリーがおすすめです。',
        icon: 'winter'
      }
    }
    return seasons[colorSeason] || seasons.spring
  }

  const getStylePreferenceInfo = (stylePreference: string) => {
    const styles: Record<string, { name: string; description: string; tips: string; icon: string }> = {
      elegant: {
        name: 'エレガントスタイル',
        description: '上品で洗練された大人の女性らしいスタイル',
        tips: '質の良い素材や上品なシルエットのアイテムを選び、アクセサリーで品良く仕上げましょう。',
        icon: 'elegant'
      },
      casual: {
        name: 'カジュアルスタイル',
        description: 'リラックスした親しみやすい自然体のスタイル',
        tips: 'デニムやニット、スニーカーなど着心地の良いアイテムで、親しみやすい印象を作りましょう。',
        icon: 'casual'
      },
      mode: {
        name: 'モードスタイル',
        description: 'トレンド感のある個性的でスタイリッシュなスタイル',
        tips: '個性的なデザインやモノトーンを効かせて、都会的でクールな印象を演出しましょう。',
        icon: 'mode'
      }
    }
    return styles[stylePreference] || styles.casual
  }

  const shareResult = () => {
    const text = `私のスタイル診断結果: ${getBodyTypeInfo(result?.bodyType || '').name} × ${getColorSeasonInfo(result?.colorSeason || '').name} × ${getStylePreferenceInfo(result?.stylePreference || '').name}`
    
    if (navigator.share) {
      navigator.share({
        title: 'スタイル診断結果',
        text: text,
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(`${text} ${window.location.href}`)
      alert('結果をクリップボードにコピーしました！')
    }
  }

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">診断結果を読み込み中...</p>
        </div>
      </div>
    )
  }

  const bodyTypeInfo = getBodyTypeInfo(result.bodyType)
  const colorSeasonInfo = getColorSeasonInfo(result.colorSeason)
  const stylePreferenceInfo = getStylePreferenceInfo(result.stylePreference)

  return (
    <div className="min-h-screen bg-white">
      <div className="px-4 py-6 max-w-md mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            あなたのスタイル診断結果
          </h1>
          <p className="text-gray-600 text-sm">あなたにぴったりのスタイルが見つかりました！</p>
        </div>

        <div className="space-y-4 mb-8">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                <DiagnosisIcon type={bodyTypeInfo.icon} iconType="body" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{bodyTypeInfo.name}</h3>
                <p className="text-gray-600 text-sm">{bodyTypeInfo.description}</p>
              </div>
            </div>
            <div className="bg-white rounded-lg p-3">
              <h4 className="font-semibold text-gray-800 mb-1 text-sm">スタイリングのコツ</h4>
              <p className="text-gray-600 text-xs leading-relaxed">{bodyTypeInfo.tips}</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                <DiagnosisIcon type={result.colorSeason} iconType="color" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{colorSeasonInfo.name}</h3>
                <p className="text-gray-600 text-sm">{colorSeasonInfo.description}</p>
                <div className="flex gap-1 mt-2">
                  {colorSeasonInfo.colors.map((color, index) => (
                    <div
                      key={index}
                      className="w-6 h-6 rounded-full border border-gray-300"
                      style={{ backgroundColor: color }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-3">
              <h4 className="font-semibold text-gray-800 mb-1 text-sm">カラーのコツ</h4>
              <p className="text-gray-600 text-xs leading-relaxed">{colorSeasonInfo.tips}</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                <DiagnosisIcon type={result.stylePreference} iconType="style" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{stylePreferenceInfo.name}</h3>
                <p className="text-gray-600 text-sm">{stylePreferenceInfo.description}</p>
              </div>
            </div>
            <div className="bg-white rounded-lg p-3">
              <h4 className="font-semibold text-gray-800 mb-1 text-sm">コーディネートのコツ</h4>
              <p className="text-gray-600 text-xs leading-relaxed">{stylePreferenceInfo.tips}</p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            あなたにおすすめのアイテム
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {recommendations.map((product) => (
              <Link 
                key={product.id} 
                href={`/product/${product.id}`}
                className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-2 shadow-sm">
                      <ProductIcon type={product.image} />
                    </div>
                    <span className="text-gray-600 text-xs font-medium">詳細を見る</span>
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm">{product.name}</h3>
                  <p className="text-gray-600 text-xs mb-2 line-clamp-2">{product.description}</p>
                  <p className="text-lg font-bold text-gray-900">{product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* AI Advice Section */}
        <AIAdviceSection 
          bodyType={result.bodyType}
          colorSeason={result.colorSeason}
          stylePreference={result.stylePreference}
        />

        <div className="space-y-3">
          <button
            onClick={shareResult}
            className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
          >
            結果をシェア
          </button>
          <Link
            href="/quiz"
            className="block w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors text-center"
          >
            もう一度診断する
          </Link>
          <Link
            href="/"
            className="block w-full bg-gray-100 text-gray-600 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-center"
          >
            ホームに戻る
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function Result() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">診断結果を読み込み中...</p>
        </div>
      </div>
    }>
      <ResultContent />
    </Suspense>
  )
}