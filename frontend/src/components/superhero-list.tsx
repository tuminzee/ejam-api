import { useGetSuperheroes } from "@/api/superhero";
import React from "react";

export function SuperheroesList() {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetSuperheroes();
  const loadMoreRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const superheroes = data?.pages.flatMap((page) => page.items) ?? [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-pulse text-xl font-medium text-gray-600">
          Loading superheroes...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Humble Superheroes
      </h2>

      {superheroes.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-xl text-gray-500">
            No superheroes have joined our ranks yet.
          </p>
          <p className="text-gray-400 mt-2">Be the first to add one!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {superheroes.map((hero) => (
            <div
              key={hero.name}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={`https://api.dicebear.com/9.x/micah/svg?seed=${hero.name}`}
                  className="w-20 h-20 rounded-full border-4 border-blue-100 shadow-inner"
                  alt={`${hero.name}'s avatar`}
                />
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    {hero.name}
                  </h3>
                  <div className="mt-2 space-y-1">
                    <p className="text-gray-600 flex items-center">
                      <span className="font-medium">Superpower:</span>
                      <span className="ml-2 text-blue-600">
                        {hero.superpower}
                      </span>
                    </p>
                    <div className="flex items-center">
                      <span className="font-medium text-gray-600">
                        Humility:
                      </span>
                      <div className="ml-2 bg-gray-100 rounded-full h-2 w-24">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{
                            width: `${(hero.humilityScore / 10) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="ml-2 text-blue-600 font-medium">
                        {hero.humilityScore}/10
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div ref={loadMoreRef} className="h-4" />
          {isFetchingNextPage && (
            <div className="col-span-full text-center py-6">
              <div className="inline-block animate-bounce text-lg text-gray-600">
                Loading more heroes...
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
