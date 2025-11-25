'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  

  useEffect(() => {
    const storedUserName = sessionStorage.getItem("userName");
    if (storedUserName) {
      router.push('/habits');
    }
  }, []);
  
  return (
    <div className="flex">
      <div className="p-8 pt-20">
        <h1 className="text-textMain text-4xl">Welcome to Habit Tracker!</h1>
        <p className="text-textSecondary mt-6 text-xl">Habit Tracker app designed to help you build positive routines and achieve your goals</p>
      </div>
      <img src="/welcome.jpeg" className="size-2/5 ml-auto rounded-lg shadow-lg"/>
    </div>
  );
}
