export function textToSignImage(text: string, font?: string, color: string = '') {
  const tryCanvas = document.createElement('canvas');
  tryCanvas.width = 1360;
  tryCanvas.height = 100;
  const tctx: any = tryCanvas.getContext('2d');

  tctx.fillStyle = color;  
  tctx.font = font;

  const metrics = tctx.measureText(text);


  const canvas = document.createElement('canvas');
  canvas.width = metrics.width + 5;
  canvas.height = 100;
  const ctx: any = canvas.getContext('2d');

  ctx.fillStyle = color;  
  ctx.font = font;
  ctx.fillText(text, 0, 50);
  ctx.strokeText(text, 0, 50);

  return canvas.toDataURL();
}
   
export function textToImage(text: string, font: string, color: string = '') {
  const canvas = document.createElement('canvas');
  canvas.width = 633.25;
  canvas.height = 80;
  const ctx: any = canvas.getContext('2d');
  ctx.fillStyle = color;
  ctx.font = font;
  ctx.fillText(text, 0, 50);

  return canvas.toDataURL();
}

export function inputToImage(file:any) {
  const canvas = document.createElement('canvas');
  canvas.width =  1360;
  canvas.height = 100;
  const ctx: any = canvas.getContext('2d');
  ctx.fillText(file, 0, 50);
  ctx.strokeText(file, 0, 50);
  
  return canvas.toDataURL();
}
