'use client';

import { useState } from 'react';
import SmartLink from './SmartLink';


type SidebarSubItem = {
  title: string;
  path: string;
  group: string;
  icon?: React.ReactNode;
};

type SidebarItem = {
  title: string;
  icon?: React.ReactNode;
  items?: SidebarSubItem[];
};

function groupedItems(items: SidebarSubItem[]) {
  const map = new Map<string, SidebarSubItem[]>();
  for (const item of items) {
    if (!map.has(item.group)) map.set(item.group, []);
    map.get(item.group)!.push(item);
  }
  return Array.from(map.entries());
}

export default function MobileSidebar({
  isOpen,
  onClose,
  items,
}: {
  isOpen: boolean;
  onClose: () => void;
  items: SidebarItem[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/10 z-40 md:hidden" onClick={onClose} />
      )}

      <div
        className={`fixed top-14 left-0 h-[calc(100vh-3.5rem)] w-64 bg-white border-r border-gray-200 z-50 transform transition-transform duration-200 ease-in-out md:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {items.map((item, index) => {
          const isOpenSection = openIndex === index;
          return (
            <div key={item.title} className="border-b border-gray-100">
              {/* Header */}
              <button
                className="flex w-full items-center justify-between p-4 text-gray-800 font-medium hover:bg-gray-100"
                onClick={() => setOpenIndex(isOpenSection ? null : index)}
              >
                <span className="flex items-center gap-2">
                  {item.icon}
                  {item.title}
                </span>
                {isOpenSection ? "A": "X"}
              </button>

              {/* Dropdown body */}
              <div
                className={`transition-all duration-200 ease-in-out overflow-hidden ${
                  isOpenSection ? 'max-h-[500px]' : 'max-h-0'
                } pl-6`}
              >
                {groupedItems(item.items || []).map(([group, links]) => (
                  <div key={group} className="mb-4 pt-2">
                    <div className="text-xs font-semibold text-gray-500 uppercase mb-2">
                      {group}
                    </div>
                    {links.map((link) => (
                      <SmartLink key={link.title} href={link.path}>
                        {link.title}
                      </SmartLink>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
