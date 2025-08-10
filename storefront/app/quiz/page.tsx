'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const BodyTypeIcon = ({ type, selected }: { type: string; selected: boolean }) => {
  const baseClasses = "w-6 h-6"
  const colorClasses = selected ? "text-white" : "text-gray-700"
  
  switch (type) {
    case 'straight':
      return (
        <div className="flex flex-col items-center gap-1">
          <div className={`${baseClasses} ${colorClasses}`}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <rect x="9" y="4" width="6" height="16" rx="1"/>
              <rect x="7" y="8" width="10" height="8" rx="1" fillOpacity="0.3"/>
            </svg>
          </div>
        </div>
      )
    case 'wave':
      return (
        <div className="flex flex-col items-center gap-1">
          <div className={`${baseClasses} ${colorClasses}`}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M5 12c0-2 2-4 4-4s4 2 4 4-2 4-4 4-4-2-4-4z" fillOpacity="0.3"/>
              <path d="M10 6c2 0 4 1 4 3v6c0 2-2 3-4 3s-4-1-4-3V9c0-2 2-3 4-3z"/>
            </svg>
          </div>
        </div>
      )
    case 'natural':
      return (
        <div className="flex flex-col items-center gap-1">
          <div className={`${baseClasses} ${colorClasses}`}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <rect x="8" y="4" width="8" height="16" rx="2"/>
              <rect x="6" y="6" width="12" height="12" rx="2" fillOpacity="0.3"/>
            </svg>
          </div>
        </div>
      )
    default:
      return <div className={`${baseClasses} ${colorClasses}`}></div>
  }
}

const ColorSeasonIcon = ({ season, selected }: { season: string; selected: boolean }) => {
  const baseClasses = "w-6 h-6"
  const colorClasses = selected ? "text-white" : "text-gray-700"
  
  switch (season) {
    case 'spring':
      return (
        <div className={`${baseClasses} ${colorClasses}`}>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="3"/>
            <path d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M1 12h6M17 12h6M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24"/>
          </svg>
        </div>
      )
    case 'summer':
      return (
        <div className={`${baseClasses} ${colorClasses}`}>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 6h18l-2 12H5L3 6zM7 8v8M12 8v8M17 8v8"/>
          </svg>
        </div>
      )
    case 'autumn':
      return (
        <div className={`${baseClasses} ${colorClasses}`}>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L8 8h8l-4-6zM8 8v8c0 2 2 4 4 4s4-2 4-4V8"/>
          </svg>
        </div>
      )
    case 'winter':
      return (
        <div className={`${baseClasses} ${colorClasses}`}>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2v20M2 12h20M6.34 6.34l11.32 11.32M17.66 6.34L6.34 17.66M8 4l8 8M16 4l-8 8M4 8l8 8M4 16l8-8"/>
          </svg>
        </div>
      )
    default:
      return <div className={`${baseClasses} ${colorClasses}`}></div>
  }
}

const StyleIcon = ({ style, selected }: { style: string; selected: boolean }) => {
  const baseClasses = "w-6 h-6"
  const colorClasses = selected ? "text-white" : "text-gray-700"
  
  switch (style) {
    case 'elegant':
      return (
        <div className={`${baseClasses} ${colorClasses}`}>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L8 6v16h8V6l-4-4zM10 18v-4h4v4"/>
          </svg>
        </div>
      )
    case 'casual':
      return (
        <div className={`${baseClasses} ${colorClasses}`}>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="6" width="12" height="12" rx="2"/>
            <circle cx="9" cy="9" r="1"/>
            <circle cx="15" cy="9" r="1"/>
          </svg>
        </div>
      )
    case 'mode':
      return (
        <div className={`${baseClasses} ${colorClasses}`}>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <polygon points="12,2 22,20 2,20"/>
            <circle cx="12" cy="14" r="2"/>
          </svg>
        </div>
      )
    default:
      return <div className={`${baseClasses} ${colorClasses}`}></div>
  }
}

type BodyType = 'straight' | 'wave' | 'natural' | null
type ColorSeason = 'spring' | 'summer' | 'autumn' | 'winter' | null
type StylePreference = 'elegant' | 'casual' | 'mode' | null

interface QuizState {
  bodyType: BodyType
  colorSeason: ColorSeason
  stylePreference: StylePreference
}

export default function Quiz() {
  const [currentStep, setCurrentStep] = useState(1)
  const [quizState, setQuizState] = useState<QuizState>({
    bodyType: null,
    colorSeason: null,
    stylePreference: null
  })
  const router = useRouter()

  const bodyTypes = [
    {
      id: 'straight',
      name: 'ストレート',
      description: '身体に厚みがあり、メリハリのあるボディライン',
      icon: 'straight'
    },
    {
      id: 'wave',
      name: 'ウェーブ',
      description: '身体が薄く、曲線的で華奢なボディライン',
      icon: 'wave'
    },
    {
      id: 'natural',
      name: 'ナチュラル',
      description: '骨格がしっかりしていて、フレーム感のあるボディライン',
      icon: 'natural'
    }
  ]

  const colorSeasons = [
    {
      id: 'spring',
      name: 'スプリング',
      description: '明るく温かみのある色が似合う',
      colors: ['#FFB6C1', '#FFEB9C', '#98FB98', '#87CEEB'],
      icon: 'spring'
    },
    {
      id: 'summer',
      name: 'サマー',
      description: '涼しげで上品な色が似合う',
      colors: ['#E6E6FA', '#B0E0E6', '#F0F8FF', '#FFFAF0'],
      icon: 'summer'
    },
    {
      id: 'autumn',
      name: 'オータム',
      description: '深みのある温かい色が似合う',
      colors: ['#D2691E', '#8B4513', '#CD853F', '#DEB887'],
      icon: 'autumn'
    },
    {
      id: 'winter',
      name: 'ウィンター',
      description: 'クリアで鮮やかな色が似合う',
      colors: ['#000080', '#DC143C', '#FFFFFF', '#C0C0C0'],
      icon: 'winter'
    }
  ]

  const stylePreferences = [
    {
      id: 'elegant',
      name: 'エレガント',
      description: '上品で洗練された大人の女性らしいスタイル',
      icon: 'elegant'
    },
    {
      id: 'casual',
      name: 'カジュアル',
      description: 'リラックスした親しみやすい自然体のスタイル',
      icon: 'casual'
    },
    {
      id: 'mode',
      name: 'モード',
      description: 'トレンド感のある個性的でスタイリッシュなスタイル',
      icon: 'mode'
    }
  ]

  const handleBodyTypeSelect = (bodyType: BodyType) => {
    setQuizState(prev => ({ ...prev, bodyType }))
  }

  const handleColorSeasonSelect = (colorSeason: ColorSeason) => {
    setQuizState(prev => ({ ...prev, colorSeason }))
  }

  const handleStylePreferenceSelect = (stylePreference: StylePreference) => {
    setQuizState(prev => ({ ...prev, stylePreference }))
  }

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    } else {
      const params = new URLSearchParams({
        bodyType: quizState.bodyType || '',
        colorSeason: quizState.colorSeason || '',
        stylePreference: quizState.stylePreference || ''
      })
      router.push(`/result?${params.toString()}`)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return quizState.bodyType !== null
      case 2:
        return quizState.colorSeason !== null
      case 3:
        return quizState.stylePreference !== null
      default:
        return false
    }
  }

  const progressWidth = (currentStep / 3) * 100

  return (
    <div className="min-h-screen bg-white">
      <div className="px-4 py-6 max-w-md mx-auto">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm text-gray-600">ステップ {currentStep} / 3</span>
            <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
              ×
            </Link>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1">
            <div 
              className="bg-black h-1 rounded-full transition-all duration-300"
              style={{ width: progressWidth + '%' }}
            ></div>
          </div>
        </div>

        <div className="bg-white">
          {currentStep === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">あなたの骨格タイプは？</h2>
              <p className="text-gray-600 mb-6">ご自身の体つきに最も近いものを選んでください</p>
              
              <div className="space-y-3">
                {bodyTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => handleBodyTypeSelect(type.id as BodyType)}
                    className={`w-full p-4 border rounded-lg text-left transition-all ${
                      quizState.bodyType === type.id
                        ? 'border-black bg-gray-50 shadow-sm'
                        : 'border-gray-200 hover:border-gray-400 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-14 h-14 rounded-full flex items-center justify-center ${
                        quizState.bodyType === type.id
                          ? 'bg-black text-white'
                          : 'bg-gray-100'
                      }`}>
                        <BodyTypeIcon type={type.icon} selected={quizState.bodyType === type.id} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{type.name}</h3>
                        <p className="text-gray-600 text-sm">{type.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">あなたのパーソナルカラーは？</h2>
              <p className="text-gray-600 mb-6">肌、髪、瞳の色から最も似合うと思うカラータイプを選んでください</p>
              
              <div className="space-y-3">
                {colorSeasons.map((season) => (
                  <button
                    key={season.id}
                    onClick={() => handleColorSeasonSelect(season.id as ColorSeason)}
                    className={`w-full p-4 border rounded-lg text-left transition-all ${
                      quizState.colorSeason === season.id
                        ? 'border-black bg-gray-50 shadow-sm'
                        : 'border-gray-200 hover:border-gray-400 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-14 h-14 rounded-full flex items-center justify-center ${
                        quizState.colorSeason === season.id
                          ? 'bg-black text-white'
                          : 'bg-gray-100'
                      }`}>
                        <ColorSeasonIcon season={season.icon} selected={quizState.colorSeason === season.id} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">{season.name}</h3>
                        <p className="text-gray-600 text-sm mb-2">{season.description}</p>
                        <div className="flex gap-1">
                          {season.colors.map((color, index) => (
                            <div
                              key={index}
                              className="w-6 h-6 rounded-full border border-gray-300"
                              style={{ backgroundColor: color }}
                            ></div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">好みのファッションスタイルは？</h2>
              <p className="text-gray-600 mb-6">理想とするスタイルや憧れのテイストを選んでください</p>
              
              <div className="space-y-3">
                {stylePreferences.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => handleStylePreferenceSelect(style.id as StylePreference)}
                    className={`w-full p-4 border rounded-lg text-left transition-all ${
                      quizState.stylePreference === style.id
                        ? 'border-black bg-gray-50 shadow-sm'
                        : 'border-gray-200 hover:border-gray-400 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-14 h-14 rounded-full flex items-center justify-center ${
                        quizState.stylePreference === style.id
                          ? 'bg-black text-white'
                          : 'bg-gray-100'
                      }`}>
                        <StyleIcon style={style.icon} selected={quizState.stylePreference === style.id} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{style.name}</h3>
                        <p className="text-gray-600 text-sm">{style.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`px-6 py-3 rounded-lg font-semibold ${
                currentStep === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              戻る
            </button>
            
            <button
              onClick={nextStep}
              disabled={!canProceed()}
              className={`px-8 py-3 rounded-lg font-semibold ${
                canProceed()
                  ? 'bg-black text-white hover:bg-gray-800'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              {currentStep === 3 ? '結果を見る' : '次へ'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}