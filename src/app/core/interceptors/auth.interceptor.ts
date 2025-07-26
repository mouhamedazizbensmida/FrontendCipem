import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Ne pas ajouter le token pour les routes publiques
  if (req.url.includes('/api/public/') || req.url.includes('/api/auth/')) {
    return next(req);
  }

  const token = localStorage.getItem('accessToken');
  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(authReq);
  }
  
  return next(req);
};