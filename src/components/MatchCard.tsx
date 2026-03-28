import type { Match } from "@/hooks/useFanCodeData";

const sportColor = (category: string) => {
  switch (category.toLowerCase()) {
    case "cricket": return "bg-sport-cricket";
    case "football": return "bg-sport-football";
    case "golf": return "bg-sport-golf";
    default: return "bg-sport-default";
  }
};

const MatchCard = ({ match }: { match: Match }) => {
  const isLive = match.type === "live";

  return (
    <div className="group relative overflow-hidden rounded-xl bg-card border border-border hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={match.image}
          alt={match.match}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />

        {/* Live badge */}
        {isLive && (
          <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-live/90 backdrop-blur-sm px-2.5 py-1 rounded-md">
            <span className="w-2 h-2 rounded-full bg-foreground animate-pulse" />
            <span className="text-xs font-bold tracking-wider uppercase text-foreground">Live</span>
          </div>
        )}

        {/* Category badge */}
        <div className={`absolute top-3 right-3 px-2.5 py-1 rounded-md text-xs font-semibold ${sportColor(match.category)} text-primary-foreground`}>
          {match.category}
        </div>
      </div>

      {/* Info */}
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-card-foreground capitalize text-sm leading-tight line-clamp-2">
          {match.match}
        </h3>
        <p className="text-xs text-muted-foreground line-clamp-1">{match.tournament}</p>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          {isLive && match.stream_url && (
            <a
              href={match.stream_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center text-xs font-semibold py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
            >
              ▶ Watch
            </a>
          )}
          <a
            href={match.match_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center text-xs font-semibold py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
          >
            Details
          </a>
        </div>
      </div>
    </div>
  );
};

export default MatchCard;
