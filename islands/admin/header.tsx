interface HeaderAdminDashboardProps {
  readonly setSidebarOpen: (open: boolean) => void;
}

function HeaderAdminDashboard({ setSidebarOpen }: HeaderAdminDashboardProps) {
  return (
    <header className="md:hidden header mt-5 pb-2 bg-white shadow-sm flex items-center px-4 md:px-6">
      <button
        type="button"
        className="cursor-pointer md:hidden mr-4 text-gray-600"
        onClick={() => setSidebarOpen(true)}
      >
        <i className="fas fa-bars text-xl"></i>
      </button>
    </header>
  );
}

export default HeaderAdminDashboard;
