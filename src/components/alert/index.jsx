import { Danger } from "iconsax-react";

export default function Alert({ message }) {
  return (
    <div className="mb-3 flex w-full items-center space-x-3 rounded-lg bg-red-300 px-2 py-2">
      <Danger variant="Bold" className="text-red-500" />
      <h3 className="text-sm font-bold">
        Error! <span className="font-normal">{message}</span>{" "}
      </h3>
    </div>
  );
}
