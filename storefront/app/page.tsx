import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <div className="px-4 py-8 max-w-md mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
            あなたにぴったりの<br />
            <span className="text-gray-700">
              スタイルを見つけよう
            </span>
          </h1>
          
          <p className="text-base text-gray-600 mb-8 leading-relaxed">
            いくつかの質問に答えて、あなたに最適なスタイルを見つけてください。
          </p>

          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">診断の流れ</h2>
            <div className="space-y-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-gray-700" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="9" y="4" width="6" height="16" rx="1"/>
                    <rect x="7" y="8" width="10" height="8" rx="1" fillOpacity="0.3"/>
                  </svg>
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-800">骨格診断</h3>
                  <p className="text-gray-600 text-sm">あなたの骨格タイプに最適なシルエットを見つけます</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-gray-700" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="12" r="3"/>
                    <path d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M1 12h6M17 12h6M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24"/>
                  </svg>
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-800">パーソナルカラー診断</h3>
                  <p className="text-gray-600 text-sm">あなたに似合う色の傾向を分析します</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-gray-700" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L8 6v16h8V6l-4-4zM10 18v-4h4v4"/>
                  </svg>
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-800">スタイル診断</h3>
                  <p className="text-gray-600 text-sm">理想のファッションテイストを提案します</p>
                </div>
              </div>
            </div>
          </div>

          <Link
            href="/quiz"
            className="block w-full bg-black text-white font-semibold py-4 rounded-lg hover:bg-gray-800 transition-colors mb-4"
          >
            診断を始める
          </Link>

          <p className="text-gray-500 text-sm">
            所要時間：約3分
          </p>
        </div>
      </div>
    </div>
  );
}
