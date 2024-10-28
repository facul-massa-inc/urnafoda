cmd /c "npm run build"
xcopy /y index.js .\build\index.js
xcopy /y .env .\build\
xcopy /y package.json .\build\package.json*