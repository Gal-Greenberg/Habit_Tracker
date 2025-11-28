import "./globals.css";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { GoalsProvider } from "context/GoalsContext";
import Habits from "habits/page";
import { HabitsProvider } from "./context/HabitsContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col min-h-screen">
          <Header />
          <div className="grid grid-cols-[15%_83%] p-6 gap-4">
            <Sidebar />
              <div className="bg-bgDashboard min-h-full p-6 rounded-lg">
                <GoalsProvider>
                  <HabitsProvider>
                    {children}
                  </HabitsProvider>
                </GoalsProvider>
              </div>
          </div>
        </div>
      </body>
    </html>
  );
}
