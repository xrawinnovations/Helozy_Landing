import '@fontsource-variable/caveat';
import '@fontsource-variable/inter';
import '@fontsource-variable/plus-jakarta-sans';
import './site.css';
import './sections.css';
import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { SmoothScroll } from '@/components/SmoothScroll';

export const metadata: Metadata = {
  title: 'HeloZy: the online classroom for tutors | Live classes, whiteboard, recordings',
  description:
    'Run your whole class from one link: live classes, a whiteboard you can write your tute on, private recordings, files and automatic reminders.',
  icons: { icon: '/favicon.svg' },
};

export const viewport: Viewport = {
  themeColor: '#0c0c0f',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
