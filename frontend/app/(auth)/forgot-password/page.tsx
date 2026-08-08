"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Loader2, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { forgotPasswordSchema } from "@/lib/validations/auth";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setError("");
    setSuccess(false);

    const result = forgotPasswordSchema.safeParse({
      email,
    });

    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    setLoading(true);

    // Password reset API will be connected later.
    await new Promise((resolve) => setTimeout(resolve, 800));

    setLoading(false);
    setSuccess(true);
  };

  return (
    <div>
      <Link
        href="/login"
        className="mb-8 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="mr-2 size-4" />
        Back to sign in
      </Link>

      <div className="mb-8">
        <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-muted">
          <Mail className="size-5" />
        </div>

        <h2 className="text-3xl font-bold tracking-tight">
          Forgot your password?
        </h2>

        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Enter your email and we'll send you instructions to
          reset your password.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        )}

        {success && (
          <div className="rounded-md border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm">
            If an account exists for this email, reset
            instructions have been sent.
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="forgot-email">Email</Label>

          <Input
            id="forgot-email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="h-11"
            autoComplete="email"
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="h-11 w-full"
        >
          {loading && (
            <Loader2 className="mr-2 size-4 animate-spin" />
          )}

          {loading ? "Sending..." : "Send reset instructions"}
        </Button>
      </form>
    </div>
  );
}