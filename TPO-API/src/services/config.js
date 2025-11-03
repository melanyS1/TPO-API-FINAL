// Centraliza la URL base del backend para todo el frontend
// Usa VITE_API_URL si está definida (ej: http://localhost:8080/api)
// Si no, por defecto apunta al backend local expuesto por docker-compose
const raw = (import.meta && import.meta.env && import.meta.env.VITE_API_URL) || 'http://localhost:8080/api';

// Normalizar: quitar barra final
export const API_BASE = String(raw).replace(/\/$/, '');

export const apiUrl = (path = '/') => {
	const p = String(path).startsWith('/') ? path : `/${path}`;
	return `${API_BASE}${p}`;
};

export default API_BASE;

