'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

const ProductIcon = ({ type }: { type: string }) => {
  const baseClasses = "w-12 h-12 text-gray-700"
  
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

interface Product {
  id: number
  name: string
  price: string
  image: string
  description: string
  detailedDescription: string
  features: string[]
  sizes: string[]
  colors: string[]
}

export default function ProductDetail() {
  const params = useParams()
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [selectedColor, setSelectedColor] = useState<string>('')

  useEffect(() => {
    const productId = parseInt(params.id as string)
    
    // Mock product data
    const mockProducts: Record<number, Product> = {
      1: {
        id: 1,
        name: 'エレガントブラウス',
        price: '¥12,800',
        image: 'blouse',
        description: 'あなたのスタイルにぴったりの上品なブラウス',
        detailedDescription: '上質なシルク素材を使用した、エレガントで洗練されたブラウスです。どんなシーンでも上品な印象を与える一着です。',
        features: [
          '100%シルク素材使用',
          '手洗い可能',
          'UV加工済み',
          'シワになりにくい'
        ],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['ホワイト', 'ベージュ', 'ネイビー']
      },
      2: {
        id: 2,
        name: 'シルエットスカート',
        price: '¥15,600',
        image: 'skirt',
        description: '体型を美しく見せるデザイン',
        detailedDescription: 'あなたの骨格を美しく見せる計算されたシルエット。どんな体型の方でも自信を持って着こなせます。',
        features: [
          '美脚効果抜群',
          'ストレッチ素材',
          '家庭洗濯可能',
          'オールシーズン対応'
        ],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['ブラック', 'グレー', 'ベージュ', 'ネイビー']
      },
      3: {
        id: 3,
        name: 'カラーコーディネートジャケット',
        price: '¥22,900',
        image: 'jacket',
        description: 'あなたのカラーにマッチするジャケット',
        detailedDescription: 'パーソナルカラーに合わせて選べる豊富なカラーバリエーション。ビジネスからカジュアルまで幅広く活用できます。',
        features: [
          '多彩なカラー展開',
          '型崩れしにくい',
          'ポケット付き',
          'ライニング付き'
        ],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['ブラック', 'グレー', 'ベージュ', 'ネイビー', 'ブラウン']
      },
      4: {
        id: 4,
        name: 'パーフェクトフィットパンツ',
        price: '¥18,400',
        image: 'pants',
        description: '快適さとスタイルを両立',
        detailedDescription: '履き心地の良さとスタイルの美しさを両立した理想的なパンツ。一日中快適に過ごせます。',
        features: [
          '美脚シルエット',
          'ストレッチ素材',
          'ウエスト調整可能',
          'シワになりにくい'
        ],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['ブラック', 'グレー', 'ベージュ', 'ネイビー']
      }
    }

    setProduct(mockProducts[productId] || null)
  }, [params.id])

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">商品情報を読み込み中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="px-4 py-6 max-w-md mx-auto">
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            ← 戻る
          </button>
        </div>

        <div className="mb-6">
          <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center mb-4">
            <div className="text-center">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <ProductIcon type={product.image} />
              </div>
              <span className="text-gray-600 text-sm font-medium">{product.name}</span>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>
          <p className="text-3xl font-bold text-gray-900 mb-4">{product.price}</p>
          <p className="text-gray-600 text-sm mb-6 leading-relaxed">{product.detailedDescription}</p>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">特徴</h3>
          <ul className="space-y-2">
            {product.features.map((feature, index) => (
              <li key={index} className="flex items-center text-gray-700 text-sm">
                <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">サイズ</h3>
          <div className="grid grid-cols-4 gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`py-2 px-3 border rounded-lg text-sm font-medium transition-colors ${
                  selectedSize === size
                    ? 'border-black bg-black text-white'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">カラー</h3>
          <div className="grid grid-cols-2 gap-2">
            {product.colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`py-2 px-3 border rounded-lg text-sm font-medium transition-colors ${
                  selectedColor === color
                    ? 'border-black bg-black text-white'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <button
            disabled={!selectedSize || !selectedColor}
            className={`w-full py-4 rounded-lg font-semibold transition-colors ${
              selectedSize && selectedColor
                ? 'bg-black text-white hover:bg-gray-800'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            購入する
          </button>
          
          <Link
            href="/result"
            className="block w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-center"
          >
            診断結果に戻る
          </Link>
        </div>
      </div>
    </div>
  )
}