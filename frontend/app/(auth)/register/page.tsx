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

import { registerSchema } from "@/lib/validations/auth";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setError("");

    const result = registerSchema.safeParse({
      name,
      email,
      password,
      confirmPassword,
      acceptTerms,
    });

    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    setLoading(true);

    // Backend registration will be connected later.
    await new Promise((resolve) => setTimeout(resolve, 800));

    setLoading(false);

    console.log("Register:", result.data);
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight">
          Create your account
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Start building your workspace today.
        </p>
      </div>

      <GoogleButton />

      <AuthDivider />

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
          <Label htmlFor="name">Full name</Label>

          <Input
            id="name"
            placeholder="Nitin Dahiya"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="h-11"
            autoComplete="name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="register-email">Email</Label>

          <Input
            id="register-email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="h-11"
            autoComplete="email"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="register-password">
            Password
          </Label>

          <PasswordInput
            id="register-password"
            placeholder="Create a strong password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            autoComplete="new-password"
          />

          <p className="text-xs text-muted-foreground">
            At least 8 characters with uppercase, lowercase and a
            number.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirm-password">
            Confirm password
          </Label>

          <PasswordInput
            id="confirm-password"
            placeholder="Repeat your password"
            value={confirmPassword}
            onChange={(event) =>
              setConfirmPassword(event.target.value)
            }
            autoComplete="new-password"
          />
        </div>

        <label className="flex cursor-pointer items-start gap-3 text-sm text-muted-foreground">
          <input
            type="checkbox"
            checked={acceptTerms}
            onChange={(event) =>
              setAcceptTerms(event.target.checked)
            }
            className="mt-0.5 size-4 rounded border"
          />

          <span>
            I agree to the{" "}
            <Link
              href="#"
              className="font-medium text-foreground hover:underline"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="#"
              className="font-medium text-foreground hover:underline"
            >
              Privacy Policy
            </Link>
            .
          </span>
        </label>

        <Button
          type="submit"
          disabled={loading}
          className="h-11 w-full"
        >
          {loading && (
            <Loader2 className="mr-2 size-4 animate-spin" />
          )}

          {loading ? "Creating account..." : "Create account"}
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-foreground hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}