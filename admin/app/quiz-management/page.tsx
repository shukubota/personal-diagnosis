'use client'

import { useState } from 'react'
import Link from 'next/link'

interface QuizOption {
  id: string
  name: string
  description: string
  icon: string
}

interface QuizQuestion {
  id: string
  title: string
  description: string
  type: 'body' | 'color' | 'style'
  order: number
  options: QuizOption[]
}

export default function QuizManagement() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([
    {
      id: '1',
      title: 'あなたの骨格タイプは？',
      description: 'ご自身の体つきに最も近いものを選んでください',
      type: 'body',
      order: 1,
      options: [
        { id: 'straight', name: 'ストレート', description: '身体に厚みがあり、メリハリのあるボディライン', icon: 'straight' },
        { id: 'wave', name: 'ウェーブ', description: '身体が薄く、曲線的で華奢なボディライン', icon: 'wave' },
        { id: 'natural', name: 'ナチュラル', description: '骨格がしっかりしていて、フレーム感のあるボディライン', icon: 'natural' }
      ]
    },
    {
      id: '2',
      title: 'あなたのパーソナルカラーは？',
      description: '肌、髪、瞳の色から最も似合うと思うカラータイプを選んでください',
      type: 'color',
      order: 2,
      options: [
        { id: 'spring', name: 'スプリング', description: '明るく温かみのある色が似合う', icon: 'spring' },
        { id: 'summer', name: 'サマー', description: '涼しげで上品な色が似合う', icon: 'summer' },
        { id: 'autumn', name: 'オータム', description: '深みのある温かい色が似合う', icon: 'autumn' },
        { id: 'winter', name: 'ウィンター', description: 'クリアで鮮やかな色が似合う', icon: 'winter' }
      ]
    },
    {
      id: '3',
      title: '好みのファッションスタイルは？',
      description: '理想とするスタイルや憧れのテイストを選んでください',
      type: 'style',
      order: 3,
      options: [
        { id: 'elegant', name: 'エレガント', description: '上品で洗練された大人の女性らしいスタイル', icon: 'elegant' },
        { id: 'casual', name: 'カジュアル', description: 'リラックスした親しみやすい自然体のスタイル', icon: 'casual' },
        { id: 'mode', name: 'モード', description: 'トレンド感のある個性的でスタイリッシュなスタイル', icon: 'mode' }
      ]
    }
  ])

  const [editingQuestion, setEditingQuestion] = useState<QuizQuestion | null>(null)
  const [isAddingOption, setIsAddingOption] = useState(false)
  const [newOption, setNewOption] = useState<Partial<QuizOption>>({})

  const handleEditQuestion = (question: QuizQuestion) => {
    setEditingQuestion({ ...question })
  }

  const handleSaveQuestion = () => {
    if (!editingQuestion) return
    
    setQuestions(prev => 
      prev.map(q => q.id === editingQuestion.id ? editingQuestion : q)
    )
    setEditingQuestion(null)
  }

  const handleAddOption = () => {
    if (!editingQuestion || !newOption.name) return
    
    const option: QuizOption = {
      id: newOption.id || Date.now().toString(),
      name: newOption.name,
      description: newOption.description || '',
      icon: newOption.icon || 'default'
    }
    
    setEditingQuestion({
      ...editingQuestion,
      options: [...editingQuestion.options, option]
    })
    
    setNewOption({})
    setIsAddingOption(false)
  }

  const handleDeleteOption = (optionId: string) => {
    if (!editingQuestion) return
    
    setEditingQuestion({
      ...editingQuestion,
      options: editingQuestion.options.filter(opt => opt.id !== optionId)
    })
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'body':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        )
      case 'color':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4 4 4 0 004-4V5z" />
          </svg>
        )
      case 'style':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
        )
      default:
        return null
    }
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
              <h1 className="text-3xl font-bold text-gray-900">設問管理</h1>
            </div>
            <button
              onClick={() => setEditingQuestion({ id: '', title: '', description: '', type: 'body', order: questions.length + 1, options: [] })}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              新しい設問を追加
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Questions List */}
        <div className="space-y-6">
          {questions.map((question) => (
            <div key={question.id} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full text-blue-600">
                    {getTypeIcon(question.type)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{question.title}</h3>
                    <p className="text-sm text-gray-500">順序: {question.order} | タイプ: {question.type}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleEditQuestion(question)}
                  className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                >
                  編集
                </button>
              </div>
              
              <p className="text-gray-600 mb-4">{question.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {question.options.map((option) => (
                  <div key={option.id} className="border border-gray-200 rounded-lg p-3">
                    <h4 className="font-medium text-gray-900">{option.name}</h4>
                    <p className="text-sm text-gray-600">{option.description}</p>
                    <span className="inline-block mt-2 px-2 py-1 bg-gray-100 text-xs rounded">
                      {option.icon}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Edit Modal */}
        {editingQuestion && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  {editingQuestion.id ? '設問を編集' : '新しい設問を追加'}
                </h2>
              </div>
              
              <div className="p-6 space-y-6">
                {/* Question Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      設問タイトル
                    </label>
                    <input
                      type="text"
                      value={editingQuestion.title}
                      onChange={(e) => setEditingQuestion({ ...editingQuestion, title: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      タイプ
                    </label>
                    <select
                      value={editingQuestion.type}
                      onChange={(e) => setEditingQuestion({ ...editingQuestion, type: e.target.value as 'body' | 'color' | 'style' })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="body">骨格診断</option>
                      <option value="color">パーソナルカラー</option>
                      <option value="style">スタイル</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    説明
                  </label>
                  <textarea
                    value={editingQuestion.description}
                    onChange={(e) => setEditingQuestion({ ...editingQuestion, description: e.target.value })}
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Options */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-900">選択肢</h3>
                    <button
                      onClick={() => setIsAddingOption(true)}
                      className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors"
                    >
                      選択肢を追加
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    {editingQuestion.options.map((option) => (
                      <div key={option.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">名前</label>
                              <input
                                type="text"
                                value={option.name}
                                onChange={(e) => {
                                  const updatedOptions = editingQuestion.options.map(opt =>
                                    opt.id === option.id ? { ...opt, name: e.target.value } : opt
                                  )
                                  setEditingQuestion({ ...editingQuestion, options: updatedOptions })
                                }}
                                className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">説明</label>
                              <input
                                type="text"
                                value={option.description}
                                onChange={(e) => {
                                  const updatedOptions = editingQuestion.options.map(opt =>
                                    opt.id === option.id ? { ...opt, description: e.target.value } : opt
                                  )
                                  setEditingQuestion({ ...editingQuestion, options: updatedOptions })
                                }}
                                className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">アイコン</label>
                              <input
                                type="text"
                                value={option.icon}
                                onChange={(e) => {
                                  const updatedOptions = editingQuestion.options.map(opt =>
                                    opt.id === option.id ? { ...opt, icon: e.target.value } : opt
                                  )
                                  setEditingQuestion({ ...editingQuestion, options: updatedOptions })
                                }}
                                className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                              />
                            </div>
                          </div>
                          <button
                            onClick={() => handleDeleteOption(option.id)}
                            className="ml-3 text-red-600 hover:text-red-800"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Add Option Form */}
                  {isAddingOption && (
                    <div className="border border-green-200 rounded-lg p-4 bg-green-50">
                      <h4 className="font-medium text-gray-900 mb-3">新しい選択肢</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">名前</label>
                          <input
                            type="text"
                            value={newOption.name || ''}
                            onChange={(e) => setNewOption({ ...newOption, name: e.target.value })}
                            className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">説明</label>
                          <input
                            type="text"
                            value={newOption.description || ''}
                            onChange={(e) => setNewOption({ ...newOption, description: e.target.value })}
                            className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">アイコン</label>
                          <input
                            type="text"
                            value={newOption.icon || ''}
                            onChange={(e) => setNewOption({ ...newOption, icon: e.target.value })}
                            className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                          />
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={handleAddOption}
                          className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors"
                        >
                          追加
                        </button>
                        <button
                          onClick={() => {
                            setIsAddingOption(false)
                            setNewOption({})
                          }}
                          className="bg-gray-300 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-400 transition-colors"
                        >
                          キャンセル
                        </button>
                      </div>
                    </div>
                  )}
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
      </main>
    </div>
  )
}