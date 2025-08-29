"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { signIn } from "next-auth/react"
import { FaGithub, FaGoogle } from "react-icons/fa"

export default function SignupForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setLoading(true)

    try {
      // create user via API route
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Signup failed")
        setLoading(false)
        return
      }

      setSuccess(true)

      // Auto-login after successful signup
      await signIn("credentials", {
        redirect: true,
        email,
        password,
        callbackUrl: "/",
      })
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message)
      else setError("Unexpected error")
    }

    setLoading(false)
  }

  const handleOAuthSignIn = (provider: "github" | "google") => {
    signIn(provider, { callbackUrl: "/" })
  }

  return (
    <div className="flex flex-col gap-6 max-w-sm w-full border p-6 rounded-lg shadow bg-white dark:bg-gray-800">
      <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
        Create an account
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          type="text"
          placeholder="Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <Button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Sign up"}
        </Button>
      </form>

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      {success && (
        <p className="text-green-600 text-sm text-center">
          Account created 🎉 Logging you in...
        </p>
      )}

      {/* Separator */}
      <div className="flex items-center gap-2 my-2">
        <span className="flex-grow border-t border-gray-300 dark:border-gray-600"></span>
        <span className="text-sm text-gray-500 dark:text-gray-400">or continue with</span>
        <span className="flex-grow border-t border-gray-300 dark:border-gray-600"></span>
      </div>

      {/* OAuth Buttons */}
      <div className="flex gap-4">
        <Button
          variant="outline"
          className="flex-1 flex items-center justify-center gap-2"
          onClick={() => handleOAuthSignIn("github")}
        >
          <FaGithub size={18} />
          GitHub
        </Button>
        <Button
          variant="outline"
          className="flex-1 flex items-center justify-center gap-2"
          onClick={() => handleOAuthSignIn("google")}
        >
          <FaGoogle size={18} />
          Google
        </Button>
      </div>
    </div>
  )
}
