import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col">
        <LoginForm />
      </main>
      <Footer />
    </>
  );
}
