import { Checkmark } from "../svgs/Checkmark";

export const Success = ({ onReset }: { onReset: () => void }) => {
  return (
    <div className="flex flex-col items-center justify-center grow gap-10">
      <div>
        <Checkmark classes="size-25 mx-auto text-primary" />
        <div className="py-2 px-5 mt-5 rounded-4xl bg-secondary/10 text-primary uppercase font-semibold">
          Message Sent
        </div>
      </div>
      <div className="text-center animate-fade-up">
        <p className="text-3xl font-bold mb-5">I'll be in touch!</p>
        <p className="font-semibold text-black/50">
          Thanks for reaching out! I will get back to you shortly.{" "}
        </p>
      </div>
      <button
        className="btn btn-outline animate-fade-up"
        onClick={onReset}
      >
        Send another message
      </button>
    </div>
  );
};
