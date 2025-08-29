"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { signIn } from "next-auth/react"
import { FaGithub, FaGoogle } from "react-icons/fa"

export default function LoginForm() {
  const [identifier, setIdentifier] = useState("") // username or email
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const res = await signIn("credentials", {
      redirect: false,
      email: identifier,
      password,
    })

    if (res?.error) {
      setError(res.error)
    } else {
      window.location.href = "/" // redirect after successful login
    }

    setLoading(false)
  }

  const handleOAuthSignIn = (provider: "github" | "google") => {
    signIn(provider, { callbackUrl: "/" })
  }

  return (
    <div className="flex flex-col gap-6 max-w-sm w-full border p-6 rounded-lg shadow bg-white dark:bg-gray-800">
      <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
        Login
      </h2>

      {/* Credentials Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          type="text"
          placeholder="Username or Email"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      {/* Separator */}
      <div className="flex items-center gap-2 my-2">
        <span className="flex-grow border-t border-gray-300 dark:border-gray-600"></span>
        <span className="text-sm text-gray-500 dark:text-gray-400">or continue with</span>
        <span className="flex-grow border-t border-gray-300 dark:border-gray-600"></span>
      </div>

      {/* OAuth Buttons side by side */}
      <div className="flex gap-4">
        <Button
          variant="outline"
          className="flex-1 flex items-center justify-center gap-2"
          onClick={() => handleOAuthSignIn("github")}
        >
          <FaGithub size={18} /> GitHub
        </Button>
        <Button
          variant="outline"
          className="flex-1 flex items-center justify-center gap-2"
          onClick={() => handleOAuthSignIn("google")}
        >
          <FaGoogle size={18} /> Google
        </Button>
      </div>
    </div>
  )
}
