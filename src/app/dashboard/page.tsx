"use client"
import { useSession, signOut } from "next-auth/react"
import { useEffect, useState } from "react"

const DashboardPage = () => {

  const { data: session, status } = useSession()
  const [ theme, setTheme ] = useState(() => {
    if(window.matchMedia('(prefers-color-scheme)').matches){
      return 'dark'
    }
    return 'light'
  })

  useEffect(() => {
    if(theme === 'dark'){
      document.querySelector("html")?.classList.add("dark")
    }
    else{
      document.querySelector("html")?.classList.remove("dark")
    }
  },  [theme])

  return (
    <div className="justify-center h-[calc(100vh-4rem)] flex flex-col items-center gap-y-5 text-white bg-white dark:bg-zinc-700">
      <h1 className="font-bold text-3xl text-black dark:text-white">Profile</h1>
      <pre className="bg-zinc-800 p-4 rounded">
        {JSON.stringify(
          {
            session,
            status,
          },
          null,
          2
        )}
      </pre>
      <button className="bg-zinc-800 px-4 py-2 block mb-2 rounded" onClick={() => {signOut()}}>
        Logout
      </button>
    </div>
  )
}

export default DashboardPage
