# Using whisper.cpp for audio transcription

* How-to for whisper.cpp on [M1 Mac](https://www.daginge.com/blog/running-whisper-on-an-m1-mac-to-transcribe-audio-data-locally)
* Strict audio format: requires 16kHz PCM format. `ffmpeg` can do this converstion streaming or batchmode on files:

```
ffmpeg -i inputmedia.file -acodec pcm_s16le -ac 1 -ar 16000 output.wav
```
