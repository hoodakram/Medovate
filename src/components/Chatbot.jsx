import { useState, useEffect, useRef } from 'react';

// ── CONFIG ────────────────────────────────────────────────────────
const N8N_WEBHOOK =
  import.meta.env.VITE_N8N_WEBHOOK ||
  'https://rajaahmad.app.n8n.cloud/webhook-test/3ed1887e-bafe-4bf0-b50c-2a5a18a9857b';

const POPUP_MESSAGES = [
  { icon: '👋', title: 'Welcome to Medovate!', body: 'Need to book an appointment? I can help right now.' },
  { icon: '🕐', title: 'Quick Response', body: 'Our AI assistant replies instantly — 24/7, no waiting.' },
  { icon: '📅', title: 'Book in Seconds', body: 'Tell me your preferred date and I\'ll find the best slot for you.' },
  { icon: '🏥', title: 'All Departments', body: 'Cardiology, Neurology, Orthopedics & more — ask me anything!' },
  { icon: '🚨', title: 'Emergency?', body: 'For emergencies call +92 325 3829124 or chat with us now.' },
  { icon: '💊', title: 'Got Questions?', body: 'Ask about doctors, tests, fees — I\'m here to help.' },
];

const QUICK_CHIPS = [
  { label: '📅 Book Appointment', text: 'I want to book an appointment' },
  { label: '👨‍⚕️ Find a Doctor',    text: 'Which doctors are available?' },
  { label: '🏥 Departments',       text: 'List all departments' },
  { label: '🕐 Working Hours',     text: 'What are your working hours?' },
];

const WELCOME_MSG =
  "Hello! 👋 I'm the **Medovate AI Assistant**. I can help you book appointments, find a specialist, or answer any questions about our hospital. How can I assist you today?";
// ─────────────────────────────────────────────────────────────────

function now() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function RenderMsg({ text }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <span>
      {parts.map((p, i) =>
        p.startsWith('**') ? <strong key={i}>{p.slice(2, -2)}</strong> : p
      )}
    </span>
  );
}

export default function MedovateChat() {
  const [open, setOpen]                 = useState(false);
  const [messages, setMessages]         = useState([{ role: 'bot', text: WELCOME_MSG, time: now() }]);
  const [input, setInput]               = useState('');
  const [busy, setBusy]                 = useState(false);
  const [popup, setPopup]               = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const [unread, setUnread]             = useState(1);
  const [msgIdx, setMsgIdx]             = useState(0);
  const [btnPulse, setBtnPulse]         = useState(false);
  const [lastFailedMsg, setLastFailedMsg] = useState(null);
  const msgsRef    = useRef(null);
  const inputRef   = useRef(null);
  const hideTimer  = useRef(null);

  // Popup cycle — fires every 8s when chat is closed
  useEffect(() => {
    if (open) { setPopupVisible(false); return; }

    function showNextPopup() {
      const msg = POPUP_MESSAGES[msgIdx % POPUP_MESSAGES.length];
      setPopup(msg);
      setPopupVisible(true);
      setBtnPulse(true);
      setTimeout(() => setBtnPulse(false), 600);
      clearTimeout(hideTimer.current);
      hideTimer.current = setTimeout(() => setPopupVisible(false), 5000);
      setMsgIdx(i => i + 1);
    }

    const first = setTimeout(showNextPopup, 3000);
    const loop  = setInterval(showNextPopup, 11000);
    return () => {
      clearTimeout(first);
      clearInterval(loop);
      clearTimeout(hideTimer.current);
    };
  }, [open, msgIdx]);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight;
  }, [messages, busy]);

  // Focus input when opening
  useEffect(() => {
    if (open) { setUnread(0); setTimeout(() => inputRef.current?.focus(), 280); }
  }, [open]);

  async function send(text, isRetry = false) {
    const msg = (text || input).trim();
    if (!msg || busy) return;
    setInput('');
    setBusy(true);
    setLastFailedMsg(null);

    if (!isRetry) {
      setMessages(m => [...m, { role: 'user', text: msg, time: now() }]);
    }

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000); // 15s timeout

      const res = await fetch(N8N_WEBHOOK, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message:   msg,
          source:    'medovate-website',
          timestamp: new Date().toISOString(),
        }),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!res.ok) throw new Error('HTTP ' + res.status);

      const data  = await res.json();
      const reply =
        data.reply || data.response || data.message ||
        data.output || data.text    || data.answer  ||
        (typeof data === 'string' ? data : null)    ||
        "Thank you! Our team will follow up with you shortly. 🙏";

      setMessages(m => [...m, { role: 'bot', text: reply, time: now() }]);

    } catch (error) {
      console.error('Chatbot request failed:', error);

      const isTimeout = error.name === 'AbortError';
      const errorText = isTimeout
        ? '⏱️ Request timed out. The server may be busy.'
        : '⚠️ Could not connect to the assistant.';

      setLastFailedMsg(msg);
      setMessages(m => [...m, {
        role: 'bot',
        text: errorText,
        time: now(),
        isError: true,
      }]);
    } finally {
      setBusy(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }

  function retry() {
    if (!lastFailedMsg) return;
    // Remove the last error message before retrying
    setMessages(m => m.filter((_, i) => i !== m.length - 1));
    send(lastFailedMsg, true);
  }

  function onKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  }

  return (
    <>
      {/* ── GLOBAL STYLES ── */}
      <style>{`
        @keyframes mdo-slide-up   { from { opacity:0; transform:translateY(18px) scale(.95); } to { opacity:1; transform:translateY(0) scale(1); } }
        @keyframes mdo-slide-down { from { opacity:1; transform:translateY(0) scale(1); } to { opacity:0; transform:translateY(18px) scale(.95); } }
        @keyframes mdo-pop-in     { 0%{transform:scale(0.5);opacity:0} 65%{transform:scale(1.12)} 100%{transform:scale(1);opacity:1} }
        @keyframes mdo-ring       { 0%,100%{transform:scale(1)} 30%{transform:scale(1.18)} 60%{transform:scale(.96)} }
        @keyframes mdo-pulse-ring { 0%{opacity:.7;transform:scale(1)} 100%{opacity:0;transform:scale(1.7)} }
        @keyframes mdo-msg-in     { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes mdo-dot        { 0%,60%,100%{transform:translateY(0);opacity:.4} 30%{transform:translateY(-5px);opacity:1} }
        @keyframes mdo-shimmer    { 0%{background-position:200% center} 100%{background-position:-200% center} }
        @keyframes mdo-badge-pop  { 0%{transform:scale(0)} 70%{transform:scale(1.25)} 100%{transform:scale(1)} }

        .mdo-popup-enter { animation: mdo-slide-up .3s cubic-bezier(.34,1.3,.64,1) both; }
        .mdo-popup-exit  { animation: mdo-slide-down .25s ease forwards; }
        .mdo-win-enter   { animation: mdo-slide-up .28s cubic-bezier(.34,1.2,.64,1) both; }
        .mdo-msg-in      { animation: mdo-msg-in .22s ease both; }
        .mdo-btn-ring    { animation: mdo-ring .5s ease; }

        .mdo-btn-fab {
          position:fixed; bottom:28px; right:28px; z-index:9999;
          width:62px; height:62px; border-radius:50%;
          background:linear-gradient(135deg,#0a7c7c,#0d9e8a);
          border:none; cursor:pointer;
          display:flex; align-items:center; justify-content:center;
          box-shadow:0 6px 28px rgba(10,124,124,.45);
          transition:transform .2s,box-shadow .2s;
        }
        .mdo-btn-fab:hover { transform:scale(1.08); box-shadow:0 10px 36px rgba(10,124,124,.55); }
        .mdo-btn-fab::before {
          content:''; position:absolute; inset:-5px; border-radius:50%;
          border:2.5px solid rgba(10,124,124,.35);
          animation:mdo-pulse-ring 2.4s ease-out infinite;
        }
        .mdo-btn-fab::after {
          content:''; position:absolute; inset:-10px; border-radius:50%;
          border:2px solid rgba(10,124,124,.18);
          animation:mdo-pulse-ring 2.4s ease-out .8s infinite;
        }

        .mdo-chip {
          border:1.5px solid #bde0e0; background:#f0fafa; color:#0a7c7c;
          font-size:12px; font-weight:600; padding:6px 13px; border-radius:20px;
          cursor:pointer; white-space:nowrap; transition:all .15s; font-family:inherit;
        }
        .mdo-chip:hover { background:#0a7c7c; color:#fff; border-color:#0a7c7c; transform:translateY(-1px); }

        .mdo-input {
          flex:1; border:1.5px solid #d0e8e8; border-radius:14px;
          padding:10px 15px; font-size:13.5px; outline:none; resize:none;
          background:#f4fbfb; color:#0d1f2d; line-height:1.45;
          max-height:86px; transition:border-color .15s,background .15s; font-family:inherit;
        }
        .mdo-input:focus { border-color:#0a7c7c; background:#fff; }
        .mdo-input::placeholder { color:#8fb8b8; }

        .mdo-send {
          width:40px; height:40px; border-radius:50%;
          background:linear-gradient(135deg,#0a7c7c,#0d9e8a);
          border:none; color:#fff; cursor:pointer;
          display:flex; align-items:center; justify-content:center;
          flex-shrink:0; transition:transform .12s,opacity .15s;
          box-shadow:0 3px 12px rgba(10,124,124,.35);
        }
        .mdo-send:hover:not(:disabled) { transform:scale(1.08); }
        .mdo-send:active:not(:disabled) { transform:scale(.93); }
        .mdo-send:disabled { opacity:.45; cursor:not-allowed; }

        .mdo-retry {
          font-size:11.5px; color:#0a7c7c; font-weight:600;
          background:none; border:1px solid #0a7c7c; border-radius:10px;
          padding:4px 10px; cursor:pointer; margin-top:4px;
          transition:background .15s,color .15s;
        }
        .mdo-retry:hover { background:#0a7c7c; color:#fff; }

        .mdo-msgs::-webkit-scrollbar { width:3px; }
        .mdo-msgs::-webkit-scrollbar-thumb { background:#c5dede; border-radius:3px; }
      `}</style>

      {/* ── POPUP NOTIFICATION ── */}
      {popup && (
        <div
          className={popupVisible ? 'mdo-popup-enter' : 'mdo-popup-exit'}
          onClick={() => { setPopupVisible(false); setOpen(true); }}
          style={{
            position:'fixed', bottom:104, right:28, zIndex:9998,
            width:280, background:'#fff',
            borderRadius:16, padding:'14px 16px',
            boxShadow:'0 8px 36px rgba(10,30,40,.16)',
            border:'1px solid rgba(10,124,124,.12)',
            cursor:'pointer', display: popupVisible ? 'flex' : 'none',
            alignItems:'flex-start', gap:12,
          }}
        >
          <div style={{
            position:'absolute', top:0, left:0, right:0, height:3,
            background:'linear-gradient(90deg,#0a7c7c,#0d9e8a,#4ecdc4)',
            borderRadius:'16px 16px 0 0',
            backgroundSize:'200% auto',
            animation:'mdo-shimmer 2s linear infinite',
          }} />
          <div style={{ fontSize:26, flexShrink:0, animation:'mdo-pop-in .4s cubic-bezier(.34,1.4,.64,1) both' }}>
            {popup.icon}
          </div>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontWeight:700, fontSize:13, color:'#0d1f2d', marginBottom:3 }}>{popup.title}</div>
            <div style={{ fontSize:12.5, color:'#4a6878', lineHeight:1.5 }}>{popup.body}</div>
            <div style={{ marginTop:8, fontSize:11.5, color:'#0a7c7c', fontWeight:600, display:'flex', alignItems:'center', gap:4 }}>
              Chat now
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2 5h6M5 2l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <button
            onClick={e => { e.stopPropagation(); setPopupVisible(false); }}
            style={{
              background:'#f0f5f5', border:'none', color:'#89a8a8',
              width:22, height:22, borderRadius:'50%', cursor:'pointer',
              display:'flex', alignItems:'center', justifyContent:'center',
              flexShrink:0, fontSize:13, lineHeight:1, marginTop:-2,
            }}
          >✕</button>
        </div>
      )}

      {/* ── FAB BUTTON ── */}
      <button
        className={`mdo-btn-fab${btnPulse ? ' mdo-btn-ring' : ''}`}
        onClick={() => { setOpen(o => !o); setPopupVisible(false); }}
        aria-label="Chat with Medovate"
      >
        {unread > 0 && !open && (
          <div style={{
            position:'absolute', top:0, right:0,
            width:20, height:20, borderRadius:'50%',
            background:'#e84040', border:'2.5px solid #f0f5f8',
            display:'flex', alignItems:'center', justifyContent:'center',
            fontSize:10, fontWeight:700, color:'#fff',
            animation:'mdo-badge-pop .35s cubic-bezier(.34,1.5,.64,1) both',
          }}>{unread}</div>
        )}
        <svg
          style={{ position:'absolute', transition:'opacity .18s,transform .18s', opacity: open ? 0 : 1, transform: open ? 'rotate(45deg) scale(.7)' : 'none' }}
          width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
        <svg
          style={{ position:'absolute', transition:'opacity .18s,transform .18s', opacity: open ? 1 : 0, transform: open ? 'none' : 'rotate(-45deg) scale(.7)' }}
          width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"
        >
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>

      {/* ── CHAT WINDOW ── */}
      <div
        className={open ? 'mdo-win-enter' : ''}
        role="dialog"
        aria-label="Medovate AI Assistant"
        style={{
          position:'fixed', bottom:104, right:28, zIndex:9997,
          width:370, height:540,
          background:'#fff', borderRadius:22,
          boxShadow:'0 16px 56px rgba(10,30,40,.18), 0 2px 8px rgba(10,30,40,.06)',
          display:'flex', flexDirection:'column', overflow:'hidden',
          border:'1px solid rgba(10,124,124,.1)',
          opacity: open ? 1 : 0,
          transform: open ? 'translateY(0) scale(1)' : 'translateY(20px) scale(.96)',
          pointerEvents: open ? 'all' : 'none',
          transition:'opacity .26s cubic-bezier(.4,0,.2,1),transform .26s cubic-bezier(.4,0,.2,1)',
        }}
      >
        {/* Header */}
        <div style={{
          background:'linear-gradient(135deg,#0a7c7c 0%,#0d9e8a 100%)',
          padding:'15px 16px', display:'flex', alignItems:'center', gap:12,
          flexShrink:0, position:'relative', overflow:'hidden',
        }}>
          <div style={{ position:'absolute', right:-18, top:-18, width:90, height:90, borderRadius:'50%', background:'rgba(255,255,255,.07)' }}/>
          <div style={{ position:'absolute', right:24, bottom:-28, width:60, height:60, borderRadius:'50%', background:'rgba(255,255,255,.05)' }}/>
          <div style={{
            width:42, height:42, borderRadius:'50%',
            background:'rgba(255,255,255,.18)', border:'1.5px solid rgba(255,255,255,.3)',
            display:'flex', alignItems:'center', justifyContent:'center',
            fontSize:20, flexShrink:0,
          }}>🏥</div>
          <div style={{ flex:1 }}>
            <div style={{ fontWeight:700, fontSize:15, color:'#fff', letterSpacing:'-.2px' }}>Medovate Assistant</div>
            <div style={{ fontSize:11.5, color:'rgba(255,255,255,.72)', marginTop:2, display:'flex', alignItems:'center', gap:5 }}>
              <span style={{ width:6, height:6, borderRadius:'50%', background:'#7fffd4', display:'inline-block', flexShrink:0 }}/>
              Online · Replies instantly
            </div>
          </div>
          <button
            onClick={e => { e.stopPropagation(); setOpen(false); }}
            style={{
              background:'rgba(255,255,255,.14)', border:'none', color:'rgba(255,255,255,.85)',
              width:30, height:30, borderRadius:'50%', cursor:'pointer',
              display:'flex', alignItems:'center', justifyContent:'center', fontSize:16,
              transition:'background .15s', flexShrink:0, position:'relative', zIndex:10,
            }}
          >✕</button>
        </div>

        {/* Quick chips */}
        <div style={{
          padding:'10px 12px', display:'flex', gap:6, flexWrap:'wrap',
          background:'#f4fbfb', borderBottom:'1px solid #e0ecec', flexShrink:0,
        }}>
          {QUICK_CHIPS.map(c => (
            <button key={c.label} className="mdo-chip" onClick={() => send(c.text)}>
              {c.label}
            </button>
          ))}
        </div>

        {/* Messages */}
        <div
          ref={msgsRef}
          className="mdo-msgs"
          style={{
            flex:1, overflowY:'auto', padding:'14px 13px',
            display:'flex', flexDirection:'column', gap:10,
            background:'#f7fbfb',
          }}
        >
          {messages.map((m, i) => (
            <div key={i} className="mdo-msg-in" style={{ display:'flex', flexDirection:'column', alignItems: m.role === 'user' ? 'flex-end' : 'flex-start', gap:3 }}>
              <div style={{
                maxWidth:'84%', padding:'10px 14px', borderRadius:16,
                fontSize:13.5, lineHeight:1.55, wordBreak:'break-word',
                ...(m.role === 'bot'
                  ? {
                      background: m.isError ? '#fff5f5' : '#fff',
                      border: m.isError ? '1px solid #fcc' : '1px solid #daeaea',
                      borderBottomLeftRadius:4, color: m.isError ? '#c0392b' : '#1a2e3b',
                    }
                  : { background:'linear-gradient(135deg,#0a7c7c,#0d9e8a)', color:'#fff', borderBottomRightRadius:4 }
                ),
              }}>
                <RenderMsg text={m.text} />
              </div>
              {/* Retry button on last error message */}
              {m.isError && i === messages.length - 1 && lastFailedMsg && (
                <button className="mdo-retry" onClick={retry}>
                  🔄 Retry
                </button>
              )}
              <div style={{ fontSize:11, color:'#9ab8be', paddingLeft: m.role === 'bot' ? 4 : 0, paddingRight: m.role === 'user' ? 4 : 0 }}>{m.time}</div>
            </div>
          ))}

          {/* Typing indicator */}
          {busy && (
            <div className="mdo-msg-in" style={{ display:'flex', alignItems:'center', gap:6, padding:'10px 14px', background:'#fff', border:'1px solid #daeaea', borderRadius:16, borderBottomLeftRadius:4, alignSelf:'flex-start', width:'fit-content' }}>
              {[0, .2, .4].map((d, i) => (
                <span key={i} style={{ width:7, height:7, borderRadius:'50%', background:'#7ab8b8', display:'inline-block', animation:`mdo-dot 1.3s ${d}s infinite` }}/>
              ))}
            </div>
          )}
        </div>

        {/* Input */}
        <div style={{ padding:'11px 12px', background:'#fff', borderTop:'1px solid #e4eded', display:'flex', gap:8, alignItems:'flex-end', flexShrink:0 }}>
          <textarea
            ref={inputRef}
            className="mdo-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={onKey}
            placeholder="Ask about appointments, doctors…"
            rows={1}
            onInput={e => { e.target.style.height='auto'; e.target.style.height=Math.min(e.target.scrollHeight,84)+'px'; }}
          />
          <button className="mdo-send" onClick={() => send()} disabled={busy || !input.trim()} aria-label="Send">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </div>

        {/* Footer */}
        <div style={{ textAlign:'center', fontSize:11, color:'#a0b8be', padding:'5px 0 8px', background:'#fff', flexShrink:0 }}>
          Powered by <span style={{ color:'#0a7c7c', fontWeight:600 }}>Medovate AI</span>
        </div>
      </div>
    </>
  );
}