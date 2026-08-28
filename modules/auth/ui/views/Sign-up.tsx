"use client";
import Link from "next/link"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
    Field,
    FieldDescription,
    FieldError,
    FieldLabel,
} from "@/components/ui/field"
import { authClient } from "@/lib/auth-client";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { OctagonAlertIcon } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";


const SignIn = () => {

    const router = useRouter()
    const [error, setError] = useState<String | null>(null);
    const [pending, setPending] = useState<boolean>(false)

    const formSchema = z.object({
        name: z.string().min(1, "Name is required"),
        email: z.email("Invalid Email"),
        password: z.string().min(1, "Password is required"),
        confirmPassword: z.string().min(1, "Confirm Password is required"),
    }).refine((data) => data.password === data.confirmPassword, {
        message: "Password does not match",
        path: ["confirmPassword"],
    }).refine((data) => data.name.length >= 3, {
        message: "Name must be at least 3 Characters",
        path: ["name"]
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    })


    const onSubmit = (values: z.infer<typeof formSchema>) => {
        setError(null);
        setPending(true)
        authClient.signUp.email({
            name: values.name,
            email: values.email,
            password: values.password
        },
            {
                onSuccess: () => {
                    setPending(false)
                    router.push("/")
                },

                onError: (ctx) => {
                    setPending(false)
                    setError(ctx.error.message)
                }
            })
    }

    const handleSocialAuth = (providers : string)=>{
            setPending(true);
            authClient.signIn.social({
                provider : providers
            },{
                onSuccess : () => {
                    setPending(false)
                },
                onError : () => {
                    setPending(false)
                }
            })
    
        }

    return (
        <div className='flex flex-col gap-6'>
            <Card className='overflow-hidden p-0'>
                <CardContent className='grid md:grid-cols-2 p-0'>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="p-4">
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col items-center text-center">
                                <h1 className="text-3xl font-semibold">Let's get started!</h1>
                                <p>Create your Account.</p>
                            </div>

                            <Field>
                                <FieldLabel>Name</FieldLabel>
                                <Input {...form.register('name')} type="text" name="name" placeholder="John Doe" />
                                <FieldError>
                                    {form.formState.errors.name?.message}
                                </FieldError>
                            </Field>

                            <Field>
                                <FieldLabel>Email</FieldLabel>
                                <Input {...form.register('email')} type="email" name="email" placeholder="john@example.com" />
                                <FieldError>
                                    {form.formState.errors.email?.message}
                                </FieldError>
                            </Field>

                            <Field>
                                <FieldLabel>Password</FieldLabel>
                                <Input {...form.register('password')} type="password" name="password" placeholder="********" />
                                <FieldError>
                                    {form.formState.errors.password?.message}
                                </FieldError>
                            </Field>

                            <Field>
                                <FieldLabel>Confirm password</FieldLabel>
                                <Input {...form.register('confirmPassword')} type="password" name="confirmPassword" placeholder="********" />
                                <FieldError>
                                    {form.formState.errors.confirmPassword?.message}
                                </FieldError>
                            </Field>

                            {!!error && (
                                <Alert className="bg-destructive/10">
                                    <OctagonAlertIcon className="h-4 w-4 text-destructive!" />
                                    <AlertTitle>{error}</AlertTitle>
                                </Alert>
                            )}

                            <Button disabled={pending} type="submit" className="w-full" >Sign Up</Button>

                            <div className="text-center text-sm after:border-border relative after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                                <span className="bg-card text-muted-foreground relative z-10 px-2">Or continue with</span>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <Button disabled={pending} onClick={() => handleSocialAuth("google")} variant="outline" type="button" className="w-full">
                                    <FcGoogle />
                                    Google
                                </Button>
                                <Button disabled={pending} onClick={() => handleSocialAuth("github")} variant="outline" type="button" className="w-full">
                                    <FaGithub />
                                    Github
                                </Button>
                            </div>

                            <div className="text-center text-sm">
                                Already have an account? <Link className="underline underline-offset-4" href="/sign-in">Sign In</Link>
                            </div>

                        </div>
                    </form>

                    <div className='hidden md:flex flex-col relative justify-center items-center bg-radial from-sidebar-accent to-sidebar'>
                        <img src="/logo.svg" alt="Logo" className='h-23 w-23' />
                        <p className='font-bold text-3xl text-white'>Meet AI</p>
                    </div>
                </CardContent>
            </Card>

            <div className="text-muted-foreground text-balance text-xs text-center *:[a]:hover:text-primary *:[a]:underline *:[a]:underline-offset-4 ">
                By clicking continue, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
            </div>


        </div>
    )
}

export default SignIn