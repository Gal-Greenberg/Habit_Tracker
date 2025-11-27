import "./globals.css";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { GoalsProvider } from "context/GoalsContext";

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
          <div className="flex-1 flex">
            <Sidebar />
            <div className="pr-6 pb-6 flex-1">
              <div className="bg-bgDashboard min-h-full p-6 rounded-lg">
                <GoalsProvider>
                  {children}
                </GoalsProvider>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
