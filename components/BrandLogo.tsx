import Image from "next/image";

interface BrandLogoProps {
  size?: number; // Height of the logo
  textSize?: string; // Tailwind class for text size
  showText?: boolean;
  isPdf?: boolean; // If true, uses a raw img tag instead of next/image for PDF compatibility
  className?: string; // Additional classes for the container
}

export function BrandLogo({
  size = 48, // Default h-12 (48px)
  textSize = "text-xl",
  showText = false,
  isPdf = false,
  className = "",
}: BrandLogoProps) {
  // Since the user logo has the text embedded, we can render it large
  // We'll give it a standard big width/height so it appears "in big size simple"
  const w = size * 3.5; 

  return (
    <div className={`flex items-center ${className}`}>
      {isPdf ? (
        <img
          src="/assets/logo/logo.png"
          alt="Alien.fi"
          style={{ height: size, width: 'auto' }}
          className="object-contain"
        />
      ) : (
        <Image
          src="/assets/logo/logo.png"
          alt="Alien.fi"
          width={Math.round(w)}
          height={size}
          style={{ height: size, width: 'auto', transform: 'translateY(15px)' }}
          className="object-contain"
          priority
        />
      )}
    </div>
  );
}
