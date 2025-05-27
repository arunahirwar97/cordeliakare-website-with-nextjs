// pages/404.js
import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 text-center px-4">
      <h1 className="text-6xl font-bold text-purple-700 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Oops! Page not found</h2>
      <p className="text-gray-600 mb-8">
        The page you are looking for might have been removed or temporarily unavailable.
      </p>
      <Link href="/" passHref>
        <button className="px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition">
          Back to Home
        </button>
      </Link>
      <div className="mt-10 animate-bounce">
        <img src="/404.png" alt="Not Found" className="w-72 mx-auto" />
      </div>
    </div>
  );
}
