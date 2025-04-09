import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Droplet, 
  Building, 
  Ship, 
  Train, 
  Factory, 
  ChevronRight,
  ChevronLeft,
  Calendar
} from "lucide-react";
import { PipeLine } from "@/components/ui/PipeLine";

const timelineEvents = [
  {
    year: "1850s",
    title: "Early Oil Industry Beginnings",
    description: "The modern oil industry begins with Edwin Drake's successful oil well in Pennsylvania in 1859, leading to the first oil boom.",
    icon: <Droplet className="h-5 w-5" />,
    color: "bg-amber-700/30"
  },
  {
    year: "1865-1870",
    title: "Standard Oil Established",
    description: "John D. Rockefeller establishes Standard Oil in 1870, beginning the process of consolidating the American oil industry through refining dominance.",
    icon: <Building className="h-5 w-5" />,
    color: "bg-blue-700/30"
  },
  {
    year: "1870s",
    title: "Pipeline Development",
    description: "Construction of pipelines begins, providing an alternative to rail transport and giving companies that controlled pipelines significant market power.",
    icon: <PipeLine className="h-5 w-5" />,
    color: "bg-green-700/30"
  },
  {
    year: "1879",
    title: "Nobel Brothers in Baku",
    description: "Ludwig and Robert Nobel establish oil operations in Baku (Russia, now Azerbaijan), revolutionizing production in the region with new technology.",
    icon: <Factory className="h-5 w-5" />,
    color: "bg-red-700/30"
  },
  {
    year: "1880s",
    title: "Standard Oil Dominance",
    description: "By the mid-1880s, Standard Oil controls approximately 90% of U.S. refining capacity and begins expanding its distribution networks globally.",
    icon: <Building className="h-5 w-5" />,
    color: "bg-blue-700/30"
  },
  {
    year: "1886",
    title: "Burmah Oil Company",
    description: "Burmah Oil Company is established to develop oil production in Burma (now Myanmar), later becoming a major player in Middle Eastern oil.",
    icon: <Droplet className="h-5 w-5" />,
    color: "bg-amber-700/30"
  },
  {
    year: "1890",
    title: "Royal Dutch Petroleum Founded",
    description: "Royal Dutch Petroleum Company is established to develop oil fields in the Dutch East Indies (now Indonesia).",
    icon: <Factory className="h-5 w-5" />,
    color: "bg-yellow-700/30"
  },
  {
    year: "1892",
    title: "Standard Oil Trust Dissolved",
    description: "The Ohio Supreme Court orders the dissolution of the Standard Oil Trust, though it continues to operate as a holding company.",
    icon: <Building className="h-5 w-5" />,
    color: "bg-blue-700/30"
  },
  {
    year: "1897",
    title: "Shell Transport Company",
    description: "Marcus Samuel's Shell Transport and Trading Company expands, pioneering the use of bulk oil tankers for oceanic transport.",
    icon: <Ship className="h-5 w-5" />,
    color: "bg-red-700/30"
  },
  {
    year: "1901",
    title: "Spindletop Oil Boom",
    description: "The Spindletop gusher in Texas marks the beginning of the Texas oil boom and shifts the center of U.S. oil production from Pennsylvania to Texas.",
    icon: <Droplet className="h-5 w-5" />,
    color: "bg-amber-700/30"
  },
  {
    year: "1907",
    title: "Royal Dutch Shell Formed",
    description: "Royal Dutch Petroleum Company and Shell Transport and Trading Company merge to form Royal Dutch Shell, creating a major global competitor to Standard Oil.",
    icon: <Building className="h-5 w-5" />,
    color: "bg-yellow-700/30"
  },
  {
    year: "1911",
    title: "Standard Oil Breakup",
    description: "The U.S. Supreme Court orders the breakup of Standard Oil into 34 companies, ending its monopoly but creating many powerful successor companies.",
    icon: <Building className="h-5 w-5" />,
    color: "bg-blue-700/30"
  }
];

const TimelineComponent = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };
  
  const handleNext = () => {
    setActiveIndex((prev) => 
      prev < timelineEvents.length - 1 ? prev + 1 : prev
    );
  };

  return (
    <div className="space-y-6">
      <motion.div
        className="bg-slate-800/50 rounded-lg p-6 md:p-8 border border-amber-900/30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-amber-400 flex items-center">
          <Calendar className="mr-3 h-7 w-7" /> Oil Industry Timeline
        </h2>
        <p className="text-slate-200 mb-8 max-w-4xl">
          The evolution of the oil industry from the mid-19th century through the early 20th century
          saw the rise of powerful monopolies and the beginning of global oil empires.
        </p>
        
        {/* Timeline Navigation */}
        <div className="relative mb-8">
          <div className="absolute top-1/2 -translate-y-1/2 w-full h-1 bg-slate-700"></div>
          
          <div className="relative flex justify-between">
            {timelineEvents.map((event, index) => (
              <motion.div
                key={index}
                className={`relative cursor-pointer ${
                  index === activeIndex 
                    ? `${event.color} border border-white/20 z-10 scale-125` 
                    : 'bg-slate-700/50 border border-slate-600/30'
                } rounded-full h-8 w-8 flex items-center justify-center`}
                whileHover={{ scale: index === activeIndex ? 1.25 : 1.1 }}
                onClick={() => setActiveIndex(index)}
              >
                {index === activeIndex && (
                  <motion.div 
                    className="absolute -bottom-8 text-amber-400 font-bold"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {event.year}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Timeline Navigation Controls */}
        <div className="flex justify-between mb-8">
          <button
            onClick={handlePrev}
            disabled={activeIndex === 0}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
              activeIndex === 0
                ? 'text-slate-500 cursor-not-allowed'
                : 'text-amber-400 hover:bg-slate-700/50'
            }`}
          >
            <ChevronLeft className="h-5 w-5" />
            <span>Previous</span>
          </button>
          
          <button
            onClick={handleNext}
            disabled={activeIndex === timelineEvents.length - 1}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
              activeIndex === timelineEvents.length - 1
                ? 'text-slate-500 cursor-not-allowed'
                : 'text-amber-400 hover:bg-slate-700/50'
            }`}
          >
            <span>Next</span>
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
        
        {/* Timeline Content */}
        <div className="relative">
          {timelineEvents.map((event, index) => (
            <motion.div
              key={index}
              className={`${
                activeIndex === index ? 'block' : 'hidden'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-slate-700/30 rounded-xl border border-slate-600/30 p-6 md:p-8">
                <div className="flex items-center mb-4">
                  <div className={`mr-4 p-3 rounded-full ${event.color}`}>
                    {event.icon}
                  </div>
                  <div>
                    <div className="text-amber-400 font-bold text-lg md:text-xl">{event.year}</div>
                    <h3 className="text-xl md:text-2xl font-bold text-slate-100">{event.title}</h3>
                  </div>
                </div>
                
                <p className="text-slate-200 text-lg leading-relaxed mb-6">
                  {event.description}
                </p>
                
                <div className="grid md:grid-cols-2 gap-4 mt-6">
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-600/30">
                    <h4 className="text-amber-300 font-medium mb-2">Industry Impact</h4>
                    <p className="text-slate-300">
                      {index === 0 && "Established the foundation for the modern petroleum industry, creating the first oil rush."}
                      {index === 1 && "Began the process of industry consolidation through vertical integration, setting the pattern for oil monopolies."}
                      {index === 2 && "Created a new transportation monopoly that reduced dependence on railways."}
                      {index === 3 && "Expanded oil production to new regions and introduced technological innovations."}
                      {index === 4 && "Demonstrated the power of vertical integration and consolidation in creating market dominance."}
                      {index === 5 && "Extended oil exploration to Southeast Asia, diversifying global production."}
                      {index === 6 && "Established European competition to Standard Oil's global dominance."}
                      {index === 7 && "First major legal challenge to oil monopolies, though with limited immediate impact."}
                      {index === 8 && "Revolutionized global oil transport, making long-distance shipping economical."}
                      {index === 9 && "Shifted the center of U.S. oil production and introduced new players to the industry."}
                      {index === 10 && "Created a major global competitor to Standard Oil's dominance."}
                      {index === 11 && "Fundamentally transformed the structure of the global oil industry, creating today's major oil companies."}
                    </p>
                  </div>
                  
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-600/30">
                    <h4 className="text-amber-300 font-medium mb-2">Control Methods</h4>
                    <p className="text-slate-300">
                      {index === 0 && "Early wildcatters competed with minimal market control mechanisms."}
                      {index === 1 && "Began with refining monopoly, later expanding to transportation and distribution."}
                      {index === 2 && "Pipeline ownership created transportation monopolies that controlled access to markets."}
                      {index === 3 && "Production control through technological innovation and regional dominance."}
                      {index === 4 && "Vertical integration from production through distribution created complete supply chain control."}
                      {index === 5 && "Regional production control in Southeast Asia."}
                      {index === 6 && "Production control in the Dutch East Indies with technological innovation."}
                      {index === 7 && "Continued control through corporate restructuring despite legal challenges."}
                      {index === 8 && "Transportation control through innovation in ocean shipping."}
                      {index === 9 && "New production regions created opportunities for new control structures."}
                      {index === 10 && "Merger created vertically integrated global competitor combining production and transportation strengths."}
                      {index === 11 && "Transformed monopoly control into oligopoly among Standard Oil successors and European competitors."}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center mt-4">
                <div className="flex space-x-1">
                  {timelineEvents.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-1.5 rounded-full ${
                        idx === activeIndex
                          ? 'w-6 bg-amber-400'
                          : 'w-2 bg-slate-600'
                      }`}
                      onClick={() => setActiveIndex(idx)}
                    ></div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default TimelineComponent;
