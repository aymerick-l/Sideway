// app/auth/login/page.tsx
"use client"

import Image from "next/image"
import LoginForm from "@/components/LoginForm"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center dark:bg-gray-900 p-4 sm:p-10">
      <div className="max-w-md w-full flex flex-col items-center gap-8">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image src="/next.svg" alt="Logo SideWay" width={40} height={40} />
          <span className="font-bold text-2xl text-gray-900 dark:text-white">SideWay</span>
        </div>

        {/* Formulaire de connexion */}
        <LoginForm />

        {/* Pied de page / mentions légales */}
        <p className="text-sm text-center text-gray-500 dark:text-gray-400">
          En vous connectant, vous acceptez nos{" "}
          <a href="#" className="underline">
            Conditions d’utilisation
          </a>{" "}
          et notre{" "}
          <a href="#" className="underline">
            Politique de confidentialité
          </a>
          .
        </p>
      </div>
    </div>
  )
}
