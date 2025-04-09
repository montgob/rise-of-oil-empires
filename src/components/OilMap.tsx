
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Ship, 
  PipeLine, 
  Train, 
  Building, 
  Droplet, 
  Factory, 
  Info
} from "lucide-react";

const regions = [
  {
    id: "us",
    name: "United States",
    position: { top: "38%", left: "19%" },
    color: "bg-blue-600",
    icon: <Building className="h-4 w-4" />,
    company: "Standard Oil",
    details: "Center of refining and distribution networks, with Rockefeller's Standard Oil dominating through vertical integration."
  },
  {
    id: "russia",
    name: "Russia (Baku)",
    position: { top: "28%", left: "55%" },
    color: "bg-red-600",
    icon: <Factory className="h-4 w-4" />,
    company: "Nobel Brothers",
    details: "The Nobel Brothers revolutionized production in the Baku oil fields with advanced drilling technology."
  },
  {
    id: "burma",
    name: "Burma (Myanmar)",
    position: { top: "41%", left: "69%" },
    color: "bg-green-600",
    icon: <Droplet className="h-4 w-4" />,
    company: "Burmah Oil",
    details: "Burmah Oil Company controlled production in this region, later expanding to the Middle East."
  },
  {
    id: "indonesia",
    name: "Dutch East Indies",
    position: { top: "52%", left: "75%" },
    color: "bg-yellow-600",
    icon: <Factory className="h-4 w-4" />,
    company: "Royal Dutch",
    details: "Royal Dutch dominated oil production in the Dutch East Indies (now Indonesia)."
  },
  {
    id: "shipping",
    name: "Ocean Shipping Routes",
    position: { top: "60%", left: "40%" },
    color: "bg-cyan-600",
    icon: <Ship className="h-4 w-4" />,
    company: "Shell Transport",
    details: "Shell Transportation Company pioneered bulk oil tankers, revolutionizing global oil transport."
  },
  {
    id: "europe",
    name: "European Finance",
    position: { top: "25%", left: "44%" },
    color: "bg-purple-600",
    icon: <Building className="h-4 w-4" />,
    company: "Banking Houses",
    details: "European banking houses like Deutsche Bank financed oil infrastructure and operations."
  }
];

const OilMap = () => {
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  
  const handleRegionHover = (id: string | null) => {
    setActiveRegion(id);
  };

  return (
    <motion.div
      className="bg-slate-800/50 rounded-lg p-6 border border-amber-900/30 relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-amber-400">Global Oil Control Map</h2>
      <p className="text-slate-300 mb-6">
        Key regions and control points in the early 20th century oil industry.
        <span className="text-amber-300 text-sm ml-2 italic">Hover over points to see details</span>
      </p>
      
      <div className="relative w-full h-[300px] md:h-[400px] bg-slate-700/30 rounded-lg border border-slate-600/30 overflow-hidden">
        {/* World Map Background - Simplified outline map */}
        <div 
          className="absolute inset-0 bg-contain bg-center bg-no-repeat opacity-40"
          style={{ 
            backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/World_map_-_low_resolution.svg/1280px-World_map_-_low_resolution.svg.png')" 
          }}
        ></div>
        
        {/* Connection Lines */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <marker id="arrowhead" markerWidth="4" markerHeight="3" 
              refX="0" refY="1.5" orient="auto">
              <polygon points="0 0, 4 1.5, 0 3" fill="#fcd34d" />
            </marker>
          </defs>
          
          <path 
            d="M19,38 C25,45 40,48 55,28" 
            stroke={activeRegion === "us" || activeRegion === "russia" ? "#fcd34d" : "#475569"} 
            strokeWidth="0.3" 
            fill="none"
            strokeDasharray={activeRegion === "us" || activeRegion === "russia" ? "none" : "0.5,0.5"}
            markerEnd="url(#arrowhead)"
            className="transition-colors duration-300"
          />
          
          <path 
            d="M19,38 C30,45 35,48 40,60" 
            stroke={activeRegion === "us" || activeRegion === "shipping" ? "#fcd34d" : "#475569"} 
            strokeWidth="0.3" 
            fill="none"
            strokeDasharray={activeRegion === "us" || activeRegion === "shipping" ? "none" : "0.5,0.5"}
            markerEnd="url(#arrowhead)"
            className="transition-colors duration-300"
          />
          
          <path 
            d="M44,25 C50,30 60,35 69,41" 
            stroke={activeRegion === "europe" || activeRegion === "burma" ? "#fcd34d" : "#475569"} 
            strokeWidth="0.3" 
            fill="none"
            strokeDasharray={activeRegion === "europe" || activeRegion === "burma" ? "none" : "0.5,0.5"}
            markerEnd="url(#arrowhead)"
            className="transition-colors duration-300"
          />
          
          <path 
            d="M69,41 C70,45 72,48 75,52" 
            stroke={activeRegion === "burma" || activeRegion === "indonesia" ? "#fcd34d" : "#475569"} 
            strokeWidth="0.3" 
            fill="none"
            strokeDasharray={activeRegion === "burma" || activeRegion === "indonesia" ? "none" : "0.5,0.5"}
            markerEnd="url(#arrowhead)"
            className="transition-colors duration-300"
          />
          
          <path 
            d="M75,52 C65,55 50,58 40,60" 
            stroke={activeRegion === "indonesia" || activeRegion === "shipping" ? "#fcd34d" : "#475569"} 
            strokeWidth="0.3" 
            fill="none"
            strokeDasharray={activeRegion === "indonesia" || activeRegion === "shipping" ? "none" : "0.5,0.5"}
            markerEnd="url(#arrowhead)"
            className="transition-colors duration-300"
          />
        </svg>
        
        {/* Region Markers */}
        {regions.map((region) => (
          <div
            key={region.id}
            className={`absolute cursor-pointer transition-all duration-300 ease-in-out ${
              activeRegion === region.id ? 'z-20 scale-125' : 'z-10 hover:scale-110'
            }`}
            style={{ 
              top: region.position.top, 
              left: region.position.left,
              transform: `translate(-50%, -50%) ${activeRegion === region.id ? 'scale(1.2)' : ''}`,
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={() => handleRegionHover(region.id)}
            onMouseLeave={() => handleRegionHover(null)}
          >
            <div className={`${region.color} p-2 rounded-full shadow-glow`}>
              {region.icon}
            </div>
            
            <div className={`absolute ${
              Number(region.position.top.replace('%', '')) > 50 
                ? '-top-28' 
                : 'top-8'
              } left-1/2 -translate-x-1/2 w-48 transition-opacity duration-300 ${
              activeRegion === region.id ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
            }`}>
              <div className="bg-slate-800/95 border border-slate-600/50 p-3 rounded-lg shadow-xl">
                <div className="flex items-center mb-1">
                  <div className={`${region.color} p-1 rounded-full mr-2`}>
                    {region.icon}
                  </div>
                  <h3 className="font-bold text-amber-300 text-sm">{region.name}</h3>
                </div>
                <p className="text-amber-100/90 text-xs font-medium mb-1">{region.company}</p>
                <p className="text-slate-300 text-xs">{region.details}</p>
              </div>
            </div>
          </div>
        ))}
        
        <div className="absolute bottom-3 right-3 text-slate-400 text-xs flex items-center">
          <Info className="h-3 w-3 mr-1" />
          <span>Hover over markers to see details</span>
        </div>
      </div>
      
      {/* Legend */}
      <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 text-xs">
        {regions.map((region) => (
          <div 
            key={region.id}
            className={`flex items-center p-1.5 rounded border ${
              activeRegion === region.id 
                ? `${region.color.replace('600', '700')}/20 border-${region.color.replace('bg-', '')}/30` 
                : 'bg-slate-700/30 border-slate-600/20'
            } transition-colors duration-300`}
            onMouseEnter={() => handleRegionHover(region.id)}
            onMouseLeave={() => handleRegionHover(null)}
          >
            <div className={`${region.color} p-1 rounded-full mr-1.5`}>
              {region.icon}
            </div>
            <span className="text-slate-200 truncate text-xs">{region.name}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default OilMap;
