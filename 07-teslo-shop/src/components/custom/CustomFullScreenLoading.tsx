export const CustomFullScreenLoading = () => {
  return (
    <div className="flex h-dvh w-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="size-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <p>Espere un momento...</p>
      </div>
    </div>
  );
};
