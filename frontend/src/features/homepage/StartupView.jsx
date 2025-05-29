import React from 'react';
import { useNavigate } from 'react-router-dom';

function StartupView() {
  const navigate = useNavigate();
  return (
    <div className="startup-view-root">
      <div className="startup-card">
        <h2 className="startup-title">Välkommen till <span>ShoppingMate!</span></h2>
        <p className="startup-desc">
          Hantera dina inköpslistor tillsammans med familj och vänner.
          Skapa enkelt listor och bjud in andra, så blir vardagen smartare!
        </p>
        <div className="startup-btn-row">
          <button className="startup-btn" onClick={() => navigate('/lists')}>Dina listor</button>
          <button className="startup-btn" onClick={() => navigate('/lists/create')}>Skapa en ny lista</button>
        </div>
      </div>
    </div>
  );
}

export default StartupView;
