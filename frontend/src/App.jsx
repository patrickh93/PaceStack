import "./App.css";

function App() {
  return (
    <div className="app">
      <aside className="sidebar">
        <div className="sidebar-logo">PaceStack</div>

        <nav className="sidebar-nav">
          <button className="nav-item active">Dashboard</button>
          <button className="nav-item">Runs</button>
          <button className="nav-item">Summary</button>
          <button className="nav-item">Shoes</button>
          <button className="nav-item">Settings</button>
        </nav>
      </aside>

      <main className="main-content">
        <header className="page-header">
          <div>
            <h1>Dashboard</h1>
            <p>Track your running, review your week, and build consistency.</p>
          </div>
        </header>

        <section className="metric-grid">
          <div className="metric-card">
            <span className="metric-label">This Week Distance</span>
            <strong>0 km</strong>
          </div>

          <div className="metric-card">
            <span className="metric-label">Runs</span>
            <strong>0</strong>
          </div>

          <div className="metric-card">
            <span className="metric-label">Longest Run</span>
            <strong>0 km</strong>
          </div>

          <div className="metric-card">
            <span className="metric-label">Average Pace</span>
            <strong>--:-- /km</strong>
          </div>
        </section>

        <section className="dashboard-grid">
          <div className="panel">
            <h2>Add Run</h2>
            <p className="placeholder-text">
              The run form will go here in the next version.
            </p>
          </div>

          <div className="panel">
            <h2>Recent Runs</h2>
            <p className="placeholder-text">
              Recent saved runs will appear here once the frontend connects to
              the API.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
