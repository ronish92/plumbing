"use client"

import { UserRole } from '@/models/auth/userResponse';
import { Input } from "@/components/ui/input"
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { loginModel } from '@/models/auth/login';
import { toast } from "sonner"
import { PostLogin, VerifyEmail } from '@/actions/auth/auth';
import { useState, useEffect } from "react"
import { Eye, EyeOff, ShieldCheck } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button";

export const getRedirectByRoles = (roles?: string[]) => {
    if (!roles || roles.length === 0) return "/login";


    if (roles.includes(UserRole.Worker)) {
        return "/worker/dashboard";
    }

    if (roles.includes(UserRole.Admin)) {
        return "/admin/dashboard";
    }
    return "/login";
}

export default function LoginPage() {
    const [isEmployee, setIsEmployee] = useState(true)
    const [showPassword, setShowPassword] = useState(false)
    const [isLoginSuccess, setIsLoginSuccess] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>()

    const router = useRouter();

    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<loginModel>();


    useEffect(() => {
        if (!isEmployee) {
            setValue("employeecode", "");
        }
    }, [isEmployee, setValue]);

    const onSubmit = async (data: loginModel) => {
        setErrorMessage(undefined);

        try {
            const response = await PostLogin(data);

            if (response?.status && response.data) {
                setIsLoginSuccess(true);

                toast.success("Login Successful");

                const redirectPath = getRedirectByRoles(
                    response.data.roles
                );

                router.push(redirectPath);
                router.refresh();

                return;
            }

            if (response?.data === "Renewal") {
                setErrorMessage(response.message);
                toast.error(response.message);
                return;
            }

            if (response?.data === "IsNotAllowed") {
                const responseOfEmail = await VerifyEmail(
                    data.username,
                    window.location.origin
                );

                if (responseOfEmail?.status) {
                    setErrorMessage(responseOfEmail.message);
                    toast.info(responseOfEmail.message);
                } else {
                    toast.error(
                        responseOfEmail?.message ||
                        "Failed to verify email"
                    );
                }

                return;
            }

            toast.error(
                response?.message || "An error occurred during login"
            );

        } catch (error) {
            console.error("Login failed:", error);
            toast.error("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-amber-100 flex items-center justify-center p-4">
            <div
                className={`w-full max-w-4xl bg-white rounded-3xl overflow-hidden flex flex-col lg:flex-row shadow-2xl shadow-black/50 transition-all duration-700 ease-out
                    }`}
            >
                {/* Left Panel */}
                <div className="lg:w-[45%] bg-white p-5 flex flex-col">
                    {/* Header */}
                    <div
                        className={`flex items-center justify-between mb-4 transition-all duration-500 delay-200 
                            }`}
                    >
                       
                        <Link
                            href="/"
                            className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:border-orange-200 hover:bg-orange-400 hover:text-white"
                        >
                            Back to website
                        </Link>

                    </div>

                    {/* Image Container */}
                    <div
                        className={`flex-1 relative rounded-2xl overflow-hidden min-h-65 transition-all duration-700 delay-300 
                            }`}
                    >
                        <Image
                            src="https://hungarytoday.hu/wp-content/uploads/2025/10/pexels-jakubzerdzicki-31015267-2048x1366.jpg"
                            alt="Desert landscape with purple sky"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f16] via-[#0f0f16]/20 to-transparent" />

                        {/* Text Overlay */}
                        <div
                            className={`absolute bottom-6 left-0 right-0 text-center px-4 transition-all duration-500 delay-500
                                }`}
                        >
                            <h2 className="text-white text-xl font-semibold leading-tight tracking-tight">
                                Reliable Service,
                                <br />
                                Done Right
                            </h2>
                        </div>
                    </div>


                </div>

                {/* Right Panel - Form */}
                <div className="lg:w-[55%] p-6 lg:p-8 flex flex-col justify-center">
                    <div>
                        {/* Main Heading */}
                        <h1
                            className={`text-slate-900 dark:text-white text-3xl md:text-4xl font-extrabold tracking-tight mb-2 transition-all duration-700 ease-out delay-100 
                                }`}
                        >
                            Welcome Back
                        </h1>

                        <div className="flex items-center gap-2 mb-3">
                            <span>Sign in as</span>

                            <div className="flex rounded-lg bg-gray-100 p-1">
                                <button
                                    type="button"
                                    onClick={() => setIsEmployee(true)}
                                    disabled={isSubmitting}
                                    className={`rounded-md px-4 py-2 text-sm font-medium transition-all ${isEmployee
                                        ? "bg-white text-orange-600 shadow-sm"
                                        : "text-gray-500 hover:text-gray-700"
                                        }`}
                                >
                                    Employee
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setIsEmployee(false)}
                                    disabled={isSubmitting}
                                    className={`rounded-md px-4 py-2 text-sm font-medium transition-all ${!isEmployee
                                        ? "bg-white text-orange-600 shadow-sm"
                                        : "text-gray-500 hover:text-gray-700"
                                        }`}
                                >
                                    Client
                                </button>
                            </div>
                        </div>
                        {isEmployee && (
                            <div className="flex items-start gap-2 rounded-lg mb-3 bg-white border-orange-200 border-2  px-3 py-2.5">
                                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-black/80" />

                                <p className="text-xs leading-relaxed text-black/80">
                                    Employee access is restricted to authorized staff.
                                </p>
                            </div>
                        )}
                    </div>

                    <form className="space-y-3"
                        onSubmit={handleSubmit(onSubmit)}>

                        <div
                            className={`grid transition-all duration-400 ease-out overflow-hidden ${isEmployee ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                                }`}
                        >
                            <div className="overflow-hidden">
                                <div
                                    className={`transition-all duration-500 delay-[400ms]
                                        }`}
                                >
                                    <Input
                                        id="employeecode"
                                        type="text"
                                        placeholder="Enter employee code"
                                        className="h-12.5 bg-background border border-border rounded-xl focus-visible:ring-1 text-[15px]"
                                        {...register("employeecode", {
                                            required: "Employee code is required",
                                        })} />
                                    {errors.employeecode && (
                                        <p className="text-xs text-red-500">
                                            {errors.employeecode.message}
                                        </p>
                                    )}

                                </div>
                            </div>
                        </div>

                        <div
                            className={`transition-all duration-500 delay-[450ms]
                                }`}
                        >
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                className="h-12.5 bg-background border border-border rounded-xl focus-visible:ring-1 text-[15px]"
                                {...register("username", {
                                    required: "Email is required",
                                })} />
                            {errors.username && (
                                <p className="text-xs text-red-500">
                                    {errors.username.message}
                                </p>
                            )}
                        </div>

                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                className="h-12.5 bg-background border border-border rounded-xl focus-visible:ring-1 text-[15px]"
                                {...register("password", {
                                    required: "Password is required",
                                })}
                            />
                            {errors.password && (
                                <p className="text-xs text-red-500">
                                    {errors.password.message}
                                </p>
                            )}
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-orange-500"
                            >
                                {showPassword ? (
                                    <EyeOff className="w-4 h-4" />
                                ) : (
                                    <Eye className="w-4 h-4" />
                                )}
                            </button>
                        </div>

                        <div className="mt-2 flex justify-end">
                            <button
                                type="button"
                                className="text-xs font-medium text-orange-600 transition-colors hover:text-orange-700 hover:underline"
                            >
                                {isEmployee ? "Need help signing in?" : "Forgot password?"}
                            </button>
                        </div>

                        {!isLoginSuccess &&
                            <Button
                                disabled={isSubmitting}
                                className="w-full h-12.5 bg-orange-400 text-white-foreground hover:bg-lime font-normal rounded-xl text-[15px]">

                                {isSubmitting ? "Submiting..." : "Login"}
                            </Button>}
                        {isLoginSuccess && <h2>Redirecting to Dashboad</h2>}
                        {errorMessage && <p className="text-red-500">{errorMessage}</p>}


                    </form>

                    {!isEmployee && (
                        <>
                            <div className="my-6 flex items-center gap-3">
                                <div className="h-px flex-1 bg-gray-200" />
                                <span className="text-xs text-gray-400">
                                    Or sign in with
                                </span>
                                <div className="h-px flex-1 bg-gray-200" />
                            </div>

                            <div
                                className="grid grid-cols-2 gap-3 "
                            >
                                <button className="flex items-center justify-center gap-2 bg-[#1a1a26] border border-white/5 hover:border-white/20 hover:bg-[#1f1f2a] text-white text-sm py-2.5 rounded-xl  group hover:scale-[1.02] active:scale-100">
                                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24">
                                        <path
                                            fill="#4285F4"
                                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        />
                                        <path
                                            fill="#34A853"
                                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        />
                                        <path
                                            fill="#FBBC05"
                                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                        />
                                        <path
                                            fill="#EA4335"
                                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        />
                                    </svg>
                                    <span className="text-white/80 group-hover:text-white transition-colors duration-300">Google</span>
                                </button>
                                <button className="flex items-center justify-center gap-2 bg-[#1a1a26] border border-white/5 hover:border-white/20 hover:bg-[#1f1f2a] text-white text-sm py-2.5 rounded-xl  group hover:scale-[1.02] active:scale-100">
                                    <svg className="w-4 h-4 text-white/80 group-hover:text-white transition-all duration-300 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                                    </svg>
                                    <span className="text-white/80 group-hover:text-white transition-colors duration-300">Apple</span>
                                </button>
                            </div>
                        </>
                    )}

                </div>
            </div>
        </div>
    )
}
