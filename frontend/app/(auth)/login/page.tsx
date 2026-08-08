"use client";

import Link from "next/link";
import { useState } from "react";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { AuthDivider } from "@/components/auth/auth-divider";
import { GoogleButton } from "@/components/auth/google-button";
import { PasswordInput } from "@/components/auth/password-input";

import { loginSchema } from "@/lib/validations/auth";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault();

        setError("");

        const result = loginSchema.safeParse({
            email,
            password,
            rememberMe,
        });

        if (!result.success) {
            setError(result.error.issues[0].message);
            return;
        }

        setLoading(true);

        // Backend authentication will be connected later.
        await new Promise((resolve) => setTimeout(resolve, 800));

        setLoading(false);

        console.log("Login:", result.data);
    };

    return (
        <div>
            <div className="mb-8">
                <h2 className="text-3xl font-bold tracking-tight">
                    Welcome back
                </h2>

                <p className="mt-2 text-sm text-muted-foreground">
                    Sign in to continue to your workspace.
                </p>
            </div>

            <GoogleButton />

            <AuthDivider />
            <div className="">
                <form onSubmit={handleSubmit} className="space-y-5">
                    {error && (
                        <div
                            role="alert"
                            className="rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
                        >
                            {error}
                        </div>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>

                        <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            className="h-11"
                            autoComplete="email"
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password">Password</Label>

                            <Link
                                href="/forgot-password"
                                className="text-sm font-medium text-muted-foreground hover:text-foreground"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        <PasswordInput
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            autoComplete="current-password"
                        />
                    </div>

                    <label className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground">
                        <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(event) =>
                                setRememberMe(event.target.checked)
                            }
                            className="size-4 rounded border"
                        />

                        Remember me
                    </label>

                    <Button
                        type="submit"
                        disabled={loading}
                        className="h-11 w-full"
                    >
                        {loading && (
                            <Loader2 className="mr-2 size-4 animate-spin" />
                        )}

                        {loading ? "Signing in..." : "Sign in"}
                    </Button>
                </form>
            </div>

            <p className="mt-8 text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link
                    href="/register"
                    className="font-medium text-foreground hover:underline"
                >
                    Create an account
                </Link>
            </p>
        </div>
    );
}