import "./globals.css";

export const metadata = {
  title: "Sadguru Krupa Apartments & PG | Premium Co-Living near MIT ADT Loni Kalbhor",
  description: "Premium student co-living, hostel, and fully furnished 1BHK/1RK flats near MIT ADT Rajbaug Campus, Loni Kalbhor, Pune. 24x7 security, high-speed WiFi, AC, mess, and cleaning.",
  keywords: "PG Near MIT ADT Pune, Student Hostel Pune, PG in Loni Kalbhor, Furnished Flats Near MIT ADT, Student Accommodation Pune, Hostel Near MIT ADT Rajbaug Campus",
};

const themeScript = `
  (function() {
    try {
      var savedTheme = localStorage.getItem('theme');
      var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (savedTheme === 'dark' || (!savedTheme && systemDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
      }
    } catch (e) {}
  })();
`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="bg-bg-primary text-text-primary min-h-screen flex flex-col antialiased">
        {children}
      </body>
    </html>
  );
}
