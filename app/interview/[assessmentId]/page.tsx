'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'

export default function PreInterviewPage() {
  const params = useParams()
  const router = useRouter()
  const assessmentId = params.assessmentId as string
  const [isReady, setIsReady] = useState(false)
  const [hasCamera, setHasCamera] = useState(false)
  const [hasMicrophone, setHasMicrophone] = useState(false)
  const [isCheckingPermissions, setIsCheckingPermissions] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const checkPermissions = async () => {
    setIsCheckingPermissions(true)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      })
      setHasCamera(true)
      setHasMicrophone(true)
      stream.getTracks().forEach(track => track.stop())
    } catch (err) {
      console.error('Permission denied:', err)
      alert('Camera and microphone access are required for this interview. Please allow permissions and try again.')
    } finally {
      setIsCheckingPermissions(false)
    }
  }

  const startInterview = () => {
    if (hasCamera && hasMicrophone && isReady) {
      router.push(`/interview/${assessmentId}/start`)
    }
  }

  const allRequirementsMet = hasCamera && hasMicrophone && isReady

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: #010617;
        }

        @keyframes floatIn {
          from {
            opacity: 0;
            transform: translateY(15px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .float-in {
          animation: floatIn 0.5s cubic-bezier(0.4, 0, 0.2, 1) backwards;
        }

        .checkbox-simple {
          appearance: none;
          width: 18px;
          height: 18px;
          border: 1.5px solid #666;
          border-radius: 3px;
          background: #000;
          cursor: pointer;
          position: relative;
          transition: all 0.2s ease;
        }

        .checkbox-simple:checked {
          background: #fff;
          border-color: #fff;
        }

        .checkbox-simple:checked::after {
          content: '';
          position: absolute;
          top: 1px;
          left: 5px;
          width: 4px;
          height: 9px;
          border: solid #000;
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
        }

        .checkbox-simple:hover {
          border-color: #999;
        }
      `}</style>

      <div className="min-h-screen bg-[#010617] flex items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-[#031531]/90 via-[#042941]/70 to-[#001226]/85" />
          <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 20% 20%, rgba(14,165,233,0.25), transparent 55%), radial-gradient(circle at 80% 40%, rgba(45,212,191,0.15), transparent 50%)' }} />
        </div>
        <div className="max-w-3xl w-full">
          {/* Header */}
          <div
            className={`bg-[rgba(3,11,26,0.85)] border border-sky-500/25 rounded-t-3xl p-8 shadow-[0_35px_80px_rgba(3,8,30,0.6)] backdrop-blur-xl ${mounted ? 'float-in' : 'opacity-0'}`}
            style={{ animationDelay: '0ms' }}
          >
            <div className="text-center">
              <svg className="w-12 h-12 text-sky-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-sm uppercase tracking-[0.35em] text-sky-200 mb-3">AceUp Interview</p>
              <h1 className="text-3xl font-bold text-white mb-2">
                System Design Interview
              </h1>
              <div className="inline-flex items-center space-x-2 border border-white/10 px-4 py-2 rounded-full bg-white/5">
                <span className="text-xs text-slate-300">Assessment ID</span>
                <span className="font-mono text-xs text-white/90">{assessmentId}</span>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div
            className={`bg-[rgba(3,11,26,0.85)] border-x border-sky-500/20 p-8 space-y-5 backdrop-blur-xl ${mounted ? 'float-in' : 'opacity-0'}`}
            style={{ animationDelay: '100ms' }}
          >
            {/* Welcome Message */}
            <div className="border border-sky-500/20 rounded-2xl p-5 bg-gradient-to-br from-[#031427]/70 to-[#041a2f]/70 shadow-lg">
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-sky-300 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h2 className="font-semibold text-sky-100 text-base mb-1">Before you begin</h2>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Complete each checkpoint to unlock the workspace. We recommend Chrome or Edge on desktop, a quiet space, and a stable camera view.
                  </p>
                </div>
              </div>
            </div>

            {/* Requirements */}
            <div
              className={`space-y-4 ${mounted ? 'float-in' : 'opacity-0'}`}
              style={{ animationDelay: '250ms' }}
            >
              <h3 className="text-base font-semibold text-sky-100 flex items-center">
                <span className="bg-gradient-to-br from-sky-500 to-cyan-400 text-black w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold mr-3 shadow-lg">
                  01
                </span>
                System requirements
              </h3>

              <div className="space-y-3">
                {/* Camera & Mic */}
                <div className={`border rounded-2xl p-4 transition-all backdrop-blur-lg ${
                  hasCamera && hasMicrophone
                    ? 'border-emerald-300/60 bg-emerald-300/10 shadow-[0_10px_30px_rgba(16,185,129,0.25)]'
                    : 'border-white/10 bg-white/5'
                }`}>
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <div className="flex-shrink-0 mt-0.5">
                      {hasCamera && hasMicrophone ? (
                        <div className="w-6 h-6 bg-emerald-300 rounded-full flex items-center justify-center">
                          <svg className="w-3.5 h-3.5 text-emerald-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      ) : (
                        <input
                          type="checkbox"
                          checked={hasCamera && hasMicrophone}
                          onChange={checkPermissions}
                          disabled={isCheckingPermissions}
                          className="checkbox-simple"
                        />
                      )}
                    </div>
                    <div className="flex-1" onClick={!hasCamera || !hasMicrophone ? checkPermissions : undefined}>
                      <div className="flex items-center space-x-2 mb-1">
                        <svg className="w-5 h-5 text-sky-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        <span className="font-medium text-white text-sm">Camera & microphone access</span>
                        {hasCamera && hasMicrophone && (
                          <span className="text-xs bg-emerald-300/90 text-emerald-900 px-2 py-0.5 rounded-full font-semibold">
                            Granted
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Required for AI interviewer and proctoring
                      </p>
                    </div>
                  </label>
                </div>

                {/* Ready */}
                <div className={`border rounded-2xl p-4 transition-all backdrop-blur-lg ${
                  isReady
                    ? 'border-sky-300/70 bg-sky-300/10 shadow-[0_10px_30px_rgba(56,189,248,0.25)]'
                    : 'border-white/10 bg-white/5'
                }`}>
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <div className="flex-shrink-0 mt-0.5">
                      {isReady ? (
                        <div className="w-6 h-6 bg-sky-300 rounded-full flex items-center justify-center">
                          <svg className="w-3.5 h-3.5 text-sky-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      ) : (
                        <input
                          type="checkbox"
                          checked={isReady}
                          onChange={(e) => setIsReady(e.target.checked)}
                          className="checkbox-simple"
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <svg className="w-5 h-5 text-sky-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-medium text-white text-sm">I am ready to begin</span>
                        {isReady && (
                          <span className="text-xs bg-sky-300/90 text-sky-900 px-2 py-0.5 rounded-full font-semibold">
                            Confirmed
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Quiet surroundings, stable internet, no interruptions
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Guidelines */}
            <div
              className={`border border-sky-500/20 rounded-2xl p-5 bg-gradient-to-br from-[#021324]/60 to-[#051d33]/60 ${mounted ? 'float-in' : 'opacity-0'}`}
              style={{ animationDelay: '400ms' }}
            >
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-sky-300 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div>
                  <h3 className="font-semibold text-sky-100 text-base mb-2">Interview guidelines</h3>
                  <ul className="space-y-1.5 text-sm text-slate-300">
                    <li className="flex items-start">
                      <span className="text-sky-300 mr-2">•</span>
                      <span><strong className="text-white">45 minute window</strong> — auto submit at deadline</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-sky-300 mr-2">•</span>
                      <span><strong className="text-white">Single attempt</strong> — no retries once started</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-sky-300 mr-2">•</span>
                      <span><strong className="text-white">Stay visible</strong> — camera on, face centered</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-sky-300 mr-2">•</span>
                      <span><strong className="text-white">No tab switching</strong> — keep focus on the workspace</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-sky-300 mr-2">•</span>
                      <span><strong className="text-white">Work solo</strong> — no assistance or spectators</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div
            className={`bg-[rgba(3,11,26,0.9)] border border-sky-500/20 rounded-b-3xl p-6 shadow-[0_25px_60px_rgba(3,8,30,0.35)] ${mounted ? 'float-in' : 'opacity-0'}`}
            style={{ animationDelay: '550ms' }}
          >
            <button
              onClick={startInterview}
              disabled={!allRequirementsMet}
              className={`w-full py-3.5 px-6 rounded-full font-semibold text-sm transition-all ${
                allRequirementsMet
                  ? 'bg-gradient-to-r from-sky-500 via-blue-500 to-cyan-400 text-white shadow-lg shadow-sky-500/30 hover:shadow-sky-500/45 cursor-pointer'
                  : 'bg-white/5 text-slate-500 cursor-not-allowed border border-white/10'
              }`}
            >
              {allRequirementsMet ? (
                <span className="flex items-center justify-center space-x-2">
                  <span>Start Interview</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              ) : (
                'Complete all requirements to continue'
              )}
            </button>

            <div className="mt-4 flex items-center justify-center space-x-2 text-xs text-slate-400">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Need help? Contact support</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
