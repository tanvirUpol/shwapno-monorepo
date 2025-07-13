'use client';

export function TopNavBar({ onToggleSidebar }: { onToggleSidebar: () => void }) {
  return (
    <div className="w-full h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-6 shadow-sm z-50">
      {/* Left: Hamburger & Logo */}
      <div className="flex items-center gap-4">
        <button onClick={onToggleSidebar} className="md:hidden text-gray-700">
            <div className="text-lg font-semibold text-gray-800">Shwapno Portal</div>
        </button>
        <div className="text-lg max-md:hidden font-semibold text-gray-800">Shwapno Portal</div>
      </div>

      {/* Right: Logout */}
      <button
        onClick={() => console.log('Logout')}
        className="text-sm text-red-600 font-medium hover:underline"
      >
        Logout
      </button>
    </div>
  );
}
