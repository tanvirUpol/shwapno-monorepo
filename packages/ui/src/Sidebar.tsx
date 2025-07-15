'use client';

import React, { useState } from 'react';
import SmartLink from './components/SmartLink';
import MobileSidebar from './components/MobileSidebar';

function WebIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  );
}

function DocsIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5h6m2 14H7a2 2 0 01-2-2V7a2 2 0 012-2h2l2-2h2l2 2h2a2 2 0 012 2v10a2 2 0 01-2 2z" />
    </svg>
  );
}

type SidebarSubItem = {
  title: string;
  path: string;
  group: string;
  icon?: React.ReactNode;
};


const sidebarItems = [{
  title: 'Web',
  icon: <WebIcon />,
  items: [
    { title: 'Blog', group: 'Main', path: 'http://localhost:3001/blog' },
    { title: 'Add Blog', group: 'Main', path: 'http://localhost:3001/addBlog' },
    { title: 'Contact', group: 'Communication', path: 'http://localhost:3001/contact' },
  ],
},
{
  title: 'Docs',
  icon: <DocsIcon />,
  items: [
    { title: 'Getting Started', group: 'Document', path: 'http://localhost:3002/docs' },
    { title: 'Learn More', group: 'Document', path: 'http://localhost:3002/files' },
  ],
}
];

export function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <>
      {/* Mobile Sidebar */}
      <MobileSidebar isOpen={isOpen} onClose={onClose} items={sidebarItems} />

      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 h-full bg-white border-r border-gray-200">
        {sidebarItems.map((item, index) => (
          <div
            key={item.title}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="relative group"
          >
            <div className="flex items-center gap-2 p-4 hover:bg-gray-100 cursor-pointer">
              {item.icon}
              <span className="text-sm font-medium">{item.title}</span>
            </div>

            {/* Hover Submenu */}
            {hoveredIndex === index && (
              <div className="absolute top-0 left-full z-10 w-64 bg-white border border-gray-200 shadow-lg p-4">
                {groupedItems(item.items || []).map(([group, links]) => (
                  <div key={group} className="mb-4">
                    <div className="text-xs font-semibold text-gray-500 uppercase mb-2">{group}</div>
                    {links.map((link) => (
                      <SmartLink key={link.title} href={link.path}>
                        {link.title}
                      </SmartLink>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

function groupedItems(items: SidebarSubItem[]) {
  const map = new Map<string, SidebarSubItem[]>();
  for (const item of items) {
    if (!map.has(item.group)) map.set(item.group, []);
    map.get(item.group)!.push(item);
  }
  return Array.from(map.entries());
}
