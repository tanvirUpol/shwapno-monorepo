'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type Props = {
  href: string;
  children: React.ReactNode;
};

export default function SmartLink({ href, children }: Props) {
  const [isClient, setIsClient] = useState(false);
  const [currentPort, setCurrentPort] = useState('');

  useEffect(() => {
    setIsClient(true);
    setCurrentPort(window.location.port);
  }, []);

  if (!isClient) {
    // Render nothing until client-side is mounted to avoid hydration mismatch
    return null;
  }

  const targetUrl = new URL(href);
  const isSamePort = currentPort === targetUrl.port;

  if (isSamePort) {
    return (
      <Link href={targetUrl.pathname} className="block text-sm text-gray-700 hover:text-blue-600 py-1">
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      // target="_blank"
      rel="noopener noreferrer"
      className="block text-sm text-gray-700 hover:text-blue-600 py-1"
    >
      {children}
    </a>
  );
}
