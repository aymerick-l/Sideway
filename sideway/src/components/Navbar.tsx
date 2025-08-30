"use client"

import { useSession, signOut } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export default function Navbar() {
  const { data: session, status } = useSession()
  const loading = status === "loading"

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border-b px-6 py-3 flex justify-between items-center">
      {/* Logo cliquable */}
      <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
        <Image src="/next.svg" alt="Logo SideWay" width={32} height={32} />
        <span className="font-bold text-lg">SideWay</span>
      </Link>

      {/* Section droite */}
      <div className="flex items-center gap-4">
        {!loading && !session ? (
          <>
            <Button asChild>
              <Link href="/auth/login">Connexion</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/auth/signup">Créer un compte</Link>
            </Button>
          </>
        ) : null}

        {!loading && session && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src={session.user?.image || ""} />
                <AvatarFallback>
                  {session.user?.name?.[0].toUpperCase() ?? "U"}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem disabled>
                {session.user?.name || session.user?.email}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => signOut()}>
                Déconnexion
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </nav>
  )
}
