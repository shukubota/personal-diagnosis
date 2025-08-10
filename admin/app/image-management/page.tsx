'use client'

import { useState } from 'react'
import Link from 'next/link'

interface ImageItem {
  id: string
  name: string
  url: string
  category: 'product' | 'icon' | 'background' | 'result'
  alt: string
  size: number
  uploadDate: string
  usage: string[]
}

export default function ImageManagement() {
  const [images, setImages] = useState<ImageItem[]>([
    {
      id: '1',
      name: 'blouse-icon.svg',
      url: '/images/blouse-icon.svg',
      category: 'icon',
      alt: 'ブラウスアイコン',
      size: 2048,
      uploadDate: '2024-01-15',
      usage: ['商品カード', '診断結果']
    },
    {
      id: '2',
      name: 'skirt-icon.svg',
      url: '/images/skirt-icon.svg',
      category: 'icon',
      alt: 'スカートアイコン',
      size: 1856,
      uploadDate: '2024-01-15',
      usage: ['商品カード']
    },
    {
      id: '3',
      name: 'product-bg.jpg',
      url: '/images/product-bg.jpg',
      category: 'background',
      alt: '商品背景画像',
      size: 156000,
      uploadDate: '2024-01-14',
      usage: ['商品詳細ページ']
    }
  ])

  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedImages, setSelectedImages] = useState<string[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [editingImage, setEditingImage] = useState<ImageItem | null>(null)

  const categories = [
    { value: 'all', label: '全て' },
    { value: 'product', label: '商品画像' },
    { value: 'icon', label: 'アイコン' },
    { value: 'background', label: '背景画像' },
    { value: 'result', label: '結果画像' }
  ]

  const filteredImages = selectedCategory === 'all' 
    ? images 
    : images.filter(img => img.category === selectedCategory)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    setIsUploading(true)
    
    // Mock upload process
    setTimeout(() => {
      const newImages: ImageItem[] = Array.from(files).map((file, index) => ({
        id: (Date.now() + index).toString(),
        name: file.name,
        url: URL.createObjectURL(file),
        category: 'product' as const,
        alt: file.name.split('.')[0],
        size: file.size,
        uploadDate: new Date().toISOString().split('T')[0],
        usage: []
      }))
      
      setImages(prev => [...prev, ...newImages])
      setIsUploading(false)
    }, 2000)
  }

  const handleDeleteImages = () => {
    setImages(prev => prev.filter(img => !selectedImages.includes(img.id)))
    setSelectedImages([])
  }

  const handleImageSelect = (imageId: string) => {
    setSelectedImages(prev => 
      prev.includes(imageId) 
        ? prev.filter(id => id !== imageId)
        : [...prev, imageId]
    )
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
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
              <h1 className="text-3xl font-bold text-gray-900">画像管理</h1>
            </div>
            <div className="flex items-center space-x-3">
              {selectedImages.length > 0 && (
                <button
                  onClick={handleDeleteImages}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  選択した画像を削除 ({selectedImages.length})
                </button>
              )}
              <label className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
                画像をアップロード
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-1">
            {categories.map(category => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
          
          <div className="text-sm text-gray-500">
            {filteredImages.length} 個の画像
          </div>
        </div>

        {/* Upload Progress */}
        {isUploading && (
          <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-3"></div>
              <span className="text-blue-700">アップロード中...</span>
            </div>
          </div>
        )}

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredImages.map((image) => (
            <div key={image.id} className="group relative bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              {/* Selection Checkbox */}
              <div className="absolute top-2 left-2 z-10">
                <input
                  type="checkbox"
                  checked={selectedImages.includes(image.id)}
                  onChange={() => handleImageSelect(image.id)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
              </div>

              {/* Edit Button */}
              <button
                onClick={() => setEditingImage(image)}
                className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 bg-black bg-opacity-50 text-white p-1 rounded transition-opacity"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>

              {/* Image */}
              <div className="aspect-square bg-gray-100 flex items-center justify-center">
                {image.category === 'icon' ? (
                  <div className="w-16 h-16 bg-gray-300 rounded-lg flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                ) : (
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Image Info */}
              <div className="p-3">
                <h3 className="font-medium text-gray-900 text-sm truncate">{image.name}</h3>
                <div className="mt-2 space-y-1">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span className="capitalize">{image.category}</span>
                    <span>{formatFileSize(image.size)}</span>
                  </div>
                  <div className="text-xs text-gray-500">{image.uploadDate}</div>
                  {image.usage.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {image.usage.slice(0, 2).map((use, index) => (
                        <span key={index} className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                          {use}
                        </span>
                      ))}
                      {image.usage.length > 2 && (
                        <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                          +{image.usage.length - 2}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredImages.length === 0 && (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">画像がありません</h3>
            <p className="mt-1 text-sm text-gray-500">画像をアップロードして開始しましょう</p>
          </div>
        )}
      </main>

      {/* Edit Modal */}
      {editingImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">画像編集</h2>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ファイル名
                  </label>
                  <input
                    type="text"
                    value={editingImage.name}
                    onChange={(e) => setEditingImage({ ...editingImage, name: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    カテゴリ
                  </label>
                  <select
                    value={editingImage.category}
                    onChange={(e) => setEditingImage({ ...editingImage, category: e.target.value as ImageItem['category'] })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="product">商品画像</option>
                    <option value="icon">アイコン</option>
                    <option value="background">背景画像</option>
                    <option value="result">結果画像</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  代替テキスト
                </label>
                <input
                  type="text"
                  value={editingImage.alt}
                  onChange={(e) => setEditingImage({ ...editingImage, alt: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  使用箇所（カンマ区切り）
                </label>
                <input
                  type="text"
                  value={editingImage.usage.join(', ')}
                  onChange={(e) => setEditingImage({ 
                    ...editingImage, 
                    usage: e.target.value.split(',').map(s => s.trim()).filter(s => s) 
                  })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="商品カード, 診断結果, ヘッダー"
                />
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setEditingImage(null)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                キャンセル
              </button>
              <button
                onClick={() => {
                  setImages(prev => prev.map(img => img.id === editingImage.id ? editingImage : img))
                  setEditingImage(null)
                }}
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