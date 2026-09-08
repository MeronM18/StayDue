export const dynamic = 'force-static';

export default function AdminPage() {
  return (
    <html lang="en">
      <body>
        <main style={{ padding: '2rem', fontFamily: 'system-ui' }}>
          <h1>Admin Dashboard</h1>
          <p>Admin page is working correctly.</p>
          <div style={{ marginTop: '2rem', padding: '1rem', background: '#f0f0f0', borderRadius: '8px' }}>
            <h2>System Status</h2>
            <ul>
              <li>✅ Next.js App Router</li>
              <li>✅ Admin route accessible</li>
              <li>✅ Ready for deployment</li>
            </ul>
          </div>
        </main>
      </body>
    </html>
  );
}
