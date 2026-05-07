export function formLevelErrorClass() {
  return "rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-center text-sm text-red-800";
}

export function FieldError({ id, message }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1 text-center text-sm text-red-600" role="alert">
      {message}
    </p>
  );
}
