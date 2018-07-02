#!/bin/bash
set -e

if [ "$ENV" = 'DEV' ]; then
	echo "Running Development Server"
	exec npm run dev
elif [ "$ENV" = 'UNIT' ]; then
	echo "Running Unit Tests"
	exec npm run unit
fi