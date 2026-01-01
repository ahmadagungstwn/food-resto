import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const Register = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password tidak cocok!");
      return;
    }
    toast.success("Registrasi berhasil!");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background px-6 py-8">
      {/* Back Button */}
      <Button
        variant="icon"
        size="icon"
        onClick={() => navigate(-1)}
        className="mb-8"
      >
        <ArrowLeft className="h-5 w-5" />
      </Button>

      {/* Title */}
      <h1 className="text-3xl font-bold text-foreground mb-2">Buat Akun</h1>
      <p className="text-muted-foreground mb-8">Daftar untuk memulai</p>

      {/* Form */}
      <form onSubmit={handleRegister} className="space-y-4">
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Nama Lengkap"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="pl-12"
            required
          />
        </div>

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
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>

        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Konfirmasi Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="pl-12 pr-12"
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>

        <p className="text-center text-muted-foreground text-sm py-4">
          Dengan mendaftar, Anda menyetujui{" "}
          <Link to="/terms" className="text-primary">
            Syarat & Ketentuan
          </Link>{" "}
          dan{" "}
          <Link to="/privacy" className="text-primary">
            Kebijakan Privasi
          </Link>
        </p>

        <Button type="submit" className="w-full h-14 text-base">
          Daftar
        </Button>
      </form>

      {/* Login Link */}
      <p className="mt-8 text-center text-muted-foreground">
        Sudah punya akun?{" "}
        <Link to="/login" className="text-primary font-semibold hover:underline">
          Masuk
        </Link>
      </p>
    </div>
  );
};

export default Register;
