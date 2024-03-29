"use client";

import { ArrowRight, FileSearch, MessageSquare, NotebookPen } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

const tools = [
  {
    label: 'Search',
    icon: FileSearch,
    href: '/conversation',
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },
  {
    label: 'Notes',
    icon: NotebookPen,
    href: '/notes',
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },
]

const DashBoardPage = () => {
  const router = useRouter();
  return (
    <div>
       <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center">
        Experience the power of AI Powered Clinical Tool
        </h2>
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
          Chat with the smartest medical AI
        </p>
      </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-4">
      {tools.map((tool) => (
          <Card onClick={() => router.push(tool.href)} key={tool.href} className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer">
            <div className="flex items-center gap-x-4">
              <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                <tool.icon className={cn("w-8 h-8", tool.color)} />
              </div>
              <div className="font-semibold">
                {tool.label}
              </div>
            </div>
            <ArrowRight className="w-5 h-5" />
          </Card>
        ))}
      </div>
    </div>
  )
}

export default DashBoardPage;
