#!/bin/bash

# Start the FastAPI backend
echo "Starting FastAPI backend..."
cd ../resume_builder
python -m uvicorn main:app --reload --port 8000 &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 3

# Start the Angular frontend
echo "Starting Angular frontend..."
cd ../portfolio
ng serve --port 4200 &
FRONTEND_PID=$!

echo "Development servers started!"
echo "Frontend: http://localhost:4200"
echo "Backend: http://localhost:8000"
echo "Resume Manager: http://localhost:4200/me"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for user to stop
trap "echo 'Stopping servers...'; kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait 