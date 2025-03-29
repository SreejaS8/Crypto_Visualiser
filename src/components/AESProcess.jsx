import React, { useState } from 'react';
import '../styles/aesprocess.css';

const AESProcess = () => {
  const [plaintext, setPlaintext] = useState('This is a secret message');
  const [key, setKey] = useState('');
  const [ciphertext, setCiphertext] = useState('');
  const [decryptedText, setDecryptedText] = useState('');
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState('');

  const log = (message, isEmphasis = false) => {
    setLogs(prevLogs => [...prevLogs, { text: message, emphasis: isEmphasis }]);
  };

  const visualizeStep = (description, data = null) => {
    log(description, true);
    if (data) {
      log(JSON.stringify(data, null, 2)); // Basic data display
    }
  };

  const handleEncrypt = () => {
    setLogs([]);
    setError('');
    setCiphertext('');
    setDecryptedText('');

    if (!key) {
      setError('Please enter a 16-byte (128-bit) key.');
      return;
    }
    if (key.length !== 16) {
      setError('Key must be 16 characters long for this simplified visualization.');
      return;
    }
    if (!plaintext) {
      setError('Please enter the plaintext.');
      return;
    }

    visualizeStep('Starting Encryption Process');

    // Simulate Key Expansion (very basic for visualization)
    const keyBytes = key.split('').map(char => char.charCodeAt(0));
    visualizeStep('Key Input:', key);
    visualizeStep('Key as Bytes:', keyBytes);

    // Simulate Plaintext Conversion
    const plaintextBytes = plaintext.split('').map(char => char.charCodeAt(0));
    visualizeStep('Plaintext Input:', plaintext);
    visualizeStep('Plaintext as Bytes:', plaintextBytes);

    // Simulate Initial Round (very basic XOR for visualization)
    visualizeStep('Performing Initial Round (Simplified XOR with Key)');
    let state = plaintextBytes.map((byte, i) => byte ^ keyBytes[i % 16]);
    visualizeStep('State after Initial Round:', state);

    // Simulate Main Rounds (highly simplified)
    const numberOfRounds = 5; // Just for visualization
    visualizeStep(`Simulating ${numberOfRounds} Main Rounds (Highly Simplified)`);
    for (let round = 1; round <= numberOfRounds; round++) {
      visualizeStep(`--- Round ${round} ---`);
      // Simulate SubBytes (very basic)
      let subBytesState = state.map(byte => (byte + round * 5) % 256); // Simple addition and modulo
      visualizeStep('Simulating SubBytes:', subBytesState);

      // Simulate ShiftRows (very basic)
      let shiftRowsState = [...subBytesState.slice(round % subBytesState.length), ...subBytesState.slice(0, round % subBytesState.length)];
      visualizeStep('Simulating ShiftRows:', shiftRowsState);

      // Simulate MixColumns (skipped for extreme simplification)
      visualizeStep('Simulating MixColumns: (Skipped for this basic visualization)');

      // Simulate AddRoundKey (XOR with key)
      state = shiftRowsState.map((byte, i) => byte ^ keyBytes[(i + round) % 16]);
      visualizeStep('Simulating AddRoundKey:', state);
    }

    // Output Ciphertext
    const encryptedHex = state.map(byte => byte.toString(16).padStart(2, '0')).join(' ');
    setCiphertext(encryptedHex);
    visualizeStep('Encryption Complete!');
    visualizeStep('Ciphertext (Hex):', encryptedHex);
  };

  const handleDecrypt = () => {
    setLogs([]);
    setError('');
    setDecryptedText('');

    if (!key) {
      setError('Please enter the key used for encryption.');
      return;
    }
    if (key.length !== 16) {
      setError('Key must be 16 characters long for decryption.');
      return;
    }
    if (!ciphertext) {
      setError('Please enter the ciphertext (hexadecimal values separated by spaces).');
      return;
    }

    visualizeStep('Starting Decryption Process');
    visualizeStep('Key Input:', key);
    const keyBytes = key.split('').map(char => char.charCodeAt(0));
    visualizeStep('Key as Bytes:', keyBytes);

    const ciphertextBytes = ciphertext.split(' ').map(hex => parseInt(hex, 16));
    if (ciphertextBytes.some(isNaN)) {
      setError('Invalid ciphertext format. Please use hexadecimal values separated by spaces.');
      return;
    }
    visualizeStep('Ciphertext Input (Hex):', ciphertext);
    visualizeStep('Ciphertext as Bytes:', ciphertextBytes);

    visualizeStep('Simulating Inverse Rounds (Highly Simplified)');
    let state = [...ciphertextBytes];
    const numberOfRounds = 5; // Should match encryption rounds

    for (let round = numberOfRounds; round >= 1; round--) {
      visualizeStep(`--- Inverse Round ${round} ---`);

      // Simulate Inverse AddRoundKey (XOR with key)
      state = state.map((byte, i) => byte ^ keyBytes[(i + round) % 16]);
      visualizeStep('Simulating Inverse AddRoundKey:', state);

      // Simulate Inverse MixColumns (skipped for extreme simplification)
      visualizeStep('Simulating Inverse MixColumns: (Skipped)');

      // Simulate Inverse ShiftRows
      let shiftRowsState = [...state.slice(-round % state.length), ...state.slice(0, -round % state.length)];
      visualizeStep('Simulating Inverse ShiftRows:', shiftRowsState);

      // Simulate Inverse SubBytes
      let subBytesState = shiftRowsState.map(byte => (byte - round * 5 + 256) % 256); // Simple inverse
      visualizeStep('Simulating Inverse SubBytes:', subBytesState);
      state = subBytesState;
    }

    // Simulate Final Inverse Round Key XOR
    visualizeStep('Performing Final Inverse Round Key XOR');
    const decryptedBytes = state.map((byte, i) => byte ^ keyBytes[i % 16]);
    visualizeStep('Bytes after Final Inverse Round Key XOR:', decryptedBytes);

    // Output Decrypted Text
    const decrypted = decryptedBytes.map(byte => String.fromCharCode(byte)).join('');
    setDecryptedText(decrypted);
    visualizeStep('Decryption Complete!');
    visualizeStep('Decrypted Text:', decrypted);
  };

  return (
    <div className="aes-process-container">
      <h2>AES Encryption/Decryption Visualization (Simplified)</h2>
      {error && <p className="error-message">{error}</p>}

      <div className="input-section">
        <label htmlFor="plaintext" className="glow-text">Plaintext:</label>
        <input
          type="text"
          id="plaintext"
          value={plaintext}
          onChange={(e) => setPlaintext(e.target.value)}
          className="input-field"
        />
      </div>

      <div className="input-section">
        <label htmlFor="key" className="glow-text">16-Byte Key:</label>
        <input
          type="text"
          id="key"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          className="input-field"
        />
      </div>

      <div className="button-section">
        <button onClick={handleEncrypt} className="glow-button">Encrypt</button>
        <button onClick={handleDecrypt} className="glow-button">Decrypt</button>
      </div>

      {ciphertext && (
        <div className="output-section">
          <h3 className="glow-text">Ciphertext (Hex):</h3>
          <pre className="output-text">{ciphertext}</pre>
        </div>
      )}

      {decryptedText && (
        <div className="output-section">
          <h3 className="glow-text">Decrypted Text:</h3>
          <pre className="output-text">{decryptedText}</pre>
        </div>
      )}

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

export default AESProcess;