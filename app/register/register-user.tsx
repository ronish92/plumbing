

"use client"

import { UserRole } from '@/models/auth/userResponse';
import { Input } from "@/components/ui/input"
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { loginModel, registerUserModel } from '@/models/auth/login';
import { toast } from "sonner"
import { PostLogin, VerifyEmail } from '@/actions/auth/auth';
import { useState, useEffect } from "react"
import { Eye, EyeOff, ShieldCheck } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button";

interface RegisterUserProps {
  onBack?: () => void;
}

export default function RegisterUserPage({ onBack}: RegisterUserProps) {
    const [isEmployee, setIsEmployee] = useState(true)
    const [showPassword, setShowPassword] = useState(false)
    const [isRegistrationSuccess, setIsRegistrationSuccess] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>()

    const router = useRouter();

    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<registerUserModel>();




    const onSubmit = async (data: registerUserModel) => {
    
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
                            alt="key"
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
                            User Registration
                        </h1>

                    
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
                                        placeholder="Enter your Username"
                                        className="h-12.5 bg-background border border-border rounded-xl focus-visible:ring-1 text-[15px]"
                                        {...register("username", {
                                            required: "UserName is required",
                                        })} />
                                    {errors.username && (
                                        <p className="text-xs text-red-500">
                                            {errors.username.message}
                                        </p>
                                    )}

                                </div>
                            </div>
                        </div>

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
                                        id="phoneNo"
                                        type="text"
                                        placeholder="Enter your Phone Number"
                                        className="h-12.5 bg-background border border-border rounded-xl focus-visible:ring-1 text-[15px]"
                                        {...register("phone", {
                                            required: "Phone Number is required",
                                        })} />
                                    {errors.username && (
                                        <p className="text-xs text-red-500">
                                            {errors.phone?.message}
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
                                className="text-xs font-medium cursor-pointer text-orange-600 transition-colors hover:text-orange-700 hover:underline"
                            >
                                {"Already have an account?"}
                            </button>
                        </div>

                        {!isRegistrationSuccess &&
                            <Button
                                disabled={isSubmitting}
                                className="w-full h-12.5 bg-orange-400 text-white-foreground hover:bg-lime font-normal rounded-xl text-[15px]">

                                {isSubmitting ? "Submiting..." : "Register"}
                            </Button>}
                        {isRegistrationSuccess && <h2>Redirecting to Homepage</h2>}
                        {errorMessage && <p className="text-red-500">{errorMessage}</p>}


                    </form>
                </div>
            </div>
        </div>
    )
}

