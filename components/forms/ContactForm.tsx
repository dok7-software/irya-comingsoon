"use client";

import { useState, type FormEvent } from "react";
import { buttonClasses } from "@/components/ui/Button";
import { SpinnerIcon } from "@/components/ui/icons";
import { contactPage } from "@/lib/content";
import { sendContactMessage } from "@/lib/contact";
import { cn } from "@/lib/cn";

type Status = "idle" | "submitting" | "success" | "error";

const fieldClass =
  "w-full rounded-input border border-neutral-300 bg-neutral-100 p-3 text-sm leading-[1.4] text-neutral-950 outline-none placeholder:text-neutral-400 transition-colors duration-200 ease-framer focus:border-primary-600";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setStatus("submitting");
    try {
      await sendContactMessage({
        name: String(data.get("name") ?? ""),
        email: String(data.get("email") ?? ""),
        message: String(data.get("message") ?? ""),
      });
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-start gap-2 rounded-card bg-neutral-50 px-6 py-8 text-left shadow-[2px_2px_4px_0_rgb(0_0_0/0.12)]">
        <p className="font-heading text-h4 font-medium">{contactPage.success}</p>
        <p className="text-body font-medium text-neutral-700">{contactPage.successDetail}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4 text-left">
      <label className="flex flex-col gap-1.5">
        <span className="text-body-mono font-medium text-neutral-800">{contactPage.name}</span>
        <input
          name="name"
          type="text"
          required
          minLength={2}
          maxLength={80}
          autoComplete="name"
          placeholder={contactPage.namePlaceholder}
          onChange={() => status === "error" && setStatus("idle")}
          className={cn(fieldClass, "h-10")}
        />
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="text-body-mono font-medium text-neutral-800">{contactPage.email}</span>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder={contactPage.emailPlaceholder}
          onChange={() => status === "error" && setStatus("idle")}
          className={cn(fieldClass, "h-10")}
        />
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="text-body-mono font-medium text-neutral-800">{contactPage.message}</span>
        <textarea
          name="message"
          required
          minLength={5}
          maxLength={4000}
          rows={5}
          placeholder={contactPage.messagePlaceholder}
          onChange={() => status === "error" && setStatus("idle")}
          className={cn(fieldClass, "min-h-32 resize-y")}
        />
      </label>
      <button
        type="submit"
        disabled={status === "submitting"}
        className={cn(buttonClasses({ variant: "lime" }), "relative w-full tablet:w-auto")}
      >
        <span className={cn(status === "submitting" && "invisible")}>
          {status === "error" ? contactPage.error : contactPage.submit}
        </span>
        {status === "submitting" && (
          <SpinnerIcon className="absolute size-5 animate-spin" aria-label="Enviando" />
        )}
      </button>
    </form>
  );
}
