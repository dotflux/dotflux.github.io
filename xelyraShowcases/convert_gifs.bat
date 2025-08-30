@echo off
REM Converts all GIFs in this folder to MP4 using FFmpeg
REM The MP4 will autoplay and loop when used as a <video> tag with loop/muted/autoplay

for %%f in (*.gif) do (
    echo Converting %%f ...
    ffmpeg -y -i "%%f" -movflags faststart -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" "%%~nf.mp4"
)
echo Done converting all GIFs!
pause