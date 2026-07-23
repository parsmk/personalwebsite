import { EmailForm } from "./EmailForm";

export const EmailCard = () => {
  return (
    <div
      id="emailCard"
      className="flex flex-col outline-2 rounded-3xl outline-accent overflow-clip"
    >
      <div className="bg-primary py-6 px-10 text-white">
        <p className="uppercase">get in touch</p>
        <p className="text-3xl">
          Let's work <i>together.</i>
        </p>
      </div>
      <div className="p-10 flex flex-col grow">
        <EmailForm />
      </div>
    </div>
  );
};
