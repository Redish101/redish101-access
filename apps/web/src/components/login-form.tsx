"use client"

import { cn } from "@/lib/utils"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "@/hooks/use-toast"
import verifyToken from "@/actions/verify"

const FormSchema = z.object({
  otp: z.string().min(6, {
    message: "OTP必须为六位数字",
  }),
})

async function onSubmit(data: z.infer<typeof FormSchema>) {
  const isValid = await verifyToken(data.otp)

  if (!isValid) {
    toast({
      title: "OTP无效",
      description: "请检查您的OTP并重试",
      variant: "destructive",
    })
  }

  if (isValid) {
    toast({
      title: "登录成功",
      description: "正在重定向到目标页面",
    })
  }
}

export function LoginForm({
  className,
  target,
  ...props
}: {
  className?: string
  target?: string
} & React.ComponentPropsWithoutRef<"div">) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp: "",
    },
  })

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">登录以继续</CardTitle>
          <CardDescription className="text-center">
            请输入 OTP 以登录
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6 items-center">
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="otp"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS} {...field}>
                            <InputOTPGroup>
                              <InputOTPSlot index={0} />
                              <InputOTPSlot index={1} />
                              <InputOTPSlot index={2} />
                              <InputOTPSlot index={3} />
                              <InputOTPSlot index={4} />
                              <InputOTPSlot index={5} />
                            </InputOTPGroup>
                          </InputOTP>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                </div>
                <Button type="submit" className="w-full">
                  登录
                </Button>
              </div>
              <div className="mt-4 text-center text-sm text-muted-foreground">
                Redish101 Access
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
