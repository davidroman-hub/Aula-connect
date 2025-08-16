import StudentDashboard from "../../islands/student/studentDashboard.tsx";

//   async GET(req, ctx) {
//     // Simplificar: primero intentar obtener token de cookies
//     const cookies = req.headers.get("cookie") || "";
//     console.log("All cookies:", cookies);
//     console.log("DEBUG: Testing version 2 - temp access enabled");

//     const tokenMatch = cookies.match(/jwtToken=([^;]+)/);
//     const token = tokenMatch ? tokenMatch[1] : "";

//     console.log("Token found in cookies:", token ? "YES" : "NO");
//     console.log(
//       "Token value:",
//       token ? token.substring(0, 20) + "..." : "empty",
//     );

//     // Si no hay token en cookies, permitir acceso temporal para testing
//     if (!token) {
//       console.log("No token found, creating temporary access for testing");

//       // Crear un JWT válido para testing usando la función existente
//       try {
//         const tempToken = await createJWT("david", "admin");
//         console.log("Created temp token for testing");

//         // Crear datos temporales para testing
//         const tempData: UserDashboardData = {
//           token: tempToken,
//           user: {
//             username: "david",
//             type: "admin",
//             email: "david@example.com",
//           },
//           courses: [
//             { _id: "course1", name: "Desarrollo Web" },
//             { _id: "course2", name: "JavaScript Avanzado" },
//             { _id: "course3", name: "React & TypeScript" },
//           ],
//         };

//         return ctx.render(tempData);
//       } catch (error) {
//         console.log("Error creating temp token:", error);
//         return new Response("", {
//           status: 302,
//           headers: { Location: "/login" },
//         });
//       }
//     }

//     try {
//       const key = await crypto.subtle.importKey(
//         "raw",
//         new TextEncoder().encode("your-secret-key"),
//         { name: "HMAC", hash: "SHA-256" },
//         false,
//         ["verify"],
//       );

//       const payload = await verify(token, key);

//       if (
//         !payload ||
//         (payload.type !== "student" && payload.type !== "user" &&
//           payload.type !== "admin")
//       ) {
//         return new Response("", {
//           status: 302,
//           headers: { Location: "/login" },
//         });
//       }

//       // Obtener lista de cursos (mock data por ahora)
//       const courses: Course[] = [
//         { _id: "course1", name: "Desarrollo Web" },
//         { _id: "course2", name: "JavaScript Avanzado" },
//         { _id: "course3", name: "React & TypeScript" },
//       ];

//       return ctx.render({
//         token,
//         user: {
//           username: payload.username as string,
//           type: payload.type as string,
//         },
//         courses,
//       });
//     } catch {
//       return new Response("", {
//         status: 302,
//         headers: { Location: "/home" },
//       });
//     }
//   },
// };

const UserDashboard = () => {
  return <StudentDashboard />;
};

export default UserDashboard;
