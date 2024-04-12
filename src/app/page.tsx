import HomeMain from "./home/page";
import AuthGuard from "@/components/auth-header";

export default function Home() {
  return <AuthGuard>
  <HomeMain/>
  </AuthGuard>
}
