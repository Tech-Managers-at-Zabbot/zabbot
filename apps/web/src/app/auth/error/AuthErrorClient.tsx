"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function AuthErrorClient() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case "CredentialsSignin":
        return "Invalid email or password. Please try again.";

      case "OAuthCallback":
        return "Google login failed. Please try again.";

      case "OAuthAccountNotLinked":
        return "This email is already used with another login method.";

      case "AccessDenied":
        return "You don't have permission to access this resource.";

      case "Configuration":
        return "Authentication configuration error. Please contact support.";

      default:
        return "Something went wrong during authentication.";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full border rounded-lg p-6 text-center space-y-4">
        <h1 className="text-2xl font-bold text-red-600">
          Authentication Error
        </h1>

        <p className="text-gray-700">
          {getErrorMessage(error)}
        </p>

        {error && (
          <p className="text-xs text-gray-400">
            Error code: {error}
          </p>
        )}

        <div className="pt-4 space-y-2">
          <Link
            href="/login"
            className="block bg-black text-white py-2 rounded"
          >
            Back to Login
          </Link>

          <Link
            href="/signup"
            className="block border py-2 rounded"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}