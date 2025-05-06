
import './LoginSplit.css';

const LoginSplit = ({ onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="login-left">
          <h2>Login</h2>
          <form onSubmit={handleSubmit} className="login-form">
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            <br/>
            <p className='password-reset'>forgot password? click <a href='#'>here!</a></p>
            <br/>    
            <button type="submit">Login</button>
          </form>
        </div>
        
        <div className="login-right">
          <img src="https://cdn.pixabay.com/photo/2015/11/06/11/48/multi-family-home-1026483_1280.jpg"
          alt="login image" />
        </div>
      </div>
    </div>
  );
};

export default LoginSplit;
