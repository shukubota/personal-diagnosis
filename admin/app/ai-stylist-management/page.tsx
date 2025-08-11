'use client'

import { useState } from 'react'
import Link from 'next/link'

interface AIResponse {
  id: string
  category: 'reason' | 'advice' | 'styling'
  trigger: string
  responses: string[]
  productRecommendations: boolean
  bodyTypes: string[]
  colorSeasons: string[]
  stylePreferences: string[]
}

interface QuickQuestion {
  id: string
  text: string
  category: 'reason' | 'advice' | 'styling'
  order: number
  active: boolean
}

interface AISettings {
  responseDelay: number
  maxProductRecommendations: number
  enableTypingIndicator: boolean
  defaultGreeting: string
  fallbackResponse: string
}

export default function AIStylistManagement() {
  const [aiResponses, setAiResponses] = useState<AIResponse[]>([
    {
      id: '1',
      category: 'reason',
      trigger: 'なぜこの診断結果',
      responses: [
        'あなたの診断結果は、選択された体型（{bodyType}）、パーソナルカラー（{colorSeason}）、好みのスタイル（{stylePreference}）の組み合わせによって決まりました。',
        '骨格診断では、あなたの体のラインや骨格の特徴から最も似合うシルエットを分析しました。'
      ],
      productRecommendations: false,
      bodyTypes: ['straight', 'wave', 'natural'],
      colorSeasons: ['spring', 'summer', 'autumn', 'winter'],
      stylePreferences: ['elegant', 'casual', 'mode']
    },
    {
      id: '2',
      category: 'advice',
      trigger: 'どんなアイテムを買うべき',
      responses: [
        '{bodyType}タイプの方には、体のラインを活かすアイテムがおすすめです。{colorSeason}カラーを基調とした色選びで、より洗練された印象を演出できます。',
        'まずは基本となるベーシックアイテムから揃えることをおすすめします。あなたの{stylePreference}スタイルに合うアイテムをご紹介します。'
      ],
      productRecommendations: true,
      bodyTypes: ['straight', 'wave', 'natural'],
      colorSeasons: ['spring', 'summer', 'autumn', 'winter'],
      stylePreferences: ['elegant', 'casual', 'mode']
    }
  ])

  const [quickQuestions, setQuickQuestions] = useState<QuickQuestion[]>([
    { id: '1', text: 'なぜこの診断結果になったの？', category: 'reason', order: 1, active: true },
    { id: '2', text: 'どんなアイテムを買うべき？', category: 'advice', order: 2, active: true },
    { id: '3', text: '今のワードローブとの合わせ方は？', category: 'styling', order: 3, active: true },
    { id: '4', text: 'おすすめの商品を教えて', category: 'advice', order: 4, active: true },
    { id: '5', text: 'メイクで気をつけることは？', category: 'advice', order: 5, active: true },
    { id: '6', text: '避けた方がいい色やデザインは？', category: 'advice', order: 6, active: false }
  ])

  const [aiSettings, setAiSettings] = useState<AISettings>({
    responseDelay: 1500,
    maxProductRecommendations: 2,
    enableTypingIndicator: true,
    defaultGreeting: 'AIスタイリストがあなたの診断結果について詳しくお答えします',
    fallbackResponse: 'ご質問ありがとうございます。「{userMessage}」について、あなたの診断結果を踏まえてお答えします。'
  })

  const [editingResponse, setEditingResponse] = useState<AIResponse | null>(null)
  const [editingQuestion, setEditingQuestion] = useState<QuickQuestion | null>(null)
  const [selectedTab, setSelectedTab] = useState<'responses' | 'questions' | 'settings'>('responses')

  const bodyTypes = [
    { value: 'straight', label: 'ストレート' },
    { value: 'wave', label: 'ウェーブ' },
    { value: 'natural', label: 'ナチュラル' }
  ]

  const colorSeasons = [
    { value: 'spring', label: 'スプリング' },
    { value: 'summer', label: 'サマー' },
    { value: 'autumn', label: 'オータム' },
    { value: 'winter', label: 'ウィンター' }
  ]

  const stylePreferences = [
    { value: 'elegant', label: 'エレガント' },
    { value: 'casual', label: 'カジュアル' },
    { value: 'mode', label: 'モード' }
  ]

  const categories = [
    { value: 'reason', label: '診断理由', color: 'blue' },
    { value: 'advice', label: 'アドバイス', color: 'green' },
    { value: 'styling', label: 'スタイリング', color: 'purple' }
  ]

  const handleSaveResponse = () => {
    if (!editingResponse) return

    setAiResponses(prev => 
      editingResponse.id && prev.find(r => r.id === editingResponse.id)
        ? prev.map(r => r.id === editingResponse.id ? editingResponse : r)
        : [...prev, { ...editingResponse, id: Date.now().toString() }]
    )
    setEditingResponse(null)
  }

  const handleSaveQuestion = () => {
    if (!editingQuestion) return

    setQuickQuestions(prev => 
      editingQuestion.id && prev.find(q => q.id === editingQuestion.id)
        ? prev.map(q => q.id === editingQuestion.id ? editingQuestion : q)
        : [...prev, { ...editingQuestion, id: Date.now().toString() }]
    )
    setEditingQuestion(null)
  }

  const handleDeleteResponse = (id: string) => {
    setAiResponses(prev => prev.filter(r => r.id !== id))
  }

  const handleDeleteQuestion = (id: string) => {
    setQuickQuestions(prev => prev.filter(q => q.id !== id))
  }

  const addResponse = (responseIndex: number) => {
    if (!editingResponse) return
    
    const newResponses = [...editingResponse.responses]
    newResponses.splice(responseIndex + 1, 0, '')
    setEditingResponse({ ...editingResponse, responses: newResponses })
  }

  const removeResponse = (responseIndex: number) => {
    if (!editingResponse || editingResponse.responses.length <= 1) return
    
    const newResponses = editingResponse.responses.filter((_, index) => index !== responseIndex)
    setEditingResponse({ ...editingResponse, responses: newResponses })
  }

  const updateResponse = (responseIndex: number, value: string) => {
    if (!editingResponse) return
    
    const newResponses = [...editingResponse.responses]
    newResponses[responseIndex] = value
    setEditingResponse({ ...editingResponse, responses: newResponses })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link href="/" className="text-gray-400 hover:text-gray-600 mr-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">AIスタイリスト設定</h1>
            </div>
            <div className="flex items-center space-x-3">
              {selectedTab === 'responses' && (
                <button
                  onClick={() => setEditingResponse({
                    id: '',
                    category: 'advice',
                    trigger: '',
                    responses: [''],
                    productRecommendations: false,
                    bodyTypes: [],
                    colorSeasons: [],
                    stylePreferences: []
                  })}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  新しい応答を追加
                </button>
              )}
              {selectedTab === 'questions' && (
                <button
                  onClick={() => setEditingQuestion({
                    id: '',
                    text: '',
                    category: 'advice',
                    order: quickQuestions.length + 1,
                    active: true
                  })}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  新しい質問を追加
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { key: 'responses', label: 'AI応答設定' },
                { key: 'questions', label: 'クイック質問' },
                { key: 'settings', label: '基本設定' }
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setSelectedTab(tab.key as any)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    selectedTab === tab.key
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        {selectedTab === 'responses' && (
          <div className="space-y-6">
            {aiResponses.map(response => (
              <div key={response.id} className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`inline-block px-2 py-1 text-xs rounded ${
                        response.category === 'reason' ? 'bg-blue-100 text-blue-800' :
                        response.category === 'advice' ? 'bg-green-100 text-green-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {categories.find(c => c.value === response.category)?.label}
                      </span>
                      {response.productRecommendations && (
                        <span className="inline-block px-2 py-1 text-xs rounded bg-orange-100 text-orange-800">
                          商品推薦あり
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">"{response.trigger}"</h3>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingResponse(response)}
                      className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                    >
                      編集
                    </button>
                    <button
                      onClick={() => handleDeleteResponse(response.id)}
                      className="text-red-600 hover:text-red-800 font-medium text-sm"
                    >
                      削除
                    </button>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">応答パターン ({response.responses.length}件)</h4>
                  <div className="space-y-2">
                    {response.responses.slice(0, 2).map((resp, index) => (
                      <p key={index} className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                        {resp.length > 100 ? `${resp.substring(0, 100)}...` : resp}
                      </p>
                    ))}
                    {response.responses.length > 2 && (
                      <p className="text-sm text-gray-500">他 {response.responses.length - 2} 件の応答パターン</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <h5 className="font-medium text-gray-700 mb-1">対象骨格タイプ</h5>
                    <div className="flex flex-wrap gap-1">
                      {response.bodyTypes.map(type => (
                        <span key={type} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                          {bodyTypes.find(bt => bt.value === type)?.label}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-700 mb-1">対象カラーシーズン</h5>
                    <div className="flex flex-wrap gap-1">
                      {response.colorSeasons.map(season => (
                        <span key={season} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                          {colorSeasons.find(cs => cs.value === season)?.label}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-700 mb-1">対象スタイル</h5>
                    <div className="flex flex-wrap gap-1">
                      {response.stylePreferences.map(style => (
                        <span key={style} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                          {stylePreferences.find(sp => sp.value === style)?.label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedTab === 'questions' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">順序</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">質問内容</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">カテゴリ</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状態</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {quickQuestions.sort((a, b) => a.order - b.order).map(question => (
                      <tr key={question.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{question.order}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{question.text}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-block px-2 py-1 text-xs rounded ${
                            question.category === 'reason' ? 'bg-blue-100 text-blue-800' :
                            question.category === 'advice' ? 'bg-green-100 text-green-800' :
                            'bg-purple-100 text-purple-800'
                          }`}>
                            {categories.find(c => c.value === question.category)?.label}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-block px-2 py-1 text-xs rounded ${
                            question.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                          }`}>
                            {question.active ? '有効' : '無効'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => setEditingQuestion(question)}
                              className="text-blue-600 hover:text-blue-800 font-medium"
                            >
                              編集
                            </button>
                            <button
                              onClick={() => handleDeleteQuestion(question.id)}
                              className="text-red-600 hover:text-red-800 font-medium"
                            >
                              削除
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'settings' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">基本設定</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    応答遅延時間 (ミリ秒)
                  </label>
                  <input
                    type="number"
                    value={aiSettings.responseDelay}
                    onChange={(e) => setAiSettings({ ...aiSettings, responseDelay: Number(e.target.value) })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">AIが応答するまでの遅延時間を設定します</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    最大商品推薦数
                  </label>
                  <input
                    type="number"
                    value={aiSettings.maxProductRecommendations}
                    onChange={(e) => setAiSettings({ ...aiSettings, maxProductRecommendations: Number(e.target.value) })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">1回の応答で推薦する商品の最大数</p>
                </div>
              </div>
              
              <div className="mt-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={aiSettings.enableTypingIndicator}
                    onChange={(e) => setAiSettings({ ...aiSettings, enableTypingIndicator: e.target.checked })}
                    className="mr-2"
                  />
                  <span className="text-sm font-medium text-gray-700">タイピングインジケーターを表示</span>
                </label>
                <p className="text-xs text-gray-500 mt-1">AIが考えているアニメーションを表示します</p>
              </div>
              
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  デフォルト挨拶文
                </label>
                <textarea
                  value={aiSettings.defaultGreeting}
                  onChange={(e) => setAiSettings({ ...aiSettings, defaultGreeting: e.target.value })}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">チャットが開始されたときに表示される挨拶文</p>
              </div>
              
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  フォールバック応答
                </label>
                <textarea
                  value={aiSettings.fallbackResponse}
                  onChange={(e) => setAiSettings({ ...aiSettings, fallbackResponse: e.target.value })}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">特定の応答がない場合に使用されるデフォルト応答。{"{userMessage}"}でユーザーの質問を挿入できます</p>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={() => {
                    // Settings save logic would go here
                    alert('設定を保存しました')
                  }}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  設定を保存
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Edit Response Modal */}
      {editingResponse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingResponse.id ? 'AI応答を編集' : '新しいAI応答を追加'}
              </h2>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    トリガーワード
                  </label>
                  <input
                    type="text"
                    value={editingResponse.trigger}
                    onChange={(e) => setEditingResponse({ ...editingResponse, trigger: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="例: どんなアイテムを買うべき"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    カテゴリ
                  </label>
                  <select
                    value={editingResponse.category}
                    onChange={(e) => setEditingResponse({ ...editingResponse, category: e.target.value as any })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {categories.map(cat => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={editingResponse.productRecommendations}
                    onChange={(e) => setEditingResponse({ ...editingResponse, productRecommendations: e.target.checked })}
                    className="mr-2"
                  />
                  <span className="text-sm font-medium text-gray-700">商品推薦を含める</span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  応答パターン
                </label>
                <div className="space-y-3">
                  {editingResponse.responses.map((response, index) => (
                    <div key={index} className="flex gap-2">
                      <textarea
                        value={response}
                        onChange={(e) => updateResponse(index, e.target.value)}
                        rows={3}
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="応答内容を入力。{bodyType}, {colorSeason}, {stylePreference}で動的な値を挿入できます"
                      />
                      <div className="flex flex-col gap-1">
                        <button
                          onClick={() => addResponse(index)}
                          className="bg-green-600 text-white p-2 rounded hover:bg-green-700 transition-colors"
                          title="下に追加"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        </button>
                        {editingResponse.responses.length > 1 && (
                          <button
                            onClick={() => removeResponse(index)}
                            className="bg-red-600 text-white p-2 rounded hover:bg-red-700 transition-colors"
                            title="削除"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    対象骨格タイプ
                  </label>
                  <div className="space-y-2">
                    {bodyTypes.map(type => (
                      <label key={type.value} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={editingResponse.bodyTypes.includes(type.value)}
                          onChange={(e) => {
                            const newTypes = e.target.checked
                              ? [...editingResponse.bodyTypes, type.value]
                              : editingResponse.bodyTypes.filter(t => t !== type.value)
                            setEditingResponse({ ...editingResponse, bodyTypes: newTypes })
                          }}
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-700">{type.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    対象カラーシーズン
                  </label>
                  <div className="space-y-2">
                    {colorSeasons.map(season => (
                      <label key={season.value} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={editingResponse.colorSeasons.includes(season.value)}
                          onChange={(e) => {
                            const newSeasons = e.target.checked
                              ? [...editingResponse.colorSeasons, season.value]
                              : editingResponse.colorSeasons.filter(s => s !== season.value)
                            setEditingResponse({ ...editingResponse, colorSeasons: newSeasons })
                          }}
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-700">{season.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    対象スタイル
                  </label>
                  <div className="space-y-2">
                    {stylePreferences.map(style => (
                      <label key={style.value} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={editingResponse.stylePreferences.includes(style.value)}
                          onChange={(e) => {
                            const newStyles = e.target.checked
                              ? [...editingResponse.stylePreferences, style.value]
                              : editingResponse.stylePreferences.filter(s => s !== style.value)
                            setEditingResponse({ ...editingResponse, stylePreferences: newStyles })
                          }}
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-700">{style.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setEditingResponse(null)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                キャンセル
              </button>
              <button
                onClick={handleSaveResponse}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                保存
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Question Modal */}
      {editingQuestion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingQuestion.id ? 'クイック質問を編集' : '新しいクイック質問を追加'}
              </h2>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  質問内容
                </label>
                <input
                  type="text"
                  value={editingQuestion.text}
                  onChange={(e) => setEditingQuestion({ ...editingQuestion, text: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    カテゴリ
                  </label>
                  <select
                    value={editingQuestion.category}
                    onChange={(e) => setEditingQuestion({ ...editingQuestion, category: e.target.value as any })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {categories.map(cat => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    表示順序
                  </label>
                  <input
                    type="number"
                    value={editingQuestion.order}
                    onChange={(e) => setEditingQuestion({ ...editingQuestion, order: Number(e.target.value) })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div className="flex items-end">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={editingQuestion.active}
                      onChange={(e) => setEditingQuestion({ ...editingQuestion, active: e.target.checked })}
                      className="mr-2"
                    />
                    <span className="text-sm font-medium text-gray-700">有効</span>
                  </label>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setEditingQuestion(null)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                キャンセル
              </button>
              <button
                onClick={handleSaveQuestion}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                保存
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}