import './globals.css';
import type { Metadata } from 'next';
import { Inter,Lato } from 'next/font/google';
import { ThemeProvider } from '@/components/ThemeProvider';



const inter = Lato({
  weight: ['400','700'],  // you must specify weights for Lato
  subsets: ['latin'],
});


export const metadata: Metadata = {
  title: 'Academic Q&A Chatbot',
  description: 'AI-powered academic assistance for students',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
