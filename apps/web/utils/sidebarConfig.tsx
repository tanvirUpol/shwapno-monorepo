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

function WebIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  );
}



export  const webSidebar: SidebarItem = 
  {
    title: 'Web',
    icon: <WebIcon />,
    items: [
      { title: 'Blog', group: 'Main', path: 'http://localhost:3001/blog' },
      { title: 'Add Blog', group: 'Main', path: 'http://localhost:3001/addBlog' },
      { title: 'Contact', group: 'Communication', path: 'http://localhost:3001/contact' },
    ],
  }

