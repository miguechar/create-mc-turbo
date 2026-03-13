import NavBar from "~/features/landing/components/navBar";

export default function HomePage() {
  return (
    <div>
      <nav className="bg-primary flex items-center justify-center">
        <h1 className="text-xs">DEVELOPMENT</h1>
      </nav>
      <NavBar />
      <div className="flex h-screen w-full flex-col items-center justify-center gap-3">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Create <span className="text-primary">MC</span> Turbo
        </h1>
      </div>
    </div>
  );
}
