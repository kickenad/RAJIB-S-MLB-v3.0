import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Footer } from '@/components/layout/footer';
import { cn } from '@/lib/utils';
import { AuthProvider } from '@/hooks/useAuth';

export const metadata: Metadata = {
  title: "Rajib's MLB",
  description: 'AI-Powered MLB Betting Analysis',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn('font-body antialiased min-h-screen flex flex-col')}>
        <AuthProvider>
            <div className="flex-grow">{children}</div>
            <Footer />
            <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
