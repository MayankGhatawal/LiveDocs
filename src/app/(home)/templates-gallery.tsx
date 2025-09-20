"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { api } from "../../../convex/_generated/api";

const templates = [
  { id: "blank", label: "Blank Document", imageUrl: "/blank-document.svg" },
  {
    id: "software-proposal",
    label: "Software Development Proposal",
    imageUrl: "/software-proposal.svg",
  },
  {
    id: "project-proposal",
    label: "Project Proposal",
    imageUrl: "/project-proposal.svg",
  },
  {
    id: "business-letter",
    label: "Business Letter",
    imageUrl: "/business-letter.svg",
  },
  { id: "resume", label: "Resume", imageUrl: "/resume.svg" },
  { id: "cover-letter", label: "Cover Letter", imageUrl: "/cover-letter.svg" },
  { id: "letter", label: "Letter", imageUrl: "/letter.svg" },
];

export const TemplateGallery = () => {
  const router = useRouter();
  const create = useMutation(api.documents.create);
  const [isCreated, setIsCreated] = useState(false);

  const onTemplateClick = (title: string, initialContent: string) => {
    setIsCreated(true);
    create({ title, initialContent })
      .then((documentId) => {
        router.push(`/documents/${documentId}`);
      })
      .finally(() => {
        setIsCreated(false);
      });
  };
  return (
    <div className="bg-[#F1F3F4]">
      <div className="max-w-screen-xl mx-auto px-16 py-6 flex flex-col gap-y-4">
        <h3 className="font-medium">Choose Template</h3>
        <Carousel>
          <CarouselContent className="-ml-4">
            {templates.map((template) => (
              <CarouselItem
                key={template.id}
                className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 2xl:basis-[14.285714%] pl-4"
              >
                <div
                  className={cn(
                    "aspect-[3/4] flex flex-col gap-y-2.5",
                    isCreated && "pointer-events-none opacity-50"
                  )}
                >
                  <button
                    disabled={isCreated}
                    onClick={() => onTemplateClick(template.label, "")}
                    style={{
                      backgroundImage: `url(${template.imageUrl})`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                    }}
                    className="size-full hover:border-blue-500 rounded-sm border hover:bg-blue-50 transition flex flex-col items-center justify-center gap-y-4 bg-white"
                  ></button>
                  <p className="text-sm font-medium truncate">
                    {template.label}
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};
