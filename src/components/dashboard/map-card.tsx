import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { MapPin } from "lucide-react";

export function MapCard() {
  const mapImage = PlaceHolderImages.find(img => img.id === 'map-placeholder');

  return (
    <Card className="overflow-hidden bg-white/70 backdrop-blur-sm border-slate-200 dark:bg-slate-800/70 dark:border-slate-700 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group touch-manipulation">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center text-xl font-bold text-slate-900 dark:text-slate-100">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
          <MapPin className="h-6 w-6 mr-2 text-green-600 dark:text-green-400" />
          Location Map
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="aspect-[4/3] sm:aspect-video relative overflow-hidden rounded-xl mx-4 mb-4 border border-slate-200 dark:border-slate-600 group-hover:border-green-300 dark:group-hover:border-green-600 transition-colors">
          {mapImage && (
             <Image
                src={mapImage.imageUrl}
                alt={mapImage.description}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                data-ai-hint={mapImage.imageHint}
              />
          )}
          <div className="absolute inset-0 bg-gradient-to-br from-black/30 to-black/50 group-hover:from-black/20 group-hover:to-black/40 flex items-center justify-center transition-all duration-300">
            <div className="text-center p-4 sm:p-6 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-xl max-w-[90%] sm:max-w-[80%] shadow-xl border border-white/20 group-hover:shadow-2xl group-hover:scale-105 transition-all duration-300">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center group-hover:from-green-500 group-hover:to-green-700 group-hover:scale-110 transition-all duration-300">
                  <MapPin className="h-6 w-6 text-white group-hover:scale-110 transition-transform duration-300" />
                </div>
                <p className="text-slate-900 dark:text-slate-100 font-bold text-lg mb-2 group-hover:text-green-700 dark:group-hover:text-green-300 transition-colors">Live Map View</p>
                <p className="text-slate-600 dark:text-slate-400 text-sm group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">Real-time location tracking will be displayed here</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
