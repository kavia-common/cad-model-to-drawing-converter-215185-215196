#!/bin/bash
cd /home/kavia/workspace/code-generation/cad-model-to-drawing-converter-215185-215196/cad_frontend_app
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

