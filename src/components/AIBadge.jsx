import React, { useEffect, useState } from 'react'; // Importez useEffect et useState sur la même ligne  
import '../index.css';  

export default function AIBadge({ small = false }) {  
  const [glow, setGlow] = useState(false);  
  
  useEffect(() => {  
    const interval = setInterval(() => {  
      setGlow((prevGlow) => !prevGlow); // Utilisez la valeur précédente pour éviter des problèmes de dépendance  
    }, 3000);  
    
    return () => clearInterval(interval);  
  }, []);  

  return (  
    <span className={`ai-badge ${small ? 'small' : ''} ${glow ? 'glow' : ''}`}>  
      <span className="ai-pulse"></span>  
      <span className="ai-text">AI Powered</span>  
      <span className="ai-sparkles">  
        {[...Array(3)].map((_, i) => (  
          <span key={i} className="sparkle" style={{  
            '--delay': `${i * 0.5}s`,  
            '--offset': `${(Math.random() * 20) - 10}px`  
          }}></span>  
        ))}  
      </span>  
    </span>  
  );  
}  