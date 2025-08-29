// app/auth/signup/page.tsx
"use client"

import SignupForm from "@/components/SignupForm"
import Image from "next/image"

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center dark:bg-gray-900 p-4 sm:p-10">
      <div className="max-w-md w-full flex flex-col items-center gap-8">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image src="/next.svg" alt="SideWay logo" width={40} height={40} />
          <span className="font-bold text-2xl text-gray-900 dark:text-white">SideWay</span>
        </div>

        {/* Card Form */}
        <SignupForm />

        {/* Footer / disclaimer */}
        <p className="text-sm text-center text-gray-500 dark:text-gray-400">
          By signing up, you agree to our{" "}
          <a href="#" className="underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="underline">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  )
}
