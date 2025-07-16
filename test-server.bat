@echo off
echo ================================================
echo            TRUEK-E LOGIN/LOGOUT TEST
echo ================================================
echo.

echo Iniciando servidor local...
echo.
echo 1. Abriendo navegador en http://localhost:8000
echo 2. Usa los usuarios de prueba:
echo    - maria@trueke.com / 123456
echo    - carlos@trueke.com / 123456  
echo    - ana@trueke.com / 123456
echo.
echo 3. Prueba el login y logout
echo.
echo Presiona Ctrl+C para detener el servidor
echo.

start http://localhost:8000
python -m http.server 8000
