'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import { useState } from 'react'

export default function CheckPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const law = searchParams.get('law')
  const category = searchParams.get('category')
  const type = searchParams.get('type')
  const text = searchParams.get('text')
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const username = '佐々木'
  const [showArticles, setShowArticles] = useState<{ [key: string]: boolean }>({})

  const relatedLaws = [
    {
      article: '酒税法 第43条（みなし製造）',
      content: '酒類に水以外の物品（当該酒類と同一の品目の酒類を除く。）を混和した場合において、混和後のものが酒類であるときは、新たに酒類を製造したものとみなす。（後略）'
    },
    {
      article: '酒税法法令解釈通達　第43条 第2項関係　',
      content: '２　酒類に炭酸ガスを加える場合の取扱い　酒類に炭酸ガス（炭酸水を含む。3において同じ。）を加える行為は、新たな製造行為となる。したがって、酒類に炭酸ガスを加える場合は、当該酒類の製造免許を有する場合に限られる。'
    },
    {
      article: '酒税法 第43条（みなし製造）',
      content: '１０　前各項の規定は、消費の直前において酒類と他の物品（酒類を含む。）との混和をする場合で政令で定めるときについては、適用しない。'
    },
    {
      article: '酒税法施行令 第50条（みなし製造の規定の適用除外等）',
      content: '１３　法第四十三条第十項に規定する消費の直前において酒類と他の物品（酒類を含む。）との混和をする場合で政令で定めるときは、酒場、料理店その他酒類を専ら自己の営業場において飲用に供することを業とする者がその営業場において消費者の求めに応じ、又は酒類の消費者が自ら消費するため、当該混和をするときとする。'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} username={username} setUsername={setUsername} />
      <div className="p-8 space-y-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">リスクチェック結果</h1>

        <div className="bg-white shadow p-4 rounded space-y-2 text-gray-700">
          <p><span className="font-semibold">選択法令：</span>{law}</p>
          <p><span className="font-semibold">カテゴリ：</span>{category}</p>
          <p><span className="font-semibold">法令区分：</span>{type}</p>
          <p><span className="font-semibold">あなたの入力内容：</span>{text}</p>
        </div>

        <div className="bg-white shadow p-4 rounded">
          <h2 className="text-lg font-bold text-gray-700 mb-2">リスク度合い</h2>
          <p className="text-red-600 font-bold text-3xl">リスク大</p>
          <p className="text-gray-700 pl-10 mt-2">
            「市販されているお酒（缶ビールまたは缶チューハイ）を市販の炭酸水で割って提供」する行為は、みなし製造に該当するため実施ＮＧです。
            <br />
            <br />
            ●理由
            <br />
            ・上記行為は、酒税法第43条のみなし製造に該当します。
            <br />
            ・みなし製造の規定が適用されない場合（酒税法43条の各項）、あるいは、適用除外となる場合（酒税法施行令第50条）のいずれにも該当しないため。
            <br />
            <br />
            また、飲食店営業許可の区域内であっても、『消費の直前に』、『酒場、料理店その他酒類を専ら自己の営業場において飲用に供することを業とする者』が、『消費者の求めに応じ』、混和をする場合に限られます。
            <br />
            <br />
            ただし、「対象者に酒類を含むサンプルを提供（譲渡）し、飲用の直前で、対象者自らに混和し飲用してもらう」ことは、問題ありません。
          </p>
        </div>

        <div className="bg-white shadow p-4 rounded">
          <div className="flex items-center space-x-4 mb-2">
            <h2 className="text-lg font-bold text-gray-700">関連法令</h2>
            <button
              onClick={() => {
                const allOpen = Object.keys(showArticles).length === relatedLaws.length && Object.values(showArticles).every(v => v)
                const newStates = relatedLaws.reduce((acc, _, idx) => {
                  acc[idx] = !allOpen // 全部閉じてたら開く、全部開いてたら閉じる
                  return acc
                }, {} as { [key: number]: boolean })
                setShowArticles(newStates)
              }}
              className="text-sm text-blue-600 hover:underline border border-gray-800 px-2 py-1 rounded"
            >
              {Object.keys(showArticles).length === relatedLaws.length && Object.values(showArticles).every(v => v)
                ? 'すべて閉じる'
                : '条文をすべて開く'}
            </button>
          </div>
          <ul className="space-y-2 pl-10">
            {relatedLaws.map((law, index) => (
              <li key={index} className="border-b pb-2">
                <p className="font-semibold text-gray-800">{law.article}</p>
                <button
                  onClick={() => setShowArticles(prev => ({ ...prev, [index]: !prev[index] }))}
                  className="text-sm text-blue-600 hover:underline text-navy-800 border border-gray-800"
                >
                  条文表示
                </button>
                {showArticles[index] && <p className="mt-1 text-gray-700">{law.content}</p>}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white shadow p-4 rounded">
          <h2 className="text-lg font-bold text-gray-700 mb-2">次のアクションの提案</h2>
          <p className="text-gray-700 whitespace-pre-line pl-10">
            リスク度合いが大きいことから、施策の見直し、あるいは、中止が望ましいでしょう。
            <br />
            もしくは、法令スペシャリストに相談し、社内で十分に検討、あるいは、税務署に相談のうえ、進めていただくようお願いします。
          </p>
        </div>

        <div className="flex justify-center space-x-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            リスク程度を理解して施策を実施
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            法令スペシャリストに相談
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            施策を見直し
          </button>
        </div>

        <div className="mt-2 flex justify-end">
          <button
            onClick={() => router.push('/')}
            className="mt-4 px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            トップに戻る
          </button>
        </div>
      </div>
    </div>
  )
}
