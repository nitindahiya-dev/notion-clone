import type { ReactNode } from "react";
import { AuthBrand } from "@/components/auth/auth-brand";

export default function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className="min-h-screen bg-background">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Brand Panel */}
        <section className="relative hidden overflow-hidden bg-muted/40 lg:flex">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,hsl(var(--foreground)/0.08),transparent_40%)]" />

          <div className="relative flex w-full flex-col justify-between p-10">
            <AuthBrand />

            <div className="max-w-lg">
              <h1 className="text-5xl font-bold tracking-tight">
                Your workspace.
                <br />
                Your ideas.
                <br />
                <span className="text-muted-foreground">
                  One place.
                </span>
              </h1>

              <p className="mt-6 max-w-md text-lg leading-8 text-muted-foreground">
                Capture ideas, organize projects, collaborate with
                your team, and turn thoughts into reality.
              </p>
            </div>

            <p className="text-sm text-muted-foreground">
              Built with Next.js, TypeScript & PostgreSQL.
            </p>
          </div>
        </section>

        {/* Form Panel */}
        <section className="flex min-h-screen items-center justify-center p-6">
          <div className="w-full max-w-md">
            <div className="mb-8 lg:hidden">
              <AuthBrand />
            </div>

            {children}
          </div>
        </section>
      </div>
    </main>
  );
}