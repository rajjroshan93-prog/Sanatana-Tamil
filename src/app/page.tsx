import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sanatana Tamil",
  description: "Gerbang Digital Kebudayaan & Spiritualitas Tamil Kuno",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
