test_webhook_data:

```json
{
  "completed_at": "2025-06-08T12:06:20.383588891Z",
  "created_at": "2025-06-08T12:06:15.127Z",
  "data_removed": false,
  "error": null,
  "id": "vcscvthbaxrm80cq9xqtcbaw4m",
  "input": {
    "input_image": "https://2hav3s1paktcascm.public.blob.vercel-storage.com/1749384367406-test01.png",
    "prompt": "Change hair color to black"
  },
  "logs": "Using seed: 7710683\nGenerating...\nGenerated image in 5.0sec\nDownloading 1289861 bytes\nDownloaded 1.23MB in 0.14sec\n",
  "metrics": {
    "image_count": 1,
    "predict_time": 5.247161016
  },
  "model": "black-forest-labs/flux-kontext-pro",
  "output": "https://replicate.delivery/xezq/Ap5zAUz9EC5wE9kl6vKKCEhKd9B30SdqwWdygMSpu7IvuMNF/tmp5v_v9dtm.png",
  "started_at": "2025-06-08T12:06:15.136427877Z",
  "status": "succeeded",
  "urls": {
    "cancel": "https://api.replicate.com/v1/predictions/vcscvthbaxrm80cq9xqtcbaw4m/cancel",
    "get": "https://api.replicate.com/v1/predictions/vcscvthbaxrm80cq9xqtcbaw4m",
    "stream": "https://stream.replicate.com/v1/files/bcwr-vwjeho54eudljmbnnz5hmuthuv2kpusfbdpkavexami5g5zb23oa",
    "web": "https://replicate.com/p/vcscvthbaxrm80cq9xqtcbaw4m"
  },
  "version": "hidden",
  "webhook": "https://7ef1-1-80-185-85.ngrok-free.app/api/webhooks",
  "webhook_events_filter": ["start", "completed", "logs", "output"]
}
```

## 风格提取

### 模型

`yorickvp/llava-13b:80537f9eead1a5bfa72d5ac6ea6414379be41d4d4f6679fd776e9535d1eb58bb`

### 提示词

```txt
You are an image style analysis assistant. You are given an image and must describe **only** its visual style.

⚠️ Do NOT describe any people, objects, clothing, or scenes.
🚫 Avoid referencing hats, faces, skies, buildings, or items.
✅ Focus strictly on the abstract aesthetic and stylistic aspects of the image.

Respond with a bullet-point list describing the following **six** aspects:

1. **Color palette** – Describe the color tone, warmth, or saturation (e.g., warm pastels, muted sepia, neon tones)
2. **Lighting & contrast** – Describe lighting conditions and intensity (e.g., soft light, natural glow, high contrast)
3. **Texture** – Describe the surface finish and texture (e.g., grainy, smooth, painterly, paper-like)
4. **Composition style** – Describe the visual framing (e.g., centered, dynamic, minimalistic, rule-of-thirds)
5. **Mood / atmosphere** – Describe the emotional feeling conveyed (e.g., nostalgic, whimsical, dark, serene)
6. **Artistic style or genre** – Identify the overall visual or artistic style the image most closely resembles (e.g., Studio Ghibli animation, vintage photo, oil painting, anime, ukiyo-e woodblock print, cyberpunk, watercolor)

Your output will be used by an image generation model to apply this aesthetic style to other images. Do not include scene descriptions or literal objects.
```

## 风格应用

### 模型

`black-forest-labs/flux-kontext-pro`

### 提示词

```txt
风格提取出来后的内容
```

## 老照片修复(带色彩)

### 模型

`black-forest-labs/flux-kontext-pro`

### 提示词

```txt
Please restore the damaged and missing areas in this old photo. The restoration of the person, especially the face and limbs, must strictly follow the visible original features — do not invent or replace them. Preserve their appearance, proportions, skin tone, age, gender, and ethnicity. Ensure the details of the face and limbs are highly accurate, keeping the original expression, features, and structure intact. For the background, if it is heavily degraded or unclear, you may use reasonable artistic freedom to reconstruct it. Ensure the background blends naturally with the rest of the image in terms of style, lighting, and overall atmosphere, while remaining consistent with the time period and context of the photo. The final result should look like a faithful restoration of the original photo, with a seamless and natural background that does not compromise the accuracy of the person's features.
```

## 老照片修复（保持原始色彩）

### 模型

`black-forest-labs/flux-kontext-pro`

### 提示词

```txt
Please restore the damaged and missing areas in this old photo. The restoration of the person, especially the face and limbs, must strictly follow the visible original features — do not invent or replace them. Preserve their appearance, proportions, skin tone, age, gender, and ethnicity. However, for the background, if the original content is heavily degraded or unclear, you may complete it in a plausible and stylistically consistent way, as long as it does not conflict with the remaining image. The final result should look like a faithful restoration of the original photo with a naturally reconstructed background.
```

## 分辨率提升（人像细化）

### 模型

`tencentarc/gfpgan:0fbacf7afc6c144e5be9767cff80f25aff23e52b0708f17e20f9879b2f21516c`

### 提示词

```txt
version: 1.4
```
