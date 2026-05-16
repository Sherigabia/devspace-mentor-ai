import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0b]">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#e5e2e3] mb-2">
            Welcome Back
          </h1>
          <p className="text-[#908fa0]">
            Sign in to continue to Devspace Mentor AI
          </p>
        </div>
        <SignIn
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "bg-[#131314] border border-[#262626] shadow-xl",
              headerTitle: "text-[#e5e2e3]",
              headerSubtitle: "text-[#908fa0]",
              socialButtonsBlockButton:
                "bg-[#0a0a0b] border-[#262626] text-[#e5e2e3] hover:bg-[#262626]",
              formButtonPrimary:
                "bg-gradient-to-r from-[#4cd7f6] to-[#6366f1] hover:opacity-90",
              footerActionLink: "text-[#4cd7f6] hover:text-[#6366f1]",
              formFieldInput:
                "bg-[#0a0a0b] border-[#262626] text-[#e5e2e3] focus:border-[#c0c1ff]",
              formFieldLabel: "text-[#908fa0]",
              identityPreviewText: "text-[#e5e2e3]",
              identityPreviewEditButton: "text-[#4cd7f6]",
            },
          }}
        />
      </div>
    </div>
  );
}

// Made with Bob