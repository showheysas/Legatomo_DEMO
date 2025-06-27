'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Menu, X } from 'lucide-react'

export default function Navbar({ isLoggedIn, setIsLoggedIn, username }: {
  isLoggedIn: boolean,
  setIsLoggedIn: (v: boolean) => void,
  username: string
}) {
  const router = useRouter()
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <>
      {/* ナビバー */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-white border-b w-full h-20 overflow-x-hidden">
        <div className="flex items-start space-x-4">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 whitespace-nowrap">【リガトモ】</h1>
          <div className="hidden sm:block">
            <p className="text-sm sm:text-base font-semibold text-gray-700">- リーガルはトモダチ。 -</p>
            <p className="text-xs sm:text-sm text-gray-600">
              リガトモは、マーケティング施策や商品開発時に必要なリーガル（法令遵守）リスクをチェックするシステムです。
            </p>
          </div>
        </div>

        {/* PC表示メニュー */}
        <div className="hidden md:flex items-center space-x-4 min-w-0">
          {isLoggedIn ? (
            <>
              <span className="text-gray-700 break-words text-sm sm:text-base">ようこそ、{username}さん</span>
              <button
                onClick={() => alert('設定画面を開きます')}
                className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                設定
              </button>
              <button
                onClick={() => setIsLoggedIn(false)}
                className="px-3 py-1 bg-white text-gray-700 rounded hover:bg-gray-200 border border-gray-800"
              >
                ログアウト
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsLoggedIn(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              ログイン
            </button>
          )}
        </div>

        {/* モバイル表示メニュー */}
        <div className="md:hidden">
          <button onClick={() => setDrawerOpen(true)}>
            <Menu className="w-6 h-6 text-gray-800" />
          </button>
        </div>
      </nav>

      {/* ドロワーメニュー */}
      {drawerOpen && (
        <>
          {/* 背景オーバーレイ */}
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setDrawerOpen(false)}
          />

          {/* スライドメニュー */}
          <div className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-50 p-6 space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-800">メニュー</h2>
              <button onClick={() => setDrawerOpen(false)}>
                <X className="w-6 h-6 text-gray-800" />
              </button>
            </div>

            {isLoggedIn ? (
              <>
                <p className="text-gray-700">ようこそ、{username}さん</p>
                <button
                  onClick={() => alert('設定画面を開きます')}
                  className="w-full text-left px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                >
                  設定
                </button>
                <button
                  onClick={() => { setIsLoggedIn(false); setDrawerOpen(false) }}
                  className="w-full text-left px-4 py-2 bg-white text-gray-700 rounded hover:bg-gray-200 border border-gray-800"
                >
                  ログアウト
                </button>
              </>
            ) : (
              <button
                onClick={() => { setIsLoggedIn(true); setDrawerOpen(false) }}
                className="w-full text-left px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                ログイン
              </button>
            )}
          </div>
        </>
      )}
    </>
  )
}