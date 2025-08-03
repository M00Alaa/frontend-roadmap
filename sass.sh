#!/bin/bash

# Compile SCSS to CSS
sass scss/style.scss css/style.css --no-source-map --style=compressed

echo "✅ SCSS compiled to CSS successfully!"
