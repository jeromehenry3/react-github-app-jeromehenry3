#!/bin/sh -x
npx webpack --mode production
cd dist
http-server -p 5000
