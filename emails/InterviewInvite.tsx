// emails/InterviewInvite.tsx

import React from 'react'
import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Preview,
    Section,
    Text,
  } from '@react-email/components'
  
  interface InterviewInviteEmailProps {
    candidateName: string
    interviewLink: string
    companyName: string
    expiresAt: string
  }
  
  export default function InterviewInviteEmail({
    candidateName,
    interviewLink,
    companyName,
    expiresAt,
  }: InterviewInviteEmailProps) {
    return (
      <Html>
        <Head />
        <Preview>Your System Design Interview Link - {companyName}</Preview>
        <Body style={main}>
          <Container style={container}>
            <Section style={badgeRow}>
              <Text style={badge}>AceUp · Interview Invite</Text>
            </Section>

            <Heading style={h1}>Your system design interview is ready</Heading>
            <Text style={tagline}>
              Hi {candidateName}, we’re excited to see how you architect solutions. This assessment was prepared by <strong>{companyName}</strong>.
            </Text>
            <Text style={bodyText}>
              You&apos;ve been invited to complete a system design interview for <strong>{companyName}</strong>.
              This is an online assessment where you&apos;ll design a system architecture and explain your approach.
            </Text>

            <Section style={grid}>
              <div style={gridItem}>
                <Text style={gridLabel}>Window</Text>
                <Text style={gridValue}>45 minutes</Text>
              </div>
              <div style={gridItem}>
                <Text style={gridLabel}>Expires</Text>
                <Text style={gridValue}>{expiresAt}</Text>
              </div>
              <div style={gridItem}>
                <Text style={gridLabel}>Format</Text>
                <Text style={gridValue}>Diagram + Voice</Text>
              </div>
            </Section>

            <Section style={box}>
              <Text style={boxTitle}>What to expect</Text>
              <ul style={list}>
                <li>Interactive canvas to sketch your architecture</li>
                <li>AI interviewer guiding the conversation</li>
                <li>Automated proctoring for fairness</li>
                <li>Scoring on five core pillars</li>
              </ul>
            </Section>

            <Section style={buttonContainer}>
              <Button style={button} href={interviewLink}>
                Launch Interview Workspace
              </Button>
            </Section>

            <Section style={noteBox}>
              <Text style={noteTitle}>Before you begin</Text>
              <ul style={list}>
                <li>Use Chrome or Edge on desktop</li>
                <li>Enable camera + microphone permissions</li>
                <li>Find a quiet space with reliable internet</li>
                <li>This unique link can only be used once</li>
              </ul>
            </Section>

            <Hr style={hr} />
            <Text style={footer}>
              Need help? Reply to this email and our team will respond shortly.
            </Text>
            <Text style={footer}>
              Link not working? Copy and paste this URL into your browser:<br />
              <code style={code}>{interviewLink}</code>
            </Text>
          </Container>
        </Body>
      </Html>
    )
  }
  
  // ============================================
  // STYLES - Matching Login & Card Components
  // ============================================

  const main = {
    background: '#010617',
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
    padding: '48px 0',
  }

  const container = {
    background: 'rgba(2, 13, 29, 0.96)',
    backgroundImage: 'linear-gradient(135deg, rgba(14,165,233,0.12), rgba(37,99,235,0.08))',
    border: '1px solid rgba(14,165,233,0.25)',
    margin: '0 auto',
    padding: '52px 48px',
    borderRadius: '22px',
    maxWidth: '640px',
    boxShadow: '0 35px 80px rgba(3, 8, 30, 0.65)',
  }

  const badgeRow = {
    display: 'flex',
    justifyContent: 'center',
  }

  const badge = {
    display: 'inline-block',
    padding: '6px 16px',
    borderRadius: '999px',
    background: 'rgba(14,165,233,0.15)',
    color: '#7dd3fc',
    fontSize: '13px',
    letterSpacing: '0.08em',
    textTransform: 'uppercase' as const,
    border: '1px solid rgba(56,189,248,0.4)',
  }

  const h1 = {
    color: '#f8fafc',
    fontSize: '30px',
    fontWeight: 700,
    margin: '28px 0 12px',
    textAlign: 'center' as const,
    letterSpacing: '-0.01em',
  }

  const tagline = {
    color: '#cbd5f5',
    fontSize: '16px',
    lineHeight: '28px',
    textAlign: 'center' as const,
    margin: '0 0 28px',
  }

  const bodyText = {
    color: '#e2e8f0',
    fontSize: '15px',
    lineHeight: '26px',
    margin: '0 auto 28px',
    maxWidth: '520px',
    textAlign: 'center' as const,
  }

  const grid = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '16px',
    margin: '0 auto 28px',
    maxWidth: '520px',
  }

  const gridItem = {
    padding: '18px',
    borderRadius: '14px',
    border: '1px solid rgba(148,163,184,0.18)',
    background: 'rgba(2, 20, 39, 0.7)',
    textAlign: 'center' as const,
  }

  const gridLabel = {
    color: 'rgba(148,163,184,0.9)',
    fontSize: '12px',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.1em',
    marginBottom: '6px',
  }

  const gridValue = {
    color: '#e0f2fe',
    fontSize: '16px',
    fontWeight: 600,
  }

  const box = {
    backgroundColor: 'rgba(4, 24, 42, 0.85)',
    border: '1px solid rgba(56,189,248,0.25)',
    borderRadius: '16px',
    margin: '28px 0',
    padding: '26px',
  }

  const noteBox = {
    ...box,
    backgroundColor: 'rgba(2, 20, 39, 0.9)',
  }

  const boxTitle = {
    color: '#f0f9ff',
    fontSize: '18px',
    fontWeight: 600,
    margin: '0 0 16px',
  }

  const list = {
    color: '#cbd5f5',
    fontSize: '15px',
    lineHeight: '26px',
    margin: 0,
    paddingLeft: '20px',
  }

  const buttonContainer = {
    margin: '36px 0',
    textAlign: 'center' as const,
  }

  const button = {
    backgroundImage: 'linear-gradient(90deg,#0ea5e9,#2563eb)',
    borderRadius: '999px',
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: 600,
    textDecoration: 'none',
    textAlign: 'center' as const,
    display: 'inline-block',
    padding: '16px 48px',
    boxShadow: '0 15px 35px rgba(14,165,233,0.35)',
  }

  const noteTitle = {
    ...boxTitle,
    marginBottom: '12px',
  }

  const hr = {
    borderColor: 'rgba(120,146,181,0.25)',
    margin: '36px 0',
  }

  const footer = {
    color: 'rgba(148,163,184,0.9)',
    fontSize: '14px',
    lineHeight: '24px',
    margin: '12px 0',
  }

  const code = {
    backgroundColor: 'rgba(2, 20, 39, 0.95)',
    color: '#7dd3fc',
    padding: '8px 12px',
    borderRadius: '8px',
    fontSize: '13px',
    fontFamily: 'monospace',
    wordBreak: 'break-all' as const,
  }