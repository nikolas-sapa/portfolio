import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { TabNav } from "@/components/tab-nav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nikolas Sapalidis",
  description: "Building things. Writing notes. Sharing resources.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#E5E5EA]">
        <div className="min-h-screen flex items-start justify-center p-6 md:p-12">
          <div
            className="w-full max-w-5xl rounded-xl overflow-hidden flex flex-col border border-black/[0.12]"
            style={{
              minHeight: "calc(100vh - 6rem)",
              boxShadow:
                "0 20px 60px rgba(0,0,0,0.25), 0 1px 0 rgba(255,255,255,0.4) inset",
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", sans-serif',
            }}
          >
            {/* Title bar */}
            <div className="flex items-center px-4 py-2.5 bg-[#EBEBEB] border-b border-[#CFCFCF] flex-none">
              <div className="flex gap-1.5 flex-none">
                <div className="w-[13px] h-[13px] rounded-full bg-[#FF5F57] border border-[#E0443E]" />
                <div className="w-[13px] h-[13px] rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
                <div className="w-[13px] h-[13px] rounded-full bg-[#28C840] border border-[#1FAD2F]" />
              </div>
              <span className="flex-1 text-center text-[12px] font-semibold text-[#3d3d3d] select-none">
                nikolas.sapa
              </span>
              <div className="w-[49px] flex-none" />
            </div>

            {/* Tab toolbar */}
            <TabNav />

            {/* Content — sections render as flex children here */}
            <div className="flex flex-1 overflow-hidden">{children}</div>

            {/* Status bar */}
            <div className="px-4 py-1 bg-[#EBEBEB] border-t border-[#CFCFCF] flex-none">
              <span className="text-[11px] text-[#86868b]">&nbsp;</span>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
