
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Building, Factory, Ship, Droplet, PipeLine } from "lucide-react";
import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface OilCompany {
  id: string;
  name: string;
  region: string;
  founded: string | null;
  description: string;
  control_method: string;
  icon: string;
}

const iconMap: Record<string, React.ReactNode> = {
  Building: <Building className="h-5 w-5 text-amber-400" />,
  Factory: <Factory className="h-5 w-5 text-amber-400" />,
  Ship: <Ship className="h-5 w-5 text-amber-400" />,
  Droplet: <Droplet className="h-5 w-5 text-amber-400" />,
  PipeLine: <PipeLine className="h-5 w-5 text-amber-400" />
};

export default function CompaniesData() {
  const [selectedCompany, setSelectedCompany] = useState<OilCompany | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const { data: companies, isLoading, error } = useQuery({
    queryKey: ['oil-companies'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('oil_companies')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data as OilCompany[];
    }
  });

  if (isLoading) {
    return (
      <Card className="bg-slate-800/50 border-amber-900/30 text-slate-100 p-6">
        <div className="flex justify-center items-center h-40">
          <div className="animate-pulse text-amber-400">Loading company data...</div>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="bg-slate-800/50 border-amber-900/30 text-slate-100 p-6">
        <div className="flex justify-center items-center h-40">
          <div className="text-red-400">Error loading company data</div>
        </div>
      </Card>
    );
  }

  const totalPages = companies ? Math.ceil(companies.length / pageSize) : 0;
  const paginatedCompanies = companies ? companies.slice((page - 1) * pageSize, page * pageSize) : [];

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 border-amber-900/30 text-slate-100">
        <CardHeader>
          <CardTitle className="text-amber-400">Oil Empire Companies</CardTitle>
          <CardDescription className="text-slate-300">
            The major players in the early 20th century oil industry
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-700/50">
                <TableRow>
                  <TableHead className="text-amber-300">Company</TableHead>
                  <TableHead className="text-amber-300">Region</TableHead>
                  <TableHead className="text-amber-300">Founded</TableHead>
                  <TableHead className="text-amber-300">Control Method</TableHead>
                  <TableHead className="text-amber-300 w-14"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedCompanies.map((company) => (
                  <TableRow 
                    key={company.id} 
                    className="hover:bg-slate-700/40 cursor-pointer"
                    onClick={() => setSelectedCompany(company)}
                  >
                    <TableCell className="font-medium text-slate-200">{company.name}</TableCell>
                    <TableCell className="text-slate-300">{company.region}</TableCell>
                    <TableCell className="text-slate-300">{company.founded || "Unknown"}</TableCell>
                    <TableCell className="text-slate-300">{company.control_method}</TableCell>
                    <TableCell className="text-center">
                      {iconMap[company.icon]}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {totalPages > 1 && (
            <Pagination className="mt-4">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    className={page === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                
                {Array.from({ length: totalPages }).map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink 
                      isActive={page === i + 1}
                      onClick={() => setPage(i + 1)}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    className={page === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </CardContent>
      </Card>

      {selectedCompany && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="bg-slate-800/50 border-amber-900/30 text-slate-100">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <div className="bg-amber-900/30 p-3 rounded-full">
                {iconMap[selectedCompany.icon]}
              </div>
              <div>
                <CardTitle className="text-amber-400">{selectedCompany.name}</CardTitle>
                <CardDescription className="text-slate-300">
                  {selectedCompany.region} · Founded {selectedCompany.founded || "Unknown"}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <h3 className="text-amber-300 text-sm font-medium mb-2">Control Method</h3>
                <div className="bg-slate-700/40 border border-amber-900/20 rounded-md px-4 py-2 text-slate-200">
                  {selectedCompany.control_method}
                </div>
              </div>
              <div>
                <h3 className="text-amber-300 text-sm font-medium mb-2">Description</h3>
                <p className="text-slate-300 leading-relaxed">{selectedCompany.description}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
