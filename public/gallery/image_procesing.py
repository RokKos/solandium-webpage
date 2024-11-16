import os, os.path
import subprocess

imgs = []
valid_images = [".jpg",".gif",".png",".tga"]
for f in os.listdir():
    ext = os.path.splitext(f)[1]
    if ext.lower() not in valid_images:
        continue
    imgs.append(f)

print(imgs)

command = "cwebp -preset photo  -q 75 -m 6 -mt -hint photo -v -progress {} -o {}"
ultimate_command =""
for img in imgs:
    new_image_name = os.path.splitext(img)[0] + ".webp"
    ultimate_command += command.format(img,new_image_name) + " | "


print(ultimate_command)