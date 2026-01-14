export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom right, #FFF5F6, #FFFFFF, #FFEBEE)',
      }}
    >
      {/* Decorative blurred circles */}
      <div
        className="absolute top-[-10%] right-[-5%] w-96 h-96 rounded-full opacity-30 blur-3xl"
        style={{ background: 'rgba(196, 30, 58, 0.2)' }}
      />
      <div
        className="absolute bottom-[-10%] left-[-5%] w-80 h-80 rounded-full opacity-20 blur-3xl"
        style={{ background: 'rgba(230, 57, 70, 0.2)' }}
      />
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
}
