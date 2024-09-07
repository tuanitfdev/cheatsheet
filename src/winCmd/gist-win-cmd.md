### yt-dlp

1. yt-dlp -F <video_url>: get all links with different resolution and quality

ex:
```
yt-dlp -F https://www.youtube.com/watch?v=5WfTEZJnv_8
```

2. yt-dlp -g -f <video_type_id> <video_url>: get specific link with specific resolution and quality
Note: get <video_type_id> from cmd #1.

ex:
```
get link video hd720 quality
yt-dlp -g -f 22 https://www.youtube.com/watch?v=5WfTEZJnv_8

get link audio only medium quality
yt-dlp -g -f 140 https://www.youtube.com/watch?v=ILUMXUu-3BY

```

### Draft
