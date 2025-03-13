import { PageTransition } from "../components/PageTransition";
import { LogInForm } from "../components/logIn/LogInForm";

export function LogIn() {
  return (
    <PageTransition>
      <main className="min-h-fit max-w-xl px-4 sm:px-6 lg:px-8 py-12 m-auto flex">
        <div className="w-full mx-auto grid gap-2">
          <LogInForm />
        </div>
      </main>
    </PageTransition>
  );
}
