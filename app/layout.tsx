import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { TabNav } from "@/components/tab-nav";
import { TitleBarWidgets } from "@/components/widgets";
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
        <div className="min-h-screen flex items-start justify-center p-2 sm:p-6 md:p-12">
          <div
            className="w-full max-w-5xl rounded-xl overflow-hidden flex flex-col border border-black/[0.12] min-h-[calc(100vh-1rem)] sm:min-h-[calc(100vh-3rem)] md:min-h-[calc(100vh-6rem)]"
            style={{
              boxShadow:
                "0 20px 60px rgba(0,0,0,0.25), 0 1px 0 rgba(255,255,255,0.4) inset",
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", sans-serif',
            }}
          >
            {/* Title bar — traffic lights | centered title | widgets */}
            <div className="relative flex items-center px-4 py-2.5 bg-[#EBEBEB] border-b border-[#CFCFCF] flex-none">
              {/* Left: traffic lights */}
              <div className="flex gap-1.5 flex-none z-10">
                <div className="w-[13px] h-[13px] rounded-full bg-[#FF5F57] border border-[#E0443E]" />
                <div className="w-[13px] h-[13px] rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
                <div className="w-[13px] h-[13px] rounded-full bg-[#28C840] border border-[#1FAD2F]" />
              </div>

              {/* Center: title (absolutely positioned so it stays truly centered) */}
              <span className="absolute inset-x-0 text-center text-[12px] font-semibold text-[#3d3d3d] select-none pointer-events-none">
                nikolas.sapa
              </span>

              {/* Right: widgets */}
              <div className="ml-auto z-10">
                <TitleBarWidgets />
              </div>
            </div>

            {/* Tab toolbar */}
            <TabNav />

            {/* Content — flex-col on mobile, flex-row on md+ */}
            <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
              {children}
            </div>

            {/* Status bar */}
            <div className="px-4 py-1 bg-[#EBEBEB] border-t border-[#CFCFCF] flex-none">
              <span className="text-[11px] text-[#86868b]">&nbsp;</span>
            </div>
          </div>
        </div>
      <Analytics />
      <Script id="clarity" strategy="afterInteractive">
        {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","x6q5lk2wwr");`}
      </Script>
      </body>
    </html>
  );
}
