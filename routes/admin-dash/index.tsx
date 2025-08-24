import { Handlers, PageProps } from "$fresh/server.ts";
import { Payload } from "https://deno.land/x/djwt@v3.0.2/mod.ts";
import { AdminDashboards } from "../../islands/admin/index.tsx";
import { getCurrentUser } from "../../middleware/auth.ts";

interface AdminDashboardProps {
  isAdmin: boolean;
  userInfo?: Payload;
}

export const handler: Handlers<AdminDashboardProps> = {
  async GET(req, ctx) {
    // Verificar si el usuario está autenticado y es admin
    const user = await getCurrentUser(req);

    if (!user) {
      // Si no hay usuario, redirigir al login
      return new Response("", {
        status: 302,
        headers: { Location: "/login" },
      });
    }

    if (user.type !== "admin") {
      // Si el usuario no es admin, redirigir a la página principal
      return new Response("", {
        status: 302,
        headers: { Location: "/" },
      });
    }

    // Si es admin, renderizar la página
    return ctx.render({
      isAdmin: true,
      userInfo: user,
    });
  },
};

const AdminDashboard = ({ data }: PageProps<AdminDashboardProps>) => {
  if (!data.isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Acceso denegado</h2>
          <p className="text-gray-600">
            No tienes permisos para acceder a esta sección.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: "60px" }}>
      <AdminDashboards />
    </div>
  );
};

export default AdminDashboard;
