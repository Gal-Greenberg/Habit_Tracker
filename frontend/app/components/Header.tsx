'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Header = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const router = useRouter();
  
  useEffect(() => {
    const storedUserName = sessionStorage.getItem("userName");
    setUserName(storedUserName);
    // console.log(sessionStorage.getItem("token"));
  });

  const handleSignOut = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userName");
    setUserName(null);
    router.push('/');
    router.refresh();
  };
  
  return (
    <header className="inline-flex justify-between px-12 py-8">
      <div className="inline-flex items-center space-x-4  bg-transparent">
        <div className="w-10 h-10 rounded-xl app-gradient flex items-center justify-center">
          <svg viewBox="0 0 24 24"
            className="w-6 h-6 text-gray-900"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline className="text-textMain" points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h1 className="text-2xl font-semibold gradient-text content-center">Habit Tracker</h1>
      </div>
      {userName == null ? <div>
        <button className="bg-bgButton text-textMain ml-4 px-4 py-2 rounded hover:bg-bgButtonDark"
          onClick={() => router.push('/signIn')}>
          Sign in
        </button>

        <button className="bg-bgButton text-textMain ml-4 px-4 py-2 rounded hover:bg-bgButtonDark"
          onClick={() => router.push('/signUp')}>
          Sign up
        </button>
      </div> : <div className="inline-flex items-center">
        <p className="text-textMain">Welcome, {userName}</p>
        <button className="bg-bgButton text-textMain ml-4 px-4 py-2 rounded hover:bg-bgButtonDark"
          onClick={handleSignOut}>
          Sign out
        </button>
      </div>}
    </header>
  );
}

export default Header;