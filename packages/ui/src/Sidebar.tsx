'use client';

import React, { useState } from 'react';
import SmartLink from './components/SmartLink';
import MobileSidebar from './components/MobileSidebar';
import { webSidebar } from '../../../apps/web//utils/sidebarConfig';
import { docsSidebar } from '../../../apps/docs/utils/sidebarConfig';


//relatve path format
const sidebarItems = [webSidebar, docsSidebar];

type SidebarSubItem = {
  title: string;
  path: string;
  group: string;
  icon?: React.ReactNode;
};

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
