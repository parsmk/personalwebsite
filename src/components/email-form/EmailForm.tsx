import type { Dispatch, SetStateAction } from "react";
import InputField from "./InputField";

export const EmailForm = ({
  setSent,
}: {
  setSent: Dispatch<SetStateAction<boolean>>;
}) => {
  const handleSubmit = () => {
    setSent(true);
  };

  return (
    <form onSubmit={handleSubmit} className="grow">
      <div className="grid sm:grid-cols-2 gap-2 mx-auto">
        <InputField
          label="Email"
          placeholder="barborossa@piratescove.ca..."
          name="email"
        />
        <InputField label="Name" placeholder="Barborossa..." name="name" />
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
            placeholder="Captain Jack Sparrow has stolen my ship!"
            inputClasses="h-50"
            multiline
          />
        </div>
      </div>
      <hr className="border-t-1 border-accent my-5" />
      <div className="border-accent items-center flex">
        <p className="text-foreground/60 grow cursor-default">
          Let's make something worth remembering!
        </p>
        <button className="btn btn-primary">Send Message</button>
      </div>
    </form>
  );
};
