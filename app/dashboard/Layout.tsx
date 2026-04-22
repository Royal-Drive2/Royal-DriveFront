import Sidebar from "@/components/dashboard/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full" style={{ background: "#0a0a0a", color: "#fff" }}>
      <Sidebar />
      <main className="flex-1 md:ml-64 min-h-screen">
        {children}
      </main>
    </div>
  );
}