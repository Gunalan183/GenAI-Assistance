#!/bin/bash
set -e

echo "Installing dependencies for frontend..."
npm ci --prefix frontend

echo "Building frontend..."
npm run build --prefix frontend

echo "Frontend build complete!"
