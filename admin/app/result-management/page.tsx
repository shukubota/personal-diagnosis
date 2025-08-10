'use client'

import { useState } from 'react'
import Link from 'next/link'

interface ResultTemplate {
  id: string
  bodyType: string
  colorSeason: string
  stylePreference: string
  title: string
  description: string
  stylingTips: string
  recommendedProducts: string[]
  icon: string
  colors: string[]
}

interface ProductItem {
  id: string
  name: string
  price: string
  category: string
  image: string
}

export default function ResultManagement() {
  const [results, setResults] = useState<ResultTemplate[]>([
    {
      id: '1',
      bodyType: 'straight',
      colorSeason: 'spring',
      stylePreference: 'elegant',
      title: 'ストレート × スプリング × エレガント',
      description: 'あなたは上品で洗練されたスタイルが似合います',
      stylingTips: 'シンプルでベーシックなアイテムを中心に、明るく温かみのある色でエレガントに仕上げましょう。',
      recommendedProducts: ['1', '3'],
      icon: 'straight',
      colors: ['#FFB6C1', '#FFEB9C', '#98FB98']
    },
    {
      id: '2',
      bodyType: 'wave',
      colorSeason: 'summer',
      stylePreference: 'casual',
      title: 'ウェーブ × サマー × カジュアル',
      description: 'ナチュラルで親しみやすいスタイルが魅力的です',
      stylingTips: 'ソフトな素材や装飾のあるアイテムで、涼しげな色合いをカジュアルに楽しみましょう。',
      recommendedProducts: ['2', '4'],
      icon: 'wave',
      colors: ['#E6E6FA', '#B0E0E6', '#F0F8FF']
    }
  ])

  const [products] = useState<ProductItem[]>([
    { id: '1', name: 'エレガントブラウス', price: '¥12,800', category: 'tops', image: 'blouse' },
    { id: '2', name: 'シルエットスカート', price: '¥15,600', category: 'bottoms', image: 'skirt' },
    { id: '3', name: 'カラーコーディネートジャケット', price: '¥22,900', category: 'outer', image: 'jacket' },
    { id: '4', name: 'パーフェクトフィットパンツ', price: '¥18,400', category: 'bottoms', image: 'pants' }
  ])

  const [editingResult, setEditingResult] = useState<ResultTemplate | null>(null)
  const [selectedTab, setSelectedTab] = useState<'list' | 'combinations'>('list')

  const bodyTypes = ['straight', 'wave', 'natural']
  const colorSeasons = ['spring', 'summer', 'autumn', 'winter']
  const stylePreferences = ['elegant', 'casual', 'mode']

  const generateAllCombinations = () => {
    const combinations: ResultTemplate[] = []
    let id = 1
    
    bodyTypes.forEach(bodyType => {
      colorSeasons.forEach(colorSeason => {
        stylePreferences.forEach(stylePreference => {
          const existing = results.find(r => 
            r.bodyType === bodyType && 
            r.colorSeason === colorSeason && 
            r.stylePreference === stylePreference
          )
          
          if (!existing) {
            combinations.push({
              id: id.toString(),
              bodyType,
              colorSeason,
              stylePreference,
              title: `${getDisplayName(bodyType)} × ${getDisplayName(colorSeason)} × ${getDisplayName(stylePreference)}`,
              description: '診断結果の説明を入力してください',
              stylingTips: 'スタイリングのコツを入力してください',
              recommendedProducts: [],
              icon: bodyType,
              colors: getSeasonColors(colorSeason)
            })
            id++
          }
        })
      })
    })
    
    setResults(prev => [...prev, ...combinations])
  }

  const getDisplayName = (key: string) => {
    const names: Record<string, string> = {
      straight: 'ストレート',
      wave: 'ウェーブ',
      natural: 'ナチュラル',
      spring: 'スプリング',
      summer: 'サマー',
      autumn: 'オータム',
      winter: 'ウィンター',
      elegant: 'エレガント',
      casual: 'カジュアル',
      mode: 'モード'
    }
    return names[key] || key
  }

  const getSeasonColors = (season: string) => {
    const colorMap: Record<string, string[]> = {
      spring: ['#FFB6C1', '#FFEB9C', '#98FB98', '#87CEEB'],
      summer: ['#E6E6FA', '#B0E0E6', '#F0F8FF', '#FFFAF0'],
      autumn: ['#D2691E', '#8B4513', '#CD853F', '#DEB887'],
      winter: ['#000080', '#DC143C', '#FFFFFF', '#C0C0C0']
    }
    return colorMap[season] || []
  }

  const handleSaveResult = () => {
    if (!editingResult) return
    
    setResults(prev => 
      editingResult.id && prev.find(r => r.id === editingResult.id)
        ? prev.map(r => r.id === editingResult.id ? editingResult : r)
        : [...prev, { ...editingResult, id: Date.now().toString() }]
    )
    setEditingResult(null)
  }

  const handleDeleteResult = (id: string) => {
    setResults(prev => prev.filter(r => r.id !== id))
  }

  const toggleProductRecommendation = (productId: string) => {
    if (!editingResult) return
    
    const currentProducts = editingResult.recommendedProducts || []
    const updated = currentProducts.includes(productId)
      ? currentProducts.filter(id => id !== productId)
      : [...currentProducts, productId]
    
    setEditingResult({ ...editingResult, recommendedProducts: updated })
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
              <h1 className="text-3xl font-bold text-gray-900">結果設定</h1>
            </div>
            <div className="flex items-center space-x-3">
              {selectedTab === 'combinations' && (
                <button
                  onClick={generateAllCombinations}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  未設定の組み合わせを生成
                </button>
              )}
              <button
                onClick={() => setEditingResult({
                  id: '',
                  bodyType: 'straight',
                  colorSeason: 'spring',
                  stylePreference: 'elegant',
                  title: '',
                  description: '',
                  stylingTips: '',
                  recommendedProducts: [],
                  icon: 'straight',
                  colors: getSeasonColors('spring')
                })}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                新しい結果を追加
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setSelectedTab('list')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  selectedTab === 'list'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                結果一覧
              </button>
              <button
                onClick={() => setSelectedTab('combinations')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  selectedTab === 'combinations'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                組み合わせマトリックス
              </button>
            </nav>
          </div>
        </div>

        {/* Content */}
        {selectedTab === 'list' ? (
          <div className="space-y-6">
            {results.map((result) => (
              <div key={result.id} className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{result.title}</h3>
                    <p className="text-sm text-gray-500">
                      {getDisplayName(result.bodyType)} | {getDisplayName(result.colorSeason)} | {getDisplayName(result.stylePreference)}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingResult(result)}
                      className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                    >
                      編集
                    </button>
                    <button
                      onClick={() => handleDeleteResult(result.id)}
                      className="text-red-600 hover:text-red-800 font-medium text-sm"
                    >
                      削除
                    </button>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">{result.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">スタイリングのコツ</h4>
                    <p className="text-sm text-gray-600">{result.stylingTips}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">推薦商品</h4>
                    <div className="flex flex-wrap gap-2">
                      {result.recommendedProducts.map(productId => {
                        const product = products.find(p => p.id === productId)
                        return product ? (
                          <span key={productId} className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                            {product.name}
                          </span>
                        ) : null
                      })}
                      {result.recommendedProducts.length === 0 && (
                        <span className="text-sm text-gray-400">推薦商品が設定されていません</span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h4 className="font-medium text-gray-900 mb-2">カラーパレット</h4>
                  <div className="flex gap-2">
                    {result.colors.map((color, index) => (
                      <div
                        key={index}
                        className="w-8 h-8 rounded-full border border-gray-300"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      骨格
                    </th>
                    {colorSeasons.map(season => (
                      <th key={season} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {getDisplayName(season)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {bodyTypes.map(bodyType => (
                    <tr key={bodyType}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {getDisplayName(bodyType)}
                      </td>
                      {colorSeasons.map(colorSeason => (
                        <td key={colorSeason} className="px-6 py-4 whitespace-nowrap">
                          <div className="space-y-1">
                            {stylePreferences.map(stylePreference => {
                              const result = results.find(r => 
                                r.bodyType === bodyType && 
                                r.colorSeason === colorSeason && 
                                r.stylePreference === stylePreference
                              )
                              return (
                                <div
                                  key={stylePreference}
                                  className={`text-xs px-2 py-1 rounded cursor-pointer ${
                                    result 
                                      ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                  }`}
                                  onClick={() => {
                                    if (result) {
                                      setEditingResult(result)
                                    } else {
                                      setEditingResult({
                                        id: '',
                                        bodyType,
                                        colorSeason,
                                        stylePreference,
                                        title: `${getDisplayName(bodyType)} × ${getDisplayName(colorSeason)} × ${getDisplayName(stylePreference)}`,
                                        description: '',
                                        stylingTips: '',
                                        recommendedProducts: [],
                                        icon: bodyType,
                                        colors: getSeasonColors(colorSeason)
                                      })
                                    }
                                  }}
                                >
                                  {getDisplayName(stylePreference)}
                                </div>
                              )
                            })}
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Edit Modal */}
      {editingResult && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingResult.id ? '結果を編集' : '新しい結果を追加'}
              </h2>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    骨格タイプ
                  </label>
                  <select
                    value={editingResult.bodyType}
                    onChange={(e) => setEditingResult({ 
                      ...editingResult, 
                      bodyType: e.target.value,
                      icon: e.target.value
                    })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {bodyTypes.map(type => (
                      <option key={type} value={type}>{getDisplayName(type)}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    パーソナルカラー
                  </label>
                  <select
                    value={editingResult.colorSeason}
                    onChange={(e) => setEditingResult({ 
                      ...editingResult, 
                      colorSeason: e.target.value,
                      colors: getSeasonColors(e.target.value)
                    })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {colorSeasons.map(season => (
                      <option key={season} value={season}>{getDisplayName(season)}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    スタイル
                  </label>
                  <select
                    value={editingResult.stylePreference}
                    onChange={(e) => setEditingResult({ ...editingResult, stylePreference: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {stylePreferences.map(style => (
                      <option key={style} value={style}>{getDisplayName(style)}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  タイトル
                </label>
                <input
                  type="text"
                  value={editingResult.title}
                  onChange={(e) => setEditingResult({ ...editingResult, title: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  説明
                </label>
                <textarea
                  value={editingResult.description}
                  onChange={(e) => setEditingResult({ ...editingResult, description: e.target.value })}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  スタイリングのコツ
                </label>
                <textarea
                  value={editingResult.stylingTips}
                  onChange={(e) => setEditingResult({ ...editingResult, stylingTips: e.target.value })}
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              {/* Product Recommendations */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  推薦商品
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {products.map(product => (
                    <label key={product.id} className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="checkbox"
                        checked={editingResult.recommendedProducts.includes(product.id)}
                        onChange={() => toggleProductRecommendation(product.id)}
                        className="mr-3"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500">{product.price} | {product.category}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setEditingResult(null)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                キャンセル
              </button>
              <button
                onClick={handleSaveResult}
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