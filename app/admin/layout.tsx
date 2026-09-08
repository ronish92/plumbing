import TopHeader from '@/components/admin/top-header';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#c5c3d1] p-1 sm:p-3 md:p-4 lg:p-6 font-sans">
      <div className="mx-auto min-h-[calc(100vh-0.5rem)] sm:min-h-[calc(100vh-1.5rem)] md:min-h-[calc(100vh-2rem)] lg:min-h-[calc(100vh-3rem)] max-w-350 rounded-xl sm:rounded-2xl lg:rounded-3xl bg-[#f5f4f0] p-3 sm:p-4 lg:p-6 shadow-2xl">
        
        {/* Persistent Admin Header */}
        <TopHeader />

        {/* Only this changes between pages */}
        {children}
      </div>
    </div>
  );
}