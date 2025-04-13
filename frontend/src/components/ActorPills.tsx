export function ActorPills({actor} : { actor : string}) {
  return (
    <div className="text-sm bg-background-primary/10 rounded-xl px-2 py-1 w-max border-2 border-primary/50 hover:bg-primary hover:text-background-primary">
      {actor}
    </div>
  );
}
