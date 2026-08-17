import sys, os
from PIL import Image
os.makedirs('/home/user/cards', exist_ok=True)
n=0
for f in sorted(os.listdir('/home/user/png')):
    if not f.endswith('.png'): continue
    out='/home/user/cards/'+f[:-4]+'.webp'
    im=Image.open('/home/user/png/'+f).convert('RGB')
    w,h=im.size
    # enforce 2:3
    tw,th=1024,1536
    if abs(w/h - 2/3) > 0.01:
        s=max(tw/w, th/h); im=im.resize((round(w*s),round(h*s)), Image.LANCZOS)
        w,h=im.size; l=(w-tw)//2; t=(h-th)//2; im=im.crop((l,t,l+tw,t+th))
    else:
        im=im.resize((tw,th), Image.LANCZOS)
    im.save(out,'WEBP',quality=90,method=6)
    os.remove('/home/user/png/'+f)   # purge source PNG immediately
    n+=1
print("converted",n,"| png files left:",len([x for x in os.listdir('/home/user/png') if x.endswith('.png')]) if os.path.isdir('/home/user/png') else 0)
