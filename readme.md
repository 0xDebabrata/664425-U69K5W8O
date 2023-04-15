# accessify.

### steps to run
We need two terminals to run the project

Inside terminal one we will run a node server.
It requires nodeJS to be installed on the system.

```
cd server
npm install
npm run start
```

Inside terminal two we will run the server hosting sGPT machine learning model.
We require tensorflow, numpy, pydantic, fastAPI and urllib for ML model.

```
cd model
uvicorn main:app --reload --port 8080
```