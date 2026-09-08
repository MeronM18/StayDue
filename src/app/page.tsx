'use client';

import { useState } from 'react';

export default function Page() {
  const [showLMSSelection, setShowLMSSelection] = useState(false);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background: #fafafa;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 2rem;
          }
          
          .login-container {
            width: 100%;
            max-width: 460px;
          }
          
          .login-header {
            text-align: center;
            margin-bottom: 2.5rem;
          }
          
          .login-title {
            font-size: 2rem;
            font-weight: 700;
            color: #1a1a1a;
            margin-bottom: 0.5rem;
          }
          
          .login-title .heart {
            color: #5eb3d6;
            font-size: 1.8rem;
          }
          
          .auth-buttons {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            margin-bottom: 1.5rem;
          }
          
          .auth-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.75rem;
            padding: 1rem;
            background: white;
            color: #1a1a1a;
            border: 2px solid #1a1a1a;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s;
            text-decoration: none;
          }
          
          .auth-btn:hover {
            background: #f5f5f5;
          }
          
          .auth-btn svg,
          .auth-btn .icon {
            width: 20px;
            height: 20px;
            font-size: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          .divider {
            text-align: center;
            margin: 1.5rem 0;
            color: #666;
            font-size: 0.875rem;
            font-weight: 500;
          }
          
          .email-section {
            margin-bottom: 1.5rem;
          }
          
          .email-label {
            display: block;
            font-size: 1rem;
            font-weight: 600;
            color: #1a1a1a;
            margin-bottom: 0.75rem;
          }
          
          .email-input {
            width: 100%;
            padding: 1rem;
            background: #f0f0f0;
            border: none;
            border-radius: 8px;
            font-size: 1rem;
            color: #1a1a1a;
            outline: none;
            transition: background 0.2s;
          }
          
          .email-input::placeholder {
            color: #666;
          }
          
          .email-input:focus {
            background: #e8e8e8;
          }
          
          .continue-btn {
            width: 100%;
            padding: 1rem;
            background: #1a1a1a;
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
            margin-bottom: 1.5rem;
          }
          
          .continue-btn:hover {
            background: #2a2a2a;
          }
          
          .signup-link {
            text-align: center;
            font-size: 0.95rem;
            color: #666;
          }
          
          .signup-link a {
            color: #1a1a1a;
            font-weight: 600;
            text-decoration: underline;
            text-underline-offset: 2px;
          }
          
          .signup-link a:hover {
            color: #4a4a4a;
          }
          
          .edu-notice {
            text-align: center;
            font-size: 0.85rem;
            color: #666;
            line-height: 1.5;
            margin-top: 2rem;
          }
          
          .footer {
            position: fixed;
            bottom: 2rem;
            display: flex;
            gap: 2rem;
            font-size: 0.875rem;
          }
          
          .footer a {
            color: #666;
            text-decoration: none;
            transition: color 0.2s;
          }
          
          .footer a:hover {
            color: #1a1a1a;
          }

          .lms-selection {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            padding: 2rem;
          }

          .lms-modal {
            background: white;
            border-radius: 16px;
            padding: 2rem;
            max-width: 600px;
            width: 100%;
            max-height: 90vh;
            overflow-y: auto;
          }

          .lms-header {
            text-align: center;
            margin-bottom: 2rem;
          }

          .lms-title {
            font-size: 1.75rem;
            font-weight: 700;
            color: #1a1a1a;
            margin-bottom: 0.5rem;
          }

          .lms-subtitle {
            font-size: 0.95rem;
            color: #666;
          }

          .lms-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1rem;
            margin-bottom: 1.5rem;
          }

          .lms-card {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 1.25rem;
            background: white;
            border: 2px solid #e0e0e0;
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.2s;
          }

          .lms-card:hover {
            border-color: #1a1a1a;
            background: #fafafa;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          }

          .lms-icon {
            width: 48px;
            height: 48px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 1.25rem;
            flex-shrink: 0;
          }

          .lms-card-content {
            flex: 1;
          }

          .lms-card-title {
            font-size: 1.1rem;
            font-weight: 600;
            color: #1a1a1a;
            margin-bottom: 0.25rem;
          }

          .lms-card-desc {
            font-size: 0.875rem;
            color: #666;
          }

          .close-btn {
            width: 100%;
            padding: 0.875rem;
            background: #f0f0f0;
            color: #1a1a1a;
            border: none;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
          }

          .close-btn:hover {
            background: #e0e0e0;
          }
          
          @media (max-width: 480px) {
            body {
              padding: 1.5rem;
            }
            
            .login-title {
              font-size: 1.75rem;
            }
            
            .footer {
              position: static;
              margin-top: 3rem;
            }
          }
        `}} />
      <div className="login-container">
          <div className="login-header">
            <h1 className="login-title">Login to StayDue <span className="heart">💙</span></h1>
          </div>
          
          <div className="auth-buttons">
            <a href="/auth/login" className="auth-btn">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign in with Google
            </a>
            
            <button className="auth-btn" onClick={() => setShowLMSSelection(true)}>
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path fill="#1a1a1a" d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
              </svg>
              Sign in with LMS
            </button>
          </div>
          
          <div className="divider">OR</div>
          
          <div className="email-section">
            <label className="email-label">Email</label>
            <input 
              type="email" 
              className="email-input" 
              placeholder="Email address"
            />
          </div>
          
          <button className="continue-btn">Continue with Email</button>
          
          <div className="signup-link">
            Don&apos;t have an account? <a href="#">Sign up</a>
          </div>
          
          <p className="edu-notice">
            Some .edu addresses block sign-in links — use a personal email or Google.
          </p>
        </div>
        
      <div className="footer">
        <a href="#">Terms</a>
        <a href="#">Privacy Policy</a>
      </div>

      {showLMSSelection && (
        <div className="lms-selection" onClick={() => setShowLMSSelection(false)}>
          <div className="lms-modal" onClick={(e) => e.stopPropagation()}>
            <div className="lms-header">
              <h2 className="lms-title">Choose Your Learning Platform</h2>
              <p className="lms-subtitle">Select your school&apos;s learning management system</p>
            </div>

            <div className="lms-grid">
              <div className="lms-card">
                <div className="lms-icon" style={{ background: '#E13E30', color: 'white' }}>
                  <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                    <circle cx="8" cy="8" r="2"/>
                    <circle cx="16" cy="8" r="2"/>
                    <circle cx="12" cy="16" r="2"/>
                    <circle cx="8" cy="16" r="1.5"/>
                    <circle cx="16" cy="16" r="1.5"/>
                  </svg>
                </div>
                <div className="lms-card-content">
                  <div className="lms-card-title">Canvas</div>
                  <div className="lms-card-desc">Most popular in US universities</div>
                </div>
              </div>

              <div className="lms-card">
                <div className="lms-icon" style={{ background: '#000000', color: 'white' }}>
                  <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                    <rect x="4" y="4" width="16" height="16" rx="2"/>
                    <rect x="7" y="7" width="4" height="4" fill="#fff"/>
                    <rect x="13" y="7" width="4" height="4" fill="#fff"/>
                    <rect x="7" y="13" width="10" height="4" fill="#fff"/>
                  </svg>
                </div>
                <div className="lms-card-content">
                  <div className="lms-card-title">Blackboard</div>
                  <div className="lms-card-desc">Large market share in higher education</div>
                </div>
              </div>

              <div className="lms-card">
                <div className="lms-icon" style={{ background: '#f98012', color: 'white' }}>
                  <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                    <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="18" fontWeight="bold">M</text>
                  </svg>
                </div>
                <div className="lms-card-content">
                  <div className="lms-card-title">Moodle</div>
                  <div className="lms-card-desc">Open-source, international presence</div>
                </div>
              </div>

              <div className="lms-card">
                <div className="lms-icon" style={{ background: 'linear-gradient(135deg, #FF6C3A 0%, #0099DD 100%)', color: 'white' }}>
                  <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                    <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="16" fontWeight="bold">D2L</text>
                  </svg>
                </div>
                <div className="lms-card-content">
                  <div className="lms-card-title">Brightspace / D2L</div>
                  <div className="lms-card-desc">Growing in higher education</div>
                </div>
              </div>

              <div className="lms-card">
                <div className="lms-icon" style={{ background: '#25A667', color: 'white' }}>
                  <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                    <path d="M12 2L4 7v10l8 5 8-5V7l-8-5zm0 2.5L17.5 8v8L12 19.5 6.5 16V8L12 4.5z"/>
                    <rect x="9" y="9" width="6" height="2" fill="#F6BB18"/>
                    <rect x="9" y="13" width="6" height="2" fill="#F6BB18"/>
                  </svg>
                </div>
                <div className="lms-card-content">
                  <div className="lms-card-title">Google Classroom</div>
                  <div className="lms-card-desc">K-12 and some colleges</div>
                </div>
              </div>
            </div>

            <button className="close-btn" onClick={() => setShowLMSSelection(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}
