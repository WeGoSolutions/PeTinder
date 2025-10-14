import React from 'react';

const NotifyCard = ({ title, message, onClose }) => (
    <div style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '16px',
        background: '#fff',
        boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
        maxWidth: '320px',
        margin: '12px auto',
        position: 'relative'
    }}>
        <button
            onClick={onClose}
            style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                background: 'transparent',
                border: 'none',
                fontSize: '18px',
                cursor: 'pointer'
            }}
            aria-label="Fechar"
        >
            &times;
        </button>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '1.2em' }}>{title}</h3>
        <p style={{ margin: 0 }}>{message}</p>
    </div>
);

export default NotifyCard;