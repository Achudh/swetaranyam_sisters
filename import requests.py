import requests
import json
import base64
import os
import subprocess

# Gemini API endpoint
GEMINI_API_URL = "https://api.gemini.com/v1/video/generate"

# Your API key
API_KEY = "YOUR_GEMINI_API_KEY"

# Scenes data (replace/add all your scenes)
scenes = [
    {
      "id": "scene1",
      "description": "Temple aerial view at dawn, surrounded by streets and houses, soft sunlight highlighting temple spires.",
      "camera": "drone overhead",
      "transition_to_next": {
        "type": "pull-down + fade",
        "duration_sec": 2
      }
    },
    {
      "id": "scene2_1",
      "description": "Street corner with vendors, people walking, children playing, illustrative perspective.",
      "camera": "isometric street view",
      "transition_to_next": {
        "type": "pan left + dissolve",
        "duration_sec": 1.5
      }
    },
    {
      "id": "scene2_2",
      "description": "Temple-facing street, approaching artists walking towards palace gates.",
      "camera": "tracking side view",
      "transition_to_next": {
        "type": "tracking shot with speed lines",
        "duration_sec": 2
      }
    },
    {
      "id": "scene2_3",
      "description": "Artists walking towards palace, musicians with instruments, dancers in colorful attire.",
      "camera": "side tracking + slight tilt",
      "transition_to_next": {
        "type": "curtain reveal + slow zoom",
        "duration_sec": 2
      }
    },
    {
      "id": "scene3",
      "description": "Royal courtroom, King Shahaji seated on throne, ministers and guards present.",
      "camera": "wide-angle interior",
      "transition_to_next": {
        "type": "focus shift + depth-of-field blur",
        "duration_sec": 1.5
      }
    },
    {
      "id": "scene4",
      "description": "Minister of arts receives instructions from the king, bowing slightly.",
      "camera": "medium shot",
      "transition_to_next": {
        "type": "wide-to-close lateral slide",
        "duration_sec": 1.5
      }
    },
    {
      "id": "scene5_1",
      "description": "Scholars arriving, carrying manuscripts, entering palace courtyard.",
      "camera": "tracking pan",
      "transition_to_next": {
        "type": "crossfade with torch flicker",
        "duration_sec": 1.8
      }
    },
    {
      "id": "scene5_2",
      "description": "Scholars receiving instructions and preparing to write manuscripts.",
      "camera": "medium angle",
      "transition_to_next": {
        "type": "dolly-in + subtle glow pulse",
        "duration_sec": 2
      }
    },
    {
      "id": "scene6",
      "description": "Scholars writing manuscripts at desks, candlelight and torches illuminating pages.",
      "camera": "top-down slight angle",
      "transition_to_next": {
        "type": "push forward + vignette fade",
        "duration_sec": 1.8
      }
    },
    {
      "id": "scene7",
      "description": "Scholars submitting manuscripts on red cloth plates to ministers.",
      "camera": "medium close-up",
      "transition_to_next": {
        "type": "illustrative dissolve with torch flare",
        "duration_sec": 1.5
      }
    },
    {
      "id": "scene8",
      "description": "King examining manuscripts, reading, and annotating.",
      "camera": "top-angle over shoulder",
      "transition_to_next": {
        "type": "top-angle swoop + soft fade",
        "duration_sec": 1.5
      }
    },
    {
      "id": "scene9",
      "description": "King writing analysis, detailed view of hand and quill, manuscripts on desk.",
      "camera": "close-up top-down",
      "transition_to_next": {
        "type": "illustrated horizontal slide + torch flicker",
        "duration_sec": 1.5
      }
    },
    {
      "id": "scene10",
      "description": "Minister receiving manuscripts from king and moving towards library table.",
      "camera": "medium tracking shot",
      "transition_to_next": {
        "type": "top-down fade to vignette",
        "duration_sec": 2
      }
    },
    {
      "id": "scene11",
      "description": "Library table with red cloth, manuscripts resting, warm ambient torchlight.",
      "camera": "top-down still",
      "transition_to_next": {
        "type": "fade out",
        "duration_sec": 2
      }
    }
  ]

# Folder to save videos
os.makedirs("video_scenes", exist_ok=True)

headers = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {API_KEY}"
}

video_files = []

# Generate each scene individually
for scene in scenes:
    payload = {
        "title": f"{scene['id']} - King Shahaji Court Documentary",
        "style": {
            "visual_style": "traditional Indian painting, bold outlines, rich colors, maroon and gold palette, non-photorealistic",
            "lighting": "torch-lit interiors, soft vignettes, subtle motion blur for depth"
        },
        "scenes": [scene]
    }

    response = requests.post(GEMINI_API_URL, headers=headers, data=json.dumps(payload))
    
    if response.status_code == 200:
        result = response.json()
        print(f"{scene['id']} generated successfully.")

        # Save video locally
        if "video_base64" in result:
            video_path = f"video_scenes/{scene['id']}.mp4"
            with open(video_path, "wb") as f:
                f.write(base64.b64decode(result['video_base64']))
            video_files.append(video_path)
        elif "video_url" in result:
            video_path = f"video_scenes/{scene['id']}.mp4"
            video_content = requests.get(result["video_url"]).content
            with open(video_path, "wb") as f:
                f.write(video_content)
            video_files.append(video_path)
    else:
        print(f"Error generating {scene['id']}: {response.text}")

# Add fade transitions and stitch videos
if video_files:
    # Generate FFmpeg filter_complex string for fade transitions
    filter_complex = ""
    input_files = []
    for i, vf in enumerate(video_files):
        input_files.extend(["-i", vf])
        if i > 0:
            # Fade in/out: previous fades out, current fades in
            filter_complex += (
                f"[{i-1}:v][{i}:v]xfade=transition=fade:duration=1:offset={i-1}*5[v{i}];"
            )
    # Final mapping
    final_map = f"-map [v{len(video_files)-1}] -map 0:a?"
    
    final_video_path = "king_shahaji_court_full_transitions.mp4"
    
    ffmpeg_cmd = ["ffmpeg", "-y"] + input_files + [
        "-filter_complex", filter_complex.rstrip(';'),
        final_map,
        final_video_path
    ]
    
    subprocess.run(ffmpeg_cmd)
    print(f"Final video with transitions saved as {final_video_path}")
else:
    print("No videos generated to stitch.")
