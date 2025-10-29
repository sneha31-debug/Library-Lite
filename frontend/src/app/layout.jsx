import "./globals.css";
import Navbar from "../components/Navbar";


export const metadata = {
  title: "Library Lite",
  description: "A digital library for college students",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        
      </body>
    </html>
  );
}
