import { useState } from "react";
import { EmailForm } from "./EmailForm";
import { Success } from "./Success";

export const EmailCard = () => {
  const [sent, setSent] = useState<boolean>(false);
  return (
    <div className="flex flex-col sm:h-170 lg:w-[40%] outline-2 rounded-3xl outline-accent overflow-hidden">
      <div className="bg-primary py-6 px-10 text-white">
        <p className="uppercase">get in touch</p>
        <p className="text-3xl">
          Let's work <i>together.</i>
        </p>
      </div>
      <div className="p-10 flex flex-col grow">
        {!sent ? (
          <EmailForm setSent={setSent} />
        ) : (
          <Success setSent={setSent} />
        )}
      </div>
    </div>
  );
};
