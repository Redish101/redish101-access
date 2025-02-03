import { LoginForm } from "@/components/login-form"

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const target = (await searchParams).target as string
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm target={target} />
      </div>
    </div>
  )
}
