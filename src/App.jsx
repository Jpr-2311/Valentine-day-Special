import { useState } from 'react'

const questions = [
  "Will you be my Valentine? 💘",
  "I can cook 🍳 Will you be my Valentine?",
  "I'm clean and well behaved 😌 Will you be my Valentine?",
  "I'll take care of you 💖 Will you be my Valentine?",
  "I promise I'm a good choice 👀 Will you be my Valentine?",
  "Please? 🥺 Will you be my Valentine?",
  "Just say yes already 😭 Will you be my Valentine?",
  "I'll buy you flowers 💐 Will you be my Valentine?",
  "We can watch movies together 🎬 Will you be my Valentine?",
  "I'll make you laugh every day 😄 Will you be my Valentine?",
  "Think of all the fun we'll have! 🎉 Will you be my Valentine?",
  "I'm running out of ideas here 🤔 Will you be my Valentine?",
  "Come on, pretty please? 🙏 Will you be my Valentine?",
  "I'll never ask again... just kidding 😅 Will you be my Valentine?",
  "You know you want to say yes 😏 Will you be my Valentine?",
  "PLEASE PLEASE PLEASE 🥹 Will you be my Valentine?",
  "I'm literally begging now 😢 Will you be my Valentine?",
  "Why are you doing this to me? 💔 Will you be my Valentine?",
  "Fine, I'll do anything! 🎁 Will you be my Valentine?",
  "Okay but seriously... 👉👈 Will you be my Valentine?",
  "Look how big the Yes button is! 😱 Will you be my Valentine?",
  "I'll give you unlimited hugs 🤗 Will you be my Valentine?",
  "We can go on adventures together 🗺️ Will you be my Valentine?",
  "I'll be your personal comedian 🎭 Will you be my Valentine?",
  "Think about it... we'd be perfect! ✨ Will you be my Valentine?",
  "I'm starting to lose hope here 😔 Will you be my Valentine?",
  "The No button is SO tiny now! 🔍 Will you be my Valentine?",
  "This is your last chance! ⚠️ Will you be my Valentine?",
  "I've never wanted anything more 💯 Will you be my Valentine?",
  "PLEASE I'M DESPERATE NOW 😩 Will you be my Valentine?"
];

function App() {
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [name, setName] = useState("");
  const [started, setStarted] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const [accepted, setAccepted] = useState(false);

  const questionIndex = Math.min(noCount, questions.length - 1);
  const yesButtonSize = Math.min(1 + noCount * 0.3, 5); 
  const noButtonSize = Math.max(1 - noCount * 0.035, 0.01); 
  const noButtonOpacity = noCount >= questions.length - 1 ? 0 : Math.max(1 - noCount * 0.04, 0.1); 

  const handleNoClick = () => {
    setNoCount(noCount + 1);
    if (noCount >= 1 && noCount < questions.length - 1) {
      moveNoButton();
    }
  };

  const moveNoButton = () => {
    const isMobile = window.innerWidth < 640;
    const containerWidth = Math.min(window.innerWidth - 40, 900); 
    const containerHeight = isMobile ? 300 : 250;

    const buttonWidth = isMobile ? 130 : 160; // Approximate button width
    const buttonHeight = 60; // Approximate button height
    const yesButtonSpace = isMobile ? 120 : 180; 
    const safeMargin = 20; // Minimum distance from edges

    const maxX = Math.min(containerWidth / 2 - buttonWidth - safeMargin, isMobile ? 100 : 200);
    const maxY = Math.min(containerHeight / 2 - buttonHeight - safeMargin, isMobile ? 80 : 120);

    let x, y;
    let attempts = 0;
    const maxAttempts = 20;

    do {
      x = (Math.random() - 0.5) * maxX * 2;
      y = (Math.random() - 0.5) * maxY * 2;
      attempts++;
      const distance = Math.sqrt(x * x + y * y);
      const minDistance = yesButtonSpace + 30; 

      if (distance > minDistance || attempts >= maxAttempts) {
        break;
      }
    } while (true);
    x = Math.max(-maxX, Math.min(maxX, x));
    y = Math.max(-maxY, Math.min(maxY, y));

    setNoPosition({ x, y });
  };

  const handleYesClick = () => {
    setAccepted(true);
    // Send email when they accept
    sendEmail(name, 'accepted');
  };

  // Function to send email notification
  const sendEmail = async (userName, action) => {
    try {
      await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: import.meta.env.VITE_EMAILJS_SERVICE_ID,
          template_id: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          user_id: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
          template_params: {
            title: 'Valentine App 💘',
            name: userName,
            message:
              action === 'accepted'
                ? 'User clicked YES and accepted the Valentine'
                : 'User entered their name and started the Valentine flow',
            email: 'no-reply@valentine.app'
          }
        })
      });
    } catch (error) {
      console.error('Email failed:', error);
    }
  };


  const handleContinueClick = () => {
    if (name) {
      setStarted(true);
      // Send email when someone enters their name
      sendEmail(name, 'started');
    }
  };

  // SUCCESS SCREEN
  if (accepted) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        overflow: 'hidden'
      }}>
        <h1 style={{
          fontSize: 'clamp(2rem, 8vw, 4rem)',
          fontWeight: 'bold',
          color: 'white',
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          Yay {name}! 💖
        </h1>

        <p style={{
          fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
          color: 'white',
          marginBottom: '30px',
          textAlign: 'center'
        }}>
          You're my Valentine! 🥰
        </p>

        <div style={{
          fontSize: 'clamp(4rem, 15vw, 8rem)',
          marginBottom: '20px'
        }}>
          💝
        </div>

        <p style={{
          fontSize: 'clamp(1rem, 3vw, 1.5rem)',
          color: 'white',
          maxWidth: '500px',
          textAlign: 'center'
        }}>
          Get ready for the best Valentine's Day ever! 🎉
        </p>
      </div>
    );
  }

  // MAIN SCREEN
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      overflow: 'hidden', 
      position: 'relative'
    }}>
      {!started ? (
        <div style={{
          background: 'white',
          padding: '40px',
          borderRadius: '20px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
          width: '100%',
          maxWidth: '400px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '60px', marginBottom: '20px' }}>
            💝
          </div>

          <h1 style={{
            fontSize: 'clamp(1.5rem, 5vw, 2rem)',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '20px'
          }}>
            Hey there! 👀
          </h1>

          <p style={{
            color: '#666',
            marginBottom: '30px',
            fontSize: '16px'
          }}>
            Before I ask you something important...
          </p>

          <input
            type="text"
            placeholder="What's your name?"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && name && handleContinueClick()}
            style={{
              width: '100%',
              padding: '15px',
              fontSize: '18px',
              border: '2px solid #ffc3a0',
              borderRadius: '10px',
              textAlign: 'center',
              marginBottom: '20px',
              outline: 'none'
            }}
          />

          <button
            onClick={handleContinueClick}
            disabled={!name}
            style={{
              width: '100%',
              padding: '15px',
              fontSize: '20px',
              fontWeight: 'bold',
              background: name ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' : '#ccc',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              cursor: name ? 'pointer' : 'not-allowed',
              transition: 'transform 0.2s'
            }}
          >
            Continue 💖
          </button>
        </div>
      ) : (
        // VALENTINE QUESTION SCREEN
        <div style={{
          textAlign: 'center',
          maxWidth: '900px',
          width: '100%',
          padding: window.innerWidth < 640 ? '20px 15px' : '40px 20px'
        }}>
          <h1 style={{
            fontSize: 'clamp(1.8rem, 5vw, 3rem)',
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '60px',
            padding: '0 20px'
          }}>
            {questions[questionIndex]}
          </h1>

          <div style={{
            display: 'flex',
            flexDirection: window.innerWidth < 640 ? 'column' : 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '30px',
            marginBottom: '40px',
            minHeight: window.innerWidth < 640 ? '350px' : '300px',
            position: 'relative',
            maxWidth: '100%',
            overflow: 'visible',
            padding: '20px' // Extra padding to prevent edge clipping
          }}>
            {/* YES BUTTON */}
            <button
              onClick={handleYesClick}
              style={{
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                color: 'white',
                padding: window.innerWidth < 640 ? '15px 40px' : '20px 50px',
                fontSize: window.innerWidth < 640 ? '24px' : '28px',
                fontWeight: 'bold',
                border: 'none',
                borderRadius: '15px',
                cursor: 'pointer',
                boxShadow: '0 8px 20px rgba(240, 147, 251, 0.4)',
                transform: `scale(${Math.min(yesButtonSize, window.innerWidth < 640 ? 2.5 : 5)})`,
                transition: 'all 0.3s ease',
                position: 'relative',
                zIndex: 5, // Lower than No button
                whiteSpace: 'nowrap',
                pointerEvents: 'auto' // Ensure it's clickable but won't block No button
              }}
              onMouseEnter={(e) => e.target.style.transform = `scale(${Math.min(yesButtonSize * 1.05, window.innerWidth < 640 ? 2.6 : 5.2)})`}
              onMouseLeave={(e) => e.target.style.transform = `scale(${Math.min(yesButtonSize, window.innerWidth < 640 ? 2.5 : 5)})`}
            >
              Yes ❤️
            </button>

            {/* NO BUTTON */}
            <button
              onClick={handleNoClick}
              onTouchStart={(e) => {
                // Handle touch devices - move button on touch
                if (noCount >= 2 && noCount < questions.length - 1) {
                  e.preventDefault();
                  moveNoButton();
                }
              }}
              style={{
                background: '#666',
                color: 'white',
                padding: window.innerWidth < 640 ? '15px 40px' : '20px 50px',
                fontSize: window.innerWidth < 640 ? '24px' : '28px',
                fontWeight: 'bold',
                border: 'none',
                borderRadius: '15px',
                cursor: noCount >= questions.length - 1 ? 'not-allowed' : 'pointer',
                boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                transform: `scale(${noButtonSize}) translate(${noPosition.x}px, ${noPosition.y}px)`,
                transition: 'all 0.3s ease',
                position: noCount >= 2 ? 'absolute' : 'relative',
                opacity: noButtonOpacity,
                pointerEvents: noCount >= questions.length - 1 ? 'none' : 'auto',
                whiteSpace: 'nowrap',
                zIndex: 20 // Always above Yes button
              }}
              onMouseEnter={(e) => {
                if (noCount >= 2 && noCount < questions.length - 1) {
                  moveNoButton();
                }
              }}
            >
              No 💔
            </button>
          </div>

          {/* COUNTER AND MESSAGES */}
          {noCount > 0 && (
            <div style={{
              marginTop: '40px',
              padding: '20px',
              background: 'rgba(255, 255, 255, 0.8)',
              borderRadius: '15px',
              display: 'inline-block'
            }}>
              <p style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#333',
                marginBottom: '10px'
              }}>
                "No" button clicks: {noCount}
              </p>

              {noCount >= 1 && noCount <= 3 && (
                <p style={{ fontSize: '18px', color: '#666', fontWeight: '600' }}>
                  Hmm, really? 🤨
                </p>
              )}
              {noCount > 3 && noCount <= 6 && (
                <p style={{ fontSize: '18px', color: '#f093fb', fontWeight: '600' }}>
                  The "Yes" button is getting bigger... 👀
                </p>
              )}
              {noCount > 6 && noCount <= 9 && (
                <p style={{ fontSize: '19px', color: '#f093fb', fontWeight: 'bold' }}>
                  Notice how HUGE the Yes button is getting? 😏
                </p>
              )}
              {noCount > 9 && noCount <= 12 && (
                <p style={{ fontSize: '20px', color: '#f5576c', fontWeight: 'bold' }}>
                  Really? Still clicking no? 🤔
                </p>
              )}
              {noCount > 12 && noCount <= 15 && (
                <p style={{ fontSize: '21px', color: '#f5576c', fontWeight: 'bold' }}>
                  The Yes button is MASSIVE now! Just click it! 😭
                </p>
              )}
              {noCount > 15 && noCount <= 20 && (
                <p style={{ fontSize: '22px', color: '#d63031', fontWeight: 'bold' }}>
                  The No button is disappearing! 👻
                </p>
              )}
              {noCount > 20 && noCount < questions.length - 1 && (
                <p style={{ fontSize: '24px', color: '#d63031', fontWeight: 'bold' }}>
                  😢 The No button is almost INVISIBLE now!
                  <br />
                  The Yes button is {Math.round(yesButtonSize)}x bigger!
                </p>
              )}
              {noCount >= questions.length - 1 && (
                <p style={{ fontSize: '26px', color: '#d63031', fontWeight: 'bold' }}>
                  💔 The No button is GONE! Only Yes remains!
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App