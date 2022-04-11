import Button from "./Button";

export default function Footer() {
  return (
    <footer className="bg-gray-800 flex flex-col items-center gap-4 px-4 md:px-96 py-8">
      <h4 className="text-4xl font-medium text-white">I am social</h4>
      <p className=" text-lg font-semibold text-gray-400 text-center">
        Follow me on twitter to stay updated on the latest features
      </p>
      <Button className="bg-blue-500" text="Follow @hepilohq" />
      <div className="flex justify-center gap-x-4 md:gap-x-8 text-white">
        <a href="/" className="hover:text-blue-500">
          Privacy Policy{" "}
        </a>
        <a href="/" className="hover:text-blue-500">
          terms and Conditions{" "}
        </a>
        <a href="/" className="hover:text-blue-500">
          Blog
        </a>
      </div>
    </footer>
  );
}
