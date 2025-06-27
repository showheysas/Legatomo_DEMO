'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import { Inter, M_PLUS_1p } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], weight: ['400', '700'] })
const mplus = M_PLUS_1p({ subsets: ['latin'], weight: ['400', '700'] })

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('isLoggedIn') === 'true'
    }
    return false
  })
  const username =
    typeof window !== 'undefined'
      ? localStorage.getItem('username') || 'ゲスト'
      : 'ゲスト'

  const [selectedLaw, setSelectedLaw] = useState('すべて')
  const [selectedCategory, setSelectedCategory] = useState('すべて')
  const [selectedType, setSelectedType] = useState('すべて')
  const [riskInput, setRiskInput] = useState('')
  const [chatInput, setChatInput] = useState('')
  const [isRiskFocused, setIsRiskFocused] = useState(false)

  const router = useRouter()

  const suggestionText = '市場調査の会場で、市販されている缶のRTDを市販の炭酸水で割って、モニターに提供したいと考えています。法令違反のリスクはありますか？'

  const laws = ['すべて', '酒税法', '酒類業組合法', '租税特別措置法', '過去問い合わせ', '社内マニュアル']
  const categories = ['すべて', 'マーケティング', '商品企画', '中味開発', '製造', '物流']
  const lawTypes = ['すべて', '本法', '施行令', '施行規則', '解釈通達', '告示', '申請様式']

  const dummyHistory = [
    { date: '2025-04-01 14:23', summary: '品目の異なる商品の混在について', result: 'リスク中', type: 'リスクチェック', law: 'すべて', category: '商品企画', section: 'すべて' },
    { date: '2025-03-28 09:10', summary: 'ビールテイストの税率変更予定について', result: '-', type: '法令チャット', law: '酒税法', category: 'すべて', section: 'すべて' },
    { date: '2025-03-25 16:45', summary: '連続式蒸留焼酎の表示項目について', result: 'リスク小', type: 'リスクチェック', law: '酒類業組合法', category: '商品企画', section: 'すべて' },
    { date: '2025-03-20 11:30', summary: '未納税移出時の法令上の注意点', result: 'リスク大', type: 'リスクチェック', law: 'すべて', category: '物流', section: '施行令' },
    { date: '2025-03-15 13:00', summary: '申請様式の最新更新情報について', result: '-', type: '法令チャット', law: '過去問い合わせ', category: 'すべて', section: '申請様式' }
  ]

  return (
    <div className={`${inter.className} ${mplus.className} min-h-screen bg-sky-50`}>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} username={username} />

      <div className="flex pt-20">
        <aside className="w-64 bg-sky-100 p-4 border-r border-sky-200">
          <h2 className="text-lg font-bold text-slate-800 mb-2">法令選択</h2>
          <ul className="space-y-2 mb-6">
            {laws.map(item => (
              <li key={item}>
                <label className="flex items-center p-2 bg-white rounded-lg shadow-sm cursor-pointer hover:bg-sky-200 transition">
                  <input
                    type="radio"
                    name="law"
                    className="appearance-none w-4 h-4 border-2 border-sky-600 rounded-full checked:bg-sky-600 checked:border-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                    checked={selectedLaw === item}
                    onChange={() => setSelectedLaw(item)}
                  />
                  <span className="ml-3 text-slate-700">{item}</span>
                </label>
              </li>
            ))}
          </ul>

          <h2 className="text-lg font-bold text-slate-800 mb-2">カテゴリ選択</h2>
          <ul className="space-y-2 mb-6">
            {categories.map(item => (
              <li key={item}>
                <label className="flex items-center p-2 bg-white rounded-lg shadow-sm cursor-pointer hover:bg-sky-200 transition">
                  <input
                    type="radio"
                    name="category"
                    className="appearance-none w-4 h-4 border-2 border-sky-600 rounded-full checked:bg-sky-600 checked:border-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                    checked={selectedCategory === item}
                    onChange={() => setSelectedCategory(item)}
                  />
                  <span className="ml-3 text-slate-700">{item}</span>
                </label>
              </li>
            ))}
          </ul>

          <h2 className="text-lg font-bold text-slate-800 mb-2">法令区分</h2>
          <ul className="space-y-2">
            {lawTypes.map(item => (
              <li key={item}>
                <label className="flex items-center p-2 bg-white rounded-lg shadow-sm cursor-pointer hover:bg-sky-200 transition">
                  <input
                    type="radio"
                    name="type"
                    className="appearance-none w-4 h-4 border-2 border-sky-600 rounded-full checked:bg-sky-600 checked:border-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                    checked={selectedType === item}
                    onChange={() => setSelectedType(item)}
                  />
                  <span className="ml-3 text-slate-700">{item}</span>
                </label>
              </li>
            ))}
          </ul>
        </aside>

        <div className="flex-1 p-6 space-y-6">
          {/* リスクチェック */}
          <div className="bg-white shadow-md p-6 rounded-lg relative">
            <h3 className="text-xl font-bold text-slate-800 mb-2">リスクチェック</h3>
            <textarea rows={3} value={riskInput} onChange={e => setRiskInput(e.target.value)} onFocus={() => setIsRiskFocused(true)} onBlur={() => setTimeout(() => setIsRiskFocused(false), 100)} className="w-full border rounded-lg p-2 text-slate-800" placeholder="ここに施策を入力" />
            {isRiskFocused && riskInput.trim() === '' && (
              <div className="absolute left-4 right-4 bg-white border shadow p-3 mt-1 text-sm text-blue-700 cursor-pointer z-10 rounded-lg" onClick={() => { setRiskInput(suggestionText); setIsRiskFocused(false) }}>
                <p className="font-semibold mb-1">入力候補</p>
                <p>・{suggestionText}</p>
              </div>
            )}
            <div className="mt-2 flex justify-end">
              <button disabled={!riskInput.trim()} onClick={() => router.push(`/check?law=${encodeURIComponent(selectedLaw)}&category=${encodeURIComponent(selectedCategory)}&type=${encodeURIComponent(selectedType)}&text=${encodeURIComponent(riskInput)}`)} className={`mt-2 px-4 py-2 rounded-lg text-white ${riskInput.trim() ? 'bg-sky-700 hover:bg-sky-800' : 'bg-gray-400 cursor-not-allowed'}`}>チェック</button>
            </div>
          </div>

          {/* 法令チャット */}
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h3 className="text-xl font-bold text-slate-800 mb-2">法令なんでもチャット</h3>
            <textarea rows={3} value={chatInput} onChange={e => setChatInput(e.target.value)} className="w-full border rounded-lg p-2 text-slate-800" placeholder="ここに質問を入力" />
            <div className="mt-2 flex justify-end">
              <button disabled={!chatInput.trim()} className={`mt-2 px-4 py-2 rounded-lg text-white ${chatInput.trim() ? 'bg-sky-700 hover:bg-sky-800' : 'bg-gray-400 cursor-not-allowed'}`}>チャット</button>
            </div>
          </div>

          {/* 問い合わせ履歴 */}
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h3 className="text-xl font-bold text-slate-800 mb-4">問い合わせ履歴</h3>
            <table className="w-full text-left text-sm text-slate-700">
              <thead>
                <tr className="border-b">
                  <th className="py-2">日時</th>
                  <th className="py-2">概要</th>
                  <th className="py-2">判定</th>
                  <th className="py-2">分類</th>
                  <th className="py-2">法令</th>
                  <th className="py-2">カテゴリ</th>
                  <th className="py-2">区分</th>
                </tr>
              </thead>
              <tbody>
                {dummyHistory.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-sky-100">
                    <td className="py-2 pr-4 whitespace-nowrap">{item.date}</td>
                    <td className="py-2 pr-4 text-sky-700 underline cursor-pointer">{item.summary}</td>
                    <td className={`py-2 pr-4 font-bold ${item.result === 'リスク大' ? 'text-red-700' : item.result === 'リスク中' ? 'text-orange-500' : item.result === 'リスク小' ? 'text-gray-500' : ''}`}>{item.result}</td>
                    <td className="py-2 pr-4">{item.type}</td>
                    <td className="py-2 pr-4">{item.law}</td>
                    <td className="py-2 pr-4">{item.category}</td>
                    <td className="py-2 pr-4">{item.section}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
