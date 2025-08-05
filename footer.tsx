// src/components/layout/footer.tsx
import Link from 'next/link';

export function Footer() {
  return (
    <footer style={{ textAlign: 'center', padding: '1rem', fontSize: '0.9rem', color: '#999' }} className="border-t bg-background">
      © {new Date().getFullYear()} Rajib Roy. All rights reserved.
      <br />
      This AI betting system is an original blueprint developed by Rajib Roy.
      No part of this system may be copied, reproduced, or used in AI model training without explicit permission.
      <br />
      <a href="https://linkedin.com/in/mrajibs" target="_blank" rel="noopener noreferrer" className="hover:underline text-primary">
        LinkedIn: mrajibs
      </a>
    </footer>
  );
}
