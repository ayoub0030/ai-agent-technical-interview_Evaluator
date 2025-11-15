import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import DarkVeil from "../../components/effects/DarkVeil";

const fadeInStyle = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const AssessmentFinishedPage: React.FC = () => {
  const handleFeedback = () => {
    window.open(
      "mailto:talent@aceup.ai?subject=Interview%20Experience%20Feedback",
      "_blank"
    );
  };

  return (
    <>
      <style>{fadeInStyle}</style>
      <div className="relative min-h-screen overflow-hidden bg-[#030617] px-4 py-10 text-white">
        <div className="absolute inset-0">
          <div className="absolute -top-24 inset-x-10 h-72 bg-gradient-to-r from-sky-500/40 via-blue-500/30 to-indigo-500/40 blur-3xl opacity-70" />
          <div className="absolute bottom-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-sky-500/20 blur-[120px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#010817]/60 via-[#020b1b]/80 to-[#030617]" />
          <DarkVeil hueShift={220} speed={0.35} warpAmount={0.15} noiseIntensity={0.08} opacity={0.8} />
        </div>

        <div className="relative z-10 mx-auto flex max-w-3xl items-center justify-center">
          <Card
            className="w-full border border-white/10 bg-white/5 shadow-[0_25px_120px_rgba(15,23,42,0.55)] backdrop-blur-2xl"
            style={{ animation: "fadeIn 0.7s ease-in forwards", opacity: 0 }}
          >
            <CardHeader className="space-y-4 pb-4 text-center">
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-sky-400/40 blur-2xl" />
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-white/10">
                    <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              </div>
              <p className="text-xs uppercase tracking-[0.35em] text-sky-300">Great work</p>
              <CardTitle className="text-3xl font-semibold text-white sm:text-4xl">
                Assessment successfully submitted
              </CardTitle>
              <p className="mx-auto max-w-2xl text-base text-slate-200">
                Thanks for dedicating the time to complete the interview. Our team is reviewing your submission and will circle back by email with next steps.
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-300">Status</p>
                  <p className="mt-2 text-lg font-semibold text-white">In review</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-300">ETA</p>
                  <p className="mt-2 text-lg font-semibold text-white">2-3 business days</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-300">Need help?</p>
                  <p className="mt-2 text-lg font-semibold text-white">support@aceup.ai</p>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm leading-relaxed text-slate-200">
                <p className="font-semibold text-white">What happens next?</p>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-300">
                  <li>Our reviewers validate recordings, whiteboards, and AI transcripts.</li>
                  <li>You’ll get a detailed score report with strengths & growth areas.</li>
                  <li>If we need clarification, we’ll reach out directly via email.</li>
                </ul>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  asChild
                  className="flex-1 bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 text-base font-semibold text-white shadow-lg shadow-sky-500/20 transition-all hover:from-sky-400 hover:to-indigo-500"
                  size="lg"
                >
                  <Link to="/">Return to portal</Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1 border-sky-400/40 bg-white/5 text-base font-semibold text-sky-100 hover:bg-sky-400/10"
                  onClick={handleFeedback}
                >
                  Share feedback
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default AssessmentFinishedPage;
