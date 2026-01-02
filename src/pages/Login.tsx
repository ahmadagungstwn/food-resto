import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import googleIcon from "@/assets/google.png";
import facebookIcon from "@/assets/facebook.png";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Login berhasil!");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      {/* Logo */}
      <div className="mb-8 text-6xl">🍔</div>

      {/* Title */}
      <h1 className="text-3xl font-bold text-foreground mb-2">
        Selamat Datang
      </h1>
      <p className="text-muted-foreground mb-8">Masuk untuk melanjutkan</p>

      {/* Form */}
      <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-12"
            required
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-12 pr-12"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>

        <div className="text-right">
          <Link
            to="/forgot-password"
            className="text-primary text-sm hover:underline"
          >
            Lupa password?
          </Link>
        </div>

        <Button type="submit" className="w-full h-14 text-base">
          Masuk
        </Button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-4 my-8 w-full max-w-sm">
        <div className="flex-1 h-px bg-border" />
        <span className="text-muted-foreground text-sm">atau</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      {/* Social Login */}
      <div className="flex gap-4">
        <Button variant="secondary" size="icon-lg" className="rounded-full">
          <img src={googleIcon} alt="Login with Google" className="w-9 h-9" />
        </Button>

        <Button variant="secondary" size="icon-lg" className="rounded-full">
          <img
            src={facebookIcon}
            alt="Login with Facebook"
            className="w-12 h-12"
          />
        </Button>
      </div>

      {/* Register Link */}
      <p className="mt-8 text-muted-foreground">
        Belum punya akun?{" "}
        <Link
          to="/register"
          className="text-primary font-semibold hover:underline"
        >
          Daftar
        </Link>
      </p>
    </div>
  );
};

export default Login;
