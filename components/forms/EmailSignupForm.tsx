"use client";

import { useId, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { signupForm } from "@/lib/content";
import { cn } from "@/lib/cn";

type Status = "idle" | "invalid" | "success";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type EmailSignupFormProps = {
  /** inline: input y botón en fila (hero). stacked: uno debajo del otro (footer). */
  layout?: "inline" | "stacked";
  className?: string;
};

export function EmailSignupForm({ layout = "inline", className }: EmailSignupFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const inputId = useId();
  const messageId = useId();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = String(new FormData(event.currentTarget).get("email") ?? "").trim();

    if (!EMAIL_PATTERN.test(email)) {
      setStatus("invalid");
      return;
    }

    // TODO: conectar con el servicio de lista de espera.
    setStatus("success");
    event.currentTarget.reset();
  }

  const stacked = layout === "stacked";

  return (
    <form onSubmit={handleSubmit} noValidate className={cn("relative w-full", className)}>
      <div className={cn("flex gap-2.5", stacked ? "flex-col gap-1.5" : "flex-col sm:flex-row")}>
        <label htmlFor={inputId} className="sr-only">
          Correo electrónico
        </label>
        <input
          id={inputId}
          name="email"
          type="email"
          autoComplete="email"
          placeholder={signupForm.placeholder}
          aria-invalid={status === "invalid"}
          aria-describedby={status === "idle" ? undefined : messageId}
          onChange={() => status !== "idle" && setStatus("idle")}
          className={cn(
            "w-full min-w-0 rounded-lg border border-field-border bg-field px-3 text-base text-ink",
            "placeholder:text-ink-muted/55 transition-colors outline-none",
            "focus:border-ink-muted focus:bg-white",
            "aria-invalid:border-red-400",
            stacked ? "h-10 sm:h-12.5" : "h-11 sm:h-11.5 sm:flex-1",
          )}
        />
        <Button
          type="submit"
          size={stacked ? "md" : "lg"}
          className={cn(stacked ? "h-10 w-full sm:h-12" : "h-11 sm:h-11.5 sm:w-40")}
        >
          {signupForm.submit}
        </Button>
      </div>
      <p
        id={messageId}
        role="status"
        className={cn(
          // Absoluto para no desplazar el layout al mostrar el mensaje.
          "absolute inset-x-0 top-full mt-1.5 text-sm",
          status === "invalid" ? "text-red-500" : "text-ink-muted",
          status === "idle" && "invisible",
        )}
      >
        {status === "invalid" ? signupForm.invalid : status === "success" ? signupForm.success : ""}
      </p>
    </form>
  );
}
