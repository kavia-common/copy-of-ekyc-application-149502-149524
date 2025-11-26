#!/bin/bash
cd /home/kavia/workspace/code-generation/copy-of-ekyc-application-149502-149524/EKYCWebFrontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

