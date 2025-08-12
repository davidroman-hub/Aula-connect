function HeaderAdminDashboard({ setSidebarOpen }: any) {
  return (
    <header className="header bg-white shadow-sm flex items-center px-4 md:px-6">
      <button
        className="md:hidden mr-4 text-gray-600"
        onClick={() => setSidebarOpen(true)}
      >
        <i className="fas fa-bars text-xl"></i>
      </button>

      <div className="flex-1">
        <h1 className="text-xl font-bold text-gray-800">
          Panel de Administración
        </h1>
      </div>

      <div className="flex items-center">
        <div className="relative mr-4">
          <input
            type="text"
            placeholder="Buscar..."
            className="bg-gray-100 rounded-lg py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <i className="fas fa-search absolute left-3 top-2.5 text-gray-400">
          </i>
        </div>

        <div className="relative mr-4">
          <button className="relative">
            <i className="fas fa-bell text-xl text-gray-600"></i>
            <span className="absolute -top-1 -right-1 bg-warning text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              3
            </span>
          </button>
        </div>

        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center mr-3">
            <i className="fas fa-user text-white"></i>
          </div>
          <div>
            <p className="font-medium text-sm">Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default HeaderAdminDashboard;
