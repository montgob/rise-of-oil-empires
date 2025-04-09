import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { 
  Droplet, 
  Building, 
  Ship, 
  Train, 
  Factory, 
  ChevronDown,
  ChevronUp,
  Banknote
} from "lucide-react";
import { PipeLine } from "@/components/ui/PipeLine";

type CompanyData = {
  id: string;
  name: string;
  founder: string;
  year: string;
  region: string;
  controlMethod: string;
  icon: JSX.Element;
  description: string;
  color: string;
};

const CompanyProfile = () => {
  const [expandedCompany, setExpandedCompany] = useState<string | null>("standard-oil");

  const toggleCompany = (id: string) => {
    setExpandedCompany(expandedCompany === id ? null : id);
  };

  const companies: CompanyData[] = [
    {
      id: "standard-oil",
      name: "Standard Oil",
      founder: "John D. Rockefeller",
      year: "1870",
      region: "United States",
      controlMethod: "Refining, Distribution Networks",
      icon: <Building className="h-8 w-8" />,
      description: "Began as a refinery business and built its domination of the American market by first monopolizing the refining industry with faster techniques. Later controlled pipelines, shipping routes, and established worldwide distribution networks, replacing independent importers with their own delivery system.",
      color: "bg-amber-600/20 border-amber-600/30"
    },
    {
      id: "shell",
      name: "The Shell Transport Co.",
      founder: "Marcus Samuel",
      year: "1897",
      region: "Global Shipping",
      controlMethod: "Ocean Transport",
      icon: <Ship className="h-8 w-8" />,
      description: "Developed and expanded the use of ocean-going tankers to transport oil in bulk across great distances. This innovation in transportation gave Shell significant control over the global oil supply chain.",
      color: "bg-red-600/20 border-red-600/30"
    },
    {
      id: "royal-dutch",
      name: "Royal Dutch Petroleum",
      founder: "August Kessler",
      year: "1890",
      region: "Dutch East Indies (Indonesia)",
      controlMethod: "Production",
      icon: <Factory className="h-8 w-8" />,
      description: "Dominated oil production in the Dutch East Indies (now Indonesia), operating like a mining company with workers' camps and teams of engineers. Later merged with Shell Transport to form Royal Dutch Shell.",
      color: "bg-yellow-600/20 border-yellow-600/30"
    },
    {
      id: "burmah-oil",
      name: "Burmah Oil",
      founder: "David Sime Cargill",
      year: "1886",
      region: "Burma (Myanmar)",
      controlMethod: "Production, Refining",
      icon: <Droplet className="h-8 w-8" />,
      description: "Controlled oil production in Burma (now Myanmar) and later became a significant player in Middle Eastern oil development through its investment in the Anglo-Persian Oil Company.",
      color: "bg-green-600/20 border-green-600/30"
    },
    {
      id: "nobel-brothers",
      name: "Nobel Brothers",
      founder: "Ludwig & Robert Nobel",
      year: "1879",
      region: "Russia (Baku)",
      controlMethod: "Production, Transportation",
      icon: <PipeLine className="h-8 w-8" />,
      description: "Developed the Baku oil fields in Russia (now Azerbaijan) and pioneered the use of pipelines and oil tankers in the Caspian region. Introduced technological innovations in drilling and transport.",
      color: "bg-blue-600/20 border-blue-600/30"
    },
    {
      id: "deutsche-bank",
      name: "Deutsche Bank Oil Investments",
      founder: "Georg von Siemens",
      year: "1890s",
      region: "Middle East, Europe",
      controlMethod: "Banking, Infrastructure",
      icon: <Banknote className="h-8 w-8" />,
      description: "Financed oil exploration, production, and transportation infrastructure, particularly in the Middle East and Europe. Represented banking interests that controlled oil through capital investment.",
      color: "bg-gray-500/20 border-gray-500/30"
    }
  ];

  return (
    <div className="space-y-6">
      <motion.div
        className="bg-slate-800/50 rounded-lg p-6 md:p-8 border border-amber-900/30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-amber-400 flex items-center">
          <Building className="mr-3 h-7 w-7" /> The Oil Empires
        </h2>
        <p className="text-slate-200 mb-8 max-w-4xl">
          A handful of firms devised methods for controlling the global supply of oil. 
          These enterprises took different forms, corresponding to different methods and points of control in the oil industry.
        </p>
        
        <div className="space-y-4">
          {companies.map((company) => (
            <motion.div
              key={company.id}
              className={`rounded-lg border ${company.color} overflow-hidden`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ 
                scale: expandedCompany === company.id ? 1 : 1.01,
                transition: { duration: 0.2 }
              }}
            >
              <div 
                className={`p-4 md:p-5 cursor-pointer flex justify-between items-center bg-slate-800/70`}
                onClick={() => toggleCompany(company.id)}
              >
                <div className="flex items-center">
                  <div className={`mr-4 p-2 rounded-full ${company.id === "standard-oil" ? "bg-amber-700/40" : 
                    company.id === "shell" ? "bg-red-700/40" : 
                    company.id === "royal-dutch" ? "bg-yellow-700/40" : 
                    company.id === "burmah-oil" ? "bg-green-700/40" : 
                    company.id === "nobel-brothers" ? "bg-blue-700/40" : "bg-gray-700/40"}`}>
                    {company.icon}
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-slate-100">{company.name}</h3>
                    <p className="text-sm text-slate-300">{company.region} • Est. {company.year}</p>
                  </div>
                </div>
                <div className="text-slate-300">
                  {expandedCompany === company.id ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </div>
              </div>
              
              <AnimatePresence>
                {expandedCompany === company.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden bg-slate-800/30"
                  >
                    <div className="p-5 space-y-4">
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="bg-slate-700/30 p-3 rounded border border-slate-600/30">
                          <p className="text-slate-400 text-sm">Founder</p>
                          <p className="text-slate-100 font-medium">{company.founder}</p>
                        </div>
                        <div className="bg-slate-700/30 p-3 rounded border border-slate-600/30">
                          <p className="text-slate-400 text-sm">Primary Region</p>
                          <p className="text-slate-100 font-medium">{company.region}</p>
                        </div>
                        <div className="bg-slate-700/30 p-3 rounded border border-slate-600/30">
                          <p className="text-slate-400 text-sm">Control Method</p>
                          <p className="text-slate-100 font-medium">{company.controlMethod}</p>
                        </div>
                      </div>
                      <div className="bg-slate-700/30 p-4 rounded border border-slate-600/30">
                        <h4 className="text-amber-300 font-medium mb-2">Company Overview</h4>
                        <p className="text-slate-200 leading-relaxed">{company.description}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default CompanyProfile;
