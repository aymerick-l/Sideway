import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="font-sans flex flex-col min-h-screen">
      {/* Hero Section */}
      <header className="flex flex-col items-center justify-center flex-1 text-center px-6">
        <Image
          src="/next.svg"
          alt="SideWay logo"
          width={80}
          height={80}
          className="mb-6 dark:invert"
        />
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          SideWay 🚀
        </h1>
        <p className="mt-4 max-w-xl text-lg text-gray-600 dark:text-gray-300">
          Une plateforme où chacun développe ses compétences en contribuant à
          des projets réels, en partageant son savoir-faire et en aidant les
          autres à avancer.
        </p>
        <div className="mt-6 flex gap-4">
          <Button size="lg" asChild>
            <a href="/auth/signup">Rejoindre SideWay</a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="/auth/login">Se connecter</a>
          </Button>
        </div>
      </header>

      {/* Pourquoi SideWay */}
      <section className="px-6 py-16 bg-gray-50 dark:bg-gray-900">
        <h2 className="text-2xl font-semibold text-center mb-12">
          Pourquoi choisir SideWay ?
        </h2>
        <div className="grid gap-8 sm:grid-cols-3 max-w-5xl mx-auto">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>🌱 Développer vos compétences</CardTitle>
            </CardHeader>
            <CardContent>
              Mettez vos talents au service de projets concrets et progressez en
              aidant les autres à réussir.
            </CardContent>
          </Card>
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>🤝 Collaborer et partager</CardTitle>
            </CardHeader>
            <CardContent>
              Intégrez une communauté où chacun contribue avec ses forces et
              apprend des autres.
            </CardContent>
          </Card>
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>💡 Donner vie aux idées</CardTitle>
            </CardHeader>
            <CardContent>
              Particuliers ou entreprises publient leurs projets, et vous pouvez
              y contribuer pour innover ensemble.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 border-t text-center text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} SideWay — Construisons ensemble l’avenir 🚀
      </footer>
    </div>
  )
}
