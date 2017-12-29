#!/bin/sh

palette="/tmp/palette.png"

filters="fps=8,scale=320:-1:flags=lanczos"

ffmpeg -v warning -f concat -safe 0 -r 8 -i $1 -vf "$filters,palettegen" -y $palette
ffmpeg -v warning -f concat -safe 0 -r 8 -i $1 -i $palette -lavfi "$filters [x]; [x][1:v] paletteuse" -y $2