# Sources média

Fichiers d'origine, **non déployés** : Vite ne copie que `public/`.

Ils servent à réencoder les médias du site sans repartir d'une capture. Ce qui
part en production vit dans `public/media/`.

**Ce dossier est gitignoré** (sauf ce README) : les sources sont lourdes et déjà
converties. Elles vivent sur le poste de qui les a produites. Pour en verser une
à l'historique malgré tout : `git add -f assets-src/<fichier>`.

| Source | Sortie servie | Gain |
|---|---|---|
| `google-family-link.gif` (5,0 Mo) | `public/media/google-family-link.mp4` (163 Ko) + `.jpg` poster (66 Ko) | −95 % |

## Réencoder

```bash
ffmpeg -i assets-src/<source>.gif \
  -vf "scale=1024:-2,fps=25" -c:v libx264 -preset slow -crf 26 \
  -pix_fmt yuv420p -movflags +faststart -an \
  public/media/<nom>.mp4

ffmpeg -ss 0.5 -i assets-src/<source>.gif -vf "scale=1024:-2" \
  -frames:v 1 -q:v 7 public/media/<nom>.jpg
```

Le poster **doit** porter le même nom que le MP4 : `markdownComponents.jsx` le
déduit en remplaçant l'extension.
