
import { useState } from "react";
import { 
  Building, 
  Factory, 
  Ship, 
  Droplet, 
  Train, 
  PipeLine, 
  ChevronDown, 
  ChevronUp,
  Banknote,
  Route
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import CompanyProfile from "@/components/CompanyProfile";
import OilMap from "@/components/OilMap";
import TimelineComponent from "@/components/TimelineComponent";
import TransportationMethods from "@/components/TransportationMethods";

const Index = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-slate-100">
      <header className="pt-8 pb-6 px-4 md:px-8 lg:px-16 text-center">
        <motion.h1 
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 text-amber-400"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          The Rise of Oil Empires
        </motion.h1>
        <motion.p 
          className="text-xl text-amber-100/80 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          How a handful of enterprises controlled the global oil industry at the dawn of the 20th century
        </motion.p>
      </header>

      <main className="container mx-auto px-4 pb-16">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
            <TabsTrigger value="overview" className="text-sm md:text-base">
              Overview
            </TabsTrigger>
            <TabsTrigger value="companies" className="text-sm md:text-base">
              Key Companies
            </TabsTrigger>
            <TabsTrigger value="methods" className="text-sm md:text-base">
              Control Methods
            </TabsTrigger>
            <TabsTrigger value="timeline" className="text-sm md:text-base">
              Timeline
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <Card className="p-6 md:p-8 bg-slate-800/50 border-amber-900/30 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-amber-400 flex items-center">
                  <Droplet className="mr-2 h-6 w-6" /> The Early Oil Industry
                </h2>
                <p className="text-slate-200 mb-6 leading-relaxed">
                  At the beginning of the twentieth century, hundreds of enterprises were involved in prospecting for, producing, shipping and distributing supplies of oil in different parts of the world. Among these, a handful of firms were devising methods for controlling the supply of oil over great distances.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div 
                    className="bg-slate-700/50 rounded-lg p-5 border border-amber-900/20"
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <h3 className="text-xl font-semibold mb-3 text-amber-300 flex items-center">
                      <Factory className="mr-2 h-5 w-5" /> Production
                    </h3>
                    <p className="text-slate-300">
                      Companies organized like mining operations with workers' camps and teams of engineers. Many operated the new rotary drilling equipment that replaced older percussion drills.
                    </p>
                  </motion.div>
                  
                  <motion.div 
                    className="bg-slate-700/50 rounded-lg p-5 border border-amber-900/20"
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <h3 className="text-xl font-semibold mb-3 text-amber-300 flex items-center">
                      <Ship className="mr-2 h-5 w-5" /> Transportation
                    </h3>
                    <p className="text-slate-300">
                      Various methods including pipelines, railways, and ocean-going tankers were developed to move oil across vast distances, creating powerful monopolies.
                    </p>
                  </motion.div>
                  
                  <motion.div 
                    className="bg-slate-700/50 rounded-lg p-5 border border-amber-900/20"
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <h3 className="text-xl font-semibold mb-3 text-amber-300 flex items-center">
                      <Building className="mr-2 h-5 w-5" /> Refining
                    </h3>
                    <p className="text-slate-300">
                      Companies like Standard Oil built their empires by first monopolizing the refining process with faster techniques using steam power generated by fuel oil.
                    </p>
                  </motion.div>
                  
                  <motion.div 
                    className="bg-slate-700/50 rounded-lg p-5 border border-amber-900/20"
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <h3 className="text-xl font-semibold mb-3 text-amber-300 flex items-center">
                      <Route className="mr-2 h-5 w-5" /> Distribution
                    </h3>
                    <p className="text-slate-300">
                      Global networks of storage tanks, delivery wagons, and reusable containers replaced independent importers and wholesalers.
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </Card>
            
            <OilMap />
            
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div 
                className="bg-slate-800/50 rounded-lg p-6 border border-amber-900/30"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <h3 className="text-xl font-semibold mb-3 text-amber-300">Key Control Methods</h3>
                <ul className="space-y-2 text-slate-200">
                  <li className="flex items-start">
                    <span className="bg-amber-700/30 p-1 rounded-full mr-2 mt-0.5">
                      <PipeLine className="h-4 w-4 text-amber-300" />
                    </span>
                    <span>Monopolizing transportation infrastructure</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-amber-700/30 p-1 rounded-full mr-2 mt-0.5">
                      <Banknote className="h-4 w-4 text-amber-300" />
                    </span>
                    <span>Vertical integration of production, refining and distribution</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-amber-700/30 p-1 rounded-full mr-2 mt-0.5">
                      <Building className="h-4 w-4 text-amber-300" />
                    </span>
                    <span>Creating worldwide distribution networks</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-amber-700/30 p-1 rounded-full mr-2 mt-0.5">
                      <Factory className="h-4 w-4 text-amber-300" />
                    </span>
                    <span>Technological innovation in drilling and refining</span>
                  </li>
                </ul>
              </motion.div>
              
              <motion.div 
                className="bg-slate-800/50 rounded-lg p-6 border border-amber-900/30"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <h3 className="text-xl font-semibold mb-3 text-amber-300">Industry Transformation</h3>
                <p className="text-slate-200 mb-4">
                  The oil industry transformed from hundreds of independent enterprises to a concentrated oligopoly controlled by a few major players who:
                </p>
                <div className="space-y-2">
                  <div className="bg-slate-700/40 p-3 rounded border border-amber-900/20">
                    <p className="text-amber-200 font-medium">Replaced independent importers and wholesalers</p>
                  </div>
                  <div className="bg-slate-700/40 p-3 rounded border border-amber-900/20">
                    <p className="text-amber-200 font-medium">Created global supply chains and distribution networks</p>
                  </div>
                  <div className="bg-slate-700/40 p-3 rounded border border-amber-900/20">
                    <p className="text-amber-200 font-medium">Controlled strategic transportation infrastructure</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="companies" className="space-y-6">
            <CompanyProfile />
          </TabsContent>

          <TabsContent value="methods" className="space-y-6">
            <TransportationMethods />
          </TabsContent>

          <TabsContent value="timeline" className="space-y-6">
            <TimelineComponent />
          </TabsContent>
        </Tabs>
      </main>

      <footer className="mt-auto py-6 bg-slate-900/80 border-t border-amber-900/20 text-center text-slate-400 text-sm">
        <div className="container mx-auto px-4">
          <p>The Rise of Oil Empires — Interactive Infographic © 2025</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
