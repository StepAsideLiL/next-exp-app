import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formSchema = z.object({
  title: z.string().min(1, "Site title is required."),
  description: z.string(),
  url: z.string(),
  authorName: z.string(),
  authorUrl: z.string(),
});
export type TFormSchema = z.infer<typeof formSchema>;
