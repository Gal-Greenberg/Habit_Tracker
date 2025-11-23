'use client';
import { useEffect, useState } from 'react';
import Link from "next/link";
import { useRouter } from 'next/navigation';

const Header = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const router = useRouter();
  
  useEffect(() => {
    const storedUserName = sessionStorage.getItem("userName");
    setUserName(storedUserName);
    console.log(storedUserName);
  });
  
  const handleSignOut = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userName");
    setUserName(null);
    router.push('/')
  };
  
  return (
    <header className="inline-flex justify-between bg-indigo-100 px-4 lg:px-12 py-6.5 text-slate-800">
      <h1>Habit Tracker</h1>
      {userName == null ? <div>
        <Link href="/signIn" className="ml-4 flex-grow">
          <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
            Sign in
          </button>
        </Link>
        <Link href="/signUp" className="ml-4 flex-grow">
          <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
            Sign up
          </button>
        </Link>
      </div> : <div className="inline-flex items-center">
        <p>Welcome, {userName}</p>
        <Link href="/signIn" className="ml-4 flex-grow">
          <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            onClick={handleSignOut}>
            Sign out
          </button>
        </Link>
      </div>}
    </header>
  );
}

export default Header;