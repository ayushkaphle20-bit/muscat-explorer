"use client";

import { Trash2 } from "lucide-react";

export default function DeleteButton({
  action,
  fieldName,
  fieldValue,
  confirmMessage = "Are you sure?",
}: {
  action: (formData: FormData) => Promise<void>;
  fieldName: string;
  fieldValue: string;
  confirmMessage?: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(confirmMessage)) e.preventDefault();
      }}
    >
      <input type="hidden" name={fieldName} value={fieldValue} />
      <button
        type="submit"
        className="text-[var(--color-ink-soft)] hover:text-red-700"
        title="Delete"
      >
        <Trash2 size={15} />
      </button>
    </form>
  );
}
