import { API_URL } from './services/api';

export function DebugInfo() {
  return (
    <div style={{
      position: 'fixed',
      bottom: '10px',
      right: '10px',
      background: '#1e293b',
      border: '1px solid #475569',
      padding: '10px',
      borderRadius: '8px',
      fontSize: '12px',
      color: '#e5e7eb',
      maxWidth: '400px',
      zIndex: 9999,
    }}>
      <div><strong>🔍 Debug Info:</strong></div>
      <div style={{ marginTop: '5px' }}>
        <strong>API_URL:</strong><br/>
        <code style={{ color: '#3b82f6', wordBreak: 'break-all' }}>{API_URL}</code>
      </div>
      <div style={{ marginTop: '5px', fontSize: '10px', opacity: 0.7 }}>
        Si ves "localhost:3000", reinicia el servidor de desarrollo
      </div>
    </div>
  );
}
