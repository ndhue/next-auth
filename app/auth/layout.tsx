const LoginLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex items-center justify-center bg-sky-300">
      {children}
    </div>
  );
};

export default LoginLayout;
