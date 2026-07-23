import { EmailForm } from "./EmailForm";

export const EmailCard = () => {
  return (
    <div
      id="emailCard"
      className="flex flex-col outline-2 rounded-3xl outline-accent overflow-clip h-full"
    >
      <div className="bg-primary sm:py-6 sm:px-10 py-5 px-5 text-white">
        <p className="uppercase">get in touch</p>
        <p className="sm:text-3xl text-xl">
          Let's work <i>together.</i>
        </p>
      </div>
      <div className="sm:px-10 sm:pb-10 sm:pt-5 px-5 pt-3 pb-5 flex flex-col grow">
        <EmailForm />
      </div>
    </div>
  );
};
