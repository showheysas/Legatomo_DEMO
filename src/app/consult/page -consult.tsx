'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'

export default function ConsultPage() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [username, setUsername] = useState('佐々木')

  const [selectedDivisions, setSelectedDivisions] = useState<string[]>([])
  const [selectedRecipients, setSelectedRecipients] = useState<string[]>([])
  const [requestContent, setRequestContent] = useState('')

  // 仮データ（相談内容とリスク度合い）
  const summary = '市場調査で市販缶RTDに炭酸水を混和する件について'
  const riskLevel = 'リスク大'

  const divisionOptions = ['品質保証部', '営業統括部', 'SCM部', 'その他']
  const recipientsByDivision: { [key: string]: string[] } = {
    '品質保証部': ['品証A', '品証B', '品証C'],
    '営業統括部': ['営統A'],
    '製造部': ['製造A', '製造B', '製造C'],
    'SCM部': ['SCMA', 'SCMB'],
    'その他': ['その他A', 'その他B', 'その他C']
  }

  const handleDivisionChange = (division: string) => {
    setSelectedDivisions(prev =>
      prev.includes(division)
        ? prev.filter(d => d !== division)
        : [...prev, division]
    )
    const relatedRecipients = recipientsByDivision[division] || []
    if (selectedDivisions.includes(division)) {
      setSelectedRecipients(prev => prev.filter(r => !relatedRecipients.includes(r)))
    }
  }

  const handleRecipientChange = (recipient: string) => {
    setSelectedRecipients(prev =>
      prev.includes(recipient)
        ? prev.filter(r => r !== recipient)
        : [...prev, recipient]
    )
  }

  const handleSubmit = () => {
    alert('送信されました！（ここに送信処理を実装）')
  }

  return (
    <div className="min-h-screen bg-sky-50">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} username={username} setUsername={() => {}} />

      <div className="pt-24 px-6 space-y-6">
        <h1 className="text-2xl font-bold text-slate-800 mb-4">法令スペシャリストに相談</h1>

        <div className="bg-white shadow-md p-6 rounded-lg space-y-6">
          {/* 相談案件項目 */}
          <div>
            <label className="block mb-2 font-semibold text-slate-700">相談案件</label>
            <p className="text-slate-800 font-bold border p-3 rounded-lg bg-sky-100">
              （{riskLevel}）{summary}
            </p>
          </div>

          {/* 区分選択 */}
          <div>
            <label className="block mb-2 font-semibold text-slate-700">法令スペシャリスト区分（複数選択可）</label>
            <div className="space-y-2">
              {divisionOptions.map((div, index) => (
                <label key={index} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedDivisions.includes(div)}
                    onChange={() => handleDivisionChange(div)}
                  />
                  <span className="text-slate-800">{div}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 送信先選択 */}
          {selectedDivisions.length > 0 && (
            <div>
              <label className="block mb-2 font-semibold text-slate-700">送信先選択（複数選択可）</label>
              <div className="space-y-2">
                {selectedDivisions.map((division, idx) =>
                  recipientsByDivision[division]?.map((recipient, index) => (
                    <label key={`${division}-${index}`} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={selectedRecipients.includes(recipient)}
                        onChange={() => handleRecipientChange(recipient)}
                      />
                      <span className="text-slate-800">{recipient}</span>
                    </label>
                  ))
                )}
              </div>
            </div>
          )}

          {/* 依頼事項 */}
          <div>
            <label className="block mb-2 font-semibold text-slate-700">依頼事項</label>
            <textarea
              rows={3}
              value={requestContent}
              onChange={e => setRequestContent(e.target.value)}
              className="w-full border rounded-lg p-2 text-slate-800"
              placeholder="依頼内容を入力してください"
            />
            <p className="text-sm text-slate-600 mt-1">
              ※リスクチェック結果はリンクで添付されますので、内容を詳細に記載する必要はありません。
            </p>

            <div className="flex justify-end mt-4">
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-sky-700 text-white rounded-lg hover:bg-sky-800"
              >
                送信
              </button>
            </div>
          </div>
        </div>

        {/* リンクボタン */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-sky-700 text-white rounded-lg hover:bg-sky-800"
          >
            リスクチェック画面に戻る
          </button>
          <button
            onClick={() => router.push('/')}
            className="px-4 py-2 bg-sky-700 text-white rounded-lg hover:bg-sky-800"
          >
            ホームに戻る
          </button>
        </div>
      </div>
    </div>
  )
}
