'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Inter, M_PLUS_1p } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], weight: ['400', '700'] })
const mplus = M_PLUS_1p({ subsets: ['latin'], weight: ['400', '700'] })

export default function Navbar({
  isLoggedIn,
  setIsLoggedIn,
  username,
}: {
  isLoggedIn: boolean
  setIsLoggedIn: (v: boolean) => void
  username: string
}) {
  const [drawerOpen, setDrawerOpen] = useState(false)

  const handleLogin = () => {
    setIsLoggedIn(true)
    if (typeof window !== 'undefined') {
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('username', '佐々木')
    }
    setDrawerOpen(false)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    if (typeof window !== 'undefined') {
      localStorage.removeItem('isLoggedIn')
      localStorage.removeItem('username')
    }
    setDrawerOpen(false)
  }

  return (
    <div className={`${inter.className} ${mplus.className}`}>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-gradient-to-b from-sky-50 to-blue-300 border-b w-full h-20 overflow-x-hidden shadow-md">
        <div className="flex items-start space-x-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 whitespace-nowrap">【リガトモ】</h1>
          <div className="hidden sm:block">
            <p className="text-sm sm:text-base font-semibold text-slate-700">- リーガルはトモダチ。 -</p>
            <p className="text-xs sm:text-sm text-slate-600">
              リガトモは、マーケティング施策や商品開発時に必要なリーガル（法令遵守）リスクをチェックするシステムです。
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center space-x-4 min-w-0">
          {isLoggedIn ? (
            <>
              <span className="text-slate-700 break-words text-sm sm:text-base leading-tight max-h-[4.5em] overflow-hidden text-ellipsis line-clamp-3">
                ようこそ、{username}さん
              </span>
              <button
                onClick={() => alert('設定画面を開きます')}
                className="px-2 py-1 bg-slate-700 text-white rounded-lg hover:bg-slate-800 text-sm leading-tight whitespace-nowrap"
              >
                設定
              </button>
              <button
                onClick={handleLogout}
                className="px-2 py-1 bg-white text-slate-700 rounded-lg hover:bg-slate-100 border border-slate-700 text-sm leading-tight whitespace-nowrap"
              >
                ログアウト
              </button>
            </>
          ) : (
            <button
              onClick={handleLogin}
              className="px-3 py-1 bg-sky-700 hover:bg-sky-800 text-white rounded-lg text-sm leading-tight whitespace-nowrap"
            >
              ログイン
            </button>
          )}
        </div>

        <div className="sm:hidden">
          <button onClick={() => setDrawerOpen(true)}>
            <Menu className="w-6 h-6 text-slate-800" />
          </button>
        </div>
      </nav>

      {drawerOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setDrawerOpen(false)} />
          <div className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-50 p-6 space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-slate-800">メニュー</h2>
              <button onClick={() => setDrawerOpen(false)}>
                <X className="w-6 h-6 text-slate-800" />
              </button>
            </div>

            {isLoggedIn ? (
              <>
                <p className="text-slate-700">ようこそ、{username}さん</p>
                <button
                  onClick={() => alert('設定画面を開きます')}
                  className="w-full text-left px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800 text-sm"
                >
                  設定
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 bg-white text-slate-700 rounded-lg hover:bg-slate-100 border border-slate-700 text-sm"
                >
                  ログアウト
                </button>
              </>
            ) : (
              <button
                onClick={handleLogin}
                className="w-full text-left px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 text-sm"
              >
                ログイン
              </button>
            )}
          </div>
        </>
      )}
    </div>
  )
}
