import { ApolloProvider } from "@parknest/network/src/config/apollo";
import { Container } from "@parknest/ui/app/components/atoms/Container";
import { SessionProvider } from "@parknest/ui/app/components/molecules/SessionProvider";
import { ToastContainer } from "@parknest/ui/app/components/molecules/Toast";
import { Header } from "@parknest/ui/app/components/organisms/Header";
import "@parknest/ui/app/globals.css";
import { MenuItem } from "@parknest/util/types";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Parknest | Valet",
  description: "Generated by create next app",
};

const MENUITEMS: MenuItem[] = [{ label: "My Trips", href: "/my-trips" }];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-25`}>
        <SessionProvider>
          <ApolloProvider>
            <Header menuItems={MENUITEMS} />
            <Container>{children}</Container>
          </ApolloProvider>
        </SessionProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
