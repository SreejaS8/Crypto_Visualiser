import React, { useState } from 'react';
import '../styles/rsaprocess.css';

const RSAProcess = () => {
  const [p, setP] = useState(7919);
  const [q, setQ] = useState(1009);
  const [e, setE] = useState('');
  const [d, setD] = useState('');
  const [n, setN] = useState('');
  const [phi, setPhi] = useState('');
  const [message, setMessage] = useState(123);
  const [encryptedMessage, setEncryptedMessage] = useState('');
  const [decryptedMessage, setDecryptedMessage] = useState('');
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState('');

  const log = (message, isEmphasis = false) => {
    setLogs(prevLogs => [...prevLogs, { text: message, emphasis: isEmphasis }]);
  };

  const visualizeStep = (description, data = null, colorClass = '') => {
    log(description, true);
    if (data !== null) {
      log(typeof data === 'object' ? JSON.stringify(data, null, 2) : data);
    }
    return colorClass;
  };

  const power = (base, expo, m) => {
    let res = 1;
    base = base % m;
    while (expo > 0) {
      if (expo & 1) {
        res = (res * base) % m;
      }
      base = (base * base) % m;
      expo = Math.floor(expo / 2);
    }
    return res;
  };

  const gcd = (a, b) => {
    while (b !== 0) {
      [a, b] = [b, a % b];
    }
    return a;
  };

  const modInverse = (a, m) => {
    for (let x = 1; x < m; x++) {
      if ((a * x) % m === 1) {
        return x;
      }
    }
    return -1;
  };

  const generateKeys = () => {
    setLogs([]);
    setError('');
    setE('');
    setD('');
    setN('');
    setPhi('');

    const pVal = parseInt(p);
    const qVal = parseInt(q);

    if (isNaN(pVal) || isNaN(qVal) || pVal <= 1 || qVal <= 1 || pVal === qVal) {
      setError('Please enter valid distinct prime numbers for p and q.');
      return;
    }

    visualizeStep('Generating RSA Keys...', null, 'highlight');

    visualizeStep('1. Choose two distinct prime numbers:', { p: pVal, q: qVal }, 'prime');
    const nVal = pVal * qVal;
    setN(nVal);
    visualizeStep('2. Calculate n = p * q (the modulus):', nVal, 'modulus');
    const phiVal = (pVal - 1) * (qVal - 1);
    setPhi(phiVal);
    visualizeStep('3. Calculate φ(n) = (p - 1) * (q - 1) (Euler\'s totient):', phiVal, 'totient');

    let eVal = 2;
    while (eVal < phiVal) {
      if (gcd(eVal, phiVal) === 1) {
        break;
      }
      eVal++;
    }
    setE(eVal);
    visualizeStep('4. Choose an integer e such that 1 < e < φ(n) and gcd(e, φ(n)) = 1 (the public exponent):', eVal, 'public-exponent');

    const dVal = modInverse(eVal, phiVal);
    if (dVal === -1) {
      setError('Modular inverse for d not found. Try different p or q values.');
      return;
    }
    setD(dVal);
    visualizeStep('5. Compute d such that e * d ≡ 1 (mod φ(n)) (the private exponent):', dVal, 'private-exponent');

    log(`Public Key (e, n): (${eVal}, ${nVal})`, true);
    log(`Private Key (d, n): (${dVal}, ${nVal})`, true);
  };

  const handleEncrypt = () => {
    setLogs(prevLogs => [...prevLogs, { text: '--- Encryption ---', emphasis: true }]);
    setError('');
    setEncryptedMessage('');
    setDecryptedMessage('');

    const messageVal = parseInt(message);
    const eVal = parseInt(e);
    const nVal = parseInt(n);

    if (!eVal || !nVal) {
      setError('Please generate keys first.');
      return;
    }
    if (isNaN(messageVal) || messageVal < 0 || messageVal >= nVal) {
      setError(`Please enter a valid message (0 <= message < ${nVal}).`);
      return;
    }

    visualizeStep('Starting Encryption...', null, 'highlight');
    visualizeStep('Message to encrypt (M):', messageVal, 'message');
    visualizeStep('Public Key (e, n):', { e: eVal, n: nVal }, 'public-key');

    const encrypted = power(messageVal, eVal, nVal);
    setEncryptedMessage(encrypted);
    visualizeStep('Ciphertext (C) = M^e mod n:', encrypted, 'ciphertext');
    log('Encryption Complete!', true);
  };

  const handleDecrypt = () => {
    setLogs(prevLogs => [...prevLogs, { text: '--- Decryption ---', emphasis: true }]);
    setError('');
    setDecryptedMessage('');

    const encryptedVal = parseInt(encryptedMessage);
    const dVal = parseInt(d);
    const nVal = parseInt(n);

    if (!dVal || !nVal) {
      setError('Please generate keys first.');
      return;
    }
    if (isNaN(encryptedVal)) {
      setError('Please enter a valid encrypted message.');
      return;
    }

    visualizeStep('Starting Decryption...', null, 'highlight');
    visualizeStep('Ciphertext to decrypt (C):', encryptedVal, 'ciphertext');
    visualizeStep('Private Key (d, n):', { d: dVal, n: nVal }, 'private-key');

    const decrypted = power(encryptedVal, dVal, nVal);
    setDecryptedMessage(decrypted);
    visualizeStep('Decrypted Message (M) = C^d mod n:', decrypted, 'decrypted');
    log('Decryption Complete!', true);
  };

  return (
    <div className="rsa-process-container">
      <h2>RSA Algorithm Visualization</h2>
      {error && <p className="error-message">{error}</p>}

      <div className="keys-section">
        <h3>Key Generation</h3>
        <div className="input-pair">
          <label htmlFor="p" className="prime">Prime p:</label>
          <input type="number" id="p" value={p} onChange={(e) => setP(e.target.value)} className="input-field prime-input" />
        </div>
        <div className="input-pair">
          <label htmlFor="q" className="prime">Prime q:</label>
          <input type="number" id="q" value={q} onChange={(e) => setQ(e.target.value)} className="input-field prime-input" />
        </div>
        <button onClick={generateKeys} className="generate-button glow-button">Generate Keys</button>
        {n && <p className="modulus">Modulus (n): <span className="value">{n}</span></p>}
        {phi && <p className="totient">Euler's Totient (φ(n)): <span className="value">{phi}</span></p>}
        {e && <p className="public-exponent">Public Exponent (e): <span className="value">{e}</span></p>}
        {d && <p className="private-exponent">Private Exponent (d): <span className="value">{d}</span></p>}
      </div>

      <div className="encryption-section">
        <h3>Encryption</h3>
        <div className="input-pair">
          <label htmlFor="message" className="message">Message (Number):</label>
          <input type="number" id="message" value={message} onChange={(e) => setMessage(e.target.value)} className="input-field message-input" />
        </div>
        <button onClick={handleEncrypt} className="encrypt-button glow-button" disabled={!e || !n}>Encrypt</button>
        {encryptedMessage !== '' && <p className="ciphertext">Ciphertext: <span className="value">{encryptedMessage}</span></p>}
      </div>

      <div className="decryption-section">
        <h3>Decryption</h3>
        <div className="input-pair">
          <label htmlFor="encryptedMessage" className="ciphertext">Ciphertext:</label>
          <input type="number" id="encryptedMessage" value={encryptedMessage} onChange={(e) => setEncryptedMessage(e.target.value)} className="input-field ciphertext-input" />
        </div>
        <button onClick={handleDecrypt} className="decrypt-button glow-button" disabled={!d || !n}>Decrypt</button>
        {decryptedMessage !== '' && <p className="decrypted">Decrypted Message: <span className="value">{decryptedMessage}</span></p>}
      </div>

      <div className="logs-section">
        <h3 className="glow-text">Process Log:</h3>
        <div className="log-container">
          {logs.map((logEntry, index) => (
            <p key={index} className={logEntry.emphasis ? 'log-emphasis' : ''}>
              {logEntry.text}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RSAProcess;