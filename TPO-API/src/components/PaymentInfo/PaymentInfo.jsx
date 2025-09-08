import React from 'react';
import './PaymentInfo.css';

const PaymentInfo = () => {
  return (
    <div className="payment-info">
      <div className="info-card">
        <i className="fas fa-credit-card"></i>
        <h3>Paga con Tarjeta de Credito</h3>
        <p>Hasta 12 cuotas sin interés</p>
      </div>
      
      <div className="info-card">
        <i className="fas fa-truck"></i>
        <h3>Envio gratis</h3>
        <p>En compras mayores a $100.000</p>
      </div>
      
      <div className="info-card">
        <i className="fas fa-shield-alt"></i>
        <h3>Compras seguras</h3>
        <p>Pagos protegidos</p>
      </div>
      
      <div className="info-card">
        <i className="fas fa-undo"></i>
        <h3>Devoluciones fáciles</h3>
        <p>Política de devolución de 30 días</p>
      </div>
    </div>
  );
};

export default PaymentInfo;