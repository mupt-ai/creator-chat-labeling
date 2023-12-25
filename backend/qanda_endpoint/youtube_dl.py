import yt_dlp
from urllib.parse import urlparse, parse_qs
import os

def download_youtube_link(video_link):
    # First, let's get the video id from the link

    parsed_url = urlparse(video_link)
    query_params = parse_qs(parsed_url.query)

    video_id = query_params.get('v', [])[0] if 'v' in query_params else None

    # Check if video exists in videos folder
    if video_id:
        if os.path.exists(f'./videos/{video_id}.mp3'):
            return video_id
        
    ydl_opts = {
        'format': 'mp3/abestaudio/best',
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'mp3',
        }],
        'outtmpl': f'./videos/{video_id}'
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        error_code = ydl.download([video_link])
        print(error_code)
    
    return video_id

