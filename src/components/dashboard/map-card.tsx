import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export function MapCard() {
  const mapImage = PlaceHolderImages.find(img => img.id === 'map-placeholder');

  return (
    <Card>
      <CardContent className="p-0">
        <div className="aspect-video relative overflow-hidden rounded-lg">
          {mapImage && (
             <Image
                src={mapImage.imageUrl}
                alt={mapImage.description}
                fill
                className="object-cover"
                data-ai-hint={mapImage.imageHint}
              />
          )}
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <div className="text-center p-4 bg-black/50 rounded-lg">
                <p className="text-white font-semibold">Live Map Placeholder</p>
                <p className="text-sm text-gray-300">A map view of the executive's last known location would appear here.</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
