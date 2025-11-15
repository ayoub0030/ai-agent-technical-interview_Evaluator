import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { authService } from '../../services/auth.service';
import DarkVeil from '../../components/effects/DarkVeil';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await authService.login({ email, password });
      navigate('/admin/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 overflow-hidden">
      <div className="absolute inset-0">
        <DarkVeil
          hueShift={240}
          speed={0.25}
          warpAmount={0.15}
          opacity={0.85}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#020617]/90 via-[#082f49]/70 to-[#001220]/80" />
      </div>

      <Card className="w-full max-w-md shadow-[0_25px_70px_rgba(8,47,73,0.45)] relative z-10 bg-[rgba(6_15_35_/_0.85)] backdrop-blur-xl border border-[#0ea5e9]/30">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <img
              src="/AceUpLogo.png"
              alt="AceupUOA Logo"
              className="h-20 w-auto"
            />
          </div>
          <CardTitle className="text-3xl font-bold tracking-tight text-white">
            AceUp
          </CardTitle>
          <CardDescription className="text-base text-sky-200">
            Recruiter Login Portal
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="bg-red-500/10 border border-red-500/40 text-red-100 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-200">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="recruiter@company.com"
                className="bg-transparent border border-white/30 text-white placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-sky-400/70"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-200">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="bg-transparent border border-white/30 text-white placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-sky-400/70"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full text-white bg-gradient-to-r from-sky-500 via-blue-500 to-cyan-400 hover:shadow-lg hover:shadow-sky-500/30 border-0"
              size="lg"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-slate-200">Don't have an account? </span>
            <Link to="/register" className="text-sky-300 hover:text-sky-200 font-medium">
              Register
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

