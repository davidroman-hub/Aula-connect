import { type PageProps } from "$fresh/server.ts";
import Navbar from "../islands/Navbar/index.tsx";
export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Ecommerce Example</title>
        <link rel="stylesheet" href="/styles.css" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"></link>
      </head>
      <body>
        <Navbar />
        <Component />
      </body>
    </html>
  );
}
