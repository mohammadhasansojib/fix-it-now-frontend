

const Loading = () => {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center gap-4 px-4">
      <div
        className="h-8 w-8 animate-spin rounded-full border-2 border-muted-foreground/30 border-t-foreground"
        role="status"
        aria-label="Loading"
      />
      <p className="text-sm text-muted-foreground">Loading&hellip;</p>
    </div>
  );
};

export default Loading;