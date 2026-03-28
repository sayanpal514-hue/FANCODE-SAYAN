import { useFanCodeData } from "@/hooks/useFanCodeData";
import MatchCard from "@/components/MatchCard";

const Index = () => {
  const { data, isLoading, error, dataUpdatedAt } = useFanCodeData();

  const liveMatches = data?.matches.filter((m) => m.type === "live") ?? [];
  const upcomingMatches = data?.matches.filter((m) => m.type === "upcoming") ?? [];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-black text-sm">FC</span>
            </div>
            <h1 className="text-lg font-bold tracking-tight">FanCode Live</h1>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            {data && (
              <>
                <span className="hidden sm:inline">Updated: {data.last_updated}</span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-live animate-pulse" />
                  {data.live_matches} live
                </span>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-10">
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {error && (
          <div className="text-center py-20 text-destructive">
            Failed to load matches. Retrying...
          </div>
        )}

        {data && (
          <>
            {/* Live Section */}
            {liveMatches.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-5">
                  <span className="w-2.5 h-2.5 rounded-full bg-live animate-pulse" />
                  <h2 className="text-xl font-bold">Live Now</h2>
                  <span className="text-sm text-muted-foreground">({liveMatches.length})</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {liveMatches.map((m) => (
                    <MatchCard key={m.match_id} match={m} />
                  ))}
                </div>
              </section>
            )}

            {/* Upcoming Section */}
            {upcomingMatches.length > 0 && (
              <section>
                <h2 className="text-xl font-bold mb-5">Upcoming</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {upcomingMatches.map((m) => (
                    <MatchCard key={m.match_id} match={m} />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Index;
