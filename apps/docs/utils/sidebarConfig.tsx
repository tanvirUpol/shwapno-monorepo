type SidebarItem = {
  title: string;
  icon?: React.ReactNode;
  items?: SidebarSubItem[];
};

type SidebarSubItem = {
  title: string;
  path: string;
  group: string;
  icon?: React.ReactNode;
};

function DocsIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5h6m2 14H7a2 2 0 01-2-2V7a2 2 0 012-2h2l2-2h2l2 2h2a2 2 0 012 2v10a2 2 0 01-2 2z" />
    </svg>
  );
}

export  const docsSidebar: SidebarItem = 
  {
    title: 'Docs',
    icon: <DocsIcon />,
    items: [
      { title: 'Getting Started', group: 'Document', path: 'http://localhost:3002/docs' },
      { title: 'Learn More', group: 'Document', path: 'http://localhost:3002/files' },
    ],
  }
