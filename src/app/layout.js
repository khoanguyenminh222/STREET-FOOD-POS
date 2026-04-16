import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam",
  subsets: ["vietnamese", "latin"],
  weight: ["400", "500", "700", "900"],
});

export const metadata = {
  title: "MCP - Quản Lý Bán Hàng",
  description: "Hệ thống quản lý tinh gọn cho quán ăn và xe đẩy",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="vi"
      className={`${beVietnamPro.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
