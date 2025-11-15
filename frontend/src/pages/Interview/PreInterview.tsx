import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DarkVeil from '../../components/effects/DarkVeil';

const fadeInStyle = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

export default function PreInterview() {
  const navigate = useNavigate();
  const { assessmentId } = useParams<{ assessmentId: string }>();
  const [isReady, setIsReady] = useState(false);
  const [hasCamera, setHasCamera] = useState(false);
  const [hasMicrophone, setHasMicrophone] = useState(false);
  const [isCheckingPermissions, setIsCheckingPermissions] = useState(false);

  const checkPermissions = async () => {
    setIsCheckingPermissions(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      setHasCamera(true);
      setHasMicrophone(true);
      stream.getTracks().forEach(track => track.stop());
    } catch (err) {
      console.error('Permission denied:', err);
      toast.error('Permissions Required', {
        description: 'Camera and microphone access are required for this interview. Please allow permissions and try again.',
      });
    } finally {
      setIsCheckingPermissions(false);
    }
  };

  const startInterview = () => {
    if (hasCamera && hasMicrophone && isReady) {
      navigate(`/interview/system-design/${assessmentId}`);
    }
  };

  const allRequirementsMet = hasCamera && hasMicrophone && isReady;

  return (
    <>
      <style>{fadeInStyle}</style>
      <div className="min-h-screen w-full flex items-center justify-center p-4 relative">
        <div className="fixed inset-0 -z-10 bg-[#010617]">
          <DarkVeil
            hueShift={240}
            speed={0.25}
            warpAmount={0.15}
            opacity={0.9}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#020b1d]/90 via-[#042941]/70 to-[#001226]/80" />
        </div>

        <Card className="w-full max-w-3xl shadow-[0_35px_80px_rgba(3,8,30,0.6)] relative z-10 bg-[rgba(3_11_26_/_0.85)] border border-sky-500/20 backdrop-blur-2xl my-8" style={{animation: 'fadeIn 0.7s ease-in forwards', opacity: 0}}>
        <CardHeader className="space-y-3 text-center pb-4">
          <div className="flex justify-center mb-4">
            <img
              src="/AceUpLogo.png"
              alt="SystemUOA Logo"
              className="h-20 w-auto"
            />
          </div>
          <CardTitle className="text-3xl font-bold tracking-tight text-white">
            System Design Interview
          </CardTitle>
          <CardDescription className="text-base text-sky-200">
            Assessment ID: <span className="font-mono font-semibold text-white/90">{assessmentId}</span>
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* System Requirements */}
          <div className="bg-gradient-to-br from-[#031427]/60 to-[#051d33]/60 border border-sky-500/25 rounded-2xl p-5 shadow-lg">
            <h3 className="font-semibold text-sky-100 mb-4 flex items-center text-lg">
              <svg className="w-5 h-5 mr-2 text-sky-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              System Requirements
            </h3>
            <ul className="space-y-2 text-sm text-slate-200">
              <li className="flex items-start">
                <span className="mr-2 text-sky-300">•</span>
                <span>Chrome, Firefox, or Safari browser (latest version recommended)</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-sky-300">•</span>
                <span>Stable internet connection (minimum 5 Mbps)</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-sky-300">•</span>
                <span>Working webcam and microphone</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-sky-300">•</span>
                <span>Quiet, well-lit environment</span>
              </li>
            </ul>
          </div>

          {/* Permission Check */}
          <div className="border border-sky-500/25 rounded-2xl p-5 bg-gradient-to-br from-[#021324]/70 to-[#041d33]/70">
            <h3 className="font-semibold text-sky-100 mb-4 flex items-center text-lg">
              <svg className="w-5 h-5 mr-2 text-sky-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
              Permissions Check
            </h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm font-medium text-white">Camera Access</span>
                </div>
                <span className={`text-sm font-semibold ${hasCamera ? 'text-emerald-300' : 'text-slate-400'}`}>
                  {hasCamera ? '✓ Granted' : 'Not Checked'}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                  <span className="text-sm font-medium text-white">Microphone Access</span>
                </div>
                <span className={`text-sm font-semibold ${hasMicrophone ? 'text-emerald-300' : 'text-slate-400'}`}>
                  {hasMicrophone ? '✓ Granted' : 'Not Checked'}
                </span>
              </div>

              <Button
                onClick={checkPermissions}
                disabled={isCheckingPermissions || (hasCamera && hasMicrophone)}
                className="w-full text-white bg-gradient-to-r from-sky-500 via-blue-500 to-cyan-400 border-0 hover:shadow-lg hover:shadow-sky-500/30"
                variant={hasCamera && hasMicrophone ? "secondary" : "default"}
              >
                {isCheckingPermissions ? 'Checking...' : hasCamera && hasMicrophone ? 'Permissions Granted' : 'Check Permissions'}
              </Button>
            </div>
          </div>

          {/* Interview Guidelines */}
          <div className="border border-sky-500/25 rounded-2xl p-5 bg-white/5">
            <h3 className="font-semibold text-sky-100 mb-4 flex items-center text-lg">
              <svg className="w-5 h-5 mr-2 text-sky-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Interview Guidelines
            </h3>
            <ul className="space-y-2 text-sm text-slate-200">
              <li className="flex items-start">
                <span className="mr-2 text-sky-300">•</span>
                <span>Duration: 45 minutes</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-sky-300">•</span>
                <span>You will be monitored via webcam throughout the interview</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-sky-300">•</span>
                <span>Design your solution using the provided canvas</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-sky-300">•</span>
                <span>Explain your thought process clearly</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-sky-300">•</span>
                <span>No external resources or assistance allowed</span>
              </li>
            </ul>
          </div>

          {/* Confirmation Checkbox */}
          <div className="bg-white/5 border border-sky-500/20 rounded-2xl p-4">
            <label className="flex items-start cursor-pointer">
              <input
                type="checkbox"
                checked={isReady}
                onChange={(e) => setIsReady(e.target.checked)}
                className="mt-1 mr-3 w-4 h-4 text-sky-500 border-white/20 rounded focus:ring-sky-400"
              />
              <span className="text-sm text-slate-200">
                I understand and agree to the interview guidelines. I confirm that I am in a quiet environment
                with no distractions, and I will complete this interview independently without external assistance.
              </span>
            </label>
          </div>

          {/* Start Button */}
          <Button
            onClick={startInterview}
            disabled={!allRequirementsMet}
            className="w-full text-white bg-gradient-to-r from-sky-500 via-blue-500 to-cyan-400 border-0 hover:shadow-lg hover:shadow-sky-500/30"
            size="lg"
          >
            {!allRequirementsMet
              ? 'Complete Requirements Above'
              : 'Start Interview'}
          </Button>

          <p className="text-xs text-center text-slate-400">
            By clicking "Start Interview", you consent to being recorded and monitored during this assessment.
          </p>
        </CardContent>
        </Card>
      </div>
    </>
  );
}
