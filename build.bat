cmd /c "npm run build"
xcopy /y index.js .\build\index.js
xcopy /y .env .\build\
xcopy /y /e .\cert\ .\build\cert\