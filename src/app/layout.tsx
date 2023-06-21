import getCurrentUser from "./actions/getCurrentUser";
import ClientOnly from "./components/ClientOnly";
import LoginModal from "./components/modals/LoginModal";
import RegisterModal from "./components/modals/RegisterModal";
import Navbar from "./components/navbar/Navbar";
import "./globals.css";
import { Nunito } from "next/font/google";
import { Toaster } from "react-hot-toast";
const font = Nunito({
  subsets: ["latin"],
});

export const metadata = {
  title: "Airbnb Clone",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <Navbar currentUser={currentUser} />
          <LoginModal />
          <RegisterModal />
          <Toaster />
          <div>{children}</div>
          <div id="portal"></div>
        </ClientOnly>
      </body>
    </html>
  );
}
