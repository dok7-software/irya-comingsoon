"use client";

import { useId, useState, type FormEvent } from "react";
import { SpinnerIcon } from "@/components/ui/icons";
import { signupForm } from "@/lib/content";
import { cn } from "@/lib/cn";
import { joinWaitlist } from "@/lib/waitlist";

type Status = "idle" | "submitting" | "success" | "error";

type EmailSignupFormProps = {
  /** hero: fila desde Tablet (Inter). footer: columna, input en Geist Mono. */
  variant?: "hero" | "footer";
  className?: string;
};

export function EmailSignupForm({ variant = "hero", className }: EmailSignupFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const inputId = useId();
  const isHero = variant === "hero";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const email = String(new FormData(form).get("email") ?? "").trim();

    setStatus("submitting");
    try {
      await joinWaitlist(email);
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "flex w-full flex-col gap-1.25 overflow-hidden",
        isHero && "tablet:flex-row",
        className,
      )}
    >
      <label htmlFor={inputId} className="sr-only">
        Correo electrónico
      </label>
      <input
        id={inputId}
        name="email"
        type="email"
        required
        autoComplete="email"
        placeholder={signupForm.placeholder}
        onChange={() => status !== "idle" && status !== "submitting" && setStatus("idle")}
        className={cn(
          "h-10 w-full min-w-0 rounded-input border border-neutral-300 bg-neutral-100 p-3",
          "text-sm leading-[1.2] text-neutral-950 outline-none placeholder:text-neutral-400",
          "transition-colors duration-200 ease-framer focus:border-primary-600",
          isHero ? "font-sans tablet:flex-1" : "font-mono",
        )}
      />
      <button
        type="submit"
        disabled={status === "submitting"}
        aria-live="polite"
        className={cn(
          "relative flex h-10 w-full shrink-0 items-center justify-center rounded-input text-body-mono",
          "transition-colors duration-200 ease-framer disabled:opacity-50",
          status === "error"
            ? "bg-[rgb(255_34_68/0.15)] text-[#f00]"
            : "bg-lime text-deep-violet hover:bg-[#c6ec6c]",
          isHero && "tablet:w-34",
        )}
      >
        <span className={cn(status === "submitting" && "invisible")}>
          {status === "success"
            ? signupForm.success
            : status === "error"
              ? signupForm.error
              : signupForm.submit}
        </span>
        {status === "submitting" && (
          <SpinnerIcon className="absolute size-5 animate-spin" aria-label="Enviando" />
        )}
      </button>
    </form>
  );
}
