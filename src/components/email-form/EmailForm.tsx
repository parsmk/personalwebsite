import { useActionState, useState } from "react";
import { InputField } from "../ui-kit/InputField";
import { Success } from "./Success";
import { Spinner } from "../svgs/Spinner";

type FormState = { error: string } | { success: true } | null;

const sendEmail = async (
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> => {
  const email = formData.get("email");
  const name = formData.get("name");
  const subject = formData.get("subject");
  const body = formData.get("body");

  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, name, subject, body }),
  });
  if (!res.ok) return { error: res.statusText };
  return { success: true };
};

export const EmailForm = () => {
  const [reset, setReset] = useState(false);
  const [state, formAction, isPending] = useActionState(sendEmail, null);

  if (!reset && state && "success" in state) {
    return <Success onReset={() => setReset(true)} />;
  }

  return (
    <form action={formAction} className="grow">
      <div className="grid sm:grid-cols-2 gap-2 mx-auto">
        <InputField
          label="Email"
          placeholder="barbarossa@piratescove.ca..."
          name="email"
          required
        />
        <InputField label="Name" placeholder="Barbarossa..." name="name" />
        <div className="col-span-full">
          <InputField
            label="Subject"
            placeholder="re: Black Pearl..."
            name="subject"
          />
        </div>
        <div className="col-span-full">
          <InputField
            label="Body"
            name="body"
            placeholder="yarrr ... Jack Sparrow has stolen the BlackPearl!"
            inputClasses="h-50"
            type="multiline"
            required
          />
        </div>
      </div>
      <hr className="border-t-1 border-accent my-5" />
      <div className="border-accent items-center flex">
        {"error" in (state ?? {}) && (
          <p className="text-red-500 text-sm grow">
            {(state as { error: string }).error}
          </p>
        )}
        {!(state && "error" in state) && (
          <p className="text-foreground/60 grow cursor-default">
            Let's make something worth remembering!
          </p>
        )}
        <button
          className={`flex justify-center btn btn-primary h-[3rem] w-[10rem] ${isPending ? "pointer-events-none" : null}`}
          disabled={isPending}
        >
          {isPending ? (
            <Spinner classes="size-5 text-accent" />
          ) : (
            "Send Message"
          )}
        </button>
      </div>
    </form>
  );
};
