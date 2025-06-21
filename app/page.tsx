import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  return (
    <div>
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 space-y-6">Hello world</div>
          <div className="lg:col-span-3">
            <Tabs defaultValue="all-movies">
              <TabsList>
                <TabsTrigger value="all-movies">All Movies</TabsTrigger>
                <TabsTrigger value="recommended-movies">
                  Your Movies
                </TabsTrigger>
              </TabsList>
              <TabsContent value="all-movies">
                This is where all movies will be visible. Here users can select
                what movies they have already seen
              </TabsContent>
              <TabsContent value="recommended-movies">
                This is where users can view recommended movies
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
