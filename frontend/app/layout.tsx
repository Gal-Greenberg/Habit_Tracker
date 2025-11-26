import "./globals.css";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

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
            <div className="p-6 flex-1">
              <div className="bg-bgDashboard min-h-full p-6 rounded-lg">
                {children}
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
